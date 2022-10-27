
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { useDbData } from './utilities/firebase';
import Header from "./components/Header";
import MessagesPage from "./components/MessagesPage";
import IssuesPage from "./components/IssuesPage";
import './App.css'

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const App = () => {
  const [selectedType, setSelectedType] = useState("todo");

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
        />
        <div className="page-content">
          <Routes>
            <Route
              path="/"
              element={<IssuesPage
                        selectedType={selectedType}
                        issues={data.issues.slice(1)}
                      />}
            />
            <Route
              path="/issues/:id"
              element={<MessagesPage
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
