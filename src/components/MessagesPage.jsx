import { useParams } from "react-router-dom";

const MessagesPage = ({ messages }) => {

  const { id } = useParams();

  console.log("id:", id);
  console.log("messages:", messages)

  return (
    <div>
      this is the messages page;
    </div>
  );
};

export default MessagesPage;
