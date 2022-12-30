import express from "express";
import serveIndex from "serve-index";
import { api } from "./api";

const app = express();
const wwwDir = "../front/dist/front";
const port = process.env.AGS_PORT || 3000;

app.use("/api", api);

app.get("/", (req, res) => {
  const supportedLanguages = ["en-US", "fr"];
  const clientLanguages = req.headers["accept-language"]
    ?.split(",")
    .map((str) => str.split(";")[0].trim());
  console.log("clientLanguage: ", clientLanguages);
  if (clientLanguages) {
    for (const lang of clientLanguages) {
      if (supportedLanguages.includes(lang)) {
        res.redirect("/" + lang);
        return;
      }
    }
  }

  res.redirect("/fr");
});

app.use(express.static(wwwDir));
app.use(serveIndex(wwwDir, { icons: true }));

app.get("/:lang/*", (req, res) => {
  res.sendFile("index.html", { root: wwwDir + "/" + req.params.lang });
});

app.listen(3000, () => {
  console.log(`Successfully started on port ${port}`);
});
