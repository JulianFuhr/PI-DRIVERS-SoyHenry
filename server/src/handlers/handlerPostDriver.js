const postDriver = require('../controllers/postDriver');

//maneja la creación de un nuevo piloto
const handlerPostDriver = async (req, res) => {
    try {
        
        //extrae los datos , crea un nuevo piloto
        const { name, lastname, desciption, image, nationaly, birthdate, teams } =
        req.body;

        const result = await postDriver(
            name,
            lastname,
            desciption,
            image,
            nationaly,
            birthdate,
            teams
        );

        res.status(201).json(result);
    } catch (error) {
        console.error("Error en el intento de crear un piloto", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

module.exports = { handlerPostDriver };