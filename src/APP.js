import React from "react";
import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll } from "@react-three/drei";
import Experience from "./components/Experience";

const App = () => {
  return (
    <>
      <Canvas
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          background: "#1a1a1a",
        }}
        camera={{
          position: [0, 0, 5],
          fov: 30,
        }}
      >
        <ScrollControls pages={3} damping={0.3}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Scroll>
            <Experience />
          </Scroll>
          <Scroll html>
            <div className="relative w-full">
              <div className="absolute top-0 left-0 w-full h-screen flex flex-col justify-center items-center text-white text-center">
                <h1 className="text-4xl md:text-6xl font-bold">Sumanth Udupi</h1>
                <p className="text-lg md:text-2xl mt-4">UX/UI Designer & Developer</p>
              </div>
              <div className="absolute top-[100vh] left-0 w-full flex justify-center items-center">
                <h2 className="text-4xl md:text-6xl font-bold text-white">My Projects</h2>
              </div>
              <div className="absolute top-[200vh] left-0 w-full h-screen flex flex-col justify-center items-center text-white text-center">
                <h2 className="text-4xl md:text-6xl font-bold">Contact Me</h2>
                <a href="mailto:sumanthudupi@example.com" className="text-lg md:text-2xl mt-4 text-blue-400 hover:underline">
                  sumanthudupi@example.com
                </a>
              </div>
            </div>
          </Scroll>
        </ScrollControls>
      </Canvas>
    </>
  );
};

export default App;