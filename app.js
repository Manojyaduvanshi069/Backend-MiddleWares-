const express = require("express");
const app = express();
const ExpressError = require("./ExpressError");

// app.use((req,res,next) => {
//   console.log("Hi, I am middleware");
//   next();
// });

const checkToken = (req, res, next) => {
  let { token } = req.query;
  if (token === "giveaccess") {
    next();
  }
  throw new ExpressError(401, "ACCESS DENIED!");
};

app.get("/api", checkToken, (req, res) => {
  res.send("data");
});
app.get("/", (req, res) => {
  res.send("Hi, I am root");
});

app.get("/random", (req, res) => {
  res.send("this is a random page");
});

app.get("/err", (req, res) => {
  abcd = abcd;
});

app.get("/admin",(req,res)=>{
  throw new ExpressError(403,"Access to admin is forbidden");
});

app.use((err, req, res, next) => {
  let { status = 401, message = "Some error occurred" } = err;
  res.status(status).send(message);
});

// app.use((req,res,next)=>{
//     req.time = new Date(Date.now()).toString();
//     console.log(req.method, req.hostname, req.path, req.time);
//     next();
// });

app.use((req, res) => {
  res.send("Page not found!");
});

app.listen(3030, () => {
  console.log("server listening to port 3030");
});
