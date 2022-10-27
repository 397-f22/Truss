import './MessageField.css'
import { useDbUpdate } from '../utilities/firebase'
import { useParams } from 'react-router-dom'

const MessageField = ({change}) => {
    // need to generate an id (use hash function)
    // get issue ID from url

    const issueID = Object.values(useParams())[0];
    const time = new Date();
    const userID = "1";
    const messageID = `${userID}${time.getTime()}`

    const [update, result] = useDbUpdate(`/messages/${messageID}`)

    const submit = (e) => {
        e.preventDefault();
        update({
            contents: e.target[0].value,
            date: time.toJSON(),
            issue_id: issueID,
            message_id: messageID,
            uid: userID
        });
        document.getElementById('text-form').reset();

    }



    return (
        <form id='text-form' onSubmit={submit} className='field-container'>
            <input className='field' placeholder='Start Typing...' onChange={change} />
            <button className='submit' type="submit">Submit</button>
        </form>
    );
}

export default MessageField;