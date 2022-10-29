import "./IssuesPage.css";
import Issue from "./Issue";
import IssueModal from "./IssueModal";
import IssueCreator from "./IssueCreator";
import { useFormData } from "../utilities/useformdata";
import { useState } from "react";
const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const IssuesPage = ({ selectedType, issues }) => {
  const filteredIssues = issues.filter(issue => issue.status === capitalize(selectedType));
  const [open, setOpen] = useState(false)
  const [state, change] = useFormData();

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false)
  return (
    <div>
      <div className="issues-list-container">
        {filteredIssues.map((issue, id) => (
          <Issue key={id} issue={issue} selectedType={selectedType} />
        ))}
      </div>
      <button className='btn btn-outline-dark' onClick={openModal}>Add</button>
      <IssueModal open={open} close={closeModal}>
        <IssueCreator change={change} closeModal={closeModal} />
      </IssueModal>
    </div>
  );
};

export default IssuesPage;
