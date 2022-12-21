import express from "express";
import serveIndex from "serve-index";

const app = express();
const wwwDir = ".";
const port = process.env.AGS_PORT || 3000;

app.use(express.static(wwwDir));
app.use(serveIndex(wwwDir, { icons: true }));

app.listen(3000, () => {
  console.log(`Successfully started on port ${port}`);
});
