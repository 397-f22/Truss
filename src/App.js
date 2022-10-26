
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { useDbData } from './utilities/firebase';
import Header from "./components/Header";
import MessagesPage from "./components/MessagesPage";
import IssuesPage from "./components/IssuesPage";

const App = () => {
  const [selectedType, setSelectedType] = useState("todo");

  const [data, error] = useDbData("/");

  if (error) return <h1>Error loading data: {error.toString()}</h1>;
  if (data === undefined) return <h1>Loading data...</h1>;
  if (!data) return <h1>No data found</h1>;

  console.log("data:", data)

  return (
    <>
      <Header selectedType={selectedType} setSelectedType={setSelectedType} />
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element=<IssuesPage issues={data.issues.slice(1)} /> />
            <Route path="/issues/:id" element=<MessagesPage messages={data.messages.slice(1)} users={data.users.slice(1)} /> />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
