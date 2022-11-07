
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDbData } from './utilities/firebase';
import Header from "./components/Header";
import MessagesPage from "./components/MessagesPage";
import IssuesPage from "./components/IssuesPage";
import ProjectPage from "./components/ProjectPage";
import { useAuthState, useDbUpdate } from "./utilities/firebase";
import './App.css'

// const projectIDs = [1001]; // hardcoded for now, will get from logged in user

const App = () => {
  const [selectedType, setSelectedType] = useState("todo");
  const [projectID, setProjectID] = useState(0);
  const [currentUser] = useAuthState();
  const [projectIDs, setProjectIDs] = useState([]);
  const [data, error] = useDbData("/");

  useEffect(() => {
    if (!data || !("users" in data) || !currentUser) {
      return;
    };

    const currentUserFirebase = Object.values(data.users).filter(user => user.uid === currentUser.uid)[0];

    if (currentUserFirebase && "project_ids" in currentUserFirebase) {
      setProjectIDs(Object.values(currentUserFirebase.project_ids));
    };
  }, [currentUser, data])

  if (error) return <h1>Error loading data: {error.toString()}</h1>;
  if (data === undefined) return <h1>Loading data...</h1>;
  if (!data) return <h1>No data found</h1>;

  return (
    <div>
      <BrowserRouter>
        <Header
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          issues={Object.values(data.issues)}
          projects={Object.values(data.projects)}
          projectID={projectID}
          setProjectID={setProjectID}
          users={Object.values(data.users)}
          currentUser={currentUser}
          projectIDs={projectIDs}
        />
        <div className="page-content">
          <Routes>
            <Route
              path="/"
              element={<ProjectPage
                projects={Object.values(data.projects)}
                projectIDs={projectIDs}
                setProjectID={setProjectID}
                currentUser={currentUser}
              />}
            />
            <Route
              path="/:project_id"
              element={<IssuesPage
                projectIDs={projectIDs}
                selectedType={selectedType}
                issues={Object.values(data.issues)}
              />}
            />
            <Route
              path="/issues/:id"
              element={<MessagesPage
                issues={data.issues}
                messages={data.messages}
                users={Object.values(data.users)}
              />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
