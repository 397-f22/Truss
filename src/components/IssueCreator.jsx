import { useDbUpdate } from '../utilities/firebase'
import { useState } from 'react';
import './IssueCreator.css'
const issueTypes = ["Backlog","Todo", "Done"]

const IssueCreator = ({ closeModal, change }) => {
    // need to generate an id (use hash function)
    // get issue ID from url

    const time = new Date();
    const userID = "1";
    const issueID = `${userID}${time.getTime()}`
    const [update, result] = useDbUpdate(`/issues/${issueID}`)
    const [issueType, setIssueType] = useState(issueTypes[0])

    const submit = (e) => {
        if (e.target[0].value === '') { }
        else {
            e.preventDefault();
            update({
                contents: e.target[0].value,
                issue_id: issueID,
                status: e.target[1].value,
            });
            document.getElementById('issue-form').reset();
        }
        closeModal()
    };

    return (
        <div>
            <form id='issue-form' onSubmit={submit} className='issue-fields'>
                <input className='issue-field' placeholder='Enter Task Name' onChange={change} />
                <select className="select-bar" defaultValue={issueType} onChange={(e) => setIssueType(e.target.value)}>
                    {
                        issueTypes.map((issueType, id) => (
                            <option key={id} value={issueType}>{issueType}</option>
                        ))
                    }
                </select>
            </form>
            <button className='issue-submit' type="submit">Submit</button>
        </div>
    );
};

export default IssueCreator;
