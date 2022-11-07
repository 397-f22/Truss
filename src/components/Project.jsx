import { Link } from "react-router-dom";
import "./Project.css";


const Project = ({ active, project, setProjectID }) => {

  const onClick = () => setProjectID(project.project_id);

  return (
    <div className={`project-container ${active ? '' : 'project-container-inactive'}`}>
      <Link to={`/${project.project_id}`}>
        <div onClick={onClick} className="project-name">{project.name}</div>
      </Link>
    </div>
  );
};

export default Project;
