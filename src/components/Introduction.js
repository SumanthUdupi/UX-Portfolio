import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const Introduction = () => {
  const intro = useRef();

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
        const split = new SplitType(".split-text", { types: "chars" });
        gsap.from(split.chars, {
          opacity: 0,
          y: 20,
          stagger: 0.05,
          scrollTrigger: {
            trigger: intro.current,
            start: "top center",
            end: "bottom center",
            scrub: true,
          },
        });

        gsap.to(intro.current, {
          backgroundPosition: "center 20%",
          ease: "none",
          scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, intro);
    return () => {
      ctx.revert();
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={intro}
      className="h-screen flex items-center justify-center text-center relative"
      style={{
        backgroundImage: "url('./images/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="z-10">
        <h1 className="text-4xl md:text-6xl font-bold split-text">
          Sumanth Udupi
        </h1>
        <p className="text-lg md:text-2xl mt-4">
          UX/UI Designer & Developer
        </p>
        <a
          href="mailto:sumanthudupi@example.com"
          className="text-lg md:text-2xl mt-4 text-blue-400 hover:underline"
        >
          sumanthudupi@example.com
        </a>
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-0"></div>
    </section>
  );
};

export default Introduction;
