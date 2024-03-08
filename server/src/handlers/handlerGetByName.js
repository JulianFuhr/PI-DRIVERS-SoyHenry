const {
    getDriverByNameFromDatabase,
    getDriverByNameFromServer,
} = require('../controllers/getDriversByName');

//maneja la obtencion de un piloto por su name
const getDriverByName = async (req, res) => {
    try {
        const { name } = req.query;

        //buscar piloto en la bd y server
        const driversFromDatabase = await getDriverByNameFromDatabase(name);
        const driversFromServer = await getDriverByNameFromServer(name);

        //evitar duplciados en la lista combinada de piloto
        const uniqueDrivers = {};

        driversFromDatabase.forEach((driver) => {
            uniqueDrivers[driver.id] = driver;
        });

        driversFromServer.forEach((driver) => {
            uniqueDrivers[driver.id] = driver;
        });

        const combinedDrivers = Object.values(uniqueDrivers);

        //devuelve los primero 15 pilotos encontrados
        const primeros15Pilotos = combinedDrivers.slice(0, 15);

        if (primeros15Pilotos.length === 0) {
            return res.status(404)
            .json({ message: "No se econtraron pilotos con ese nombre." });
        }

        return res.json(primeros15Pilotos);
    } catch (error) {
        console.error("Error al buscar los pilotos:", error);
        return res.status(500).json({ message: "Error al buscar los pilotos." })
    }
};

module.exports = {
    getDriverByName,
}