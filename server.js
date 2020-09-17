//kaasame ja lähtestame express frameworki oma projekti juurde
const express = require("express");

//kaasame ja lähtestame body-parseri oma projekti juurde
const bodyParser = require("body-parser");

//loome ja lähtestame express applicationi
const app = express();

//body andmete parssimine automaatselt
app.use(bodyParser.urlencoded({ extended: true })); //node koolitusel oli siin  false vaaryuseks

//liidame juurde html file
app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});

//ligipaas style.css filele
app.use(express.static(__dirname + "/"));

app.post("/", function (request, response) {
  console.log(request.body);
  let pikkus = Number(request.body.pikkus);
  let kaal = Number(request.body.kaal);
  let ymardamatatulemus = kaal / (pikkus * pikkus);
  let tulemus = ymardamatatulemus.toFixed(2);

  if (tulemus < 18.99) {
    response.send(
      `Sinu <b>kehamassiindeks</b> on <b>${tulemus}, Sa oled alakaaluline</b>. <br><br>Teatud alakaal iseenesest ei ole tervisele ohtlik, kuid kõikide organismile vajalike toitainete puudus võib põhjustada ohtliku terviserikke.`
    );
  } else if (tulemus > 19 && tulemus < 24.99) {
    response.send(
      `Sinu <b>kehamassiindeks</b> on <b>${tulemus}, Sa oled normaalkaalus</b>. <br><br>Meditsiinilisi põhjuseid kaalu alandamiseks ei ole, kuid soovitame Sul kaalu sellel tervislikul nivool hoida ning analüüsida, kas Sinu toitumine sisaldab kõiki vajalikke aineid piisavalt.`
    );
  } else if (tulemus > 25 && tulemus < 29.99) {
    response.send(
      `Sinu <b>kehamassiindeks</b> on <b>${tulemus}, Sa oled ülekaaluline</b>. <br><br>Sul on oht haigestuda ülekaalust põhjustatud haigustesse nagu diabeet ning südame-veresoonkonna haigused. Soovitame Sul Kaaluabi.ee abil jälgida oma igapäevast toitumist ning langetada kehakaalu.`
    );
  } else {
    response.send(
      `Sinu <b>kehamassiindeks</b> on <b>${tulemus}, Sa oled rasvunud</b>. <br><br>Sul on suur risk haigestuda südame- ja veresoonkonna haigustesse, kõrgesse vererõhku ja diabeeti. Seepärast soovitame Sul tõsiselt oma ülekaalu vähendamisega tegeleda.`
    );
  }
});

//loome serveri ja callback funktsiooni
app.listen(3000, function () {
  console.log("Serveri asukoht on port: 3000");
});
