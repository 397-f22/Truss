
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { useDbData } from './utilities/firebase';
import Header from "./components/Header";
import MessagesPage from "./components/MessagesPage";
import IssuesPage from "./components/IssuesPage";
import ProjectPage from "./components/ProjectPage";
import './App.css'

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const projectIDs = [1001]; // hardcoded for now, will get from logged in user

const App = () => {
  const [selectedType, setSelectedType] = useState("todo");
  const [projectID, setProjectID] = useState(1001);

  const [data, error] = useDbData("/");

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
          projectID={projectID}
        />
        <div className="page-content">
          <Routes>
            <Route
              path="/"
              element={<ProjectPage
                projects={data.projects}
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
                users={data.users.slice(1)}
              />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
