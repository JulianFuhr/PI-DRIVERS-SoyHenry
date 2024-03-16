import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./error.css";

export default function Error404() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => navigate("/"), 3000);
  });
  navigate("/");
  return (
    <main className="errorPage">
      <h2 className="errorPageTitle">ERROR404</h2>
      <img
        className="detailCarga"
        src="/assets/loading.jpg"
        alt="Cargando..."
      />
    </main>
  );
}
