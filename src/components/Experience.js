import React from "react";
import ProjectTile from "./ProjectTile";
import projects from "../projects";

const Experience = () => {
  const numColumns = 3;
  const spacing = 5;
  const numRows = Math.ceil(projects.length / numColumns);

  return (
    <group>
      {projects.map((project, index) => {
        const col = index % numColumns;
        const row = Math.floor(index / numColumns);

        const x = (col - (numColumns - 1) / 2) * spacing;
        const y = (row - (numRows - 1) / 2) * -spacing;
        const z = 0;

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