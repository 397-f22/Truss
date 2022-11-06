
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { useDbData } from './utilities/firebase';
import Header from "./components/Header";
import MessagesPage from "./components/MessagesPage";
import IssuesPage from "./components/IssuesPage";
import ProjectPage from "./components/ProjectPage";
import './App.css'

// const projectIDs = [1001]; // hardcoded for now, will get from logged in user

const App = () => {
  const [selectedType, setSelectedType] = useState("todo");
  const [projectID, setProjectID] = useState(0);
  const [user, setUser] = useState();

  const [data, error] = useDbData("/");

  if (error) return <h1>Error loading data: {error.toString()}</h1>;
  if (data === undefined) return <h1>Loading data...</h1>;
  if (!data) return <h1>No data found</h1>;

  const projectIDs = !user ? [] : !user.project_ids ? [] : user.project_ids


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
          setUser={setUser}
        />
        <div className="page-content">
          <Routes>
            <Route
              path="/"
              element={<ProjectPage
                projects={Object.values(data.projects)}
                projectIDs={projectIDs}
                setProjectID={setProjectID}
              />}
            />
            <Route
              path="/:project_id"
              element={<IssuesPage
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
