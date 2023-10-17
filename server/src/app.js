const express = require("express");
const planetsRouter = require("./routes/planets/planets.router");
const launchesRouter = require("./routes/launches/launches.route");
const  cookieSession =  require("cookie-session")
const app = express();
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const {Strategy} = require("passport-google-oauth20")
const passport = require("passport");


require("dotenv").config()

// save the session in cookie
passport.serializeUser((user, done) => {
  return done(null, user.id);
})

// read session from cookie
passport.deserializeUser((user, done) => {
  
  //User.findById(id).then(user=>{
  //done(null,user)
  //})
 console.log("deserialize")
 done(null,user)  
})

const options = {
  callbackURL: "/auth/google/callback",
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
};

function verifyOuth(accessToken, refreshToken, profile, done) {
  console.log("access token",accessToken)
  console.log("refresh token",refreshToken)
  console.log("profile", profile); 
  done(null, profile)  
}
// app.use(cors());

passport.use(new Strategy(options, verifyOuth));

app.use(
  cookieSession({
    name: "session2",
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY1,process.env.COOKIE_KEY2],
  })
);

app.use(passport.initialize());
app.use(passport.session());


app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "..", "public")));


app.use(express.json());

app.use(planetsRouter);
app.use(launchesRouter);



function checkLogin(req, res, next) {
  console.log("Current User",req.user)
  const isLoggedIn = req.isAuthenticated() && req.user;
  if (!isLoggedIn) {
    return res.status(401).json({message:"Invalid User"})
  }
  next()
}

app.get("/auth/google",
  passport.authenticate("google", {
    scope:["email"]
  }))

app.get("/auth/google/callback", passport.authenticate("google", {
  successRedirect: "/",
  failureRedirect: "/failure",
  session:true
}), (req, res) => { 
res.send({message:"iam done now"})
})

app.get("/auth/logout", (req, res) => { 
  req.logout();
  res.redirect("/")
})

app.get("/failure", (req, res) => {
  res.send("failure")
})

app.get("/secret", checkLogin, (req, res) => {
  console.log(req.session);
  res.json({secret:"this is secret"})  
})



app.get("/myImage", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "favicon.png"));
});

app.get("/*", function (req, res) {

  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
