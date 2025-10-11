import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Introduction from "./components/Introduction";
import ProjectShowcase from "./components/ProjectShowcase";
import AboutMe from "./components/AboutMe";
import Contact from "./components/Contact";
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
      mm.add("(min-width: 768px)", () => {
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
      <Introduction />
      <div className="project-showcase">
        <ProjectShowcase />
      </div>
      <div className="about-me">
        <AboutMe />
      </div>
      <div className="contact">
        <Contact />
      </div>
    </div>
  );
};

export default App;
