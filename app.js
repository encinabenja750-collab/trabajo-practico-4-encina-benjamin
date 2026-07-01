import express from "express";
import sequelize from "./src/config/database.js";
import movieRoutes from "./src/routes/movie.routes.js";

const app = express();
app.use(express.json());
app.use("/api/movies", movieRoutes);

await sequelize.sync();
app.listen(3000, () => console.log("Servidor en puerto 3000"));
