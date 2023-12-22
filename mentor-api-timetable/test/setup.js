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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const mongoose_1 = __importDefault(require("../src/common/mongoose"));
const { MongoMemoryServer } = require("mongodb-memory-server");
// Increase Jest's default timeout to handle long-running tests
jest.setTimeout(120000);
// Set the maximum number of event listeners to avoid potential memory leaks
events_1.EventEmitter.defaultMaxListeners = Infinity;
// Optional: You can remove global assignments if not needed in your tests
// ...
let mongoServer;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        mongoServer = new MongoMemoryServer();
        const mongoUri = yield mongoServer.getUri();
        yield mongoose_1.default.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to the in-memory database");
    }
    catch (err) {
        console.error("Error connecting to the database:", err);
        throw err; // Rethrow the error to fail the test setup
    }
}));
afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
    const { collections } = mongoose_1.default.connection;
    const promises = Object.keys(collections).map((collection) => __awaiter(void 0, void 0, void 0, function* () {
        const model = collections[collection];
        if (model.deleteMany) {
            yield model.deleteMany({});
        }
    }));
    yield mongoose_1.default.connection.dropDatabase();
    try {
        yield Promise.all(promises);
        console.log("After each - Cleanup successful");
    }
    catch (error) {
        console.error("Error during cleanup:", error);
    }
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.disconnect();
        yield mongoServer.stop();
        console.log("After all - Disconnected from the in-memory database");
    }
    catch (error) {
        console.error("Error during teardown:", error);
    }
}));
