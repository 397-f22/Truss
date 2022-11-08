import { useDbUpdate } from '../utilities/firebase'
import "./IssueCreator.css";

const ProjectCreator = ({ change, closeModal, projectIDs, projectID, currentUser}) => {
    
    const uid = !currentUser ? "guest" : currentUser.uid;
    const [update, result] = useDbUpdate(`/projects/${projectID}`)
    const [userUpdate, userResult] = useDbUpdate(`/users/${uid}`)


    const submit = (e) => {
        if(e.target[0].value === ''){}
        else{
        e.preventDefault();
        update({
            name: e.target[0].value,
            project_id: projectID
        });
        userUpdate({
          project_ids: [...projectIDs, projectID]
        });
        document.getElementById('issue-form').reset();
    }
        closeModal()
    };

    return (
      <form id="issue-form" className="issue-form" onSubmit={submit}>
        <input className="issue-field" placeholder="Enter Project Name" onChange={change} />
        <button className="issue-submit" type="submit">Add New Project</button>
      </form>
    );
};

export default ProjectCreator;
