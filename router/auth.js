const express = require("express");
const User = require("../model/userSchema");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate");

require("../db/conn");


//Middleware
const middleware = (req, res, next) => {
  console.log("Hello Middlware...");
  next();
}
router.get("/", (req, res) => {
  res.send("Hello Server...");
});
router.get("/about",authenticate,(req, res) => {
  res.send("Hello about...");
});

router.get("/contact", (req, res) => {
  res.cookie("test", "pranav");
  res.send("Hello contact...");
});

// router.post("/register",  (req, res) => {
//   const { name, email, phone, work, password, cpassword } = req.body;
//   if (!name || !email || !phone || !work || !password || !cpassword) {
//     return res.status(422).json({ error: "Fill Details!" });
//   }

//   User.findOne({ email: email })
//     .then((userExist) => {
//       if (userExist) {
//         return res.status(422).json({ error: "Email Alredy Exist " });
//       }

//       const user = new User({ name, email, phone, work, password, cpassword });

//       user
//         .save()
//         .then(() => {
//           res
//             .status(201)
//             .json({ message: "Register Data Stored successfully" });
//         })
//         .catch((err) => {
//           res.status(500).json({ error: "Failed To Register" });
//         });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;
  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "Fill Details!" });
  }

  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "Email Alredy Exist " });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "Passowrd Are Not matching" });
    } else {
      const user = new User({ name, email, phone, work, password, cpassword });

      await user.save();

      res.status(201).json({ message: "Register Data Stored successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

//Login route

router.post("/signin", async (req, res) => {
  let token;
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Plz Fill Data" });
    }

    const userLogin = await User.findOne({ email: email });

    // console.log(userLogin);
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      token = await userLogin.generateAuthToken();
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });
      if (!isMatch) {
        res.status(400).json({ error: "Invalid Credintials" });
      } else {
        res.json({ message: "User signin successfully" });
      }
    } else {
      res.status(400).json({ error: "Invalid Credintials" });
    }
  } catch (err) {
    console.log(err);
  }

  // console.log(req.body);
  //   res.json({message:"Send Data"})
});
module.exports = router;
