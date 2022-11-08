import { Link } from "react-router-dom";
import { useEffect } from "react";
import "./Header.css";
import { signInWithGoogle, signOut, useDbUpdate } from '../utilities/firebase';

const types = ["backlog", "todo", "done"]
const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const Header = ({
  selectedType,
  setSelectedType,
  projects,
  projectID,
  users,
  currentUser
}) => {
  const uid = !currentUser ? "guest" : currentUser.uid;
  const [update, result] = useDbUpdate(`users/${uid}`);

  useEffect(() => {
    if (users.filter(user => user.uid === uid).length === 0) {
      update({
        display_name: currentUser.displayName,
        uid: uid,
        email: currentUser.email,
      })
    };
  }, [currentUser]);

  const SignInButton = () => (
    <button className="ms-auto btn btn-outline-dark" onClick={signInWithGoogle}>Sign In</button>
  );

  const SignOutButton = () => (
    <button className="ms-auto btn btn-outline-dark" onClick={signOut}>Sign Out</button>
  );

  return (
    <>
      
      <div className="header">
        <Link className="app-title-link" to="/">
          <div
            className="app-title">{projectID ? `Truss: ${projects.filter(project => project.project_id === projectID)[0].name}` : "Truss"}
          </div>
        </Link>
        {currentUser && projectID
          ?
          (
            <>
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
            </>
          )
          : <></>
        }
        {currentUser ? <SignOutButton /> : <SignInButton />}
      </div>
    </>
  );
};

export default Header;
