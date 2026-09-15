// Minimal static dev server for the design canvas.
//   node server.js  ->  http://localhost:5173
const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const PORT = Number(process.env.PORT) || 5173;
const ENTRY = "Praksis Amin.dc.html";

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

http
  .createServer((req, res) => {
    const url = decodeURIComponent(req.url.split("?")[0]);
    const rel = url === "/" ? ENTRY : url.replace(/^\/+/, "");
    const file = path.join(ROOT, rel);

    // Keep requests inside the project directory.
    if (!file.startsWith(ROOT)) {
      res.writeHead(403).end("Forbidden");
      return;
    }

    fs.readFile(file, (err, buf) => {
      if (err) {
        res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
        res.end("Not found: " + rel);
        return;
      }
      res.writeHead(200, {
        "content-type": TYPES[path.extname(file).toLowerCase()] || "application/octet-stream",
        "cache-control": "no-store",
      });
      res.end(buf);
    });
  })
  .listen(PORT, () => {
    console.log("Praksis Amin -> http://localhost:" + PORT);
  });
