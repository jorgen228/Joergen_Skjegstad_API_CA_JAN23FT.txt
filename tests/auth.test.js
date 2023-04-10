const express = require("express");
const request = require("supertest");
const app = express();
require("dotenv").config();

const bodyParser = require("body-parser");

const authRoutes = require("../routes/auth");

app.use(bodyParser.json());

app.use("/", authRoutes);

describe("testing-authorization-routes", () => {
  
})