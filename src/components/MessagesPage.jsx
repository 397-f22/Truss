import { useParams } from "react-router-dom";
import "./MessagesPage.css";
import MessageField from "./MessageField"; './MessageField'
const MessagesPage = ({ messages, users }) => {
  const { id } = useParams();

  const findUserDisplayName = (uid) => users.filter(user => user.uid === uid)[0].display_name;
  const filteredMessages = messages.filter(message => message.issue_id === id);

  return (
    <div>
      <div>
        {
          filteredMessages.map((message, id) => (
            <div key={id} className="message">
              <div>{findUserDisplayName(message.uid)}</div>
              <div>{message.contents}</div>
            </div>
          ))
        }
      </div>
      <div className="message-field">
        <MessageField />
      </div>
    </div>
  );
};

export default MessagesPage;
