const http = require('http');
const formidable = require('formidable');
const util = require('util');
const url = require('url');
const fs = require('fs');
const axios = require('axios')

// console.log(formidable);
// console.log(util);

// console.log('running ....')
const options = {
  key: fs.readFileSync('./server.key'), //this needs to be updated once running on remote server
  cert: fs.readFileSync('./server.crt'), //this needs to be updated once running on remote server
}

//create a server 
const server = http.createServer(options);
const API_PATH = 'https://marketingtechnology.service-now.com/api/now/table/u_martech_service_desk';
const END_POINTS = {
  postJsd: '/service_desk_request',
}

function errResponse(response, err){
  response.setHeader('Content-Type', 'application/json');
  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Headers', 'x-content-type-options');
  response.end(JSON.stringify({
    message: String(err) || 'Something went wrong, please try again later.'
  }))
}

async function httpRequest(url, data, response) {

  try{
    const midCall = await axios({
      url,
      "method": 'POST',
      "headers": {
        "Accept": 'application/json',
        "Content-Type": "application/json",
        "Authorization": `Basic ${Buffer.from('martech.servicedesk'+':'+'Test@123').toString('base64')}`
      },
      "data": JSON.stringify(data),
    });
  
    const midCallRes = midCall.status;
    // Set response headers
    response.setHeader('Content-Type', 'application/json');
    response.setHeader('X-Content-Type-Options', 'nosniff');
    response.setHeader('Access-Control-Allow-Origin', '*');
    console.log('coming to this block')
    // Send response back to requestor
    response.end(JSON.stringify({
      status: midCallRes,
      message: midCallRes == '201' ? 'Request was created successfully' : 'Request was not created successfully',
    }));
  }catch(err){
    console.log(String(err));
    errResponse.call(this,response, err)
  }

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
      console.log('******************************** New Request START ***********************************');
      console.log('data ====>', data);
      console.log('******************************** New Request END ***********************************');
      // const {
      //   u_email,
      //   short_description,
      //   description
      // } = JSON.parse(data);
      // switch (requestPath) {
      //   //when the request URL includes the /eloqua path
      //   case END_POINTS.postJsd: {
      //     // httpRequest.call(this, `${API_PATH}`, {
      //     //   u_email,
      //     //   short_description,
      //     //   description
      //     // }, response);
      //     break;
      //   }
      //   default:
      //     break;
      // }
      response.end('received it');
    } catch (err) {
      errResponse.call(this,response, err)
    }
  });


  if(requestPath === END_POINTS.postJsd && request.method.toLowerCase() === 'post'){
    console.log('hit right endpoint!!!!!!');
    



  }



})

server.listen(8889, () => console.log('server running on port: 8889'));