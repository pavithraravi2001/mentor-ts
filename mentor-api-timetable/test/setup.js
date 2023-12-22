import { EventEmitter } from "events";
import MongodbMemoryServer from "mongodb-memory-server";
import mongoose from "../src/common/mongoose";
const { MongoMemoryServer } = require("mongodb-memory-server");

// Increase Jest's default timeout to handle long-running tests
jest.setTimeout(120000);

// Set the maximum number of event listeners to avoid potential memory leaks
EventEmitter.defaultMaxListeners = Infinity;

// Optional: You can remove global assignments if not needed in your tests
// ...

let mongoServer;

beforeAll(async () => {
  try {
    mongoServer = new MongoMemoryServer();
    const mongoUri = await mongoServer.getUri();
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the in-memory database");
  } catch (err) {
    console.error("Error connecting to the database:", err);
    throw err; // Rethrow the error to fail the test setup
  }
});

afterEach(async () => {
  const { collections } = mongoose.connection;
  const promises = Object.keys(collections).map(async (collection) => {
    const model = collections[collection];
    if (model.deleteMany) {
      await model.deleteMany({});
    }
  });
 await mongoose.connection.dropDatabase();
  try {
    await Promise.all(promises);
    console.log("After each - Cleanup successful");
  } catch (error) {
    console.error("Error during cleanup:", error);
  }
});

afterAll(async () => {
  try {
    await mongoose.disconnect();
    await mongoServer.stop();
    console.log("After all - Disconnected from the in-memory database");
  } catch (error) {
    console.error("Error during teardown:", error);
  }
});
