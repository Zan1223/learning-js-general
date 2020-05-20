const http = require('https');
const formidable = require('formidable');
const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');

const options = {
  key: fs.readFileSync('./server.key'), //this needs to be updated once running on remote server
  cert: fs.readFileSync('./server.crt'), //this needs to be updated once running on remote server
}

const API_PATH = 'https://marketingtechnology.service-now.com/api/now/table/incident';
const END_POINTS = {
  postReq: '/service_desk_request',
  devEnv: '/service_desk_form',
  formDevEnvPath: './form/dev-env.html',
  formScript: './form/sd-form-script.js',
}

const AUTH = `Basic ${Buffer.from('martech.servicedesk'+':'+'Test@123').toString('base64')}`;

function constructArr(a) {
  if (!a) return null;
  return {
    'name': a.name,
    'path': a.path
  }
}

function resHeaderCompiler(contextType, xType) {
  const header = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE, PUT',
    'Context-Type': contextType,
  }

  if (xType) header['X-Content-Type-Options'] = 'nosniff';

  return header;
}

function postAttachments(files, ticketInfo, res) {
  const {
    sys_class_name,
    sys_id
  } = ticketInfo;
  const promises = [];
  const fileLocalPaths = [];

  files.forEach(file => {

    const filePath = file.path;
    // const newPath = `${filePath.substr(0,filePath.lastIndexOf('/'))}/${file.name}`;
    // get the form data
    const form = new FormData();
    form.append('table_name', sys_class_name);
    form.append('table_sys_id', sys_id);
    form.append('file', fs.createReadStream(filePath), file.name);

    const requestOpts = {
      method: "POST",
      url: "https://marketingtechnology.service-now.com/api/now/attachment/upload",
      headers: {
        "Authorization": AUTH,
        "Content-Type": form.getHeaders()['content-type'],
      },
      data: form
    };

    promises.push(axios(requestOpts));
    fileLocalPaths.push(filePath);
  })

  // await for all the promises to be receipt then execute
  axios.all(promises).then(response => {
    // remove the temp files from local server to free up the memory
    fileLocalPaths.forEach(filePath => {
      fs.unlink(filePath, err => {
        err && console.log(`err occured while unlinking the file '${filePath}', error message: ${err}`);
      })
    })
    // response header and close the request
    res.writeHead(201,
      resHeaderCompiler('application/json', true)
    );
    res.end('assets uploaded');
  })
}


async function httpRequest(url, data, res) {

  // console.log('data.files ***************************', data.files)
  let uploadedFiles = data.files.attachment;
  uploadedFiles = Array.isArray(uploadedFiles) ? uploadedFiles.map(file => constructArr(file)) : [constructArr(uploadedFiles)];
  //console.log('uplaodedFiles ===>', uploadedFiles);
  try {
    // call to create a ticket on Service Desk instance.
    // BE validate the fields
    const dataFields = data.fields;
    // console.log(dataFields);
    for (let key in dataFields) {
      const fieldValue = dataFields[key];

      // check if the field contains HTML tags
      if (/<|\/>|>/.test(fieldValue)) {
        throw new Error(JSON.stringify({
          errorMesg: 'noHTMLTagsAllowed',
          field_value: fieldValue
        }));
      }
      // check if the email field is in right email format
      if (key === 'u_email') {
        const patern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!patern.test(fieldValue)) {
          throw new Error(JSON.stringify({
            errorMesg: 'emailisnotvaliderror',
            field_value: fieldValue
          }));
        }
      }
    }
    const midCall = await axios({
      url,
      "method": 'POST',
      "headers": {
        "Accept": 'application/json',
        "Content-Type": "application/json",
        "Authorization": AUTH,
      },
      "data": JSON.stringify(dataFields),
      "timeout": 3000,
    });
    // execute if there is attachment
    if (uploadedFiles[0] && uploadedFiles[0].name) {
      // get ticket sys_id and table name for attaching the images
      const ticketInfo = midCall.data.result;
      // post the attchments to the ticket
      postAttachments(uploadedFiles, ticketInfo, res);

    } else {
      // no attachment so close the request
      res.writeHead(201, resHeaderCompiler('application/json'), true);
      res.end(JSON.stringify({
        message: 'Request created successfully.'
      }));
    }
  } catch (err) {
    res.writeHead(400, resHeaderCompiler('application/json'), true);
    res.end(JSON.stringify({
      message: err.message
    }));
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

  // If requesting for the form, then send the form page.
  if (req.url == END_POINTS.devEnv && req.method.toLowerCase() == 'get') {
    res.writeHead(200,
      resHeaderCompiler('text/html', false)
    );
    //res.end(fs.createReadStream('./form.html'));
    // render the form html
    fs.createReadStream(END_POINTS.formDevEnvPath).pipe(res);

    return;
  }

  // if requesting for the form script
  if (req.url == '/sd-form-script.js' && req.method.toLowerCase() == 'get') {
    res.writeHead(200,
      resHeaderCompiler('text/javascript', false)
    );

    // render the form html
    fs.createReadStream(END_POINTS.formScript).pipe(res);

    return;
  }

  // else return 400 bad request
  res.writeHead(404,
    resHeaderCompiler('text/html', false)
  );
  res.end(`<h1>404 Page Not Found.</h1>`);

}).listen(8889, () => console.log('server running on port: 8889'));