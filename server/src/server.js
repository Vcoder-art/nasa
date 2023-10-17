const https = require("https");
const app = require("./app");
const fs = require("fs");
const {join} = require("path")
const { planets } = require("./modal/planets.modal");

const PORT = process.env.PORT || 8000;
const server = https.createServer(
  {
    cert: fs.readFileSync(join(__dirname, "..", "cert.pem")),
    key: fs.readFileSync(join(__dirname, "..", "key.pem"))
  },
  app
);

planets.then((res) => {
  server.listen(PORT, () => {
    console.log("server is started on PORT " + PORT);
  });
});
