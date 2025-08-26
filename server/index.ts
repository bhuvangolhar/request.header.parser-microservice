import express, { Request, Response } from "express";

const app = express();

// Root route (optional welcome message)
app.get("/", (req: Request, res: Response) => {
  res.send("Request Header Parser Microservice is running 🚀");
});

// /api/whoami route
app.get("/api/whoami", (req: Request, res: Response) => {
  res.json({
    ipaddress: req.ip,
    language: req.headers["accept-language"],
    software: req.headers["user-agent"],
  });
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
