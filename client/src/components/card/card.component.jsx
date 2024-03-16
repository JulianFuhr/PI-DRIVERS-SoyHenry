import { Link } from "react-router-dom";
import "./card.style.css";

const Card = ({ name, image, teams, id }) => {
    return(
        <Link to={`/detail/${id}`}>
         <article className="card">
            <img src={image} alt={name} className="cardImage" />
            <h3 className="cardName">{name}</h3>
            <p className="cardTeams">{teams}</p>
         </article>
        </Link>
    );
};

export default Card;