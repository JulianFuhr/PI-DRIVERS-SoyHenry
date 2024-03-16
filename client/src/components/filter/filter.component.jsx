import { useState, useEffect } from "react";
import { setOrderDob, setOrderName } from "../../redux/actions/actionCreators";
import { useDispatch, useSelector } from "react-redux";
import "./filter.style.css";

const Filter = ({ teams, handleFilter }) => {
  const filterstateGlobal = useSelector((state) => state.filter);
  const [filterstate, setFilterstate] = useState(filterstateGlobal);
  const selectedOrderGlobal = useSelector((state) => state.selectedOrder);
  const selectedDirectionGlobal = useSelector(
    (state) => state.selectedDirection
  );
  const [selectedOrder, setSelectedOrder] = useState(selectedOrderGlobal);
  const [selectedDirection, setSelectedDirection] = useState(
    selectedDirectionGlobal
  );
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "origin" || name === "teams") {
      setFilterstate({
        ...filterstate,
        [name]: value,
      });
    } else if (name === "order") {
      setSelectedOrder(value);
    } else if (name === "direction") {
      setSelectedDirection(value);
    }
  };

  useEffect(() => {
    handleFilter(filterstate);
  }, [handleFilter, filterstate, filterstateGlobal]);

  useEffect(() => {
    if (selectedOrder === "name" || selectedOrder === "dob") {
      dispatch(
        selectedOrder === "name"
          ? setOrderName(selectedDirection)
          : setOrderDob(selectedDirection)
      );
    }
  }, [dispatch, selectedOrder, selectedDirection]);

  return (
    <div className="homeOrder">
      <div className="homeConteinerSelect">
        <select
          value={selectedOrderGlobal}
          name="order"
          onChange={handleChange}
          className="homeOrderSelect"
        >
          <option value="name">Order by Name</option>
          <option value="dob">Order by Date of Birth</option>
        </select>
        <select
          value={selectedDirectionGlobal}
          name="direction"
          onChange={handleChange}
          className="homeOrderSelect"
        >
          <option value="ASC">Ascending</option>
          <option value="DESC">Descending</option>
        </select>
      </div>
      <div className="homeConteinerSelect">
        <label className="homeOrderLabel">Origin : </label>
        <select
          value={filterstateGlobal.origin}
          name="origin"
          onChange={handleChange}
          className="homeOrderSelect"
        >
          <option value="all">All</option>
          <option value="DB">My Drivers</option>
          <option value="API">Original Drivers</option>
        </select>
      </div>
      <div className="homeConteinerSelect borderRidht">
        <label className="homeOrderLabel">Team : </label>
        <select
          value={filterstateGlobal.teams}
          onChange={handleChange}
          className="homeOrderSelect"
          name="teams"
        >
          <option value="all">All</option>
          {teams.map((team) => (
            <option key={team} value={team}>
              {team}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filter;
