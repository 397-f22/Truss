import "./ProjectPage.css";
import Project from "./Project";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const ProjectPage = ({ projects, projectIDs, setProjectID, currentUser }) => {
  useEffect(() => {
    setProjectID(0)
  }, []);

  return (
    <div>
      <div className="projects-list-container">
        {projects.map((project, id) => (
          <Project
            key={id}
            projectIDs={projectIDs}
            active={projectIDs.includes(project.project_id)}
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
