import './MessageField.css'
import { useDbUpdate } from '../utilities/firebase'
import { useParams } from 'react-router-dom'

const MessageField = ({ change, currentUser }) => {
    const issueID = Object.values(useParams())[0];
    const time = new Date();
    const userID = currentUser.uid;
    const messageID = `${userID}${time.getTime()}`

    const [update, result] = useDbUpdate(`/messages/${messageID}`)

    const submit = (e) => {
        e.preventDefault();
        if(!e.target[0].value) return
        update({
            contents: e.target[0].value,
            date: time.toJSON(),
            issue_id: issueID,
            message_id: messageID,
            uid: userID
        });
        document.getElementById('text-form').reset();
        document.getElementById('field').focus();

        const textChat = document.getElementById('text-chat');
        setTimeout(() => {
          textChat.scrollTop = textChat.scrollHeight;
        }, 100);
    };

    return (
      <form id='text-form' onSubmit={submit} className='field-container'>
          <input id= "field" className='field' placeholder='Start Typing...' onChange={change} />
          <button className='submit' type="submit">Submit</button>
      </form>
    );
};

export default MessageField;
