import './MessageField.css'
import { useDbUpdate, setData } from '../utilities/firebase'
import { useParams } from 'react-router-dom'

const MessageField = ({change}) => {
    // need to generate an id (use hash function)
    // get issue ID from url

    const issueID = Object.values(useParams())[0];
    const time = new Date();
    const userID = 1;
    const messageID = `${userID}${time.getTime()}`

    //console.log(issueID);
    const [update, result] = useDbUpdate(`/messages/${messageID}`)

    const submit = (e) => {
        e.preventDefault();
        console.log(e.target[0].value);
        update({
            contents: e.target[0].value,
            date: time.toJSON(),
            issue_id: issueID,
            message_id: messageID,
            uid: userID
        });
    }



    return (
        <form onSubmit={submit} className='field-container'>
            <input className='field' placeholder='Start Typing...' onChange={change} />
        </form>
    );
}

export default MessageField;