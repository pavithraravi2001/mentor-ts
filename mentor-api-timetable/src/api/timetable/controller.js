"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTimetable = exports.getTimetable = exports.createTimetable = void 0;
const response_1 = require("../../common/response/");
const service_1 = require("./service");
const createTimetable = (req, res) => {
    (0, service_1.createTimetableService)(req.body)
        .then((0, response_1.success)(res, 201))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.createTimetable = createTimetable;
const getTimetable = ({ body }, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var result = yield (0, service_1.getTimetableService)(body);
        res.status(200).json(result);
    }
    catch (error) {
        console.error("Error while fetching timetable:", error);
        res
            .status(500)
            .json({ error: "An error occurred while fetching the timetable." });
    }
});
exports.getTimetable = getTimetable;
const updateTimetable = (req, res) => {
    (0, service_1.updateTimetableService)(req.body)
        .then((0, response_1.success)(res, 200))
        .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
exports.updateTimetable = updateTimetable;
