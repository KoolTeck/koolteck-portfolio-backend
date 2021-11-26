/**
 * sends message to user email
 * @param {the email of the user} userEmail
 * @param {the user's name} userName
 * @param {string the message to send to user} message
 */

const sendMail = (userEmail, userName) => {
  const mailjet = require("node-mailjet").connect(
    process.env.MJ_APIKEY_PUBLIC,
    process.env.MJ_APIKEY_PRIVATE
  );

  const request = mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "bowaleadetunji@gmail.com",
          Name: "Kooljoe Developer",
        },
        To: [
          {
            Email: userEmail,
            Name: userName,
          },
        ],
        Subject: "Hi There!",
        HTMLPart: `<h3>Dear ${userName}</h3> <br>
           <p>Thanks For reaching out to me. I'll send a reply to your message very soon</p> <br>  
          <strong>Talk soo </strong>
            
             <br><br> Best Regards <br> <br> Adebowale Adetunji`,
      },
    ],
  });
  request
    .then((result) => {
      console.log(result.body);
    })
    .catch((err) => {
      console.log(err.statusCode);
    });
};

const mailMe = (userName, data) => {
  const mailjet = require("node-mailjet").connect(
    process.env.MJ_APIKEY_PUBLIC,
    process.env.MJ_APIKEY_PRIVATE
  );

  const request = mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "bowaleadetunji@gmail.com",
          Name: "Kooljoe Developer",
        },
        To: [
          {
            Email: "bowaleadetunji@gmail.com",
            Name: userName,
          },
        ],
        Subject: "New Site Mesage!",
        HTMLPart: `<h3>Message from ${userName}</h3> <br>
           <p>SubJect: ${data.subject}</p> <br>  
           <p>email: ${data.email}</p> <br>  
           <p>message: ${data.message}</p> <br>  
          
            
             <br><br> Best Regards <br> <br> Adebowale Adetunji`,
      },
    ],
  });
  request
    .then((result) => {
      console.log(result.body);
    })
    .catch((err) => {
      console.log(err.statusCode);
    });
};

module.exports = {
  sendMail,
  mailMe,
};
