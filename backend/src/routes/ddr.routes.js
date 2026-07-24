const router = require("express").Router();
const upload = require("../middlewares/upload.middleware");
const { generateDDR } = require("../controllers/ddr.controller");

/**

* Upload two PDFs:
* inspectionReport
* thermalReport
  */
  router.post(
  "/generate",
  upload.fields([
  { name: "inspectionReport", maxCount: 1 },
  { name: "thermalReport", maxCount: 1 },
  ]),
  generateDDR
  );

module.exports = router;
