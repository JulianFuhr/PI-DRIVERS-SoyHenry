const axios = require("axios");
const { Driver, Team } = require("../db");
const fs = require("fs");
const path = require("path");

const dirversFilePath = path.join(__dirname, "../../api/db.json");

const getDriverByIdFromDatabase = async (id) => {
  try {
    //busca el conductor por id
    const driverDB = await Driver.findOne({
      where: { id },
      include: [{ model: Team, through: "DriverTeam" }],
    });

    if (driverDB) {
      return driverDB;
    }
  } catch (error) {
    console.error("Error al obtener conductor de la base de datos:", error);
    throw new Error("Error al obtener conductor de la base de datos");
  }
};

const getDriverByIdFromServer = async (id) => {
  try {
    console.log("entro a getDriverByIdFromServer");
    const driversData = fs.readFileSync(dirversFilePath, "utf8");
    const driversJson = JSON.parse(driversData);
    const drivers = driversJson.drivers;
    console.log(drivers);
    const driver = drivers.filter((driv) => driv.id.toString() === id);
    //solicitud para obtener todos lo pilotos dips
    // const response = await axios.get(`http://127.0.0.1:3001/drivers/${id}`);

    //obtengo los pilotos de la respuesta
    // const driversApi = response.data;

    //busco el conductor por id
    // const driver = driversApi.filter((driv) => driv.id.toString() === id);

    //devuelvo el piloto encontrado o un arreglo vacío si no se encuentra
    return driver ? [driver] : [];
  } catch (error) {
    console.error("Error al buscar piloto en el servidor", error);
    throw new Error("Error al buscar el piloto en el servidor");
  }
};

const getDriverById = async (id, source) => {
    console.log({id, source});
  try {
    if (source !== "api") {
      return await getDriverByIdFromDatabase(id);
    } else {
        console.log("deberia entrar");
      return await getDriverByIdFromServer(id);
    }
  } catch (error) {
    console.error("Error al obtener el piloto", error);
    throw new Error("Error al obtener el piloto");
  }
};

module.exports = getDriverById;
