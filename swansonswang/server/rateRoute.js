const express = require("express");
const router = express.Router();
const db = require("./schema.js");
const allQuotes = require("./allQuotes");

router.get("/", (req, res) => {
  db.find({})
    .then(msg => {
      res.status(200).json({ msg: msg });
    })
    .catch(err => {
      res.status(401).json({ err: err });
    });
});

router.post("/", (req, res) => {
  let count = 0;
  let obj = {};

  obj = { rating: req.body.rating, quote: req.body.quote, ip: req.body.ip };

  console.log(" req ===>", req.body);
  db.find({ quote: req.body.quote })

    .then(msg => {
      if (msg.length === 0) {
        console.log("msg ==> ", msg);
        count++;
        obj.count = count;
        const newDB = new db(obj);
        newDB
          .save()
          .then(msg1 => {
            console.log("new post ===>", msg1);
            res.json({ msg: "new post", msg1 });
          })
          .catch(err => {
            res.json({
              err: " err in new post"
            });
          });
      } else {
        console.log(msg[0]._id);
        count = msg[0].count + 1;
        console.log("count ===> ", count);
        console.log(" rating ===> ", msg[0].rating);
        const newRating = (msg[0].rating + parseInt(req.body.rating)) / count;
        console.log("new rating ===> ", newRating);
        let object = {
          rating: newRating,
          quote: req.body.quote,
          ip: msg[0].ip,
          count: count
        };

        db.findByIdAndUpdate(msg[0]._id, object, { new: true })
          .then(msg2 => {
            res.status(200).json({
              msg: "new rated post",
              msg2
            });
          })
          .catch(err => {
            res.status(200).json({
              err: "err in new rated post",
              err
            });
          });
      }
    })
    .catch(err => {
      res.status(401).json({ err: err });
    });
});
module.exports = router;
