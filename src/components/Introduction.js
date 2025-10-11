import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import MouseTrail from "./MouseTrail";

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
        const split = new SplitType(".split-text", { types: "words" });
        gsap.from(split.words, {
          opacity: 0,
          y: 20,
          stagger: 0.1,
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

        gsap.to(".scroll-down-arrow", {
          y: 10,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
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
      className="h-screen flex items-center justify-center text-center relative animated-gradient"
      style={{
        backgroundImage: "linear-gradient(to right, #1a202c, #2d3748, #4a5568)",
      }}
    >
      <MouseTrail />
      <div className="z-10">
        <h1 className="text-4xl md:text-6xl font-bold">
          Sumanth Udupi
        </h1>
        <p className="text-lg md:text-2xl mt-4 split-text">
          UX/UI Designer & Developer
        </p>
        <a
          href="mailto:sumanthudupi@example.com"
          className="text-lg md:text-2xl mt-4 text-blue-400 hover:underline"
        >
          sumanthudupi@example.com
        </a>
        <div className="flex justify-center mt-4">
          <a href="https://github.com/sumanthudupi" target="_blank" rel="noopener noreferrer" className="text-white mx-4 social-icon" aria-label="GitHub">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/sumanth-udupi/" target="_blank" rel="noopener noreferrer" className="text-white mx-4 social-icon" aria-label="LinkedIn">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16" fill="currentColor">
              <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.817 0-1.357.539-1.357 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
            </svg>
          </a>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <svg className="scroll-down-arrow" width="32" height="32" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M12 5l0 14" />
          <path d="M18 13l-6 6" />
          <path d="M6 13l6 6" />
        </svg>
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-0"></div>
    </section>
  );
};

export default Introduction;
