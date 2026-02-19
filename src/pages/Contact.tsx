import { motion } from "framer-motion";
import { Mail, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Navigation } from "@/components/Navigation";

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

export default function Contact() {
  const socialLinks = [
    {
      label: "GitHub",
      href: "https://github.com/3x-dev",
      icon: Github,
      className: "border-violet-600/50 bg-violet-600/10 text-violet-300 hover:bg-violet-600/30 hover:border-violet-400 hover:text-violet-200",
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/aryan-singhal-ai",
      icon: Linkedin,
      className: "border-blue-600/50 bg-blue-600/10 text-blue-300 hover:bg-blue-600/30 hover:border-blue-400 hover:text-blue-200",
    },
    {
      label: "X/Twitter",
      href: "https://twitter.com/ai_singhal",
      icon: XLogo,
      className: "border-zinc-500/60 bg-zinc-900/60 text-zinc-200 hover:bg-zinc-800/80 hover:border-zinc-300 hover:text-white",
    },
    {
      label: "Google Scholar",
      href: "https://scholar.google.com/citations?user=QJn7KLkAAAAJ&hl=en",
      icon: () => (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.838 3.94A8 8 0 0 1 12 9a8 8 0 0 1 7.162 4.44L24 9.5z" />
        </svg>
      ),
      className: "border-emerald-600/50 bg-emerald-600/10 text-emerald-300 hover:bg-emerald-600/30 hover:border-emerald-400 hover:text-emerald-200",
    },
    {
      label: "Letterboxd",
      href: "https://letterboxd.com/aisinghal/",
      icon: LetterboxdLogo,
      className: "border-orange-600/50 bg-orange-600/10 text-orange-200 hover:bg-orange-600/30 hover:border-orange-300 hover:text-orange-100",
    },
  ];

  const hoverMotion = {
    whileHover: { y: -6, scale: 1.03 },
    whileTap: { scale: 0.97 },
    transition: { type: "spring", stiffness: 220, damping: 16 },
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <AnimatedBackground />
      <Navigation />

      <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="mb-16 text-center">
            <h1 className="text-6xl md:text-7xl font-black mb-6">
              <span className="animated-gradient-text">
                CONTACT
              </span>
            </h1>
            <p className="text-2xl text-gray-400">
              Let's build something together.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm max-w-4xl mx-auto">
              <CardContent className="p-8 sm:p-12">
                <div className="flex flex-col items-center text-center gap-10">
                  <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                    Got an idea? A problem to solve? Or just want to chat?
                    <br />
                    Drop me a line!
                  </p>

                  <div className="w-full flex flex-col gap-6 items-center">
                    <motion.div className="w-full flex justify-center" {...hoverMotion}>
                      <Button
                        size="lg"
                        className="relative w-full max-w-xl overflow-hidden group bg-violet-600 hover:bg-violet-700 text-white font-bold text-lg py-6 justify-center rounded-2xl border border-violet-400/40 shadow-[0_15px_40px_rgba(124,58,237,0.35)]"
                        asChild
                      >
                        <a
                          href="https://mail.google.com/mail/?view=cm&fs=1&to=aryan.singhal2016@gmail.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2"
                        >
                          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 -translate-x-full group-hover:translate-x-full group-hover:opacity-100 transition duration-700" />
                          <span className="relative z-10 flex items-center gap-2">
                            <motion.span
                              className="inline-flex"
                              animate={{ y: [0, -1.5, 0] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <Mail className="h-5 w-5" />
                            </motion.span>
                            aryan.singhal2016@gmail.com
                          </span>
                        </a>
                      </Button>
                    </motion.div>

                    <div className="w-full max-w-sm mx-auto">
                    <div className="flex items-center gap-4 text-[0.7rem] uppercase tracking-[0.25em] text-zinc-500">
                      <span className="h-px flex-1 bg-zinc-700" />
                      <span>Or find me on</span>
                      <span className="h-px flex-1 bg-zinc-700" />
                    </div>
                  </div>


                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl mx-auto justify-items-center">
                      {socialLinks.map((link, index) => (
                        <motion.div
                          key={link.label}
                          className={`w-full flex justify-center ${
                            link.label === "Letterboxd" ? "sm:col-span-2 sm:max-w-[calc(50%-0.5rem)]" : ""
                          }`}
                          {...hoverMotion}
                          transition={{ ...hoverMotion.transition, delay: index * 0.03 }}
                        >
                          <Button
                            variant="outline"
                            className={`relative w-full justify-center overflow-hidden group py-6 text-base font-medium transition-all ${link.className}`}
                            asChild
                          >
                            <a
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center gap-2"
                            >
                              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 -translate-x-full group-hover:translate-x-full group-hover:opacity-100 transition duration-700" />
                              <span className="relative z-10 flex items-center gap-2">
                                <motion.span
                                  className="inline-flex"
                                  animate={{ x: [0, 2, 0] }}
                                  transition={{ duration: 2.4, repeat: Infinity, delay: index * 0.2 }}
                                >
                                  <link.icon className="h-5 w-5" />
                                </motion.span>
                                {link.label}
                              </span>
                            </a>
                          </Button>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="text-center pt-8 border-t border-zinc-800 w-full">
                    <p className="text-gray-500 text-sm">
                      Response time: Usually within 24-48 hours
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
