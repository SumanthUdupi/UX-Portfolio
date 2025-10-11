import React from "react";
import { Canvas } from "@react-three/fiber";
import Experience from "./components/Experience";

const App = () => {
  return (
    <>
      <Canvas
        shadows
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
        }}
        camera={{
          position: [0, 0, 10],
          fov: 60,
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight
          castShadow
          position={[10, 20, 30]}
          intensity={1.5}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <Experience />
      </Canvas>
      <div
        style={{
          position: "absolute",
          top: "10vh",
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
          color: "white",
          width: "100%",
        }}
      >
        <h1 className="text-4xl md:text-6xl font-bold">Sumanth Udupi</h1>
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
    </>
  );
};

export default App;