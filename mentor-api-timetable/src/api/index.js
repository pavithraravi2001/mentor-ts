import { Router } from "express";
import swagger from "../common/swagger";
import adminConfigs from "./admin-config";
import application from "./application";
import catalogue from "./catalogue";
import document from "./document";
import employee from "./employee";
import fees from "./fee-details";
import institute from "./institute";
import instituteWorkingHours from "./instituteworkinghours";
import leaveform from "./leave-form";
import metadatacontent from "./metadatacontent";
import metadatafeeconcession from "./metadatafeeconcession";
import metadataschema from "./metadataschema";
import metadatastaticcollection from "./metadatastaticcollection";
import paymentIntegration from "./payment-integration";
import roles from "./role-management";
import student from "./student";
import timetable from "./timetable";
import user from "./user";

const router = new Router();

router.use("/users", user);
router.use("/api-docs", swagger);
router.use("/metadatacontents", metadatacontent);
router.use("/catalogues", catalogue);
router.use("/metadatastaticcollections", metadatastaticcollection);
router.use("/metadataschemas", metadataschema);
router.use("/metadatafeeconcessions", metadatafeeconcession);
router.use("/applications", application);
router.use("/payment-integrations", paymentIntegration);
router.use("/admin-configs", adminConfigs);
router.use("/documents", document);
router.use("/students", student);
router.use("/employees", employee);
router.use("/institutes", institute);
router.use("/instituteworkinghours", instituteWorkingHours);
router.use("/fees", fees);
router.use("/roles", roles);
router.use("/leave-form", leaveform);
router.use("/timetable", timetable);

export default router;
