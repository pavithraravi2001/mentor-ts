import http from "http";
import api from "./api";
import express from "./common/express";
import mongoose from "./common/mongoose";
import { apiRoot, env, ip, mongo, port } from "./config";

const app = express(apiRoot, api);
const server = http.createServer(app);

// Polyfill for allseetled
if (!Promise.allSettled) {
  Promise.allSettled = (promises) =>
    Promise.all(
      promises.map((promise, i) =>
        promise
          .then((value) => ({
            status: "fulfilled",
            value,
          }))
          .catch((reason) => ({
            status: "rejected",
            reason,
          }))
      )
    );
}

if (mongo.uri) {
  mongoose.connect(mongo.uri);
}
mongoose.Promise = Promise;

setImmediate(() => {
  server.listen(port, ip, () => {
    console.log(
      "Express server listening on http://%s:%d, in %s mode",
      ip,
      port,
      env
    );
  });
});

export default app;
