const express = require("express");
const router = express.Router();
const location = require("../models/locations.model");
module.exports = router;

router.get("/", async (req, res) => {
  await location
    .getLocations()
    .then((locations) => res.json(locations))
    .catch((err) => {
      if (err.status) {
        res.status(err.status).json({ message: err.message });
      } else {
        res.status(500).json({ message: err.message });
      }
    });
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  await location
    .getLocationById(id)
    .then((post) => res.json(post))
    .catch((err) => {
      if (err.status) {
        res.status(err.status).json({ message: err.message });
      } else {
        res.status(500).json({ message: err.message });
      }
    });
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  await location
    .updateLocation(id, req.body)
    .then((location) =>
      res.json({
        message: `The post #${id} has been updated`,
        content: location,
      })
    )
    .catch((err) => {
      if (err.status) {
        res.status(err.status).json({ message: err.message });
      }
      res.status(500).json({ message: err.message });
    });
});

router.post("/", async (req, res) => {
  await post
    .insertPost(req.body)
    .then((post) =>
      res.status(201).json({
        message: `The post #${post.id} has been created`,
        content: post,
      })
    )
    .catch((err) => res.status(500).json({ message: err.message }));
});
