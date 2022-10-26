import { useParams } from "react-router-dom";
import "./MessagesPage.css";

const MessagesPage = ({ messages, users }) => {
  const { id } = useParams();

  const findUserDisplayName = (uid) => users.filter(user => user.uid === uid)[0].display_name;
  const filteredMessages = messages.filter(message => message.issue_id === id);

  return (
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
  );
};

export default MessagesPage;
