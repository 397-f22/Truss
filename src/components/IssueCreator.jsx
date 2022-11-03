import { useDbUpdate } from '../utilities/firebase'
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import "./IssueCreator.css";

const issueTypes = ["Todo","Done","Backlog"]

const IssueCreator = ({ closeModal, change, issueID, issueNumber, projectID}) => {
    const [update, result] = useDbUpdate(`/issues/${issueID}`)
    const [issueType, setIssueType] = useState(issueTypes[0])
    const project_id = projectID;
    

    const submit = (e) => {
        if(e.target[0].value === ''){}
        else{
        e.preventDefault();
        update({
            contents: e.target[0].value,
            issue_id: issueID,
            status: e.target[1].value,
            project_id: project_id,
            issue_number: issueNumber
        });
        document.getElementById('issue-form').reset();
    }
        closeModal()
    };

    return (
      <form id="issue-form" className="issue-form" onSubmit={submit}>
        <input className="issue-field" placeholder="Enter Task Description" onChange={change} />
        <select className="select-bar" defaultValue={issueType} onChange={(e) => setIssueType(e.target.value)}>
          {
            issueTypes.map((issueType, id) => (
              <option key={id} value={issueType}>{issueType}</option>
            ))
          }
        </select>
        <button className="issue-submit" type="submit">Add New Issue</button>
      </form>
    );
};

export default IssueCreator;
