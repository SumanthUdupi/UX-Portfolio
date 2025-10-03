import React from "react";
import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll } from "@react-three/drei";
import Experience from "./components/Experience";
import projects from "./projects"; // Import projects data

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
        {/* Update the number of pages based on the project count */}
        <ScrollControls pages={projects.length * 2} damping={0.1}>
          <Scroll>
            <Experience />
          </Scroll>
          <Scroll html style={{ width: "100%" }}>
            {/* Intro Section */}
            <div
              style={{
                position: "absolute",
                top: "50vh",
                left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
                color: "white",
              }}
            >
              <h1 className="text-4xl md:text-6xl font-bold">Sumanth Udupi</h1>
              <p className="text-lg md:text-2xl mt-4">
                UX/UI Designer & Developer
              </p>
            </div>
            {/* Projects Section */}
            <div
              style={{
                position: "absolute",
                top: "200vh", // Adjusted for better spacing
                left: "50%",
                transform: "translateX(-50%)",
                textAlign: "center",
                color: "white",
              }}
            >
              <h2 className="text-4xl md:text-6xl font-bold">My Projects</h2>
            </div>
            {/* Contact Section */}
            <div
              style={{
                position: "absolute",
                top: "400vh", // Adjusted for better spacing
                left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
                color: "white",
              }}
            >
              <h2 className="text-4xl md:text-6xl font-bold">Contact Me</h2>
              <a
                href="mailto:sumanthudupi@example.com"
                className="text-lg md:text-2xl mt-4 text-blue-400 hover:underline"
              >
                sumanthudupi@example.com
              </a>
            </div>
          </Scroll>
        </ScrollControls>
      </Canvas>
    </>
  );
};

export default App;