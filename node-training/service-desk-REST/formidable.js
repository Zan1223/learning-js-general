const http = require('https');
const formidable = require('formidable');
const util = require('util');
const url = require('url');
const fs = require('fs');
const axios = require('axios');
const request = require('request');

const options = {
  key: fs.readFileSync('./server.key'), //this needs to be updated once running on remote server
  cert: fs.readFileSync('./server.crt'), //this needs to be updated once running on remote server
}

const API_PATH = 'https://marketingtechnology.service-now.com/api/now/table/u_martech_service_desk';
const END_POINTS = {
  postReq: '/service_desk_request',
}

async function httpRequest(url, data, res) {

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
    const {
      sys_class_name,
      sys_id
    } = ticketInfo;

    // execute if there is attachment
    if (data.files.attachment.name) {

      const oldPath = data.files.attachment.path;
      const newPath = `${oldPath.substr(0,oldPath.lastIndexOf('/'))}/${data.files.attachment.name}`;

      console.log('oldPath ==>', oldPath);
      console.log('newPath ==>', newPath);

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

      //console.log('requestOpts ====>', requestOpts);
      request(requestOpts, (error, response, body) => {
        console.log(`callback from request ====> ${error} ${response} ${body}`);
        fs.unlink(newPath, (err) => {
          if (err) throw err;
          console.log('file has been deleted');
        })
        res.writeHead(200, {
          'Access-Control-Allow-Origin': '*',
          'Context-Type': 'application/json',
          'X-Content-Type-Options': 'nosniff'
        });
        res.end('request posted successfully - with files');
      })

    } else {
      res.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        'Context-Type': 'application/json',
        'X-Content-Type-Options': 'nosniff'
      });
      res.end('request posted successfully - without files');
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

  // If this is a regular request, and not a form submission, then send the form.

  res.writeHead(200, {
    'content-type': 'text/html'
  });
  res.end(
    `<iframe name="snsd-target"></iframe>
    <section>
    <form action="${END_POINTS.postReq}" id="sd-form" enctype="multipart/form-data" method="post" target="snsd-target">
      <label>
        Email
        <input type="email" name="u_email"/>
      </label>
      <label>
        Subject
        <input type="text" name="short_description"/>
      </label>
      <label>
        Description
        <textarea name="description"/></textarea>
      </label>
      <label>
        Attachment
        <input type="file" name="attachment" id="uploadFile" multiple/>
      </label>
      <input type="submit" value="Submit"/>
    </form>
  </section>`
  );
}).listen(8889, () => console.log('server running on port: 8889'));