import "./IssuesPage.css";
import Issue from "./Issue";

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const IssuesPage = ({ selectedType, issues }) => {
  const filteredIssues = issues.filter(issue => issue.status === capitalize(selectedType));

  return (
    <div className="issues-list-container">
      {filteredIssues.map((issue, id) => (
        <Issue key={id} issue={issue} selectedType={selectedType} />
      ))}
    </div>
  );
};

export default IssuesPage;
