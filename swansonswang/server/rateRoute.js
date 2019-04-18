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
  db.find({ quote: req.body.quote })

    .then(msg => {
      if (msg.length === 0) {
        count++;
        obj.count = count;
        const newDB = new db(obj);
        newDB
          .save()
          .then(msg1 => {
            res.json({ msg: "new post", msg1 });
          })
          .catch(err => {
            res.json({
              err: " err in new post"
            });
          });
      } else {
        count = msg[0].count + 1;
        const newRating = (msg[0].rating + parseInt(req.body.rating)) / 2;
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
