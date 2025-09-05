import express from 'express'
import { getAllFlights } from "../Controllers/AllFlights.js";
import valdiateFlightRequest from "../middlewares/ValdiateFlightRequest.js";
import { AkasaDataSpecific, GetAndStoreAkasa } from '../Controllers/Akasa/Akasaapi.js';
import validateFlightRequest from '../middlewares/ValdiateFlightRequest.js';
import { GetAndStoreFlightsIndigo, IndigoSpecific } from '../Controllers/Indigo/getFlightsindigo.js';
import { GetAndStoreSpicejet, SpicejetSpecific } from '../Controllers/Spicejet/getFlightsSpicejet.js';
import { CombinedGetStore } from '../Controllers/combinedGetStore.js';
import  {getNames}  from '../Controllers/getapis/getNames.js';
import  SearchGetFlights  from '../Controllers/SearchGetFlights.js';
import { create_User } from '../Controllers/userReadWrite.js';
// import validate from '../Controllers/lib/validator.js';
// import {body} from 'express-validator'

const router = express.Router();

// this routes get data of all flights
router.post("/allflights", valdiateFlightRequest, getAllFlights)

// this routes will be for specific flights api only
router.post("/flights/akasa", valdiateFlightRequest, AkasaDataSpecific)
router.post("/flights/indigo", validateFlightRequest, IndigoSpecific)
router.post("/flights/spicejet", validateFlightRequest, SpicejetSpecific)

// this is for storing and getting data into db
router.post("/flights/indigo/StoreGet", valdiateFlightRequest, GetAndStoreFlightsIndigo);

router.post("/flights/spicejet/StoreGet", validateFlightRequest, GetAndStoreSpicejet)

router.post("/flights/akasa/StoreGet", validateFlightRequest, GetAndStoreAkasa);

// this routes combines everything and also stores
router.post("/flight/AllStore", CombinedGetStore);

// this one searches for name of airport
router.get("/api/airport/name", getNames)

// main routes for searching flights
router.get("/api/SearchFlights", SearchGetFlights)

// routes for signup
// router.post("/api/signup",validate([body('username').notEmpty(),body('email').isEmail().notEmpty(),body('password').isLength({min:8}).notEmpty()]),create_User)

export default router;