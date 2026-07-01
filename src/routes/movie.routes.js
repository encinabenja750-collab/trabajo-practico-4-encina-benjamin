import { Router } from "express";
import * as ctrl from "../controllers/movie.controllers.js";
const router = Router();

router.get("/", ctrl.getAllMovies);
router.post("/", ctrl.createMovie);
router.put("/:id", ctrl.updateMovie);
router.delete("/:id", ctrl.deleteMovie);

export default router;
