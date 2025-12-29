import express, { Request, Response } from "express";

const app = express();
const PORT = process.env.PORT || 3000;

// /api/whoami route
app.get("/api/whoami", (req: Request, res: Response) => {
  res.json({
    ipaddress: req.ip,
    language: req.headers["accept-language"],
    software: req.headers["user-agent"],
  });
});

// Starting the server
app.listen(PORT, () => {
  console.log(
    `Request Header Parser Microservice is running on port ${PORT} 🚀`,
  );
});
