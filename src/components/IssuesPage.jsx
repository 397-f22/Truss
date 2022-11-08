import "./IssuesPage.css";
import Issue from "./Issue";
import { useState, } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useFormData } from "../utilities/useformdata";
import IssueModal from "./IssueModal";
import IssueCreator from "./IssueCreator";

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const IssuesPage = ({ selectedType,setSelectedType, issues }) => {
  const { project_id } = useParams();

  const filteredIssues = issues.filter(issue => issue.status === capitalize(selectedType) && issue.project_id === parseInt(project_id));
  const issueCount = issues.length;
  const issueNumber = issues.filter(issue => issue.project_id === parseInt(project_id)).length;

  const [open, setOpen] = useState(false);
  const [state, change] = useFormData();
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  const openArchive = () => setSelectedType('Archived')

  return (
    <div>
      <IssueModal open={open} close={closeModal}>
        <IssueCreator change={change} closeModal={closeModal} issueID={issueCount + 1} issueNumber={issueNumber + 1} projectID={parseInt(project_id)} />
      </IssueModal>
      <div className="issues-list-container">
        {filteredIssues.map((issue, id) => (
          <Issue key={id} issue={issue} selectedType={selectedType} />
        ))}
      </div>
      <button className="btn btn-outline-dark" onClick={openModal}>Add Issue</button>
      <button className="btn btn-outline-dark" onClick={openArchive}>Archive</button>

    </div>
  );
};

export default IssuesPage;
