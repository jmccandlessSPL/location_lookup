const express = require("express");
const app = express();
const port = process.env.PORT || 3785;
const cors = require("cors");

app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  res.send({ express: "backend connected to react" });
});

app.listen(port, () => console.log(`Listening on port: ${port}`));
