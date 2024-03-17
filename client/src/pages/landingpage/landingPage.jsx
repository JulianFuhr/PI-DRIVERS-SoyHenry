import { Link } from "react-router-dom";
import "./landingPage.css";

const Landing = () => {
  return (
    <div className="pageLanding">
      <div className="conteinerLanding">
        {/* <img src="./assets/fondo-inicio.jpeg" alt="" /> */}
        <Link to="/home">
          <button className="buttonLanding">Click here!</button>
        </Link>
      </div>
    </div>
  );
};


export default Landing;