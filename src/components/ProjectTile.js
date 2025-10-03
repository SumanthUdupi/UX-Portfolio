import React, { forwardRef } from "react";
import { Text } from "@react-three/drei";

const ProjectTile = forwardRef(({ project, position }, ref) => {
  const openProjectLink = () => {
    window.open(project.link, "_blank");
  };

  return (
    <group ref={ref} position={position} onClick={openProjectLink}>
      <mesh>
        <planeGeometry args={[4, 2]} />
        <meshStandardMaterial color={"#2a2a2a"} transparent />
      </mesh>
      <Text
        position={[0, 0.5, 0.1]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {project.title}
      </Text>
      <Text
        position={[0, -0.2, 0.1]}
        fontSize={0.15}
        color="white"
        anchorX="center"
        anchorY="middle"
        maxWidth={3.5}
        textAlign="center"
      >
        {project.description}
      </Text>
    </group>
  );
});

export default ProjectTile;