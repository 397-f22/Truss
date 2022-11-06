import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import "./Header.css";
import IssueModal from "./IssueModal";
import ProjectModal from "./ProjectModal";
import IssueCreator from "./IssueCreator";
import ProjectCreator from "./ProjectCreator";
import { useFormData } from "../utilities/useformdata";
import { signInWithGoogle, signOut, useAuthState, useDbUpdate } from '../utilities/firebase';

const types = ["backlog", "todo", "done"]
const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const Header = ({
  selectedType,
  setSelectedType,
  issues,
  projects,
  projectID,
  setProjectID,
  users
}) => {
  const [open, setOpen] = useState(false);
  const [openProject, setOpenProject] = useState(false);
  const [state, change] = useFormData();

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  const openModalProject = () => setOpenProject(true);
  const closeModalProject = () => setOpenProject(false);

  const onClick = () => setProjectID(0);
  const issueCount = issues.length;
  const issueNumber = issues.filter(issue => issue.project_id === projectID).length;

  // export const useProfile = () => {
  //   const [user] = useAuthState();
  //   const [isAdmin, isLoading, error] = useDbData(`/admins/${user?.uid || 'guest'}`);
  //   return [{ user, isAdmin }, isLoading, error];
  // };

  const [user] = useAuthState();

  const [update, result] = useDbUpdate(`users/${user?.uid || 'guest'}`)

  if (user) {


    const uid = user.uid;

    if (!users.filter(user => user.uid === uid)) {
      update({
        display_name: user.displayName,
        uid: uid,
        email: user.email,
        project_ids: []

      }
      )
    }
  }

  const SignInButton = () => (
    <button className="ms-auto btn " onClick={signInWithGoogle}>Sign in</button>
  );

  const SignOutButton = () => (
    <button className="ms-auto btn " onClick={signOut}>Sign out</button>
  );

  return (
    <>
      <IssueModal open={open} close={closeModal}>
        <IssueCreator change={change} closeModal={closeModal} issueID={issueCount + 1} issueNumber={issueNumber + 1} projectID={projectID} />
      </IssueModal>
      <ProjectModal open={openProject} close={closeModalProject}>
        <ProjectCreator change={change} closeModal={closeModalProject} projectID={projects.length + 1001} />
      </ProjectModal>
      <div className="header">
        <Link className="app-title-link" to="/">
          <div
            onClick={onClick}
            className="app-title">{projectID ? `Truss: ${projects.filter(project => project.project_id === projectID)[0].name}` : "Truss"}
          </div>
        </Link>
        {!projectID
          ? <>
            <button className="btn btn-outline-dark" onClick={openModalProject}>Add Project</button>
          </>
          : <>
            <div className="issues-type-container">
              {types.map((type, id) => (
                <Link className={`issues-type ${(type === selectedType) ? "issues-type-active" : ""}`} to={`/${projectID}`} key={id}>
                  <div
                    id={type}
                    onClick={(e) => {
                      if (type !== selectedType) {
                        setSelectedType(e.target.id);
                      };
                    }}
                  >
                    {capitalize(type)}
                  </div>
                </Link>
              ))}
            </div>
            <button className="btn btn-outline-dark" onClick={openModal}>Add Issue</button>
          </>
        }
        {user ? <SignOutButton /> : <SignInButton />}
      </div>
    </>
  );
};

export default Header;
