require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const puppeteer = require("puppeteer");
const app = express();
const morgan = require("morgan");
const handleMail = require("../server/controllers/handleMail");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.post("/visitor", (req, res) => {
  const data = req.body;
  try {
    if (Object.entries(data).length !== 0) {
      handleMail.sendMail(data.email, data.name);
      handleMail.mailMe(data.name, data);
      res.contentType("json");
      res
        .status(200)
        .send({ success: "Message sent. I'll get back to you ASAP. Thanks" });
      return;
    }
    res.status(400).send("An unexpected error occured");
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/Adebowale-Adetunji", async (req, res) => {
  const url = req.query.target;

  try {
    const browser = await puppeteer.launch({
      headless: true,
    });

    const webPage = await browser.newPage();
    await webPage.setViewport({
      width: 1200,
      height: 800,
      deviceScaleFactor: 2,
    });

    await webPage.goto(url, {
      waitUntil: "networkidle0",
    });

    const pdf = await webPage.pdf({
      printBackground: true,
      format: "A4",
    });

    await browser.close();

    res.contentType("application/pdf");
    res.send(pdf);
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(process.env.PORT || 4000, () => {
  console.log("Server started");
});
