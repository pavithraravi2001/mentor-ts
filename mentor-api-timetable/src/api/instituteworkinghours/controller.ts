import { success } from "../../common/response/";
import {
  deleteInstituteWorkingHoursService,
  getInstituteWorkingHoursService,
  updateInstituteWorkingHoursService,
} from "./service";

export const getInstituteWorkingHours = ({}, res) => {
  getInstituteWorkingHoursService()
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const updateInstituteWorkingHours = (req, res) => {
  updateInstituteWorkingHoursService(req.params, req.body)
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};

export const deleteInstituteWorkingHours = (req, res) => {
  deleteInstituteWorkingHoursService()
    .then(success(res, 200))
    .catch((err) => res.status(err && err.status ? err.status : 400).json(err));
};
