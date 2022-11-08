import { Link } from "react-router-dom";
import "./Issue.css";
import ChatBubble from "./ChatBubble";
import { useDbUpdate } from "../utilities/firebase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArchive } from "@fortawesome/free-solid-svg-icons";
const types = ["backlog", "todo", "done", "archived"];
const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const Issue = ({ issue, selectedType }) => {
  const [update, result] = useDbUpdate(`/issues/${issue.issue_id}`);

  const onClick = (e) => {
    update({
      status: capitalize(e.target.innerHTML)
    });
  };
  const archive = () => {
    update({
      status: "Archived"
    });
  };
  return (
    <div className="issue-container">
      <Link to={`/issues/${issue.issue_id}`}>
        <ChatBubble />
      </Link>
      { selectedType !== 'Archived' && <div className='archive-button' onClick={archive}>
        <FontAwesomeIcon icon={faArchive} />
      </div>}
      <div className="issue-number">Issue #{issue.issue_id}</div>
      <div className="issue-contents">{issue.contents}</div>
      <div className="move-issue-text">Move Issue To:</div>
      <div className="issue-buttons-container">
        {
          types.map((type, id) => (
            (type !== selectedType && type !== 'archived')
              ? <div onClick={onClick} key={id} className={`issue-button issue-button-${type}`}>{capitalize(type)}</div>
              : null
          ))
        }
      </div>
    </div>
  );
};

export default Issue;
