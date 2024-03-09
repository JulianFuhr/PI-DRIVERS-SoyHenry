const axios = require('axios');
const { Sequelize } = require('sequelize')
const { Driver, Team } = require('../db');


const getDriverByNameFromDatabase = async (name) => {
     
    //busco pilotos por name en la db
    const drivers = await Driver.findAll({
        where: {
            [Sequelize.Op.or]: [
                { forename: { [Sequelize.Op.iLike]: `%${name}%` } },
                { surname: { [Sequelize.Op.iLike]: `%${name}%`} },
                Sequelize.literal(`forename || ' ' || surname ILIKE '%${name}%'`),
            ],
        },
        include: [{ model: Team, through: "DriverTeam" }],
    });
    
    return drivers;
};


const getDriverByNameFromServer = async (name) => {
    try{
    //solicitud para obtener los pilotos dispo
    const response = await axios.get(
        `http://127.0.0.1:3001/drivers/AllDrivers`
    );

    //obtengo los pilotos de la respuesta
    const driversApi = response.data;
    //los filtro por nombre y apellido
    const nameLowercase = name.toLowerCase();
    const drivers = driversApi.filter((driver) => {
        const fullName =
         `${driver.name.forename} ${driver.name.surname}`.toLowerCase();
         return fullName.includes(nameLowercase);
    });

    return drivers;
    } catch (error) {
        console.error("Error al obtener los pilotos del servidor", error);
        throw new Error("Error al obtener los pilotos del servidor");
    }
};


module.exports = {
    getDriverByNameFromDatabase,
    getDriverByNameFromServer,
}