var express = require("express");
var router = express.Router();
const axios = require("axios");
const fs = require("fs");
const formidable = require('express-formidable')
router.use(formidable())    


const slackToken = "xoxb-3622860302448-3611977234801-DlL1H6eidv4sIOVcrW0kRjWc";


router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});


router.post("/uploadFiles", function (req, res) {
    try {
      let run = async () => {
        const url = "https://slack.com/api/files.upload";
        const form = new FormData();
        form.append('file', fs.createReadStream(req.files.file.path));
        form.append('channels', req.fields.channel_id);
        return await axios.post(
          url,
          form,
          { headers: {
            'Authorization': `Bearer ${slackToken}`,
            'Content-Type': 'multipart/form-data'
          } }
        );
      };
  
      run().then((response) => {
        res.json({
          'response': response.data
        });
      }).catch((err) => {
        console.log(err);
      });
      
    } catch (error) {
      (err) => console.log(err);
    }
  });


module.exports = router;
