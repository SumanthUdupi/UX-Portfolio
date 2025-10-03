import React, { useRef } from "react";
import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import ProjectTile from "./ProjectTile";
import projects from "../projects";

const Experience = () => {
  const scroll = useScroll();
  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = -scroll.offset * Math.PI * 2;
    }
  });

  return (
    <group ref={groupRef} name="rotating-group">
      {projects.map((project, index) => {
        const angle = (index / projects.length) * Math.PI * 2;
        const radius = 5;
        const x = radius * Math.sin(angle);
        const z = radius * Math.cos(angle);
        const y = -index * 2.5;

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