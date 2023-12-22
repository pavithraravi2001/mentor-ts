import { Router } from "express";
import {
    createLeaveForm,
    deleteLeaveForm,
    getLeaveForm,
    getLeaveFormById,
    getUserId,
    updateLeaveForm,
} from "./controller";
const router = new Router();
module.exports = router;

router.post("/", createLeaveForm);

router.get("/", getLeaveForm);

router.get("/:id", getLeaveFormById);

router.put("/:id", updateLeaveForm);

router.delete("/:id", deleteLeaveForm);

router.get("/userId/:userId", getUserId);
