import express from "express";
import { v4 as uuidv4 } from "uuid";

const app = express();

app.use(express.json());

let data = [];

app.post("/", (req, res) => {
  const dataCreate = { ...req.body, id: uuidv4() };
  data.push(dataCreate);
  return res.status(201).json(data);
});

app.get("/", (req, res) => {
  return res.status(200).json(data);
});

app.get("/:id", (req, res) => {
  const id = req.params.id;
  const dataFind = data.find((item) => item.id === id);
  return res.status(200).json(dataFind);
});

app.put("/:id", (req, res) => {
  const id = req.params.id;
  let index;
  const dataUpdate = data.find((item, i) => {
    index = i;
    return item.id === id;
  });
  data.splice(index, 1);
  data.push({ ...dataUpdate, ...req.body });
  return res.status(200).json(data);
});

app.delete("/:id", (req, res) => {
  const id = req.params.id;
  let index;
  const elemento = data.find((item, i) => {
    index = i;
    return item.id === id;
  });

  if (elemento) {
    data.splice(index, 1);
    return res.status(200).json(data);
  } else {
    return res.status(404).json({ message: "Elemento não encontrado" });
  }
});

app.listen(4000, () => {
  console.log("Server up and running on port: 4000");
});
