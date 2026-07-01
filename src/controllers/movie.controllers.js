import Movie from "../models/movie.model.js";
import { Op } from "sequelize";

export const getAllMovies = async (req, res) => {
  const movies = await Movie.findAll();
  res.json(movies);
};

export const createMovie = async (req, res) => {
  const { title, genre, duration, year, synopsis } = req.body;
  const currentYear = new Date().getFullYear();

  if (!title || !genre || !duration || !year) {
    return res.status(400).json({ message: "Campos obligatorios faltantes" });
  }

  if (!Number.isInteger(duration) || duration <= 0) {
    return res.status(400).json({ message: "Duración inválida" });
  }

  if (!Number.isInteger(year) || year < 1888 || year > currentYear) {
    return res.status(400).json({ message: "Año fuera de rango permitido" });
  }

  try {
    const exists = await Movie.findOne({ where: { title } });
    if (exists) return res.status(400).json({ message: "El título ya existe" });

    const newPeli = await Movie.create(req.body);
    res.status(201).json(newPeli);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const updateMovie = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const movie = await Movie.findByPk(id);
  if (!movie)
    return res.status(404).json({ message: "Película no encontrada" }); // [7]

  if (title) {
    const exists = await Movie.findOne({
      where: { title, id: { [Op.ne]: id } },
    });
    if (exists)
      return res.status(400).json({ message: "El título ya está en uso" });
  }

  await movie.update(req.body);
  res.json(movie);
};

export const deleteMovie = async (req, res) => {
  const movie = await Movie.findByPk(req.params.id);
  if (!movie)
    return res.status(404).json({ message: "Película no encontrada" }); // [7]
  await movie.destroy();
  res.json({ message: "Eliminada" });
};
