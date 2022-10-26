import { Link } from "react-router-dom";
import "./Header.css";

const types = ["backlog", "todo", "done"]
const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const Header = ({ selectedType, setSelectedType }) => {
  return (
    <div className="header">
      {types.map((type, id) => (
        <Link className={`issues-type ${(type === selectedType) ? "issues-type-active" : ""}`} to="/" key={id}>
          <div
            id={type}
            // className={`issues-type ${(type === selectedType) ? "issues-type-active" : ""}`}
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
  );
};

export default Header;
