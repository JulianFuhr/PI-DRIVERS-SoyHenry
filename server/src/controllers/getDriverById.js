const axios = require('axios');
const { Driver, Team } = require('../db');


const getDriverByIdFromDatabase = async (id) => {
    try{
        //busca el conductor por id
        const driverDB = await Driver.findOne({
            where: { id },
            include: [{ model: Team, through: "DriverTeam" }],
        });

        if (driverDB){
            return driverDB;
        }
    }catch (error) {
        console.error("Error al obtener conductor de la base de datos:", error);
        throw new Error("Error al obtener conductor de la base de datos");
    }
}


const getDriverByIdFromServer = async (id) => {
    try {
        
        //solicitud para obtener todos lo pilotos dips
        const response = await axios.get(`http://127.0.0.1:3001/drivers/AllDrivers`);

        //obtengo los pilotos de la respuesta
        const driversApi = response.data;

        //busco el conductor por id
        const driver = driversApi.filter((driv) => driv.id.toString() === id);

        //devuelvo el piloto encontrado o un arreglo vacío si no se encuentra
        return driver ? [driver] : [];

    } catch (error) {
        console.error("Error al buscar piloto en el servidor", error);
        throw new Error("Error al buscar el piloto en el servidor");
    }
};

const getDriverById = async (id, source) => {
    try {
        if ( source === "api"){
            return await getDriverByIdFromDatabase(id);
        } else {
            return await getDriverByIdFromServer(id);
        }
    } catch (error) {
        console.error("Error al obtener el piloto", error);
        throw new Error("Error al obtener el piloto")
    }
}

module.exports = getDriverById;
