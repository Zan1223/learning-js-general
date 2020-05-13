const http = require('https');
const formidable = require('formidable');
const fs = require('fs');
const axios = require('axios');
const request = require('request');

const options = {
  key: fs.readFileSync('./server.key'), //this needs to be updated once running on remote server
  cert: fs.readFileSync('./server.crt'), //this needs to be updated once running on remote server
}

const API_PATH = 'https://marketingtechnology.service-now.com/api/now/table/incident';
const END_POINTS = {
  postReq: '/service_desk_request',
  getForm: '/service_desk_form',
  formHTML: './form/form.html',
  formDevEnv: './form/dev-env.html',
  formScript: './form/sd-form-script.js',
}

function constructArr(a) {
  if(!a) return null;
  return {
    'name': a.name,
    'path': a.path
  }
}

function requestFn(files, ticketInfo, res) {
  const arr = files.slice(0);
  const {
    sys_class_name,
    sys_id
  } = ticketInfo;

  const oldPath = files[0].path;
  const newPath = `${oldPath.substr(0,oldPath.lastIndexOf('/'))}/${files[0].name}`;

  // rename the temp file and keep the extension
  fs.renameSync(oldPath, newPath);

  const requestOpts = {
    method: "POST",
    url: "https://marketingtechnology.service-now.com/api/now/attachment/upload",
    headers: {
      "Authorization": `Basic ${Buffer.from('martech.servicedesk'+':'+'Test@123').toString('base64')}`,
      "Content-Type": "multipart/form-data",
    },
    formData: {
      "table_name": sys_class_name,
      "table_sys_id": sys_id,
      "file": fs.createReadStream(newPath)
    }
  };

  request(requestOpts, (error, response, body) => {
    console.log(`callback from request ====> ${body}`);
    fs.unlink(newPath, (err) => {
      if (err) {
        return console.log('err happend while tmep files being deleted ===>', err); 
      }
      console.log('temp file deleted to free up memory');
    })
    // remove the first item in the array;
    arr.shift();

    if (!arr.length) {
      console.log('no more arr so opt out')
      res.writeHead(201, {
        'Access-Control-Allow-Origin': '*',
        'Context-Type': 'application/json',
        'X-Content-Type-Options': 'nosniff'
      });
      res.end('data received');
      return;
    }
    // if there is item in array, recurse the function
    requestFn(arr, ticketInfo, res);
  })
}


async function httpRequest(url, data, res) {

  // console.log('data.files ***************************', data.files)
  let uploadedFiles = data.files.attachment;
  uploadedFiles = Array.isArray(uploadedFiles) ? uploadedFiles.map(file => constructArr(file)) : [constructArr(uploadedFiles)];
  
  try {

    // call to create a ticket on Service Desk instance.
    const midCall = await axios({
      url,
      "method": 'POST',
      "headers": {
        "Accept": 'application/json',
        "Content-Type": "application/json",
        "Authorization": `Basic ${Buffer.from('martech.servicedesk'+':'+'Test@123').toString('base64')}`
      },
      "data": JSON.stringify(data.fields),
    });

    // get ticket sys_id and table name for attaching the images
    const ticketInfo = midCall.data.result;

    // execute if there is attachment
    if (uploadedFiles[0] && uploadedFiles[0].name) {

      requestFn(uploadedFiles, ticketInfo, res)

    } else {
      res.writeHead(201, {
        'Access-Control-Allow-Origin': '*',
        'Context-Type': 'application/json',
        'X-Content-Type-Options': 'nosniff'
      });
      res.end(JSON.stringify({
        message: 'Request created successfully.'
      }));
    }
  } catch (err) {
    console.log(String(err));
  }
}


http.createServer(options, function (req, res) {

  // This if statement is here to catch form submissions, and initiate multipart form data parsing.

  if (req.url == END_POINTS.postReq && req.method.toLowerCase() == 'post') {

    // Instantiate a new formidable form for processing.

    var form = new formidable({
      multiples: true
    });

    // form.parse analyzes the incoming stream data, picking apart the different fields and files.

    form.parse(req, (err, fields, files) => {
      if (err) {
        // Check for and handle any errors here.
        console.error(err.message);
        return;
      }

      // This last line responds to the form submission with a list of the parsed data and files.
      httpRequest(API_PATH, {
        fields,
        files
      }, res)
      // res.end();
    });
    return;
  }

  // If this is a form submission, then send the form.
  if (req.url == END_POINTS.getForm && req.method.toLowerCase() == 'get'){
    res.writeHead(200, {
      'content-type': 'text/html'
    });
    //res.end(fs.createReadStream('./form.html'));
    // render the form html
    fs.createReadStream(END_POINTS.formHTML).pipe(res);

    return;
  }

  if (req.url == '/form_dev_env' && req.method.toLowerCase() == 'get'){
    res.writeHead(200, {
      'content-type': 'text/html'
    });
    //res.end(fs.createReadStream('./form.html'));
    // render the form html
    fs.createReadStream(END_POINTS.formDevEnv).pipe(res);

    return;
  }

  if (req.url == '/sd-form-script.js' && req.method.toLowerCase() == 'get'){
    res.writeHead(200, {
      'content-type': 'text/javascript'
    });
    //res.end(fs.createReadStream('./form.html'));
    // render the form html
    fs.createReadStream(END_POINTS.formScript).pipe(res);

    return;
  }

  // else return 400 bad request
  res.writeHead(404, {
    'content-type': 'text/html'
  });
  res.end(`<h1>404 Page Not Found.</h1>`);

}).listen(8889, () => console.log('server running on port: 8889'));