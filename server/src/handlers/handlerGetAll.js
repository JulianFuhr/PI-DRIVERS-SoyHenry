const driversController = require('../controllers/getAllDrivers');

//maneja la obtención de todos los pilotos
async function handlerGetAllDrivers(req, res) {
    try {
        const drivers = driversController.getAllDrivers();

        res.json(drivers);
    } catch (error) {
        console.error("Error al obtener los pilotos", error);
        res.status(500).json({ error: "Error interno del servidor" });

    }
}

module.exports = {
    handlerGetAllDrivers,
};