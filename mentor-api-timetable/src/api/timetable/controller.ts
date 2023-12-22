import { success } from "../../common/response";
import {
  createTimetableService,
  getTimetableService,
  updateTimetableService,
} from "./service";

export const createTimetable = (req, res) => {
  createTimetableService(req.body)
    .then(success(res, 201))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const getTimetable = async ({ body }, res) => {
  try {
    var result = await getTimetableService(body);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error while fetching timetable:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the timetable." });
  }
};

export const updateTimetable = (req, res) => {
  updateTimetableService(req.body)
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
