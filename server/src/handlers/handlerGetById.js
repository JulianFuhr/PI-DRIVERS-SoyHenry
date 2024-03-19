const  getDriverById  = require('../controllers/getDriverById');
//maneja la obtencion de un piloto por su ID
async function handlerGetDriverById(req, res) {
    try {
        const { id } = req.params;
        console.log(id,"id");
        
        const source = isNaN(id) ? "db" : "api";
        console.log(source,"source");
        
        console.log(getDriverById);
        const response = await getDriverById(id, source);
        console.log(response,"response");
        if (response) {
            res.json(response);
        }else {
            res.status(404).json({ message: "Piloto no encontrado" });
        }
    } catch (error) {
        //maneja cualquier error ocurrido durante el proceso
        // console.error("Error al obtener al piloto:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}

module.exports = {
    handlerGetDriverById,
}