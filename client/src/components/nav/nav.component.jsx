import { Link, useLocation } from "react-router-dom";
import SearchBar from "../searchBar/searchBar.component";
import "./nav.style.css";

const Nav = () => {
  const { pathname } = useLocation();

  return (
    <header className="header">
      <nav className="nav">
        <Link to={"/"}>
          <button className="navButton navButtonClose">Close</button>
        </Link>
        <div className="navButtons">
          <Link to={"/home"}>
            <button className="navButton">Home</button>
          </Link>
          <Link to={"/form"}>
            <button className="navButton">Create</button>
          </Link>
          <div className="navSearch">
            {pathname === "/home" && <SearchBar />}
          </div>
        </div>
        {/* <div>
          <img src="/assets/logo-F1.png" alt="F1" className="navLogo" />
        </div> */}
      </nav>
    </header>
  );
};

export default Nav;
