const express = require("express")
const verifyToken = require("../middlewares/verifyToken")
const { createMood } = require("../controllers/user/createMood")
const { getLatestMood } = require("../controllers/user/getLatesMood")
const { getMoodLastWeek } = require("../controllers/user/getMoodLastWeek")
const { deleteMood } = require("../controllers/user/deleteMood")
const { getAllMoods } = require("../controllers/user/getAllMoods")
const userRoutes = express.Router()

// Mood apis
userRoutes.post("/mood", verifyToken, createMood)
userRoutes.get("/mood", verifyToken, getAllMoods)
userRoutes.get('/mood/latest', verifyToken, getLatestMood);
userRoutes.get('/mood/week', verifyToken, getMoodLastWeek);
userRoutes.delete('/mood/:id', verifyToken, deleteMood);

// Journal apis
userRoutes.get("/", getJournals);
userRoutes.get("/:id", getJournalById);
userRoutes.post("/", createJournal);
userRoutes.delete("/:id", deleteJournal);

module.exports = userRoutes