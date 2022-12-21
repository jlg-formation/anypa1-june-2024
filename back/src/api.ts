import { Router } from "express";
import { Article } from "./interfaces/article";

const articles: Article[] = [
  { id: "a1", name: "Tournevis", price: 2.99, qty: 123 },
  { id: "a2", name: "Pelle", price: 5.4, qty: 51 },
];

const app = Router();

app.get("/articles", (req, res) => {
  res.json(articles);
});

export const api = app;
