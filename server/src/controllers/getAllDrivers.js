const fs = ('fs');
const path = ('path')

//ruta al archivo json
const dirversFilePath = path.join(__dirname, '../../api/db.json'); 

//obtengo todos los pilotos del json
function getAllDrivers () {

try {
    
    //leo los daros del json
    const driversData = fs.readFileSync(dirversFilePath, "utf8");;
    const driversJson = JSON.parse(driversData);
    const drivers = driversJson.drivers;

    //si un piloto no tiene img le pongo una por defecto
    drivers.forEach((driver) => {
        if(!driver.image.url){
            driver.image = { url: "assets/image-default.png"} 
        }
    });

    return drivers;

} catch (error) {
    console.error('Error al obtener los conductores:', error);
    throw new Error('error');
}

}


module.exports = {
    getAllDrivers,
};