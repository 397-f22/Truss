import { Link } from "react-router-dom";
import "./Project.css";
import { useDbUpdate } from "../utilities/firebase";


const Project = ({ project, setProjectID }) => {

  const onClick = () => setProjectID(project.project_id);

  return (
    <div className="project-container">
      <Link to={`/${project.project_id}`}>
        <div onClick={onClick} className="project-name">{project.name}</div>
      </Link>  
    </div>
  );
};

export default Project;
