import "./ChatBubble.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentDots } from '@fortawesome/free-solid-svg-icons'

const ChatBubble = () => (
  <div className="chat-bubble">
    <FontAwesomeIcon icon={faCommentDots} />
  </div>
);

export default ChatBubble;
