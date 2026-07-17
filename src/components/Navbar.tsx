"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Magnetic from "./ui/Magnetic";

const navItems = [
  { name: "Home", href: "/#hero" },
  { name: "About", href: "/#about" },
  { name: "Skills", href: "/#skills" },
  { name: "Projects", href: "/#projects" },
  { name: "Timeline", href: "/#timeline" },
  { name: "Blog", href: "/blog" },
];

export default function Navbar() {
  const [activeTab, setActiveTab] = useState("Home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 150, damping: 25, restDelta: 0.001 });
  const pathname = usePathname();

  useEffect(() => {
    let lastScrollY = 0;
    
    return scrollY.onChange((latest) => {
      // Hide on scroll down, show on scroll up
      if (latest > lastScrollY && latest > 120) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY = latest;

      // Update active nav based on section scroll
      if (pathname === "/") {
        const sections = ["hero", "about", "skills", "projects", "timeline"];
        for (const sectionId of sections) {
          const el = document.getElementById(sectionId);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 200 && rect.bottom >= 200) {
              const matchedItem = navItems.find(item => item.href === `/#${sectionId}`);
              if (matchedItem) setActiveTab(matchedItem.name);
              break;
            }
          }
        }
      }
    });
  }, [scrollY, pathname]);

  // Handle section clicking smoothly
  const handleNavClick = (name: string, href: string) => {
    setActiveTab(name);
    setIsMobileMenuOpen(false);

    if (href.startsWith("/#") && pathname === "/") {
      const sectionId = href.replace("/#", "");
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-electricBlue via-royalPurple to-softCyan origin-left z-[9999]"
        style={{ scaleX }}
      />
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: -100 },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-[40] w-[90%] max-w-5xl"
      >
        <nav className="w-full glass-nav rounded-full px-6 py-3 flex items-center justify-between border border-white/5 shadow-premium">
          {/* Logo Brand */}
          <Link href="/" className="flex items-center gap-2 group" onClick={() => handleNavClick("Home", "/#hero")}>
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-electricBlue to-royalPurple flex items-center justify-center font-display font-bold text-sm text-white shadow-glowBlue transition-transform duration-300 group-hover:scale-105">
              H
            </div>
            <span className="font-display font-medium text-sm tracking-widest text-white/90 group-hover:text-white transition-colors duration-200">
              HARSHIT
            </span>
          </Link>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const isPageActive = pathname === item.href || (item.href === "/#hero" && pathname === "/");
              const isTabActive = activeTab === item.name || isPageActive;
              
              return (
                <Magnetic key={item.name} range={40} strength={0.25}>
                  <Link
                    href={item.href}
                    onClick={() => handleNavClick(item.name, item.href)}
                    className="relative px-4 py-2 rounded-full text-xs font-display tracking-wider text-mutedText hover:text-white transition-colors duration-200"
                  >
                    {isTabActive && (
                      <motion.div
                        layoutId="active-nav-underline"
                        className="absolute inset-0 bg-white/5 border border-white/10 rounded-full z-[-1]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    {item.name}
                  </Link>
                </Magnetic>
              );
            })}
          </div>

          {/* Call to Action - Contact Button */}
          <div className="hidden md:block">
            <Magnetic range={50} strength={0.3}>
              <Link
                href="/#contact"
                onClick={() => handleNavClick("Contact", "/#contact")}
                className="group relative px-5 py-2 rounded-full overflow-hidden flex items-center gap-1.5 bg-white text-[#050505] font-display font-medium text-xs tracking-wider transition-all duration-300 hover:shadow-glowBlue"
              >
                <span>Hire Me</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </Magnetic>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white/80 hover:text-white transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[30] bg-[#050505]/95 backdrop-blur-xl flex flex-col justify-center px-8 md:hidden"
          >
            <div className="flex flex-col gap-6 text-center">
              {navItems.map((item, idx) => (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={item.name}
                >
                  <Link
                    href={item.href}
                    onClick={() => handleNavClick(item.name, item.href)}
                    className="font-display text-2xl font-light tracking-widest text-mutedText hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.05 }}
                className="mt-6"
              >
                <Link
                  href="/#contact"
                  onClick={() => handleNavClick("Contact", "/#contact")}
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-white text-[#050505] font-display font-medium text-sm tracking-widest"
                >
                  <span>Get In Touch</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.2em] uppercase text-mutedText"
              >
                Harshit &copy; 2026
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
