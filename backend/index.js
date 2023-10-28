const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

// Schema
const schemaData = mongoose.Schema(
  {
    name: String,
    email: String,
    mobile: String,
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("user", schemaData);

// =================read data===============================
app.get("/", async (req, res) => {
  const data = await userModel.find({});
  res.json({ success: true, data: data });
});
// ========== search api ===========
app.get("/search/:key", async (req, res) => {
  let data = await userModel.find({
    $or: [
      { name: { $regex: req.params.key } },
      { email: { $regex: req.params.key } },
      { mobile: { $regex: req.params.key } },
    ],
  });
  res.send(data);
});

// =====================create data/ sava data to mongodb==============
app.post("/create", async (req, res) => {
  console.log(req.body);
  const data = new userModel(req.body);
  await data.save();
  res.send({ success: true, message: "data save successfully", data: data });
});

// ====================Edit or Update data======================
app.put("/update", async (req, res) => {
  console.log(req.body);
  const { _id, ...rest } = req.body;
  console.log(rest);
  const data = await userModel.updateOne({ _id: _id }, rest);
  res.send({ success: true, message: "data updated successfully", data: data });
});

// ======================delete data===========================
app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const data = await userModel.deleteOne({ _id: id });
  res.send({ success: true, message: "data deleted successfully", data: data });
});

mongoose
  .connect("mongodb://127.0.0.1:27017/crudoperation")
  .then(() => {
    console.log("connected to database");
    app.listen(PORT, () => console.log("server is running at 8080 "));
  })
  .catch((err) => console.log(err));
