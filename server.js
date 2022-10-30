const smart = require("fhirclient");
const session = require("express-session");
const fhirJs = require("fhir.js");
const app = require("express")();

// The SMART state is stored in a session. If you want to clear your session
// and start over, you will have to delete your "connect.sid" cookie!
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false
  })
);

// The settings that we use to connect to our FHIR server
const smartSettings = {
  redirectUri: "/app",
  iss: "http://hapi.fhir.org/baseR4"
};

app.get("/", (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin: ', 'http://localhost:3001')
  smart(req, res).authorize(smartSettings).catch(next);
});

app.get("/app", async (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin: ', 'http://localhost:3001')
  const client = await smart(req, res).ready();
  client.connect(fhirJs);
  client.api
    .search({ type: "Patient" })
    .then((data) => res.end(JSON.stringify(data, null, 4)))
    .catch(next);
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(8080);
