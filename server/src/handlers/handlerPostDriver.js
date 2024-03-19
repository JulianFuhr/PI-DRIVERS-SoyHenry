const postDriver = require('../controllers/postDriver');

//maneja la creación de un nuevo piloto
const handlerPostDriver = async (req, res) => {
    try {
        
        //extrae los datos , crea un nuevo piloto
        const { forename, surname, description, image, nationality, dob, teams } =
        req.body;

        const result = await postDriver(
            forename,
            surname,
            description,
            image,
            nationality,
            dob,
            teams
        );

        res.status(201).json(result);
    } catch (error) {
        console.error("Error en el intento de crear un piloto", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

module.exports = { handlerPostDriver };