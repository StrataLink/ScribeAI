const express = require("express");
// const User = require("../models/User.js") might need in the future.
const Entry = require("../models/Entry.js")

const router = express.Router();

router.post("/add-entry", async(req, res) => {
    try {
        const newEntry = await Entry.create({
            user: req.body.user,
            title: req.body.title, // todo, make this alliteration.
            rawDesc: "",
            summarizedDesc: "",
        })
        res.status(200).json({message: "Successfully created new entry.", data: newEntry});
    }
    catch (e) {
        console.error(e);
        res.status(404).json({message: "Failed creating new entry.", error: e});
    }
});

router.get("/get-entries", async(req, res) => {
    try {
        const all = await Entry.find();
        const response = {
            message: "Successful got all entries",
            data: all,
        }
        res.status(200).json(response);
    }
    catch (e) {
        console.error(e)
        res.status(404).json({message: "Unable to retrieve entries"});
    }
});

router.delete("/delete-entry/:id", async (req, res) => {
  try {
    const entry = await Entry.findByIdAndRemove(req.params.id);
    if (entry) {
      res.status(200).json({ message: "Entry successfully deleted." });
    } else {
      res.status(404).json({ message: "Entry not found." });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error while deleting the entry." });
  }
});

router.patch("/update-entry/:id", async(req, res) => {
    try {
        const updatedEntry = await Entry.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true },
        );
        if (updatedEntry) {
            res.status(200).json(updatedEntry)
        }
        else {
            res.status(404).json({message: "Entry not found."})
        }
    }
    catch (e) {
        console.error(e);
        res.status(500).json({message: "Error updating entry."})
    }
})

module.exports = router;