import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Introduction from "./components/Introduction";
import ProjectShowcase from "./components/ProjectShowcase";
import AboutMe from "./components/AboutMe";
import Contact from "./components/Contact";
import Header from "./components/Header";
import SectionDivider from "./components/SectionDivider";
import "./index.css";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const main = useRef();

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      // Animate sections on scroll
      const sections = [".project-showcase", ".about-me", ".contact"];
      sections.forEach((section) => {
        gsap.from(section, {
          y: 50,
          opacity: 0,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      });

      mm.add("(min-width: 768px)", () => {
        // Background color transitions
        ScrollTrigger.create({
          trigger: ".project-showcase",
          start: "top center",
          end: "bottom center",
          onEnter: () =>
            gsap.to(main.current, {
              backgroundColor: "#2d3748",
              duration: 1.0,
            }),
          onLeaveBack: () =>
            gsap.to(main.current, {
              backgroundColor: "#1a202c",
              duration: 1.0,
            }),
        });
        ScrollTrigger.create({
          trigger: ".about-me",
          start: "top center",
          end: "bottom center",
          onEnter: () =>
            gsap.to(main.current, {
              backgroundColor: "#4a5568",
              duration: 1.0,
            }),
          onLeaveBack: () =>
            gsap.to(main.current, {
              backgroundColor: "#2d3748",
              duration: 1.0,
            }),
        });
        ScrollTrigger.create({
          trigger: ".contact",
          start: "top center",
          end: "bottom center",
          onEnter: () =>
            gsap.to(main.current, {
              backgroundColor: "#1a202c",
              duration: 1.0,
            }),
          onLeaveBack: () =>
            gsap.to(main.current, {
              backgroundColor: "#4a5568",
              duration: 1.0,
            }),
        });
      });
    }, main);
    return () => {
      ctx.revert();
      mm.revert();
    };
  }, []);

  return (
    <div ref={main} className="bg-gray-900 text-white">
      <Header />
      <Introduction />
      <div className="project-showcase">
        <ProjectShowcase />
      </div>
      <SectionDivider />
      <div className="about-me">
        <AboutMe />
      </div>
      <SectionDivider />
      <div className="contact">
        <Contact />
      </div>
    </div>
  );
};

export default App;
