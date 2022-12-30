import { json, Router } from "express";
import { Article, NewArticle } from "./interfaces/article";

const ANGULAR_SPECIFIC_TOKEN = "Angular123!";

const generateId = () =>
  Date.now() + "_" + (Math.random() * 1e9).toFixed().padStart(10, "0");

let articles: Article[] = [
  { id: "a1", name: "Tournevis", price: 2.99, qty: 123 },
  { id: "a2", name: "Pelle", price: 5.4, qty: 51 },
];

const app = Router();

app.use("/articles", (req, res, next) => {
  if (req.headers.authorization !== "Bearer " + ANGULAR_SPECIFIC_TOKEN) {
    res.status(401).end("need authorization token");
    return;
  }
  next();
});

app.get("/articles", (req, res) => {
  res.json(articles);
});

app.use(json());

app.post("/articles", (req, res) => {
  const newArticle: NewArticle = req.body;
  const id = generateId();
  const article = { ...newArticle, id };
  articles.push(article);
  res.json({ id });
});

app.delete("/articles", (req, res) => {
  const ids: string[] = req.body;
  articles = articles.filter((a) => !ids.includes(a.id));
  res.status(204).end();
});

app.get("/options/articleNames", (req, res) => {
  res.json(["Tournevis", "Pelle", "Marteau", "Rateau"]);
});

app.post("/forbiddenValues", (req, res) => {
  const value: string = req.body.value;
  if (["bad", "stuff"].includes(value.toLowerCase())) {
    res.json({ result: false, message: "bad word" });
    return;
  }
  res.json({ result: true });
});

export const api = app;
