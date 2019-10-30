const axios = require("axios");
const cors = require("cors");
const express = require("express");
const path = require("path");

require("dotenv").config();

const { googleConfig, colormindConfig } = require("./config");

const app = express();

app.use(
  cors({
    credentials: true
  })
);

const printError = error => {
  if (error.response) {
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    console.log(error.request);
  } else {
    console.log("Error", error.message);
  }
  console.log(error.config);
};

const result = {
  colors: undefined,
  fonts: undefined
};

app.get("/api", async (req, res) => {
  result.colors = await axios(colormindConfig)
    .then(res => res.data.result)
    .then(data => {
      if (data === undefined) throw new Error("EMPTY RESPONSE");
      return data;
    })
    .catch(error => {
      printError(error);
    });

  if (result.fonts) {
    return res.json(result);
  }

  result.fonts = await axios(googleConfig)
    .then(res => res.data)
    .then(data => data.items)
    .catch(error => {
      printError(error);
    });

  res.json(result);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

const handleNotFound = (req, res, next) => {
  res.status(404);
  const error = new Error("Not Found");
  next(error);
};

const handleError = (error, req, res, next) => {
  res.status(res.statusCode || 500);
  res.json({
    message: error.message
  });
};

app.use(handleNotFound);
app.use(handleError);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
