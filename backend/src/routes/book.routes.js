const router = require("express").Router();
const upload = require("../middlewares/upload.middleware");
const { uploadBook } = require("../controllers/book.controller");

router.post("/upload", upload.single("book"), uploadBook);

module.exports = router;
