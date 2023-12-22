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
exports.updateTimetableService = exports.getTimetableService = exports.createTimetableService = void 0;
const model_1 = require("./model");
const createTimetableService = (body) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        model_1.Timetable.findOne({
            academicYear: body.academicYear,
            classGrade: body.classGrade,
            section: body.section,
        })
            .then((existingTimetable) => {
            if (existingTimetable) {
                const error = new Error();
                error.status = 409;
                error.message =
                    "Timetable already exists for the specified academic year, class, and section.";
                reject(error);
            }
            else {
                model_1.Timetable.create(body)
                    .then((doc) => {
                    resolve(doc);
                })
                    .catch((err) => {
                    reject(err);
                });
            }
        })
            .catch((err) => {
            reject(err);
        });
    });
});
exports.createTimetableService = createTimetableService;
const getTimetableService = (queryParams) => __awaiter(void 0, void 0, void 0, function* () {
    const { academicYear, classGrade, section } = queryParams;
    const query = {};
    if (academicYear) {
        query.academicYear = academicYear;
    }
    if (classGrade) {
        query.classGrade = classGrade;
    }
    if (section) {
        query.section = section;
    }
    try {
        const timetables = yield model_1.Timetable.findOne(query);
        return timetables;
    }
    catch (error) {
        throw error;
    }
});
exports.getTimetableService = getTimetableService;
const updateTimetableService = (queryParams, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    let { academicYear, classGrade, section } = queryParams;
    const $and = [];
    if (academicYear) {
        $and.push({ academicYear: academicYear });
    }
    if (classGrade) {
        $and.push({ classGrade: classGrade });
    }
    if (section) {
        $and.push({ section: section });
    }
    const query = $and.length > 0 ? { $and: $and } : {};
    try {
        const timetables = yield model_1.Timetable.findOneAndUpdate(query, updateData, {
            new: true,
        });
        return timetables;
    }
    catch (error) {
        throw error;
    }
});
exports.updateTimetableService = updateTimetableService;
