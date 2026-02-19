import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Navigation } from "@/components/Navigation";
import { Link } from "react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import type { MouseEvent } from "react";

const TYPEWRITER_PREFIX = "I ";
const TYPEWRITER_PHRASES = [
  "love chasing problems worth solving.",
  "build things that survive under constraints.",
  "like projects that force me to think.",
  "design for the edge cases everyone forgets.",
  "keep my work honest.",
  "love learning new things.",
  "build because leaving things broken annoys me.",
  "focus on what scales, not what trends.",
  "think you're awesome!",
  "hate overcomplicating things.",
  "solve problems that people only notice once they disappear.",
  "think better when the stakes are high.",
] as const;

const XLogo = () => (
  <svg
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    role="img"
  >
    <path d="M3 2h4.7l4.02 5.5L15.4 2H21l-6.79 8.7L21.5 22h-4.7l-4.4-5.97L8.5 22H3l7.04-9.04z" />
  </svg>
);

const LetterboxdLogo = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    aria-hidden="true"
    role="img"
  >
    <circle cx="7" cy="12" r="4.5" fill="#40BCF4" />
    <circle cx="12" cy="12" r="4.5" fill="#00E054" />
    <circle cx="17" cy="12" r="4.5" fill="#FF8000" />
  </svg>
);

const ScholarIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.838 3.94A8 8 0 0 1 12 9a8 8 0 0 1 7.162 4.44L24 9.5z" />
  </svg>
);

