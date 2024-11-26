const express = require("express");
const passport = require("passport");
const mongoose = require("mongoose");
const usernewff = require("./config/configschema");
const session = require("express-session");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(
  session({
    secret: "fhafhgahgjk jfgrweiy9",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const passport_set = require("./config/passport_setup")(passport);


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
      return next(); // إذا كان المستخدم مسجلاً دخوله، استمر
  }
  res.redirect('/'); // إذا لم يكن مسجلاً، قم بإعادة التوجيه إلى صفحة تسجيل الدخول
}



app.get("/", (req, res) => {
  res.render("./login.ejs");
});

app.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/pro",
    failureRedirect: "/",
  })
  
);

app.get("/signup", (req, res) => {
  res.render("./signup.ejs");
});

app.get("/pro",ensureAuthenticated ,(req, res) => {
    res.render("./pro.ejs");
  });

app.post("/signup", (req, res) => {
  const userman = new usernewff(req.body); // إنشاء كائن جديد
  userman
    .save()
    .then((result) => {
      res.render("./pro.ejs"); // عرض صفحة التسجيل
      console.log(result); // طباعة النتيجة
    })
    .catch((err) => {
      console.log(err); // طباعة الخطأ
    });
});

mongoose
  .connect(
    "mongodb+srv://jooelfiki23:99YfqwzWVZbY3MX1@cluster0.02q7e.mongodb.net/all-data?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}/`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
