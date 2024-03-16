import { useState } from "react";
import "./searchBar.style.css";
import { useDispatch } from "react-redux";
import { searchDrivers } from "../../redux/actions/actionCreators";

export default function SearchBar() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const search = () => {
    if (name.trim() !== "") {
      dispatch(searchDrivers(name));
      setName("");
    }
  };

  return (
    <div className=" searchBar">
      <input
        type="search"
        onChange={handleChange}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            search();
          }
        }}
        placeholder="Enter a name"
        value={name}
        className="searchInput"
      />
      <button className="searchButton" onClick={search}>
        Search
      </button>
    </div>
  );
}
