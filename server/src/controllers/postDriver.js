const { Driver, Team } = require('../db');

//crea un nuevo piloto en la bd
const postDriver = async (
    name,
    lastname,
    description,
    image,
    nationaly,
    birthdate,
    teams
) => {
    try {
        //Crea el nuevo piloto
        const newDriver = await Driver.create({
            name,
            lastname,
            description,
            image,
            nationaly,
            birthdate,
        });

        //separo los nombres de los teams y los limpio
        const teamNames = teams.split(",").map((team) => team.trim());
        //busca los team en la db
        const foundteams = await Team.findAll({
            where: {
                name: teamNames,
            },
        });

        //asocia los equipos encontrados al nuevo piloto
        await newDriver.addTeams(foundteams);

        return { message: "Piloto creado con éxito"};
    } catch (error) {
        console.error("Error al crear el nuevo piloto", error);
        throw new Error("Error al crear el nuevo piloto");
    }
};

module.exports = postDriver;