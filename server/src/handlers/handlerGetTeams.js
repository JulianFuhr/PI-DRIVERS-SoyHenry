const { getTeams } = require('../controllers/getTeams');

//manejo la obtecion de los equipos
const getTeamsHandler = async ( req, res) => {
    try {
        const teams = await getTeams();
        return res.json(teams);
    } catch (error) {
        console.error("Error al obtener a los equipos:", error);
        return res.status(500).json({ message: "Error al obtener los equipos:" });
    }
};

module.exports = {
    getTeamsHandler,
};