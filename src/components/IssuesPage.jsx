import "./IssuesPage.css";
import Issue from "./Issue";
import { Navigate, useParams } from "react-router-dom";

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const IssuesPage = ({ selectedType, issues }) => {
  const { project_id } = useParams();

  const filteredIssues = issues.filter(issue => issue.status === capitalize(selectedType) && issue.project_id === parseInt(project_id));

  return (
    <div>
      <div className="issues-list-container">
        {filteredIssues.map((issue, id) => (
          <Issue key={id} issue={issue} selectedType={selectedType} />
        ))}
      </div>
    </div>
  );
};

export default IssuesPage;
