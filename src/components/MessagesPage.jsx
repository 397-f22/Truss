import { useParams } from "react-router-dom";
import "./MessagesPage.css";
import MessageField from "./MessageField";
import { useFormData } from "../utilities/useformdata";

const MessagesPage = ({ issues, messages, users,currentUser }) => {
  const { id } = useParams();

  const findUserDisplayName = (uid) => Object.values(users).filter(user => user.uid === uid)[0].display_name;
  const issueData = Object.values(issues).filter(issue => parseInt(issue.issue_id) === parseInt(id))[0];
  const filteredMessages = Object.values(messages).filter(message => message.issue_id === id);
  const [state, change] = useFormData();

  return (
    <div>
      <div className="issue-data-display">
        <div className="issue-number-header">Issue #{issueData.issue_id}</div>
        <div>{issueData.contents}</div>
        <div>Status: {issueData.status}</div>
      </div>
      <div className="text-chat" id="text-chat">
        {
          filteredMessages.map((message, id) => {
            let time = new Date(message.date)
            return(
            <div key={id} className={message.uid === currentUser.uid ? `current-user-message`:`message`}>
              <div className="user-name">{findUserDisplayName(message.uid)}</div>
              <div className="message-text">{message.contents}</div>
              <div>{time.toDateString()} {time.toLocaleTimeString()} </div>
            </div>)})
        }
      </div>
      <div className="message-field">
        <MessageField currentUser={currentUser}change={change} />
      </div>
    </div>
  );
};

export default MessagesPage;
