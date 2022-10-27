import { useParams } from "react-router-dom";
import "./MessagesPage.css";
import MessageField from "./MessageField";
import { useFormData } from "../utilities/useformdata";
const MessagesPage = ({ messages, users }) => {
  const { id } = useParams();
  const findUserDisplayName = (uid) => Object.values(users).filter(user => user.uid === uid)[0].display_name;
  const filteredMessages = Object.values(messages).filter(message => message.issue_id === id);
  const [state, change] = useFormData();
  return (
    <div>
      <div className="text-chat">
        {
          filteredMessages.map((message, id) => (
            <div key={id} className="message">
              <div>{findUserDisplayName(message.uid)}</div>
              <div>{message.contents}</div>
            </div>))
        }
      </div>
      <div className="message-field">
        <MessageField change={change} />
      </div>
    </div>
  );
};

export default MessagesPage;
