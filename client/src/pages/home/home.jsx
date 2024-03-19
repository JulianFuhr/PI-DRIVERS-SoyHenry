import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/card/card.component";
import "./home.css";
import {
  fetchDrivers,
  setFilter,
  setPage,
} from "../../redux/actions/actionCreators";
import Filter from "../../components/filter/filter.component";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const filterstateGlobal = useSelector((state) => state.filter);
  const [filterstate, setFilterstate] = useState(filterstateGlobal);
  const dispatch = useDispatch();
  const filteredDrivers = useSelector((state) => state.filteredDrivers);
  const currentPage = useSelector((state) => state.currentPage);
  const driversPerPage = useSelector((state) => state.driversPerPage);
  const [teams, setTeams] = useState([]);
  console.log(filteredDrivers,"entro HOME Fil");
  useEffect(() => {
    fetch("http://127.0.0.1:3001/drivers/teams")
    .then((response) => response.json())
    .then((data) => setTeams(data))
    .catch((error) => console.error("Error fetching teams:", error));
  }, []);
  
  useEffect(() => {
    const pageBeforeFilter = currentPage;
    console.log(filterstate,"filterstate");
    dispatch(setFilter(filterstate));
    const totalPagesAfterFilter = Math.ceil(
      filteredDrivers.length / driversPerPage
      );
      if (totalPagesAfterFilter === 0) {
        return;
      }
      if (pageBeforeFilter > totalPagesAfterFilter) {
        dispatch(setPage(totalPagesAfterFilter));
      }
    }, [
      dispatch,
      filterstate,
      driversPerPage,
      filteredDrivers.length,
      currentPage,
    ]);
    
    useEffect(() => {
      dispatch(fetchDrivers())
      .then(() => setLoading(false))
      .catch((error) =>
      console.error("Error al cargar los conductores:", error)
      );
    }, [dispatch]);
    
    const handleFilter = (filterData) => {
      setFilterstate(filterData);
    };
    
    return (
      <main className="home">
      <Filter teams={teams} handleFilter={handleFilter} />
      <section className="homeCards">
        {loading ? (
          <img
            className="detailCarga"
            src="https://cdn-9.motorsport.com/images/mgl/2d1Zz5LY/s1200/max-verstappen-red-bull-racing.webp"
            alt="Loading..."
          />
        ) : (
          filteredDrivers
            .slice(
              (currentPage - 1) * driversPerPage,
              currentPage * driversPerPage
            )
            .map((driver) => (
              <Card
                key={driver.id}
                id={driver.id}
                name={
                  driver.name
                    ? `${driver.name.forename} ${driver.name.surname}`
                    : `${driver.forename} ${driver.surname}`
                }
                image={driver.image.url ? driver.image.url : driver.image}
                teams={
                  Array.isArray(driver?.Teams)
                    ? driver?.Teams.map((team) => team.name).join(", ")
                    : driver?.teams
                }
              />
            ))
        )}
      </section>
      {parseInt(filteredDrivers.length) !== 0 && (
        <div className="homePagination">
          <button
            onClick={() => dispatch(setPage(1))}
            disabled={currentPage === 1}
            className="homePaginationButton"
          >
            First
          </button>
          <button
            onClick={() => dispatch(setPage(currentPage - 1))}
            disabled={currentPage === 1}
            className="homePaginationButton"
          >
            Previous
          </button>
          <span className="homePaginationsSpan">{currentPage}</span>
          <button
            onClick={() => dispatch(setPage(currentPage + 1))}
            disabled={currentPage * driversPerPage >= filteredDrivers.length}
            className="homePaginationButton"
          >
            Next
          </button>
          <button
            onClick={() =>
              dispatch(
                setPage(Math.ceil(filteredDrivers.length / driversPerPage))
              )
            }
            disabled={currentPage * driversPerPage >= filteredDrivers.length}
            className="homePaginationButton"
          >
            Last
          </button>
        </div>
      )}
    </main>
  );
};

export default Home;
