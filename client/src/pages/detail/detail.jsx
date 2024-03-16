import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./detail.css";
import { fetchDriverById } from "../../redux/actions/actionCreators";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const driver = useSelector((state) => state.driver);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    dispatch(fetchDriverById(id));
  }, [id, dispatch]);

  if (loading) {
    return (
      <main className="detailPage">
        <img
          className="detailCarga"
          src="/assets/loading/jpg"
          alt="Cargando..."
        />
      </main>
    );
  }

  if (error) {
    return (
      <main className="detailPage">
        <p>Error: {error}</p>
      </main>
    );
  }

  return (
    <main className="detailPage">
      <section className="detail">
        <div className="detailInfImg">
          <div className="detailConteinInf">
            <div className="detailContName">
              <h3 className="detailName">
                Nombre: {driver?.name?.forename || driver?.forename}
              </h3>
              <h3 className="detailName">
                Apellido: {driver?.name?.surname || driver?.surname}
              </h3>
            </div>
            <p className="detailInf">
              Teams:{" "}
              {Array.isArray(driver?.Teams)
                ? driver?.Teams.map((team) => team.name).join(", ")
                : driver?.teams}
            </p>
            <p className="detailInf">Nationality: {driver?.nationality}</p>
            <p className="detailInf">Dob: {driver?.dob}</p>
            <p className="detailInf">Id: {driver?.id}</p>
          </div>
          <div className="det-cont-img">
            <img
              className="detailImg detail-img"
              src={driver?.image?.url || driver?.image}
              alt={`${driver?.name?.forename} ${driver?.name?.surname}`}
            />
          </div>
        </div>
        {driver?.description && (
          <p className="detailDescrip">Description: {driver?.description}</p>
        )}
      </section>
    </main>
  );
};

export default Detail;