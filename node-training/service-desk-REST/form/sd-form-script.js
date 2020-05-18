!function () {
  const TXT = {
    email: translator('Email') || 'Email',
    subject: translator('Subject') || 'Subject',
    description: translator('Description') || 'Description',
    submit: translator('Submit') || 'Submit',
    submissionThankYou: translator('submissionThankYou') || 'Thank you for submitting your request. We will confirm your submission shortly.',
    required: translator('required') || 'Required',
    emailisnotvaliderror: translator('emailisnotvaliderror') || 'Invalid Email',
    noHTMLTagsAllowed: translator('noHTMLTagsAllowed') || 'Invalid input: < or > symbol is not allowed',
    asssetType: translator('invalidAttachmentType') || 'Invalid attachment Type: only image/jpeg and image/png are allowed',
    chooseFiles: translator('chooseFiles') || 'Choose Files',
    noFilesChosen: translator('noFilesChosen') || 'No File Chosen',
    topicDropdown: {
      issueType: translator('Issue Type') || 'Issue Type',
      signIn: translator('Sign In') || 'Sign In',
      registration: translator('registration') || 'Registration',
      changeEmail: translator('changeEmail') || 'Change Email',
      linkAccounts: translator('linkAccounts') || 'Link Accounts',
      mergeAccounts: translator('mergeAccount') || 'Merge Accounts',
      eventAgendaSession: translator('eventAgendaSession') || 'Event - Agenda, Session',
      eventRegistration: translator('eventRegistration') || 'Event - Registration',
      generalQuestion: translator('generalQuestion') || 'General Question',
      others: translator('others') || 'Others',
    }
  }

  function translator(term) {
    try {
      return Granite.I18n.get(term);
    } catch (err) {
      // console.error(err);
      return false;
    }
  }

  function renderHTML() {
    // set action path for the form based on the env
    const actionPath = window.location.hostname === 'localhost' ? '/service_desk_request' : 'https://servicedesk.martchservicenow.com/service_desk_request';
    return (`
    <section id="sd-form-wrapper">
    <style>
      #sd-form-wrapper {
        height:100%;
        width: 100%;
        opacity: 0;
        position: absolute;
        transition: all 0.2s ease;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        visibility: hidden;
        z-index: 0;
      }

      #sd-form-wrapper.sd-form-active{
        opacity: 1;
        visibility: visible;
        z-index: 10000000;
      }
      #sd-form-wrapper.thank-you-shown #sd-form {
        display: none;
      }

      #sd-form-wrapper.thank-you-shown #sd-thank-you {
        display: block;
      }

      #sd-form-wrapper.sd-form-submitting #sd-loading-spinner{
        display: block;
      }

      #sd-form-wrapper #sd-form-section {
        background-color: #fff;
        max-width: 600px;
        margin: auto;
        position: relative;
        padding: 50px 30px;
        top: 30px;
        z-index: 2;
      }
  
      #sd-form-wrapper #sd-drop-shadow {
        background-color: #293e40;
        opacity: 0.8;
        position: fixed;
        top: 0;
        left:0;
        right:0;
        bottom: 0;
        z-index: 1;
      }

      #sd-form-wrapper #sd-res-error {
        color: #b33233;
        font-family: "GilroyRegular", -apple-system,
        BlinkMacSystemFont,
        Segoe UI,
        Roboto,
        Helvetica Neue,
        Arial,
        Noto Sans,
        sans-serif,
        Apple Color Emoji,
        Segoe UI Emoji,
        Segoe UI Symbol,
        Noto Color Emoji;
        display: block;
        margin-bottom: 20px;
        text-align: left;
      }
      #sd-form-wrapper * {
        color: #293e40;
      }
      
      #sd-form-wrapper #sd-form {
        text-align: center;
      }
  
      #sd-form-wrapper #sd-form{
        display: block
      }

      #sd-form-wrapper #sd-thank-you {
        display: none
      }
  
      #sd-form-wrapper #sd-thank-you p {
        font-family: "GilroyRegular", -apple-system,
          BlinkMacSystemFont,
          Segoe UI,
          Roboto,
          Helvetica Neue,
          Arial,
          Noto Sans,
          sans-serif,
          Apple Color Emoji,
          Segoe UI Emoji,
          Segoe UI Symbol,
          Noto Color Emoji;
        font-size: 16px;
        line-height: 1.7;
      }
  
      #sd-form-wrapper #sd-form label {
        margin-bottom: 8px;
        text-align: left;
      }
  
      #sd-form-wrapper #sd-form label,
      #sd-form-wrapper #sd-form label .sd-form-field {
        display: block;
        position: relative;
        width: 100%;
      }
  
      #sd-form-wrapper #sd-form label .sd-form-field {
        border: none;
        box-sizing: border-box;
        font-size: 16px;
        font-stretch: normal;
        font-style: normal;
        font-weight: 400;
        letter-spacing: 0;
        height: 48px;
        line-height: 37.2px;
        font-family: "GilroyRegular", -apple-system,
          BlinkMacSystemFont,
          Segoe UI,
          Roboto,
          Helvetica Neue,
          Arial,
          Noto Sans,
          sans-serif,
          Apple Color Emoji,
          Segoe UI Emoji,
          Segoe UI Symbol,
          Noto Color Emoji;
      }

      #sd-form-wrapper #sd-form label select.sd-form-field {
        -webkit-appearance: none;
        background: #f7f7f7;
        background-image: url(https://www.servicenow.com/content/dam/servicenow/images/demo-asset/icon/arrow-down.png);
        background-position: 97% center;
        background-repeat: no-repeat;
        border: 0;
        cursor: pointer;
        font-family: "GilroyRegular", -apple-system,
        BlinkMacSystemFont,
        Segoe UI,
        Roboto,
        Helvetica Neue,
        Arial,
        Noto Sans,
        sans-serif,
        Apple Color Emoji,
        Segoe UI Emoji,
        Segoe UI Symbol,
        Noto Color Emoji;
        font-size: 14px;
        padding-left: 20px;
        text-align: left;
        width: 100%;
      }
      #sd-form-wrapper #sd-form label select.sd-form-field.field-has-value {
        font-size: 16px;
        padding-left: 16px;
      }
      
      #sd-form-wrapper #sd-form label:focus, #sd-form label .sd-form-field:focus {
        outline: none !important;
      }
  
      #sd-form-wrapper #sd-form label .sd-form-field.error-occured {
        outline: 1px solid #b33233;
      }
  
      #sd-form-wrapper #sd-form label .sd-form-field:not([type=file]):not(select) {
        background-color: #f7f7f7;
        padding: 20px 20px 0 16px;
      }
  
      #sd-form-wrapper #sd-form label .sd-form-field[type=file] {
        cursor: pointer;
        font-size: 14px;
        height: auto;
        line-height: 0;
        margin: 30px 0;
        max-width: 320px;
        width: 100%;
      }
  
      #sd-form-wrapper #sd-form label textarea.sd-form-field {
        height: 100px;
        resize: none;
      }
  
      #sd-form-wrapper #sd-form label .sd-form-field:focus~.sd-form-label,
      #sd-form-wrapper #sd-form label .sd-form-field.field-has-value~.sd-form-label {
        font-size: 12px;
        left: 16px;
        top: 8px;
      }
  
      #sd-form-wrapper #sd-form label .sd-form-label {
        font-size: 14px;
        left: 20px;
        line-height: 1.5;
        position: absolute;
        top: 13.5px;
        transition: .2s ease all;
        font-family: "GilroyRegular", -apple-system,
          BlinkMacSystemFont,
          Segoe UI,
          Roboto,
          Helvetica Neue,
          Arial,
          Noto Sans,
          sans-serif,
          Apple Color Emoji,
          Segoe UI Emoji,
          Segoe UI Symbol,
          Noto Color Emoji;
      }
  
      #sd-form-wrapper #sd-form label .sd-field-error-msg {
        color:#b33233;
        font-family: "GilroyRegular", -apple-system,
          BlinkMacSystemFont,
          Segoe UI,
          Roboto,
          Helvetica Neue,
          Arial,
          Noto Sans,
          sans-serif,
          Apple Color Emoji,
          Segoe UI Emoji,
          Segoe UI Symbol,
          Noto Color Emoji;
        font-size: 10px;
      }
  
      #sd-form-wrapper #sd-form button {
        border: 2px solid #293e40;
        cursor: pointer;
        font-family: "GilroySemiBold", -apple-system,
          BlinkMacSystemFont,
          Segoe UI,
          Roboto,
          Helvetica Neue,
          Arial,
          Noto Sans,
          sans-serif,
          Apple Color Emoji,
          Segoe UI Emoji,
          Segoe UI Symbol,
          Noto Color Emoji;
        font-size: 18px;
        margin-top: 15px;
        outline: none;
        padding: 15px 40px;
        transition: .2s ease;
  
      }
  
      #sd-form-wrapper #sd-form button:hover {
        background-color: #293e40;
        color: #fff;
      }
  
      #sd-form-wrapper #sd-overlay-close {
        display: inline-block !important;
        padding: 0 15px;
        position: absolute;
        right: 0;
        top: 15px;
        z-index: 2;
      }
  
      #sd-form-wrapper #sd-overlay-close > svg {
        opacity: 0.3;
      }
  
      #sd-form-wrapper #sd-overlay-close > svg g {
        stroke: #293e40;
      }
  
      #sd-form-wrapper #sd-overlay-close:hover > svg{
        cursor: pointer;
        opacity: 1;
      }

      #sd-form-wrapper #sd-loading-spinner {
        bottom: 0;
        display: none;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
      }

      #sd-form-wrapper .sd-spinner-lds-roller {
        -moz-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        -o-transform: translate(-50%, -50%);
        -webkit-transform: translate(-50%, -50%);
        display: inline-block;
        height: 85px;
        left: 50%;
        position: relative;
        top: 43%;
        transform: translate(-50%, -50%);
        width: 85px;
        z-index: 11;
     }
     #sd-form-wrapper .sd-spinner-lds-roller div {
        animation: sd-spinner-lds-roller 1.2s linear infinite;
        transform-origin: 42px 42px;
     }
     #sd-form-wrapper .sd-spinner-lds-roller div:after, #sd-form-wrapper .sd-spinner-lds-roller div::after {
        background: #293e40;
        border-radius: 20%;
        content: " ";
        display: block;
        height: 18px;
        left: 39px;
        position: absolute;
        top: 3px;
        width: 6px;
     }
     #sd-form-wrapper .sd-spinner-lds-roller div:nth-child(1) {
        animation-delay: -1.1s;
        transform: rotate(0deg);
     }
     #sd-form-wrapper .sd-spinner-lds-roller div:nth-child(2) {
        animation-delay: -1s;
        transform: rotate(30deg);
     }
     #sd-form-wrapper .sd-spinner-lds-roller div:nth-child(3) {
        animation-delay: -0.9s;
        transform: rotate(60deg);
     }
     #sd-form-wrapper .sd-spinner-lds-roller div:nth-child(4) {
        animation-delay: -0.8s;
        transform: rotate(90deg);
     }
     #sd-form-wrapper .sd-spinner-lds-roller div:nth-child(5) {
        animation-delay: -0.7s;
        transform: rotate(120deg);
     }
     #sd-form-wrapper .sd-spinner-lds-roller div:nth-child(6) {
        animation-delay: -0.6s;
        transform: rotate(150deg);
     }
     #sd-form-wrapper .sd-spinner-lds-roller div:nth-child(7) {
        animation-delay: -0.5s;
        transform: rotate(180deg);
     }
     #sd-form-wrapper .sd-spinner-lds-roller div:nth-child(8) {
        animation-delay: -0.4s;
        transform: rotate(210deg);
     }
     #sd-form-wrapper .sd-spinner-lds-roller div:nth-child(9) {
        animation-delay: -0.3s;
        transform: rotate(240deg);
     }
     #sd-form-wrapper .sd-spinner-lds-roller div:nth-child(10) {
        animation-delay: -0.2s;
        transform: rotate(270deg);
     }
     #sd-form-wrapper .sd-spinner-lds-roller div:nth-child(11) {
        animation-delay: -0.1s;
        transform: rotate(300deg);
     }
     #sd-form-wrapper .sd-spinner-lds-roller div:nth-child(12) {
        animation-delay: 0s;
        transform: rotate(330deg);
     }
      @keyframes sd-spinner-lds-roller {
        0% {
          opacity: 1;
       }
        100% {
          opacity: 0;
       }
     }
      
      @media (min-width: 768px) {
        #sd-form-wrapper #sd-form-section {
          padding: 60px 50px;
          top: 50px;
        }
        #sd-form-wrapper #sd-form label .sd-form-label {
          top: 15px;
        }
        #sd-form-wrapper #sd-overlay-close {
          padding: 0 25px;
          top: 25px;
        }
        #sd-form-wrapper #sd-thank-you p {
          font-size: 18px;
        }
      }
      @media (min-width: 1024px) {
        #sd-form-wrapper #sd-form label .sd-form-field {
          height: 56px;
        }
      }
    </style>
    <section id="sd-form-section">
      <form action="${actionPath}" id="sd-form">
        <input type="hidden" name="caller_id" class="sd-form-field" value="Guest" />
        <input type="hidden" name="contact_type" class="sd-form-field" value="form" />
        <label>
          <input type="email" name="u_email" class="sd-form-field mandatory-field" />
          <span class="sd-form-label">${TXT.email}</span>
        </label>
        <label>
          <select name="subcategory" class="sd-form-field mandatory-field">
            <option value selected>-- ${TXT.topicDropdown.issueType} --</option>
            <option value="sign in">${TXT.topicDropdown.signIn}</option>
            <option value="registration">${TXT.topicDropdown.registration}</option>
            <option value="change email">${TXT.topicDropdown.changeEmail}</option>
            <option value="link accounts">${TXT.topicDropdown.linkAccounts}</option>
            <option value="merge accounts">${TXT.topicDropdown.mergeAccounts}</option>
            <option value="event agenda session">${TXT.topicDropdown.eventAgendaSession}</option>
            <option value="event registration">${TXT.topicDropdown.eventRegistration}</option>
            <option value="general question">${TXT.topicDropdown.generalQuestion}</option>
            <option value="others">${TXT.topicDropdown.others}</option>
          </select>
        </label>
        <label>
          <input type="text" name="short_description" class="sd-form-field mandatory-field" />
          <span class="sd-form-label">${TXT.subject}</span>
        </label>
        <label>
          <textarea name="description" class="sd-form-field"></textarea>
          <span class="sd-form-label">${TXT.description}</span>
        </label>
        <label>
          <input type="file" name="attachment" id="uploadFile" multiple class="sd-form-field"
            accept="image/png, image/jpeg" />
        </label>
        <span id="sd-res-error"></span>
        <button type="submit" value="submit">${TXT.submit}</button>
      </form>
      <div id="sd-thank-you">
        <p>${TXT.submissionThankYou}</p>
      </div>
      <aside id="sd-overlay-close">
        <svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <desc>Created with Sketch.</desc> <defs></defs> <g id="Breakpoints" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"> <g id="1700_FulidGrid-Copy" transform="translate(-1603.000000, -68.000000)" stroke="#FFFFFF" stroke-width="2"> <g id="Name-Block" transform="translate(850.000000, 0.000000)"> <g id="Group-3" transform="translate(639.000000, 61.000000)"> <g id="Desktop/3.About_Us-Leadership-Bio/Module_01/Icon/icon_x_desktop-Copy" transform="translate(121.727922, 14.727922) rotate(-315.000000) translate(-121.727922, -14.727922) translate(111.727922, 4.727922)"> <path d="M19.4117647,10 L0.588235294,10" id="Line"></path> <path d="M10,19.4117647 L10,0.588235294" id="Line-Copy"></path> </g> </g> </g> </g> </g></svg>
      </aside>

      <section id="sd-loading-spinner">
        <div class="sd-spinner-lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </section>
    </section>
  
    <section id="sd-drop-shadow"></section>
  </section>`)
  }

  document.body.insertAdjacentHTML('beforeend', renderHTML());

  const sdFormWrapper = document.getElementById('sd-form-wrapper');
  const requestForm = sdFormWrapper.querySelector('#sd-form');
  const sdErrTag = requestForm.querySelector('#sd-res-error');
  const requiredFields = requestForm.querySelectorAll('.sd-form-field');
  const formCloseBtn = document.querySelector('#sd-form-section #sd-overlay-close');
  const formShadowDrop = sdFormWrapper.querySelector('#sd-drop-shadow');
  let closeOverlayCounter = null;


  function showErrorMessageSD(field, errorMsg) {
    field.parentElement.insertAdjacentHTML('beforeend', '<span class="sd-field-error-msg">' + errorMsg + '</span>');
    field.classList.add('error-occured');
  }

  function hideErrorMessageSD(field) {
    field.parentElement.querySelector('.sd-field-error-msg') && field.parentElement.querySelector('.sd-field-error-msg').remove();
    field.classList.remove('error-occured');
  }

  function closeOutSdOverlay(fields) {
    sdFormWrapper.classList.remove('sd-form-active');
    sdErrTag.innerHTML = '';
    if (sdFormWrapper.classList.contains('thank-you-shown')) {
      // only clear out the form data while on thank you view
      Array.prototype.forEach.call(fields, function (field) {
        if (field.type !== 'hidden') {
          field.value = "";
          field.classList.remove('field-has-value');
          hideErrorMessageSD(field);
        }
      });
      setTimeout(function () {
        sdFormWrapper.classList.remove('thank-you-shown');
      }, 250)
    }
  }

  Array.prototype.forEach.call(requiredFields, function (field) {
    field.addEventListener('blur', function (e) {
      hideErrorMessageSD(e.target);
      const value = e.target.value;
      if (value) {
        e.target.classList.add('field-has-value');
      } else {
        e.target.classList.remove('field-has-value');
      }
    })
  });

  window.addEventListener('click', function (e) {
    if (e.target.classList.contains('sd-form-trigger')) {
      sdFormWrapper.classList.add('sd-form-active')
    }
  })
  // close the overlay while clicking on the close button
  formCloseBtn.addEventListener('click', function (e) {
    clearTimeout(closeOverlayCounter);
    closeOutSdOverlay(requiredFields);
  });
  // close the overlay while clicking outside the form
  formShadowDrop.addEventListener('click', function (e) {
    clearTimeout(closeOverlayCounter);
    closeOutSdOverlay(requiredFields);
  });

  requestForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const fields = requestForm.querySelectorAll('.sd-form-field');

    const data = new FormData();
    let imageOnly = true;
    let validFields = true;

    // remove the error message
    sdErrTag.innerHTML = '';

    Array.prototype.forEach.call(fields, function (field) {
      const fieldValue = field.value;
      // validate the fields
      // remove the error message at the begining
      hideErrorMessageSD(field);

      // check if the field is empty
      if (field.classList.contains('mandatory-field') && !fieldValue) {
        // console.log('empty value for mandatory field');
        validFields = false;
        showErrorMessageSD(field, TXT.required);
        return;
      }

      // check if the field contains HTML tags
      if (/<|\/>|>/.test(fieldValue)) {
        //  console.log('conntains HTML tag');
        showErrorMessageSD(field, TXT.noHTMLTagsAllowed);
        validFields = false;
        return;
      }

      // check if the email field is in right email format
      if (field.type === 'email') {
        const patern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!patern.test(fieldValue)) {
          // console.log('invalid email');
          showErrorMessageSD(field, TXT.emailisnotvaliderror);
          validFields = false;
          return;
        }
      }

      if (field.type === 'file') {
        const attachments = field.files;
        // console.log('attachments ====>', attachments.length);
        // data.append(field.name, attachments[0], "da9f9a989d11a082aef0560dc26198c9.jpg" )
        if (attachments.length) {
          for (let key in attachments) {
            // jump out of the execution if there is a non-image uploaded
            if (key < attachments.length) {
              if (!RegExp('image\/png|image\/jpeg').test(attachments[key].type)) {
                showErrorMessageSD(field, TXT.asssetType);
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

    if (!(imageOnly && validFields)) {
      return;
    };

    // validations passed, entering Ajax call to submit the form
    // initiate the spinner
    sdFormWrapper.classList.add('sd-form-submitting');

    const sdRquestXhr = new XMLHttpRequest();

    sdRquestXhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4 && this.status === 201) {
        // 201 means request inserted to Service Desk successfully
        sdFormWrapper.classList.remove('sd-form-submitting');
        sdFormWrapper.classList.add('thank-you-shown');
        // remove the values from all fields
        closeOverlayCounter = setTimeout(function () {
          closeOutSdOverlay(fields);
        }, 5000);
      }

      if (this.readyState === 4 && this.status !== 201) {
        // Ajax call failed, disable spinner
        let errMesg = this.responseText;

        try {
          // if it's a JSON
          const resObj = JSON.parse(errMesg);
          try {
            errMesg = JSON.parse(resObj.message).errorMesg;
          } catch (err) {
            errMesg = resObj.message;
          }
        } catch (err) {
          // it's a string
        }

        sdErrTag.insertAdjacentText('afterbegin', TXT[errMesg] || errMesg );
        sdFormWrapper.classList.remove('sd-form-submitting');
      }

    });
    sdRquestXhr.timeout = 5000;
    sdRquestXhr.ontimeout = function(){
      sdErrTag.insertAdjacentText('afterbegin', 'oops...System busy, please try again later.' );
      sdFormWrapper.classList.remove('sd-form-submitting');
    }
    sdRquestXhr.open("POST", requestForm.getAttribute('action'));
    sdRquestXhr.send(data);

  })

}()