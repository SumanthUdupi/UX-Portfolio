import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ThemeToggle from "./ThemeToggle";

gsap.registerPlugin(ScrollTrigger);

const Header = () => {
  const headerRef = useRef(null);

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "+=150",
        scrub: 1,
      },
    });

    tl.to(headerRef.current, {
      backgroundColor: "rgba(26, 32, 44, 0.8)",
      backdropFilter: "blur(10px)",
      padding: "0.5rem 1rem",
      ease: "power3.out",
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 w-full z-50 py-4 px-4 bg-transparent text-white"
    >
      <nav className="container mx-auto flex justify-between items-center">
        <a href="#introduction" className="text-xl font-bold">
          My Portfolio
        </a>
        <div>
          <a href="#projects" className="mx-2">
            Projects
          </a>
          <a href="#about" className="mx-2">
            About
          </a>
          <a href="#contact" className="mx-2">
            Contact
          </a>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Header;
