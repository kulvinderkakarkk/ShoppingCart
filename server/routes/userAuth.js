import express from "express";
import call from "../api/call.js";

import { constants } from "../utils/constant.js";
const authRouter = express.Router();

authRouter.post("/login", async (req, res) => {
  console.log("login page called");
  const username = req.body.username;
  const password = req.body.password;

  const url = constants.LOGIN_URL;
  const method = "POST";
  const body = JSON.stringify({
    username: username,
    password: password,
    // expiresInMins: 60, // optional
  });
  const header = { "Content-Type": "application/json" };
  const response = await call(url, method, header, body);
  res.send({ body: response });
});

authRouter.get("/validate", async (req, res) => {
  const url = constants.VALIDATE;
  const headers = {
    Authorization: req.headers.authorization.split("Bearer ")[1],
  };
  const method = "GET";
  const response = await call(url, method, headers);
  res.send({body: response});
});

export default authRouter;
