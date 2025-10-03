import React, { useRef, useLayoutEffect } from "react";
import { useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import ProjectTile from "./ProjectTile";
import projects from "../projects";

const Experience = () => {
  const scroll = useScroll();
  const timeline = useRef();
  const { camera } = useThree();
  const projectRefs = useRef(projects.map(() => React.createRef()));

  useLayoutEffect(() => {
    timeline.current = gsap.timeline({ defaults: { duration: 1, ease: "power1.inOut" } });

    // Animate the camera
    timeline.current
      .to(camera.position, { y: -projects.length * 3 + 2, z: 5 }, 0)
      .to(camera.rotation, { y: -Math.PI / 4 }, 0);

    // Animate each project tile
    projectRefs.current.forEach((ref, index) => {
      const tile = ref.current;
      const start = index * 0.5;
      const end = start + 1;

      // Animate rotation
      timeline.current.to(
        tile.rotation,
        {
          y: Math.PI * 2,
        },
        start
      );

      // Animate fade-in and fade-out
      timeline.current.fromTo(
        tile.children[0].material,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 },
        start
      );
      timeline.current.to(
        tile.children[0].material,
        { opacity: 0, duration: 0.3 },
        end
      );
    });
  }, []);

  useFrame(() => {
    if (timeline.current) {
      timeline.current.seek(scroll.offset * timeline.current.duration());
    }
  });

  return (
    <group>
      {projects.map((project, index) => {
        const angle = index * 1.5;
        const radius = 4;
        const x = radius * Math.cos(angle);
        const z = radius * Math.sin(angle);
        const y = -index * 3;

        return (
          <ProjectTile
            key={index}
            project={project}
            position={[x, y, z]}
            ref={projectRefs.current[index]}
          />
        );
      })}
    </group>
  );
};

export default Experience;