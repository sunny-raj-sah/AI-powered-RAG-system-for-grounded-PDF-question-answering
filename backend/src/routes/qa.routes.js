const router = require("express").Router();
const { askQuestion } = require("../controllers/qa.controller");

router.post("/ask", askQuestion);

module.exports = router;