export default function Home() {
  const [displayText, setDisplayText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const shuffledOrder = useRef<number[]>([]);
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const tiltXSpring = useSpring(tiltX, { stiffness: 220, damping: 18, mass: 0.45 });
  const tiltYSpring = useSpring(tiltY, { stiffness: 220, damping: 18, mass: 0.45 });
  const socialLinks = [
    {
      label: "GitHub",
      href: "https://github.com/ai-singhal",
      icon: Github,
      className: "border-violet-500/40 bg-violet-500/10 text-violet-200 hover:border-violet-300 hover:bg-violet-500/20",
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/aisinghal/",
      icon: Linkedin,
      className: "border-sky-500/40 bg-sky-500/10 text-sky-200 hover:border-sky-300 hover:bg-sky-500/20",
    },
    {
      label: "X",
      href: "https://twitter.com/ai_singhal",
      icon: XLogo,
      className: "border-zinc-500/50 bg-zinc-500/10 text-zinc-200 hover:border-zinc-300 hover:bg-zinc-400/20",
    },
    {
      label: "Google Scholar",
      href: "https://scholar.google.com/citations?user=QJn7KLkAAAAJ&hl=en",
      icon: ScholarIcon,
      className: "border-emerald-500/40 bg-emerald-500/10 text-emerald-200 hover:border-emerald-300 hover:bg-emerald-500/20",
    },
    {
      label: "Letterboxd",
      href: "https://letterboxd.com/aisinghal/",
      icon: LetterboxdLogo,
      className: "border-orange-500/50 bg-orange-500/10 text-orange-200 hover:border-orange-300 hover:bg-orange-500/25",
    },
  ];

  useEffect(() => {
    shuffledOrder.current = shuffleIndices(TYPEWRITER_PHRASES.length);
  }, []);

  const currentPhrase = useMemo(() => {
    const order = shuffledOrder.current;
    if (!order.length) {
      order.push(...shuffleIndices(TYPEWRITER_PHRASES.length));
    }
    const idx = order[phraseIndex % order.length];
    return TYPEWRITER_PHRASES[idx];
  }, [phraseIndex]);

  useEffect(() => {
    if (!currentPhrase) return;

    if (!isDeleting && displayText === currentPhrase) {
      const hold = setTimeout(() => setIsDeleting(true), 1200);
      return () => clearTimeout(hold);
    }

    if (isDeleting && displayText === "") {
      const next = setTimeout(() => {
        setIsDeleting(false);
        setPhraseIndex((prev) => {
          const order = shuffledOrder.current;
          const nextIndex = (prev + 1) % order.length;
          if (nextIndex === 0) {
            shuffledOrder.current = shuffleIndices(TYPEWRITER_PHRASES.length);
          }
          return nextIndex;
        });
      }, 200);
      return () => clearTimeout(next);
    }

    const timeout = setTimeout(() => {
      const nextLength = displayText.length + (isDeleting ? -1 : 1);
      setDisplayText(currentPhrase.slice(0, nextLength));
    }, isDeleting ? 45 : 95);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, phraseIndex, currentPhrase]);

  const handleTilt = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const xPercent = x / rect.width - 0.5;
    const yPercent = y / rect.height - 0.5;

    tiltX.set(-yPercent * 40);
    tiltY.set(xPercent * 40);
  };

  const resetTilt = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

function shuffleIndices(length: number) {
  const indices = Array.from({ length }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices;
}

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Bottom gradient to prevent white space */}
      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none z-20" />
      <AnimatedBackground />
      <Navigation />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="min-h-screen flex items-center justify-center relative px-4 pt-20 pb-12"
      >
        <div className="max-w-6xl w-full relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-1 max-w-2xl text-center lg:text-left"
            >
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.6, ease: "easeOut" }}
                className="text-lg md:text-xl tracking-[0.35em] uppercase text-[#b29bff] mb-4"
              >
                Hey there, I'm
              </motion.p>
              <h1 className="text-8xl md:text-9xl font-black mb-8 leading-none">
                <span className="block animated-gradient-text">
                  ARYAN
                </span>
                <motion.span
                  className="block text-white"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  SINGHAL
                </motion.span>
              </h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="space-y-6 mb-12"
              >
                <p className="text-3xl font-bold text-gray-300">
                  AI/ML Engineer | Full Stack Developer
                </p>
                <p className="text-xl text-gray-400 leading-relaxed max-w-2xl">
                  I'm 18, studying Artificial Intelligence @ Purdue University.<br />Currently building{" "}
                  <a
                    href="https://www.gpunity.dev/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-violet-300 underline decoration-dotted underline-offset-4 transition-colors hover:text-violet-100"
                  >
                    GPUnity
                  </a>
                  .
                </p>
                {/* <p className="text-lg text-violet-400 font-semibold">
                  Learn more about me
                </p> */}
                <div className="font-mono text-xl flex items-center gap-2 justify-center lg:justify-start">
                  <span className="text-purple-400/70">▹</span>
                  <span className="bg-gradient-to-r from-[#4c1d95] via-[#6d28d9] to-[#a855f7] bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(122,45,197,0.4)]">
                    {TYPEWRITER_PREFIX}
                    {displayText}
                    <motion.span
                      animate={{ opacity: [0.25, 1, 0.25] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="text-[#c084fc] inline-block"
                    >
                      |
                    </motion.span>
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-2 justify-center lg:justify-start"
              >
                <motion.div
                  whileHover={{
                    y: -6,
                    scale: 1.03,
                    boxShadow: "0 25px 55px rgba(58, 16, 94, 0.6)",
                  }}
                  whileTap={{ scale: 0.97, y: -2 }}
                  transition={{ type: "spring", stiffness: 280, damping: 18 }}
                  className="rounded-2xl"
                >
                  <Button
                    size="lg"
                    className="group relative overflow-hidden rounded-2xl border border-violet-500/30 bg-gradient-to-br from-[#11061b] via-[#1e0f2c] to-[#331149] px-8 py-6 text-lg font-semibold tracking-wide text-violet-100 shadow-[0_20px_50px_rgba(6,2,14,0.85)]"
                    asChild
                  >
                    <Link to="/now" className="relative flex items-center gap-3 overflow-hidden">
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-600 group-hover:opacity-40" />
                      <span className="absolute inset-y-0 left-0 w-1/2 translate-x-[-100%] bg-gradient-to-r from-transparent via-[#a855f7]/30 to-transparent opacity-0 transition-all duration-600 group-hover:translate-x-[180%] group-hover:opacity-70" />
                      <span className="relative z-10">What I'm Doing Now</span>
                      <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="relative z-10 text-violet-200"
                      >
                        <ArrowRight className="h-5 w-5" />
                      </motion.span>
                    </Link>
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{
                    y: -6,
                    scale: 1.03,
                    boxShadow: "0 25px 55px rgba(124, 58, 237, 0.3)",
                  }}
                  whileTap={{ scale: 0.97, y: -2 }}
                  transition={{ type: "spring", stiffness: 280, damping: 18 }}
                  className="rounded-2xl w-full sm:w-fit"
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="group relative overflow-hidden rounded-2xl border border-violet-500/50 bg-black/30 px-8 py-6 text-lg font-semibold text-violet-100 transition-colors"
                    asChild
                  >
                    <Link to="/projects" className="relative flex items-center gap-3">
                      <span className="absolute inset-0 bg-gradient-to-r from-violet-600/10 via-fuchsia-600/10 to-violet-600/10 opacity-0 transition-all duration-500 group-hover:opacity-100" />
                      <span className="absolute inset-0 translate-y-full bg-gradient-to-t from-violet-700/30 to-transparent opacity-50 transition duration-500 group-hover:translate-y-0" />
                      <span className="relative z-10">See What I've Built</span>
                      <span className="relative z-10">
                        <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </Link>
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{
                    y: -6,
                    scale: 1.03,
                    boxShadow: "0 25px 55px rgba(16, 185, 129, 0.35)",
                  }}
                  whileTap={{ scale: 0.97, y: -2 }}
                  transition={{ type: "spring", stiffness: 280, damping: 18 }}
                  className="rounded-2xl w-full flex justify-center sm:col-span-2 sm:w-fit sm:justify-self-center"
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="group relative overflow-hidden rounded-2xl border border-emerald-500/60 px-8 py-6 text-lg font-semibold text-emerald-300 transition"
                    asChild
                  >
                    <Link to="/contact" className="relative flex items-center gap-3">
                      <span className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/10 opacity-0 transition duration-500 group-hover:opacity-100" />
                      <span className="absolute inset-0 blur-2xl opacity-0 group-hover:opacity-40 group-hover:bg-emerald-500/30 transition duration-500" />
                      <span className="relative z-10">Get In Touch</span>
                      <span className="relative z-10">
                        <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>

            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="flex-1 w-full flex justify-center lg:justify-end"
            >
              <div className="w-full max-w-[360px]">
                <div
                  className="w-full"
                  onMouseMove={handleTilt}
                  onMouseLeave={resetTilt}
                  style={{ perspective: "1200px" }}
                >
                  <motion.div
                    style={{
                      rotateX: tiltXSpring,
                      rotateY: tiltYSpring,
                      transformStyle: "preserve-3d",
                      backgroundSize: "200% 200%",
                    }}
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                      backgroundPosition: {
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                      type: "spring",
                      stiffness: 200,
                      damping: 16,
                    }}
                    whileHover={{ scale: 1.02 }}
                    className="rounded-[32px] bg-gradient-to-br from-violet-500/60 via-fuchsia-400/50 to-emerald-300/40 p-[2px] shadow-[0_32px_70px_rgba(72,26,128,0.45)]"
                  >
                    <div className="rounded-[30px] bg-black/80 p-2">
                      <div className="relative aspect-square overflow-hidden rounded-[26px]">
                        <img
                          src="/me_cropped.png"
                          alt="Aryan Singhal"
                          className="h-full w-full object-cover"
                          decoding="async"
                          fetchPriority="high"
                          style={{ transform: "translateZ(36px)" }}
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10 opacity-70" />
                      </div>
                    </div>
                  </motion.div>
                </div>
                <p className="mt-3 text-center text-sm text-gray-400">
                  Me at Kauai, Hawaii this past winter break!
                </p>
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.15 }}
                  className="mt-6 flex flex-col gap-4 items-center"
                >
                  <div className="flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-zinc-500">
                    <span className="h-px w-10 bg-zinc-700/70" />
                    Find me on
                    <span className="h-px w-10 bg-zinc-700/70" />
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    {socialLinks.map((link, index) => (
                      <motion.a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={link.label}
                        whileHover={{
                          y: -6,
                          scale: 1.14,
                          boxShadow: "0 18px 35px rgba(10, 10, 20, 0.55)",
                        }}
                        whileTap={{ scale: 0.96, y: -2 }}
                        transition={{ type: "spring", stiffness: 320, damping: 16, delay: index * 0.03 }}
                        className={`group relative inline-flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur ${link.className}`}
                      >
                        <span className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        <span className="absolute inset-0 rounded-full bg-white/10 opacity-0 blur-md transition duration-300 group-hover:opacity-70" />
                        <span className="relative z-10 transition-transform duration-300 group-hover:scale-110">
                          <link.icon className="h-5 w-5" />
                        </span>
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
