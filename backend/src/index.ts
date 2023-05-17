import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello,, Init project works");
});

const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
