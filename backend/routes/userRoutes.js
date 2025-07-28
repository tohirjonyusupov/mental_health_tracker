const express = require("express")
const verifyToken = require("../middlewares/verifyToken")
// const { createMood } = require("../controllers/user/mood/createMood")
const { getLatestMood } = require("../controllers/user/mood/getLatesMood")
const { getMoodLastWeek } = require("../controllers/user/mood/getMoodLastWeek")
const { deleteMood } = require("../controllers/user/mood/deleteMood")
const { getAllMoods } = require("../controllers/user/mood/getAllMoods")
const { getJournals } = require("../controllers/user/journal/getJournal")
const { getJournalById } = require("../controllers/user/journal/getJournalById")
const { createJournal } = require("../controllers/user/journal/createJournal")
const { deleteJournal } = require("../controllers/user/journal/deleteJournal")
const { createMood } = require("../controllers/user/mood/createMood")
const userRoutes = express.Router()

// Mood apis
userRoutes.post("/mood", verifyToken, createMood)
userRoutes.get("/mood", verifyToken, getAllMoods)
userRoutes.get('/mood/latest', verifyToken, getLatestMood);
userRoutes.get('/mood/week', verifyToken, getMoodLastWeek);
userRoutes.delete('/mood/:id', verifyToken, deleteMood);

// Journal apis
userRoutes.get("/journal", verifyToken, getJournals);
userRoutes.get("/journal/:id", verifyToken, getJournalById);
userRoutes.post("/journal", verifyToken, createJournal);
userRoutes.delete("/journal/:id", verifyToken, deleteJournal);

module.exports = userRoutes