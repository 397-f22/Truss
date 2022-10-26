import { useParams } from "react-router-dom";

const MessagesPage = ({ selectedType, messages }) => {
  const { id } = useParams();

  return (
    <div>
      this is the messages page;
    </div>
  );
};

export default MessagesPage;
