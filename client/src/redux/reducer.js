import { mergeDriversWithFilter, sortDrivers } from "./actions/actionCreators";
import {
  CREATE_DRIVER_FAILURE,
  CREATE_DRIVER_REQUEST,
  CREATE_DRIVER_SUCCESS,
  FETCH_DRIVERS,
  FETCH_DRIVER_BY_ID,
  FILTER,
  ORDER_DOB,
  ORDER_NAME,
  PAGINATE,
  SEARCH_DRIVERS,
} from "./actions/actionsTypes";

const initialState = {
  drivers: [],
  filteredDrivers: [],
  driver: {},
  loading: false,
  error: null,
  currentPage: 1,
  driversPerPage: 9,
  selectedOrder: "name",
  selectedDirection: "ASC",
  filter: {
    origin: "all",
    teams: "all",
  },
};

const reducer = (state = initialState, action) => {
  let filteredDriversSearch;
  let orderedFilteredDriversSearch;
  let newDrivers;
  let mergedDrivers;
  let sortedDriversByName;
  let sortedDriversByDob;
  let filteredDrivers;

  switch (action.type) {
    case SEARCH_DRIVERS:
      filteredDriversSearch = action.payload.filter((driver) =>
        state.drivers.some((existingDriver) => existingDriver.id !== driver.id)
        );
        console.log(filteredDriversSearch, "aa");
      orderedFilteredDriversSearch = sortDrivers(
        filteredDriversSearch,
        state.selectedOrder,
        state.selectedDirection
      );

      console.log(orderedFilteredDriversSearch,"bbb");
      newDrivers = [
        ...orderedFilteredDriversSearch.filter(
          (driver) =>
            !state.drivers.some(
              (existingDriver) => existingDriver.id === driver.id
            )
        ),
        ...state.drivers,
      ];
     
      mergedDrivers = mergeDriversWithFilter(
        state.filteredDrivers,
        orderedFilteredDriversSearch,
        state.selectedOrder,
        state.selectedDirection
      );
      console.log(action.payload, "ccc");
      return {
        ...state,
        drivers: newDrivers,
        filteredDrivers: mergedDrivers,
      };

    case FETCH_DRIVERS:
      if (state.drivers.length === 0) {
        return {
          ...state,
          drivers: action.payload,
          filteredDrivers: action.payload,
          loading: false,
        };
      } else {
        return {
          ...state,
          loading: false,
        };
      }

    case FETCH_DRIVER_BY_ID:
      return {
        ...state,
        driver: action.payload,
        loading: false,
        error: null,
      };

    case PAGINATE:
      return {
        ...state,
        currentPage: action.payload.page,
        driversPerPage: action.payload.driversPerPage,
      };

    case ORDER_NAME:
      sortedDriversByName = sortDrivers(
        state.filteredDrivers,
        "name",
        action.payload
      );
      return {
        ...state,
        selectedOrder: "name",
        selectedDirection: action.payload,
        filteredDrivers: sortedDriversByName,
      };

    case ORDER_DOB:
      sortedDriversByDob = sortDrivers(
        state.filteredDrivers,
        "dob",
        action.payload
      );
      return {
        ...state,
        selectedOrder: "dob",
        selectedDirection: action.payload,
        filteredDrivers: sortedDriversByDob,
      };

    case FILTER:
      const { teams, origin } = action.payload;

      if (teams !== "all") {
        filteredDrivers = state.drivers.filter((driver) => {
          return (
            driver &&
            ((Array.isArray(driver?.Teams) &&
              driver.Teams.some((team) => team.name === teams)) ||
              (typeof driver.teams === "string" &&
                driver.teams.split(", ").includes(teams)))
          );
        });
      } else {
        filteredDrivers = state.drivers;
      }

      if (origin === "API") {
        filteredDrivers = filteredDrivers.filter(
          (driver) => driver && driver.driverRef
        );
      } else if (origin === "DB") {
        filteredDrivers = filteredDrivers.filter(
          (driver) => driver && !driver.driverRef
        );
      }
      8;

      filteredDrivers = sortDrivers(
        filteredDrivers,
        state.selectedOrder,
        state.selectedDirection
      );

      return {
        ...state,
        filter: {
          ...state.filter,
          teams: action.payload.teams,
          origin: action.payload.origin,
        },
        filteredDrivers: filteredDrivers,
      };

    case CREATE_DRIVER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_DRIVER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case CREATE_DRIVER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
