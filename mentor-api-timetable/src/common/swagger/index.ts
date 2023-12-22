import { Router } from "express";
import { SWAGGER_API_HOST } from "../../config";
const path = require("path");
const router = new Router();
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const yamlPath = path.join(__dirname, "/swagger.yaml");
const swaggerDocument = YAML.load(yamlPath);
swaggerDocument.host = SWAGGER_API_HOST;
router.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default router;
