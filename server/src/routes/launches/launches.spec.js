const request = require("supertest");
const app = require("../../app");

describe("test all get route", () => {
  test("get launches", async () => {
    await request(app)
      .get("/launches")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});

describe("test post route", () => {
  const completeBody = {
    mission: "Secret Mission",
    rocket: "kui rocket",
    target: "kjl hamilton",
    launchDate: "January 1, 2028",
  };

  const bodyWithoutDate = {
    mission: "Secret Mission",
    rocket: "kui rocket",
    target: "kjl hamilton",
  };

  test("save launch", async () => {
    const response = await request(app)
      .post("/launches")
      .send(completeBody)
      .expect(201);

    const requestDate = new Date(completeBody.launchDate).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();

    console.log(requestDate, responseDate);

    expect(requestDate).toBe(responseDate);

    expect(response.body).toMatchObject(bodyWithoutDate);
  });

  test("launch required Property test", async () => {
    const response = await request(app)
      .post("/launches")
      .send(bodyWithoutDate)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({ error: "all fields are required" });
  });

  test("launch check invalid date status code 400", async () => {
    const response = await request(app)
      .post("/launches")
      .send({
        mission: "Secret Mission",
        rocket: "kui rocket",
        target: "kjl hamilton",
        launchDate: "Zedoot",
      })
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({ error: "invalid Date" });
  });
});
