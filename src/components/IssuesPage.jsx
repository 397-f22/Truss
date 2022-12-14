import "./IssuesPage.css";
import Issue from "./Issue";
import { useState, } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useFormData } from "../utilities/useformdata";
import IssueModal from "./IssueModal";
import IssueCreator from "./IssueCreator";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArchive } from "@fortawesome/free-solid-svg-icons";

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const IssuesPage = ({ selectedType, setSelectedType, issues }) => {
  const { project_id } = useParams();

  const filteredIssues = issues.filter(issue => issue.status === capitalize(selectedType) && issue.project_id === parseInt(project_id));
  const filteredArchiveIssues = issues.filter(issue => issue.status === capitalize('Archived') && issue.project_id === parseInt(project_id));
  const issueCount = issues.length;
  const issueNumber = issues.filter(issue => issue.project_id === parseInt(project_id)).length;

  const [open, setOpen] = useState(false);
  const [openArchive, setArchiveOpen] = useState(false);
  const [state, change] = useFormData();
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  const openArchiveModal = () => setArchiveOpen(true)
  const closeArchiveModal = () => setArchiveOpen(false)

  return (
    <div className="issue-page">
      <div className="project-number-header">Project Code: {project_id}</div>
      <IssueModal title={'Create New Issue'} open={open} close={closeModal}>
        <IssueCreator change={change} closeModal={closeModal} issueID={issueCount + 1} issueNumber={issueNumber + 1} projectID={parseInt(project_id)} />
      </IssueModal>
      <IssueModal title={'Archived Issues'} open={openArchive} close={closeArchiveModal}>
        <div className="issues-modal-container">
          {filteredArchiveIssues.map((issue, id) => (
            <Issue key={id} issue={issue} selectedType={'Archived'} />
          ))}
        </div>
      </IssueModal>
      <div className="issues-list-container">
        {filteredIssues.map((issue, id) => (
          <Issue key={id} issue={issue} selectedType={selectedType} />
        ))}
      </div>
      <button className="btn btn-outline-dark add-issue" onClick={openModal}>+</button>
      <button className="btn btn-outline-dark archive-issue" onClick={openArchiveModal}>
        <FontAwesomeIcon icon={faArchive} />
      </button>

    </div>
  );
};

export default IssuesPage;
