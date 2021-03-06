var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var nodemailer = require('nodemailer');
var sm = require('sitemap');

var app = express();

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.post('/api/contact', function (req, res) {
  var mailOpts, smtpTrans;
  //Setup Nodemailer transport
  smtpTrans = nodemailer.createTransport('SMTP', {
      service: 'Gmail',
      auth: {
          user: process.env.DUMMY_EMAIL || "noreply@me.com",
          pass: process.env.APP_PASS || "app_pass"
      }
  });
  //Mail options
  mailOpts = {
      from: req.body.name + ' &lt;' + req.body.email + '&gt;', //grab form data from the request body object
      to: process.env.EMAIL_ADDR || "me@gmail.com",
      subject: 'A Message From Your Website Contact Form',
      text: 'Please do not reply directly to this email. Use the address: ' + req.body.email + '. Message Content: ' + req.body.message
  };
  smtpTrans.sendMail(mailOpts, function (error, response) {
      //Email not sent
      if (error) {
          // console.log("Error occured, message not sent.", error);
          res.status(500).send("Couldn't send the message: ", error);
      }
      //Yay email sent!
      else {
          res.send(response);
      }
  });

  smtpTrans.close();

});

var sitemap = sm.createSitemap ({
      hostname: 'http://www.deborahhellen.com',
      cacheTime: 600000000,        // 600 sec - cache purge period 
      urls: [
        { url: '/',  changefreq: 'monthly', priority: 0.5 }
      ]
    });
 
app.get('/sitemap.xml', function(req, res) {
  sitemap.toXML( function (err, xml) {
      if (err) {
        return res.status(500).end();
      }
      res.header('Content-Type', 'application/xml');
      res.send( xml );
  });
});

app.get('/google4be1d09fa5c04070.html', function(req, res) {
  res.send("google-site-verification: google4be1d09fa5c04070.html");
});

var PORT = 3000;

app.listen(process.env.PORT || PORT);
