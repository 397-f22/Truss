import './MessageField.css'
const MessageField = ({change}) => {


    return (
        <form className='field-container'>
            <input className='field' placeholder='Start Typing...' onChange={change} />
        </form>
    );
}

export default MessageField;