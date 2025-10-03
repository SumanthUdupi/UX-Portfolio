import React, { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Text, Trail } from "@react-three/drei";

const ProjectTile = ({ project, position }) => {
  const ref = useRef();
  const { camera } = useThree();

  useFrame(() => {
    if (ref.current) {
      // Make the tile always face the camera
      ref.current.lookAt(camera.position);
    }
  });

  const openProjectLink = () => {
    window.open(project.link, "_blank");
  };

  return (
    <group position={position} ref={ref}>
      <Trail
        width={1.5}
        length={4}
        color={"#F8D628"}
        attenuation={(t) => t * t}
      >
        <group onClick={openProjectLink}>
          <mesh castShadow receiveShadow>
            <planeGeometry args={[4, 2]} />
            <meshStandardMaterial color={"#3a3a3a"} transparent opacity={0.9} />
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
      </Trail>
    </group>
  );
};

export default ProjectTile;