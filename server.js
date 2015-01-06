var express = require("express"),
    http = require("http"),
    // bodyParser = require("body-parser"), // not included, so not needed?
    sql = require("sqlite3"), // puts the sqlite interface into a variable
    dbPath = __dirname + "/simple-site.sql", // changed per instructions on slide 27
    db = null, //this receives a value at the very end, after server is running
    app = express(), // ??? cannot find where this function is
    PORT = process.env.PORT || 3000; // ?sets default port of 3000?

function serverSetup() {
  app.use("/", express["static"]("app"));
  app.use("/app", express["static"]("app"));
  app.use("/test", express["static"]("test"));
  app.use("/node_modules", express["static"]("node_modules"));
  // app.use(bodyParser()); // not needed (throws error)? see line 3

  app.get("/notes", function (req, res) {
  db.prepare("select * from notes")
    .all(function (err, rows) {
      res.json(rows);
      // console.log(res.json(rows)); // per instructions on slide 28
    });
});

app.get("/", function (req, res) {
  res.send("OH HAI UNIVERSE!")
});

// app.get("/", function (req, res) {
//   res.sendFile(__dirname + "/hello.html")
// });

app.get("/inspiration", function (req, res) {
  var messages = [
    "You can't always get what you want.",
    "The more you live, the more you love.",
    "There's always a kitteh at the end of the day."];
  var msgIndex = Math.floor(Math.random() * messages.length);
  res.send(messages[msgIndex]);
});

// app.get("/jokes", function (req, res) {
//     db.prepare("select * from jokes")
//       .all(function (err, rows) {
//         res.json(rows);
//         console.log(res.json(rows));
//       });
//   });
//   var jokes = [
//     { "setup": "Why do dogs lick their balls?",
//       "punchline": "Because they can."},
//     { "setup": "How many tuba players does it take to change a light bulb?",
//       "punchline": "Two. One to drink the keg, and one to hold the light bulb while the room spins."}
//   ];
//   var jokeIndex = Math.floor(Math.random() * jokes.length);
//   res.json(jokes[jokeIndex]);
// });

// app.get("/notes", function (req, res) {
//   db.prepare("select * from notes")
//     .all(function(err, rows) {
//       res.json(rows);
//     });
// });

  console.log("The server is starting, and it is available at http://localhost:3000");
// http.createServer(app).listen(process.env.PORT || 3000);
  app.listen(3000);
}

db = new sql.Database(dbPath, sql.OPEN_READWRITE, serverSetup);

// PAGE 48 - Rotates an inspirational message every second
// setInterval(function() {
// $.get("http://localhost:3000/inspiration", function (response) {
//   $("body").text(response);
// });
// }, 1000);
