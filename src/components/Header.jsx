import { Link } from "react-router-dom";
import { useState } from "react";
import "./Header.css";
import IssueModal from "./IssueModal";
import IssueCreator from "./IssueCreator";
import { useFormData } from "../utilities/useformdata";

const types = ["backlog", "todo", "done"]
const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const Header = ({
  selectedType,
  setSelectedType,
  issues,
  projects,
  projectID,
  setProjectID
}) => {
  const [open, setOpen] = useState(false);
  const [state, change] = useFormData();

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  const onClick = () => setProjectID(0);
  const issueCount = issues.length;

  return (
    <>
      <IssueModal open={open} close={closeModal}>
        <IssueCreator change={change} closeModal={closeModal} issueID={issueCount + 1} />
      </IssueModal>
      <div className="header">
        <Link className="app-title-link" to="/">
          <div
            onClick={onClick}
            className="app-title">{projectID ? `Truss: ${projects.filter(project => project.project_id === projectID)[0].name}` : "Truss"}
          </div>
        </Link>
        {!projectID ? <></> :
          <>
            <div className="issues-type-container">
              {types.map((type, id) => (
                <Link className={`issues-type ${(type === selectedType) ? "issues-type-active" : ""}`} to={`/${projectID}`} key={id}>
                  <div
                    id={type}
                    onClick={(e) => {
                      if (type !== selectedType) {
                        setSelectedType(e.target.id);
                      };
                    }}
                  >
                    {capitalize(type)}
                  </div>
                </Link>
              ))}
            </div>
            <button className="btn btn-outline-dark" onClick={openModal}>Add Issue</button>
          </>
        }
      </div>
    </>
  );
};

export default Header;
