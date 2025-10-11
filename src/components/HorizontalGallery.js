import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import projects from "../projects";

gsap.registerPlugin(ScrollTrigger);

const HorizontalGallery = () => {
  const component = useRef();
  const slider = useRef();

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    let ctx = gsap.context(() => {
      mm.add("(min-width: 768px)", () => {
        let panels = gsap.utils.toArray(".panel");
        gsap.to(panels, {
          xPercent: -100 * (panels.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: slider.current,
            pin: true,
            scrub: 1,
            snap: 1 / (panels.length - 1),
            end: () => "+=" + slider.current.offsetWidth,
          },
        });
      });
    }, component);
    return () => {
      ctx.revert();
      mm.revert();
    };
  });

  return (
    <div className="App" ref={component}>
      <div ref={slider} className="container-gallery">
        {projects.map((project, index) => (
          <div className="panel" key={index}>
            <img
              src={project.image}
              alt={project.title}
              className="rounded-lg shadow-lg"
            />
            <div className="panel-info">
              <h3 className="text-3xl font-bold mb-4">{project.title}</h3>
              <p className="text-lg mb-4">{project.description}</p>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                View Project
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalGallery;
