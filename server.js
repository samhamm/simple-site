var express = require("express"),
  http = require("http"),
  app = express();

// app.get("/", function (req, res) {
//   res.send("OH HAI UNIVERSE!")
// });

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/hello.html")
});

app.get("/inspiration", function (req, res) {
  var messages = [
    "You can't always get what you want.",
    "The more you live, the more you love.",
    "There's always a kitteh at the end of the day."];
  var msgIndex = Math.floor(Math.random() * messages.length);
  res.send(messages[msgIndex]);
});

app.get("/joke", function (req, res) {
  var jokes = [
    { "setup": "Why do dogs lick their balls?",
      "punchline": "Because they can."},
    { "setup": "How many tuba players does it take to change a light bulb?",
      "punchline": "Two. One to drink the keg, and one to hold the light bulb while the room spins."}
  ];
  var jokeIndex = Math.floor(Math.random() * jokes.length);
  res.json(jokes[jokeIndex]);
});

console.log("The server is starting, and it is available at http://localhost:3000");
http.createServer(app).listen(process.env.PORT || 3000);
// app.listen(3000);

// PAGE 48 - Rotates an inspirational message every second
// setInterval(function() {
// $.get("http://localhost:3000/inspiration", function (response) {
//   $("body").text(response);
// });
// }, 1000);
