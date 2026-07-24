const express = require("express");
const cors = require("cors");

const bookRoutes = require("./routes/book.routes");
const qaRoutes = require("./routes/qa.routes");
const ddrRoutes = require("./routes/ddr.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/book", bookRoutes);
app.use("/api/qa", qaRoutes);
app.use("/api/ddr", ddrRoutes);

module.exports = app;
