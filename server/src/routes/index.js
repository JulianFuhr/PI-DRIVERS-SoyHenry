const { Router } = require("express");
const { handlerGetAllDrivers } = require("../handlers/handlerGetAll");
const { handlerGetDriverById } = require("../handlers/handlerGetById");
const { getDriverByName } = require("../handlers/handlerGetByName");
const { getTeamsHandler } = require("../handlers/handlerGetTeams");
const { handlerPostDriver } = require("../handlers/handlerPostDriver");


const router = Router();

router.get("/AllDrivers", handlerGetAllDrivers);

router.get("/driverById/:id", handlerGetDriverById);

router.get("/teams", getTeamsHandler);

router.get("/driverByName/name", getDriverByName);

router.get("/addDriver", handlerPostDriver);

module.exports = router;
