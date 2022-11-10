import { Link } from "react-router-dom";
import { useDbUpdate } from "../utilities/firebase";
import "./Project.css";

const Project = ({ active, projectIDs, setProjectIDs, project, setProjectID, currentUser }) => {
  const onClick = () => setProjectID(project.project_id);

  const uid = currentUser ? currentUser.uid : "guest";
  const [update, result] = useDbUpdate(`users/${uid}`);
  // console.log(users[currentUser.uid])

  const promptForCode = () => {
    if (!currentUser) {
      alert("Please login first");
      return;
    }

    const codeEntered = prompt("Enter project code");

    if (parseInt(codeEntered) === project.project_id) {
      update({
        project_ids: [...projectIDs, project.project_id]
      });

      setProjectIDs([...projectIDs, project.project_id]);
    } else {
      alert("Incorrect project code");
    };
  };

  const leaveProject = () => {
    if (!currentUser) {
      alert("Please login first");
      return;
    }

    update({
      project_ids: projectIDs.filter(id => id !== project.project_id)
    });

    setProjectIDs(projectIDs.filter(id => id !== project.project_id));
  };

  return (
    <div className={`project-container ${active ? '' : 'project-container-inactive'}`}>
      {
        active
          ? <div className="button leave-button" onClick={leaveProject}>Leave</div>
          : <div className="button join-button" onClick={promptForCode}>Join</div>
      }
      {uid !== "guest" && active
        ? <Link to={`/${project.project_id}`}>
          <div onClick={onClick} className="project-name">{project.name}</div>
        </Link>
        : <div className="project-name">{project.name}</div>
      }

      <div className="project-description">{project.description}</div>
    </div>
  );
};

export default Project;
