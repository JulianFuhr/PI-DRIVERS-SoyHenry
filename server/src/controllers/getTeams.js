const { getAllDrivers } = require('./getAllDrivers');

const axios = require('axios');
const { Team } = require('../db');


const getUniqueTeams = (drivers) => {
    const teamsSet = new Set();
    drivers.forEach((driver) => {
        if (typeof driver.teams === "string") {
            const teamsArray = driver.teams.split(",");
            teamsArray.forEach((team) => {
                //elimina espcaion al princp y final del nombre del team
                team = team.trim();
                //reemplazo cualquier tipo de guión por guiones con un solo espacio
                team = team.replace(/[-−–—]/g, "-");
                teamsSet.add(team);
            });
        } else if (Array.isArray(driver.teams)) {
            driver.temas.forEach((team) => {
                //elimina espacios al princip y final del nombre del team
                team = team.trim();
                //reemplaza cualquier tipo de guión por guiones ocn un solo espacio
                team = team.replace(/[-−–—]/g, "-");
                teamsSet.add(team);
            });
        }
    });
    return Array.from(teamsSet)
};


//obtiene los teams almacenados en la db
const getTeamsFromDataBase = async () => {
    const teams = await Team.findAll();
    return teams.map((team) => team.name);
};

//obtiene los teams desde la api
const getTeamsFromAPI = async () => {

    const drivers = getAllDrivers();

    const uniqueTeams = getUniqueTeams(drivers);
    return uniqueTeams;
  
};

//Guarda los teams en la BD
const saveTeamsToDataBase = async (teams) => {
    try {
        const existTeams = await Team.findAll();
        if (existTeams.length === 0) {
            const teamsToSave = teams.map((name) => ({ name }));
            await Team.bulkCreate(teamsToSave);
            console.log("Teams agregados a la db");
        }
    } catch (error) {
        console.error("Error al guardar los equipos en la base de datos:", error);
        throw new Error("Error al guardar los equipos en la base de datos");
    }
};


//obtiene los teams, 1ro desde la base de datos y despues desde la API si no hay en la BD
const getTeams = async () => {
    let teamsFromDataBase;
    try {
        teamsFromDataBase = await getTeamsFromDataBase();
        if (teamsFromDataBase.length === 0) {
            const teamsFromAPI = await getTeamsFromAPI();
            await saveTeamsToDataBase(teamsFromAPI);
            teamsFromDataBase = teamsFromAPI;
        }
    } catch (error) {
        console.error("Error al obtener los equipos:", error);
        throw new Error("Error al obtener los equipos");
    }
    return teamsFromDataBase;
};



module.exports = {
    getTeams,
};