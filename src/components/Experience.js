import React, { useRef, useLayoutEffect } from "react";
import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import ProjectTile from "./ProjectTile";
import projects from "../projects";

const Experience = () => {
  const scroll = useScroll();
  const groupRef = useRef();
  const timeline = useRef();

  useLayoutEffect(() => {
    timeline.current = gsap.timeline({ paused: true });

    // Animate the rotation of the entire group
    timeline.current.to(
      groupRef.current.rotation,
      {
        duration: 1,
        y: -Math.PI * 2, // A full 360-degree rotation
        ease: "power1.inOut",
      },
      0 // Start at the beginning of the timeline
    );
  }, []);

  useFrame(() => {
    if (timeline.current) {
      timeline.current.seek(scroll.offset * timeline.current.duration());
    }
  });

  return (
    <group ref={groupRef} name="rotating-group">
      {projects.map((project, index) => {
        const angle = (index / projects.length) * Math.PI * 2;
        // A more dramatic spiral with greater vertical separation
        const radius = 6;
        const y = -index * 6;
        const x = radius * Math.sin(angle);
        const z = radius * Math.cos(angle);

        return (
          <ProjectTile
            key={index}
            project={project}
            position={[x, y, z]}
          />
        );
      })}
    </group>
  );
};

export default Experience;