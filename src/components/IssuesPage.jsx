import "./IssuesPage.css";
import Issue from "./Issue";
import { Navigate, useParams } from "react-router-dom";

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const IssuesPage = ({ projectIDs, selectedType, issues }) => {
  const { project_id } = useParams();

  console.log(projectIDs)
  console.log(project_id)

  if (!projectIDs.includes(parseInt(project_id))) {
    return <Navigate to="/" />;
  };

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
