import "./ProjectPage.css";
import Project from "./Project";
import { useState, useEffect } from "react";
import ProjectModal from "./ProjectModal";
import ProjectCreator from "./ProjectCreator";
import { useFormData } from "../utilities/useformdata";

const ProjectPage = ({ projects, projectIDs, setProjectIDs, setProjectID, currentUser }) => {
  useEffect(() => {
    setProjectID(0)
  }, []);

  const [openProject, setOpenProject] = useState(false);
  const openModalProject = () => setOpenProject(true);
  const closeModalProject = () => setOpenProject(false);
  const [state, change] = useFormData();

  return (
    <div>
      <ProjectModal open={openProject} close={closeModalProject}>
        <ProjectCreator
          change={change}
          closeModal={closeModalProject}
          projectIDs={projectIDs}
          projectID={projects.length + 1001}
          currentUser={currentUser}
        />
      </ProjectModal>
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

      {currentUser &&
      <>
        <button className="btn btn-outline-dark" onClick={openModalProject}>+</button>
      </>
      }

    </div>
  );
};

export default ProjectPage;
