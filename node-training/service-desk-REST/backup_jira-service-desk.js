const http = require('https');
const url = require('url');
const fs = require('fs');
const axios = require('axios')
const nodemailer = require('nodemailer');

const options = {
  key: fs.readFileSync('./server.key'), //this needs to be updated once running on remote server
  cert: fs.readFileSync('./server.crt'), //this needs to be updated once running on remote server
}

//create a server 
const server = http.createServer(options);
const STOCK_API = 'https://snrequest.atlassian.net/rest/servicedeskapi/request';
const END_POINTS = {
  postJsd: '/jsd_request',
}
const SENDER = {
  user: 'zni70686@gmail.com',
  pass: 'fdsafda@fdasfd'
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: SENDER.user,
    pass: SENDER.pass
  }
});

async function httpRequest(url, data, response) {

  const midCall = await axios({
    url,
    "method": 'POST',
    "headers": {
      "Authorization": "Basic c25fcmVxdWVzdEB5YWhvby5jb206aUVqVVkxZDdSZndTUmhrczZjcFdGMzIx",
      "Content-Type": "application/json"
    },
    "data": JSON.stringify(data),
  });

  const midCallRes = midCall.status;

  // Set response headers
  response.setHeader('Content-Type', 'application/json');
  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.setHeader('Access-Control-Allow-Origin', '*');
  // Send response back to requestor
  response.end(JSON.stringify({
    status: midCallRes,
    message: midCallRes == '201' ? 'Request was created successfully' : 'Request was not created successfully',
  }));

  // email service needs to allow third-party access
  transporter.sendMail({
    from: SENDER.user,
    to: data.requestFieldValues.customfield_10055,
    subject: data.requestFieldValues.summary,
    text: data.requestFieldValues.description
  }, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}


server.on('request', (request, response) => {
  const requestUrl = url.parse(request.url, true);
  const requestPath = requestUrl.pathname;
  let data = '';
  request.on('data', chunk => {
    data += chunk;
    console.log('data in data ===>', chunk);
  })

  request.on('end', () => {
    try {
      console.log('******************************** New Request ***********************************');
      console.log(JSON.parse(data));
      const {
        serviceDeskId,
        requestTypeId,
        customfield_10055,
        summary,
        description
      } = JSON.parse(data);
      switch (requestPath) {
        //when the request URL includes the /eloqua path
        case END_POINTS.postJsd: {
          httpRequest.call(this, `${STOCK_API}`, {
            serviceDeskId,
            requestTypeId,
            requestFieldValues: {
              customfield_10055,
              summary,
              description,
            }
          }, response);
          break;
        }
        default:
          break;
      }
    } catch (err) {
      response.setHeader('Content-Type', 'application/json');
      response.setHeader('X-Content-Type-Options', 'nosniff');
      response.setHeader('Access-Control-Allow-Origin', '*');
      response.setHeader('Access-Control-Allow-Headers', 'x-content-type-options');
      response.end(JSON.stringify({
        status: 400,
        message: String(err) || 'Something went wrong, please try again later.'
      }))
    }

  });
})

server.listen(8808, () => console.log('server running on port: 8808'));