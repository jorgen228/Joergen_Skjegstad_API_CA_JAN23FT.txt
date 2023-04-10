const express = require("express");
const request = require("supertest");
const app = express();
require("dotenv").config();

const bodyParser = require("body-parser");

const authRoutes = require("../routes/auth");
const todoRoutes = require("../routes/todo");

app.use(bodyParser.json());

app.use("/", authRoutes);
app.use("/todo", todoRoutes);

describe("testing-authorization-routes", () => {
  // test user is already created. Email: "testUser@gmail.com", Password: "testing"
  let token;
  test("POST /login - success", async () => {
    const credentials = {
      email: "testUser@gmail.com",
      password: "testing",
    };
    const { body } = await request(app).post("/login").send(credentials);
    expect(body).toHaveProperty("data");
    expect(body.data).toHaveProperty("token");
    token = body.data.token;
    console.log(token);
  });

  test("GET /todo - success", async () => {
    const { body } = await request(app)
      .get("/todo")
      .set("Authorization", "Bearer " + token);
    expect(body).toHaveProperty("data");
    expect(body.status).toBe("success");
  });

  test("POST /todo - success", async () => {
    const credentials = {
      name: "dusting",
      category: 1,
    };
    const { body } = await request(app)
      .post("/todo")
      .send(credentials)
      .set("Authorization", "Bearer " + token);
    expect(body).toHaveProperty("data");
    expect(body.status).toBe("success");
    expect(body.data.message).toBe("New item created!");
  });

  test("DELETE /todo - success", async () => {
    const credentials = {
      name: "dusting",
    };
    const { body } = await request(app)
      .delete("/todo")
      .send(credentials)
      .set("Authorization", "Bearer " + token);
    expect(body).toHaveProperty("data");
    expect(body.status).toBe("success");
    expect(body.data.message).toBe("Item deleted");
  });

  test("GET /todo - fail", async () => {
    const { body } = await request(app).get("/todo");
    expect(body).toHaveProperty("data");
    expect(body.status).toBe("fail");
    expect(body.data.message).toBe(
      "You need to be logged in to utilise this feature!"
    );
  });

  test("GET /todo - fail", async () => {
    const { body } = await request(app)
      .get("/todo")
      .set("Authorization", "Bearer " + token + "Thiswillfail");
    expect(body).toHaveProperty("data");
    expect(body.status).toBe("fail");
    expect(body.data.error).toBe("Invalid JsonWebtoken.");
  });
});
