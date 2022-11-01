import "./ProjectPage.css";
import Project from "./Project";

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const ProjectPage = ({ projects, projectIDs, setProjectID }) => {
  const filteredProjects = Object.values(projects).filter(project => projectIDs.includes(project.project_id));

  return (
    <div>
      <div className="projects-list-container">
        {filteredProjects.map((project, id) => (
          <Project key={id} project={project} setProjectID={setProjectID}/>
        ))}
      </div>
    </div>
  );
};

export default ProjectPage;