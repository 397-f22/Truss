import { useDbUpdate } from '../utilities/firebase'
import "./IssueCreator.css";

const ProjectCreator = ({ change, closeModal, projectID}) => {
    const [update, result] = useDbUpdate(`/projects/${projectID}`)

    const submit = (e) => {
        if(e.target[0].value === ''){}
        else{
        e.preventDefault();
        update({
            name: e.target[0].value,
            project_id: projectID
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
