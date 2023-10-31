const path = require("path");
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
const bodyParser = require("body-parser");
const port = 5000;
const dataFilePath = "E:/Personal-Projects/WebD/MERN/ern-user-table/data.json";
const { promises: fsPromises } = require("fs");

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let lastNum = 0;

const updateLastNum = () => {
  const date = new Date();

  if (
    date.getHours() === 0 &&
    date.getMinutes() === 0 &&
    date.getSeconds() === 0
  ) {
    lastNum = 0;
  }
};

setInterval(updateLastNum, 1000);

const generateUserId = () => {
  const date = new Date().toLocaleDateString("en-IN");
  lastNum += 1;
  return date + "-" + lastNum;
};


app.get("/api/data", async (req, res) => {
  try {
    const fileExists = await fsPromises
      .access(dataFilePath)
      .then(() => true)
      .catch(() => false);

    if (fileExists) {
      const data = await fsPromises.readFile(dataFilePath, "utf-8");
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } else {
      console.log("Data file does not exist or could not be accessed.");
      res.json([]);
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/api/data", async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;

    let existingData = [];
    try {
      const data = await fsPromises.readFile(dataFilePath);
      existingData = JSON.parse(data);
    } catch (error) {
      if (error.code !== "ENOENT") {
        throw error;
      }
    }

    const newEntry = {
      key: generateUserId(), // Assigning a key based on the length of existing data
      firstName,
      lastName,
      email,
    };

    existingData.push(newEntry);

    await fsPromises.writeFile(
      dataFilePath,
      JSON.stringify(existingData, null, 2)
    );

    res.send("Data successfully added!");
  } catch (error) {
    // Handle any errors here
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/api/update", (req, res) => {
  const updatedData = req.body.updatedData;
  const editIndex = req.body.editIndex;
  const key = req.body.key;
  updatedData[editIndex].key = key;
  fs.writeFileSync(dataFilePath, JSON.stringify(updatedData, null, 2));
  res.send("Data successfully updated!");
});

app.post("/api/delete", (req, res) => {
  const index = req.body.index;
  let existingData = [];
  if (fs.existsSync(dataFilePath)) {
    existingData = JSON.parse(fs.readFileSync(dataFilePath));
    existingData.splice(index, 1);
    fs.writeFileSync(dataFilePath, JSON.stringify(existingData, null, 2));
    res.send("Data successfully deleted!");
  } else {
    res.send("No data found to delete.");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
