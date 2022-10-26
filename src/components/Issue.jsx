import "./Issue.css";

const types = ["backlog", "todo", "done"];
const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const Issue = ({ issue, selectedType }) => (
  <div className="issue-container">
    <div className="issue-number">Issue #{issue.issue_id}</div>
    <div className="issue-contents">{issue.contents}</div>
    <div className="move-issue-text">Move Issue To:</div>
    <div className="issue-buttons-container">
      {
        types.map((type, id) => (
          (type !== selectedType)
          ? <div key={id} className={`issue-button issue-button-${type}`}>{capitalize(type)}</div>
          : null
        ))
      }
    </div>
  </div>
);

export default Issue;
