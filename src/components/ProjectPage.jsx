import "./ProjectPage.css";
import Project from "./Project";
import { useEffect } from "react";

const ProjectPage = ({ projects, projectIDs, setProjectIDs, setProjectID, currentUser }) => {
  useEffect(() => {
    setProjectID(0)
  }, []);

  return (
    <div>
      <div className="projects-list-container">
        {projects.map((project, id) => (
          <Project
            key={id}
            active={projectIDs.includes(parseInt(project.project_id))}
            projectIDs={projectIDs}
            setProjectIDs={setProjectIDs}
            project={project}
            setProjectID={setProjectID}
            currentUser={currentUser}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectPage;
