const express = require("express");

const serveless = require("serverless-http");

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
// https://stackoverflow.com/questions/70319209/cant-resolve-nodehttp
// Obliger d'utiliser la v2 ...

const app = express();

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    hello: "hi",
  });
});

// Top playlists
router.get("/playlists/top/:limit", (req, res) => {
  fetch(
    "https://api.deezer.com/chart/0/playlists?limit=" + req.params.limit,
    {}
  )
    .then((data) => data.json())
    .then((json) => {
      res.send(json);
    });
});

// One playlist
router.get("/api/playlists/:id", (req, res) => {
  fetch("https://api.deezer.com/playlist/" + req.params.id, {})
    .then((data) => data.json())
    .then((json) => {
      res.send(json);
    });
});

app.use("/.netlify/functions/api", router);

module.exports.handler = serveless(app);
