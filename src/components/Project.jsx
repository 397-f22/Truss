import { Link } from "react-router-dom";
import "./Project.css";
import { useDbUpdate } from "../utilities/firebase";


const Project = ({ project }) => {

  return (
    <div className="project-container">
      <Link to={`/projects/${project.project_id}`}>
        <div className="project-name">{project.name}</div>
      </Link>  
    </div>
  );
};

export default Project;
