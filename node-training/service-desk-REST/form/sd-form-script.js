!function () {
  const TXT = {
    email: translator('Email') || 'Email',
    subject: translator('Subject') || 'Subject',
    description: translator('Description') || 'Description',
    submit: translator('Submit') || 'Submit',
    submissionThankYou: translator('submissionThankYou') || 'Thank you for submitting your request. One of our support members will reach out to you shortly.',
    required: translator('required') || 'Required',
    emailError: translator('emailisnotvaliderror') || 'Invalid Email',
    htmlTag: translator('noHTMLTagsAllowed') || 'Invalid input: < or > symbol is not allowed',
    asssetType: translator('invalidAttachmentType') || 'Invalid attachment Type: only image/jpeg and image/png are allowed',
  }

  function translator(term){
    try {
      return Granite.I18n.get(term);
    }catch(err){
      console.error(err);
      return false;
    }
  }
  
  function renderHTML() {
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

      #sd-form-section {
        background-color: #fff;
        max-width: 600px;
        margin: auto;
        position: relative;
        padding: 50px 30px;
        top: 30px;
        z-index: 2;
      }
  
      #sd-drop-shadow {
        background-color: #293e40;
        opacity: 0.8;
        position: fixed;
        top: 0;
        left:0;
        right:0;
        bottom: 0;
        z-index: 1;
      }
  
      #sd-form-wrapper * {
        color: #293e40;
      }
      
      #sd-form {
        text-align: center;
      }
  
      #sd-form{
        display: block
      }

      #sd-thank-you {
        display: none
      }
  
      #sd-thank-you p {
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
  
      #sd-form label {
        margin-bottom: 8px;
        text-align: left;
      }
  
      #sd-form label,
      #sd-form label .sd-form-field {
        display: block;
        position: relative;
        width: 100%;
      }
  
      #sd-form label .sd-form-field {
        border: none;
        font-size: 16px;
        font-stretch: normal;
        font-style: normal;
        font-weight: 400;
        letter-spacing: 0;
        height: 48px;
        line-height: 37.2px;
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
      }
      
      #sd-form label:focus, #sd-form label .sd-form-field:focus {
        outline: none !important;
      }
  
      #sd-form label .sd-form-field.error-occured {
        outline: 1px solid #b33233;
      }
  
      #sd-form label .sd-form-field:not([type=file]) {
        background-color: #f7f7f7;
        padding: 20px 10px 0 16px;
      }
  
      #sd-form label .sd-form-field[type=file] {
        cursor: pointer;
        font-size: 14px;
        height: auto;
        margin: 30px 0;
        max-width: 320px;
        width: 100%;
      }
  
      #sd-form label textarea.sd-form-field {
        height: 100px;
        resize: none;
      }
  
      #sd-form label .sd-form-field:focus~.sd-form-label,
      #sd-form label .sd-form-field.field-has-value~.sd-form-label {
        font-size: 12px;
        left: 16px;
        top: 8px;
      }
  
      #sd-form label .sd-form-label {
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
  
      #sd-form label .sd-field-error-msg {
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
  
      #sd-form button {
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
  
      #sd-form button:hover {
        background-color: #293e40;
        color: #fff;
      }
  
      #sd-overlay-close {
        display: inline-block !important;
        padding: 0 15px;
        position: absolute;
        right: 0;
        top: 15px;
        z-index: 2;
      }
  
      #sd-overlay-close > svg {
        opacity: 0.3;
      }
  
      #sd-overlay-close > svg g {
        stroke: #293e40;
      }
  
      #sd-overlay-close:hover > svg{
        cursor: pointer;
        opacity: 1;
      }
  
      @media (min-width: 768px) {
        #sd-form-section {
          padding: 60px 50px;
          top: 50px;
        }
        #sd-overlay-close {
          padding: 0 25px;
          top: 25px;
        }
        #sd-thank-you p {
          font-size: 18px;
        }
      }
      @media (min-width: 1024px) {
        #sd-form label .sd-form-field {
          height: 56px;
        }
      }
    </style>
    <section id="sd-form-section">
      <form action="/service_desk_request" id="sd-form">
        <input type="hidden" name="caller_id" class="sd-form-field" value="Guest" />
        <input type="hidden" name="contact_type" class="sd-form-field" value="form" />
        <label>
          <input type="email" name="u_email" class="sd-form-field mandatory-field" />
          <span class="sd-form-label">${TXT.email}</span>
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
        <button type="submit" value="submit">${TXT.submit}</button>
      </form>
      <div id="sd-thank-you">
        <p>${TXT.submissionThankYou}</p>
      </div>
      <aside id="sd-overlay-close">
        <svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <desc>Created with Sketch.</desc> <defs></defs> <g id="Breakpoints" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"> <g id="1700_FulidGrid-Copy" transform="translate(-1603.000000, -68.000000)" stroke="#FFFFFF" stroke-width="2"> <g id="Name-Block" transform="translate(850.000000, 0.000000)"> <g id="Group-3" transform="translate(639.000000, 61.000000)"> <g id="Desktop/3.About_Us-Leadership-Bio/Module_01/Icon/icon_x_desktop-Copy" transform="translate(121.727922, 14.727922) rotate(-315.000000) translate(-121.727922, -14.727922) translate(111.727922, 4.727922)"> <path d="M19.4117647,10 L0.588235294,10" id="Line"></path> <path d="M10,19.4117647 L10,0.588235294" id="Line-Copy"></path> </g> </g> </g> </g> </g></svg>
      </aside>
    </section>
  
    <section id="sd-drop-shadow"></section>
  
  </section>`)
  }

  document.body.insertAdjacentHTML('beforeend', renderHTML());

  const sdFormWrapper = document.getElementById('sd-form-wrapper');
  const requestForm = document.querySelector('#sd-form-wrapper #sd-form');
  const requiredFields = requestForm.querySelectorAll('.sd-form-field');
  const formCloseBtn = document.querySelector('#sd-form-section #sd-overlay-close');
  let closeOverlayCounter = null;


  function showErrorMessageSD(field, errorMsg){
    field.parentElement.insertAdjacentHTML('beforeend', '<span class="sd-field-error-msg">' + errorMsg + '</span>');
    field.classList.add('error-occured');
  }

  function hideErrorMessageSD(field){
    field.parentElement.querySelector('.sd-field-error-msg') && field.parentElement.querySelector('.sd-field-error-msg').remove();
    field.classList.remove('error-occured');
  }

  function closeOutSdOverlay(fields){
    sdFormWrapper.classList.remove('sd-form-active');
    sdFormWrapper.classList.remove('thank-you-shown');
    Array.prototype.forEach.call(fields, function (field) {
      if(field.type !== 'hidden'){
        field.value = "";
        hideErrorMessageSD(field);
      }
    });
  }

  Array.prototype.forEach.call(requiredFields, function (field) {
    field.addEventListener('blur', function (e) {
      hideErrorMessageSD(e.target);
      const value = e.target.value;
      if (value) {
        e.target.classList.add('field-has-value');
      }else{
        e.target.classList.remove('field-has-value');
      }
    })
  });

  window.addEventListener('click', function(e){
    if(e.target.classList.contains('sd-form-trigger')){
      sdFormWrapper.classList.add('sd-form-active')
    }
  })

  formCloseBtn.addEventListener('click', function(e){
    clearTimeout(closeOverlayCounter);
    closeOutSdOverlay(requiredFields);
  })



  requestForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const fields = requestForm.querySelectorAll('.sd-form-field');

    const data = new FormData();
    let imageOnly = true;
    let validFields = true;

    Array.prototype.forEach.call(fields, function (field) {
      const fieldValue = field.value;
      // validate the fields
      // remove the error message at the begining
      hideErrorMessageSD(field);

      // check if the field is empty
      if (field.classList.contains('mandatory-field') && !fieldValue) {
        console.log('empty value for mandatory field');
        validFields = false;
        showErrorMessageSD(field, TXT.required);
        return;
      }

      // check if the field contains HTML tags
      if(/<|\/>|>/.test(fieldValue)){
        console.log('conntains HTML tag');
        showErrorMessageSD(field, TXT.htmlTag);
        validFields = false;
        return;
      }

      // check if the email field is in right email format
      if (field.type ==='email'){
        const patern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!patern.test(fieldValue)){
          console.log('invalid email');
          showErrorMessageSD(field, TXT.emailError);
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

    const sdRquestXhr = new XMLHttpRequest();
    sdRquestXhr.withCredentials = true;

    sdRquestXhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4 && this.status === 201) {
        // 201 means request inserted to Service Desk successfully
        sdFormWrapper.classList.add('thank-you-shown');
        // remove the values from all fields
        closeOverlayCounter = setTimeout(function(){
          closeOutSdOverlay(fields);
        }, 3000);
      }
    });

    sdRquestXhr.open("POST", requestForm.getAttribute('action'));
    sdRquestXhr.setRequestHeader("Authorization", "Basic bWFydGVjaC5zZXJ2aWNlZGVzazpUZXN0QDEyMw==");
    sdRquestXhr.send(data);

  })

}()