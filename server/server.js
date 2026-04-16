import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { WebSocketServer } from "ws";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Serve frontend build
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

// WebSocket price server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
  console.log("Server running on", PORT)
);

const wss = new WebSocketServer({ server });

let price = 30000;

setInterval(() => {
  price += (Math.random() - 0.5) * 100;
  const data = JSON.stringify({
    type: "price",
    price: price.toFixed(2),
  });

  wss.clients.forEach((c) => {
    if (c.readyState === 1) c.send(data);
  });
}, 1000);