import express from "express";

const app = express();
app.use(express.json());

app.post("/lol/zal", async (req, res) => {
  try {
    res.status(200).send("OK");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(process.env.PORT || 8080, () => {
  console.log("Service nameOfTheSerivce running");
});
