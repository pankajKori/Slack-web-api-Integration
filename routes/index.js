var express = require("express");
var router = express.Router();
const axios = require("axios");



const slackToken = "xoxb-3622860302448-3611977234801-DlL1H6eidv4sIOVcrW0kRjWc";


router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/sendMessage", function (req, res) {
  try {
    let run = async () => {
      const url = "https://slack.com/api/chat.postMessage";
      const res = await axios.post(
        url,
        {
          channel: req.body.channel_name,
          text: req.body.message,
        },
        { headers: { authorization: `Bearer ${slackToken}` } }
      );
      return res;
    };

    run()
      .then((response) => {
        res.json({
          response: response.data,
        });
      })
      .catch( (err) => {
        console.log(err);
      });
  } catch (error) { (err) => 
    console.log(err);
  }
});

router.post("/updateMessage", function (req, res) {
  try {
    let run = async () => {
      const url = "https://slack.com/api/chat.update";
      const res = await axios.post(
        url,
        {
          channel: req.body.channel_id,
          text: req.body.message,
          ts: req.body.ts,
        },
        { headers: { authorization: `Bearer ${slackToken}` } }
      );
      return res;
    };
    run()
      .then((response) => {
        res.json({
          response: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    (err) => console.log(err);
  }
});

router.post("/deleteMessage", function (req, res) {
  try {
    let run = async () => {
      const url = "https://slack.com/api/chat.delete";
      const res = await axios.post(
        url,
        {
          channel: req.body.channel_id,
          ts: req.body.ts,
        },
        { headers: { authorization: `Bearer ${slackToken}` } }
      );

      return res;
    };
    run()
      .then((response) => {
        res.json({
          response: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    (err) => console.log(err);
  }
});

router.post("/removeMember", function (req, res) {
  try {
    let run = async () => {
      const url = "https://slack.com/api/conversations.kick";
      return await axios.post(
        url,
        {
          channel: req.body.channel_id,
          user: req.body.user_id,
        },
        { headers: { authorization: `Bearer ${slackToken}` } }
      );
    };
    run()
      .then((response) => {
        res.json({
          response: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    (err) => console.log(err);
  }
});

router.post("/inviteMember", function (req, res) {
  try {
    let run = async () => {
      const url = "https://slack.com/api/conversations.invite";
      return await axios.post(
        url,
        {
          channel: req.body.channel_id,
          users: req.body.user_ids,
        },
        { headers: { authorization: `Bearer ${slackToken}` } }
      );
    };
    run()
      .then((response) => {
        res.json({
          response: response.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    (err) => console.log(err);
  }
});

router.post("/sendScheduledMessage", function (req, res) {
  try {
    let run = async () => {
      const url = "https://slack.com/api/chat.scheduleMessage";
      return await axios.post(
        url,
        {
          channel: req.body.channel_id,
          post_at: req.body.post_at,
          text: req.body.message,
        },
        { headers: { authorization: `Bearer ${slackToken}` } }
      );
    };
    run().then((response) => {
        res.json({
            "response": response.data,
          });      
        })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    (err) => console.log(err);
  }
});

module.exports = router;
