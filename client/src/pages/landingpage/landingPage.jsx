import { Link } from "react-router-dom";
import "./landingPage.css";

const Landing = () => {
  return (
    <div className="pageLanding">
      <div className="conteinerLanding">
        <img src="./assets/loading.jpg" alt="" />
        <Link to="/home">
          <button className="buttonLanding">Click here!</button>
        </Link>
      </div>
    </div>
  );
};


export default Landing;