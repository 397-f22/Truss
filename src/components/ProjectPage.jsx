import "./ProjectPage.css";
import Issue from "./Issue";

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const ProjectPage = ({ selectedType, projects }) => {
  const filteredIssues = issues.filter(issue => issue.status === capitalize(selectedType));

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