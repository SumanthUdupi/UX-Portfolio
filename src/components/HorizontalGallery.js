import React, { useLayoutEffect, useRef, useEffect } from "react";
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

        panels.forEach((panel) => {
          const image = panel.querySelector("img");
          gsap.fromTo(
            image,
            {
              y: -50,
            },
            {
              y: 50,
              ease: "none",
              scrollTrigger: {
                trigger: slider.current,
                scrub: 1,
                end: () => "+=" + slider.current.offsetWidth,
              },
            }
          );
        });

        gsap.to(".progress-bar", {
          width: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: slider.current,
            scrub: 1,
            start: "top top",
            end: "bottom bottom",
          },
        });
      });
    }, component);
    return () => {
      ctx.revert();
      mm.revert();
    };
  }, []);

  useEffect(() => {
    const panels = gsap.utils.toArray(".panel");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    panels.forEach((panel) => {
      observer.observe(panel);
    });

    return () => {
      panels.forEach((panel) => {
        observer.unobserve(panel);
      });
    };
  }, []);

  return (
    <div className="App" ref={component}>
      <div className="progress-bar" />
      <div ref={slider} className="container-gallery">
        {projects.map((project, index) => (
          <div className="panel" key={index}>
            <img
              src={project.image}
              alt={project.title}
              className="rounded-lg shadow-lg"
            />
            <div className="panel-info">
              <lottie-player
                src={project.lottie}
                background="transparent"
                speed="1"
                style={{ width: '100px', height: '100px', margin: '0 auto' }}
                loop
                autoplay
              ></lottie-player>
              <h3 className="text-3xl font-bold mb-4">{project.title}</h3>
              <p className="text-lg mb-4">{project.description}</p>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="view-project-button"
              >
                <span className="button-text">View Project</span>
                <span className="arrow-icon">→</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalGallery;
