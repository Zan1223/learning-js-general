var requestForm = document.querySelector('#sd-form-wrapper #sd-form');
var requestFormTU = document.querySelector('#sd-form-wrapper #sd-thank-you');
requestForm.addEventListener('submit', function (e) {
  e.preventDefault();
  var fields = requestForm.querySelectorAll('.sd-form-field');
  var data = new FormData();
  var imageOnly = true;

  Array.prototype.forEach.call(fields, function (field) {
    if (field.type === 'file') {
      var attachments = field.files;
      // console.log('attachments ====>', attachments.length);
      // data.append(field.name, attachments[0], "da9f9a989d11a082aef0560dc26198c9.jpg" )
      if (attachments.length) {
        for (key in attachments) {
          // jump out of the execution if there is a non-image uploaded
          if (key < attachments.length) {
            console.log('attachments[key].type ==>', attachments[key].type);
            if (!RegExp('image\/png|image\/jpeg').test(attachments[key].type)) {
              imageOnly = false;
              return;
            };
            data.append(field.name, attachments[key], attachments[key].name);
          }
        }
      }
    } else {
      data.append(field.name, field.value);
    }
  })

  if (!imageOnly) {
    // display the error message for not uploading non-image asset
    // TODO: display the error message
    return;
  };

  var sdRquestXhr = new XMLHttpRequest();
  sdRquestXhr.withCredentials = true;

  sdRquestXhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4 && this.status === 201) {
      // 201 means request inserted to Service Desk successfully
      requestForm.classList.add('invisible');
      requestFormTU.classList.add('visible');

      // remove the values from all fields
      Array.prototype.forEach.call(fields, function (field) {
        field.value = "";
      })
    }
  });

  sdRquestXhr.open("POST", requestForm.getAttribute('action'));
  sdRquestXhr.setRequestHeader("Authorization", "Basic bWFydGVjaC5zZXJ2aWNlZGVzazpUZXN0QDEyMw==");
  //sdRquestXhr.setRequestHeader("Cookie", "glide_user_route=glide.e6576f4dee1598f95b6fcfa05a8c4c68; BIGipServerpool_marketingtechnology=2844088586.33854.0000; JSESSIONID=4B388AB40C1E4FD1E86B35859BA8782B; glide_session_store=17D88820DBB4D4103582049ED396191C; glide_user_activity=U0N2Mzpzb3hadHJaY2Q2R0Q0UmdwY2V4dTdnaENwUDJHaUpkYTpVbFdHY3VSWDYxNnptdms4VmFwY0xXL0F4NHFWcmRCZjdKM1dsQ0RkTnVVPQ==");

  sdRquestXhr.send(data);

})