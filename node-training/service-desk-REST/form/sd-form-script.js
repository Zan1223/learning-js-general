! function () {
  const SD_TXT = {
    email: sdTranslator('Email') || 'Email',
    subject: sdTranslator('Subject') || 'Subject',
    description: sdTranslator('Description') || 'Description',
    submit: sdTranslator('Submit') || 'Submit',
    submissionThankYou: sdTranslator('submissionThankYou') || 'Thank you for submitting your request. We will confirm your submission shortly.',
    required: sdTranslator('required') || 'Required',
    emailisnotvaliderror: sdTranslator('emailisnotvaliderror') || 'Invalid Email',
    noHTMLTagsAllowed: sdTranslator('noHTMLTagsAllowed') || 'Invalid input: < or > symbol is not allowed',
    asssetType: sdTranslator('invalidAttachmentType') || 'Invalid attachment Type: only image/jpeg and image/png are allowed',
    attachmentLabel: sdTranslator('Please attach supporting screenshots if applicable') || 'Please attach supporting screenshots if applicable',
    chooseFiles: sdTranslator('chooseFiles') || 'Choose Attachments',
    noFilesChosen: sdTranslator('noFilesChosen') || 'No Attachment Chosen',
    fileSizeExceeded: sdTranslator('Total file size must not exceed 15 MB') || 'Total file size must not exceed 15 MB',
    issueOriginTitle: sdTranslator('Where did you encounter the problem') || 'Where did you encounter the problem',
    sdFormTitle: sdTranslator('Report an issue') || 'Report an issue',
    topicDropdown: {
      issueType: sdTranslator('Issue Type') || 'Issue Type',
      signIn: sdTranslator('Sign In') || 'Sign In',
      forgotPwd: sdTranslator('Forgot Password') || 'Forgot Password',
      validateAccount: sdTranslator('Validate Account') || 'Validate Account',
      registration: sdTranslator('registration') || 'Registration',
      changeEmail: sdTranslator('changeEmail') || 'Change Email',
      linkAccounts: sdTranslator('linkAccounts') || 'Link Accounts',
      mergeAccounts: sdTranslator('mergeAccounts') || 'Merge Accounts',
      eventAgendaSession: sdTranslator('eventAgendaSession') || 'Event - Agenda, Session',
      eventRegistration: sdTranslator('eventRegistration') || 'Event - Registration',
      generalQuestion: sdTranslator('generalQuestion') || 'General Question',
      others: sdTranslator('others') || 'Others',
    }
  }
  // file size limit set to 15 MB
  const FILE_SIZE_LIMIT = 15000000;

  function sdTranslator(term) {
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
        height: 100vh;
        width: 100%;
        opacity: 0;
        position: fixed;
        transition: all 0.2s ease;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        visibility: hidden;
        overflow-y: auto;
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
        padding: 40px 30px;
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
        overflow-y: auto;
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
        margin-top: 20px;
        text-align: left;
      }
      #sd-form-wrapper * {
        color: #293e40;
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

      #sd-form-wrapper #sd-form #sd-attachments-section {
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
        font-size: 13px;
      }

      #sd-form-wrapper #sd-form #sd-attachments-section span{
        display: block;
        font-family: inherit;
        font-size: inherit;
        padding: 4px 0;
      }
  
      #sd-form-wrapper #sd-form label {
        margin-bottom: 8px;
        text-align: left;
      }
      #sd-form-wrapper h2 {
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
        font-size: 22px;
        line-height: 1.37;
        margin: 10px 0;
      }
      #sd-form-wrapper #sd-form h3 {
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
        font-weight: normal;
        line-height: 1.37;
        margin: 10px 0 5px 0;
      }

      #sd-uploadFile-mock-wrapper {
        margin-top: 20px;
      }

      #sd-form-wrapper #sd-form label#sd-uploadFile-mock {
        display: inline-block;
        width: auto;
      }
      #sd-form-wrapper #sd-form label#sd-uploadFile-mock div {
        background-color: #81b5a1;
        color: #fff;
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
        padding: 10px 15px;
        margin-top: 10px;
      }

      #sd-form-wrapper #sd-form label#sd-uploadFile-mock div:hover {
        cursor: pointer;
        opacity: 0.8;
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
  
      #sd-form-wrapper #sd-form label .sd-form-field.error-occured, #sd-form-wrapper #sd-form #sdRecaptcha.sd-form-field.error-occured > div {
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
  
      #sd-form-wrapper #sd-form .sd-field-error-msg, #sd-form-wrapper #sd-form label+.sd-field-error-msg {
        color:#b33233;
        display: block;
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
        font-size: 11px;
      }

      #sd-form-wrapper ul#sn-issue-origin-sec {
        display: flex;
        padding-left: 0;
        margin: 0 0 8px 0;
        flex-wrap: wrap;
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

      #sd-form-wrapper ul#sn-issue-origin-sec li{
        border: 2px solid #293e40;
        backgrounc-color: #fff;
        color: #293e40;
        cursor: pointer;
        list-style: none;
        text-align: center;
        padding: 10px 10px;
        margin: 5px 0;
        width: 100%;
        transition: all .25s;
      }

      #sd-form-wrapper ul#sn-issue-origin-sec li span {
        display: block;
        color: inherit;
        position: relative;
      }

      #sd-form-wrapper ul#sn-issue-origin-sec li:hover {
        color: #fff;
        background-color: #293e40;
      }

      #sd-form-wrapper ul#sn-issue-origin-sec li:hover span {
        color: inherit;
      }

      #sd-form-wrapper ul#sn-issue-origin-sec li:last-child {
        margin-right: 0;
      }

      #sd-form-wrapper ul#sn-issue-origin-sec li.selected {
        color: #fff;
        background-color: #293e40;
      }

      #sd-form-wrapper #sd-form button {
        background-color: #fff;
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
        left: 50%;
        margin-top: 15px;
        outline: none;
        padding: 15px 40px;
        position: relative;
        left: 0;
        transition: .2s ease;
  
      }

      #sd-form-wrapper #sn-consent-container {
        margin-top: 25px;
      }
      #sd-form-wrapper #sn-consent-container p {
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
      }

      #sd-form-wrapper #sn-consent-container p a {
        font-family: inherit;
        font-size: inherit;
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

     #sd-form-wrapper #sd-recaptcha-container {
      margin-top: 20px; 
     }
      
      @media (min-width: 768px) {
        #sd-form-wrapper #sd-form-section {
          padding: 45px 50px;
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

        #sd-form-wrapper ul#sn-issue-origin-sec {
          flex-wrap: nowrap;
        }

        #sd-form-wrapper ul#sn-issue-origin-sec li {
          padding: 15px 10px;
          margin-right: 10px;
          width: 20%;
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
        <h2 id="sd-form-title">${SD_TXT.sdFormTitle}</h2>
        <input type="hidden" name="caller_id" class="sd-form-field" value="Guest" />
        <input type="hidden" name="contact_type" class="sd-form-field" value="form" />
        <input type="hidden" name="u_source_url" class="sd-form-field" value="${window.location.href}" />
        <label>
          <input type="email" name="u_email" class="sd-form-field mandatory-field" />
          <span class="sd-form-label">${SD_TXT.email}</span>
        </label>
        <label>
          <select name="subcategory" class="sd-form-field mandatory-field">
            <option value selected>-- ${SD_TXT.topicDropdown.issueType} --</option>
            <option value="sign in">${SD_TXT.topicDropdown.signIn}</option>
            <option value="forgot password">${SD_TXT.topicDropdown.forgotPwd}</option>
            <option value="registration">${SD_TXT.topicDropdown.registration}</option>
            <option value="validate account">${SD_TXT.topicDropdown.validateAccount}</option>
            <option value="change email">${SD_TXT.topicDropdown.changeEmail}</option>
            <option value="link accounts">${SD_TXT.topicDropdown.linkAccounts}</option>
            <option value="merge accounts">${SD_TXT.topicDropdown.mergeAccounts}</option>
            <option value="event agenda session">${SD_TXT.topicDropdown.eventAgendaSession}</option>
            <option value="event registration">${SD_TXT.topicDropdown.eventRegistration}</option>
            <option value="general question">${SD_TXT.topicDropdown.generalQuestion}</option>
           <!-- <option value="others">${SD_TXT.topicDropdown.others}</option> -->
          </select>
        </label>
        <!-- <label>
          <input type="text" name="short_description" class="sd-form-field mandatory-field" />
          <span class="sd-form-label">${SD_TXT.subject}</span>
        </label> -->
        <h3>${SD_TXT.issueOriginTitle}?</h3>
        <ul id="sn-issue-origin-sec">
          <li class="selected default"><span>Main Site</span></li>
          <li><span>Developer Portal</span></li>
          <li><span>Partner Portal</span></li>
          <li><span>Community Site</span></li>
          <li><span>Somewhere Else</span></li>
        </ul>
        <label>
          <textarea name="description" class="sd-form-field mandatory-field"></textarea>
          <span class="sd-form-label">${SD_TXT.description}</span>
        </label>
        <label style="display:none">
          <input type="file" name="attachment" id="sd-uploadFile" multiple class="sd-form-field" accept="image/png, image/jpeg"/>
        </label>
        <div id="sd-uploadFile-mock-wrapper">
          <h3 id="sd-uploadFile__attachment_label">${SD_TXT.attachmentLabel}.</h3>
          <label for="sd-uploadFile" id="sd-uploadFile-mock">
              <div>${SD_TXT.chooseFiles}</div>
          </label>
        </div>
        <section id="sd-attachments-section">
          <span>${SD_TXT.noFilesChosen}</span>
        </section>

        <section id="sd-recaptcha-container">
          <div id="sdRecaptcha" class="g-recaptcha sd-form-field" data-sitekey="6Lc4XHAUAAAAABSFGSTYQheacoJo5S5BgOyExoE7"></div>
        </section>
        <span id="sd-res-error"></span>
        <button type="submit" value="submit">${SD_TXT.submit}</button>
        <section id="sn-consent-container">
          <p>By submitting this form, I confirm that I have read and agree to the <a href="https://www.servicenow.com/privacy-statement.html" target="_blank">Privacy Statement</a>.</p>
        </section>
      </form>
      <div id="sd-thank-you">
        <p>${SD_TXT.submissionThankYou}</p>
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

  function sdRecaptchaSrc() {
    const htmlTag = document.querySelector('html');
    const langRecap = htmlTag.getAttribute('hreflang') || htmlTag.getAttribute('lang');
    return 'https://www.google.com/recaptcha/api.js?render=explicit&hl=' + (langRecap ? langRecap : 'en-US');
  }

  function sdRecaptchaScriptTag() {
    var recaptchaScriptTag = document.createElement('script');
    recaptchaScriptTag.type = 'text/javascript';
    recaptchaScriptTag.src = sdRecaptchaSrc();
    return recaptchaScriptTag;
  }

  function sdWidgetRender(id, callback, errCallback) {
    return grecaptcha.render(id, {
      'sitekey': '6Lc4XHAUAAAAABSFGSTYQheacoJo5S5BgOyExoE7',
      'callback': callback,
      'error-callback': errCallback,
      'expired-callback': errCallback
    });
  }

  document.body.insertAdjacentHTML('beforeend', renderHTML());

  if (!document.querySelector('script[src^="https://www.google.com/recaptcha/api.js"]')) {
    // only execute this when there is no recaptcha script on the page yet
    document.head.append(sdRecaptchaScriptTag());
  }

  const sdFormWrapper = document.getElementById('sd-form-wrapper');
  const requestForm = sdFormWrapper.querySelector('#sd-form');
  const uploadFileBtn = requestForm.querySelector('#sd-uploadFile');
  const mockUploadFileBtn = requestForm.querySelector('#sd-uploadFile-mock');
  const attachmentSection = requestForm.querySelector('#sd-attachments-section');
  const sdErrTag = requestForm.querySelector('#sd-res-error');
  const requiredFields = requestForm.querySelectorAll('.sd-form-field');
  const formCloseBtn = document.querySelector('#sd-form-section #sd-overlay-close');
  const formShadowDrop = sdFormWrapper.querySelector('#sd-drop-shadow');
  const sdRecaptchaEle = requestForm.querySelector('#sdRecaptcha');
  let closeOverlayCounter = null;
  let sdRecaptchaWidget = null;
  let issueOriginSec = null;
  let issueLocation = '';

  const IssueOrigin = {
    init() {
      this.issueTiles = Array.from(document.querySelectorAll('#sd-form #sn-issue-origin-sec li'));
      this.initActiveTile();
      this.mountEvent();
      return this;
    },
    mountEvent() {
      //console.log('events mounted')
      document.addEventListener('click', this.activateTile.bind(this));
    },
    initActiveTile() {
      this.issueTiles.forEach(tile => {
        // console.log('initial active');
        if (tile.classList.contains('default')) {
          tile.classList.add('selected');
          this.activeTile = tile;
          this.setlocVal(tile.firstChild.textContent)
          return;
        };
        tile.classList.remove('selected');
      })
    },
    activateTile(e) {
      let target = e.target;
      let targetInnerText = target.innerText;
      // console.log('target===>', target);
      if(target.nodeName.toLowerCase() === 'span'){
        target = target.parentElement;
      }

      if (!target.parentElement || target.parentElement.id !== 'sn-issue-origin-sec') return;

      this.issueTiles.forEach(tile => {
        if (target === this.activeTile) {
          return;
        }
        tile.classList.remove('selected');
      })
      target.classList.add('selected');
      this.setlocVal(targetInnerText);
      this.activeTile = target;
    },
    setlocVal(value) {
      issueLocation = value;
    }

  }

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
      grecaptcha.reset(sdRecaptchaWidget); // reset the recaptcha
      // only clear out the form data while on thank you view
      Array.prototype.forEach.call(fields, function (field) {
        if (field.type !== 'hidden') {
          field.value = "";
          field.classList.remove('field-has-value');
          hideErrorMessageSD(field);
        }
      });
      // reset the attachment Section
      attachmentSection.innerHTML = `<span>${SD_TXT.noFilesChosen}</span>`;

      setTimeout(function () {
        sdFormWrapper.classList.remove('thank-you-shown');
        issueOriginSec.initActiveTile();
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


 const showSDOverlay = function(e) {
    if ((e.type === "click" && e.target.classList.contains('sd-form-trigger')) || (e.type === 'message' && e.data === 'xxxenableSDOverlay')) {
      sdFormWrapper.classList.add('sd-form-active');
      // load recaptcha
      if (!sdRecaptchaEle.classList.contains('sd-recaptcha-loaded')) {
        sdRecaptchaWidget = sdWidgetRender('sdRecaptcha',
          function success(e) {
            hideErrorMessageSD(sdRecaptchaEle)
          },
          function error(err) {
            showErrorMessageSD(sdRecaptchaEle, SD_TXT.required)
          });
        // add the flag
        sdRecaptchaEle.classList.add('sd-recaptcha-loaded');
      }
    }
  }

  window.addEventListener('click', showSDOverlay);
  window.addEventListener('message', showSDOverlay);

  // attachment updates

  uploadFileBtn.addEventListener('change', function (e) {
    attachmentSection.innerHTML = "";
    const uploadedFiles = e.target.files;
    if (uploadedFiles.length) {
      for (let key in uploadedFiles) {
        // only get the properties with uploaded file details
        if (key < uploadedFiles.length) {
          attachmentSection.insertAdjacentHTML('beforeend', `<span>${uploadedFiles[key].name}</span>`);
        }
      }

    } else {
      // no file uploaded / selected
      attachmentSection.insertAdjacentHTML('beforeend', `<span>${SD_TXT.noFilesChosen}</span>`)
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

  issueOriginSec = IssueOrigin.init();

  requestForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const fields = requestForm.querySelectorAll('.sd-form-field');

    const data = new FormData();
    let validFields = true;
    let totalFileSize = 0;

    // remove the error message
    sdErrTag.innerHTML = '';

    Array.prototype.forEach.call(fields, function (field) {
      const fieldValue = field.value;
      // validate the fields
      // remove the error message at the begining
      hideErrorMessageSD(field);
      // check if the field is empty or run recaptcha check
      if ((field.classList.contains('mandatory-field') && !fieldValue) || (field.id === 'sdRecaptcha' && !grecaptcha.getResponse(sdRecaptchaWidget))) {
        validFields = false;
        showErrorMessageSD(field, SD_TXT.required);
        return;
      }

      // check if the field contains HTML tags
      if (/<|\/>|>/.test(fieldValue)) {
        showErrorMessageSD(field, SD_TXT.noHTMLTagsAllowed);
        validFields = false;
        return;
      }

      // check if the email field is in right email format
      if (field.type === 'email') {
        const patern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!patern.test(fieldValue)) {
          showErrorMessageSD(field, SD_TXT.emailisnotvaliderror);
          validFields = false;
          return;
        }
      }

      if (field.type === 'file') {
        hideErrorMessageSD(mockUploadFileBtn);
        const attachments = field.files;
        if (attachments.length) {
          for (let key in attachments) {
            // jump out of the execution if there is a non image uploaded
            if (key < attachments.length) {
              if (!RegExp('image\/png|image\/jpeg').test(attachments[key].type)) {
                showErrorMessageSD(mockUploadFileBtn, SD_TXT.asssetType);
                validFields = false;
                return;
              }
              // hideErrorMessageSD(mockUploadFileBtn);

              totalFileSize += attachments[key].size;
              // console.log('1===>', field.name)
              data.append(field.name, attachments[key], attachments[key].name);
            }
          }

          if (totalFileSize >= FILE_SIZE_LIMIT) {
            showErrorMessageSD(mockUploadFileBtn, SD_TXT.fileSizeExceeded);
            validFields = false;
            return
          }

        } else {
          // no attachment so remove the error message if there is any
          hideErrorMessageSD(mockUploadFileBtn, SD_TXT.asssetType);
        }
      } else {
        if(field.name){
          // console.log('2===>', field.name);
        // append other field values to the data object except file type
          data.append(field.name, field.value);
        }
      }
    })

    // auto generate the subject with combo of Location - Issue Type
    data.append('short_description', `${issueLocation} - ${document.querySelector('#sd-form [name=subcategory]').selectedOptions[0].innerText}`);
    // console.log('data ====>', data);
    if (!validFields) {
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

        sdErrTag.insertAdjacentText('afterbegin', SD_TXT[errMesg] || errMesg);
        sdFormWrapper.classList.remove('sd-form-submitting');
      }

    });
    sdRquestXhr.timeout = 10000;
    sdRquestXhr.ontimeout = function () {
      sdErrTag.insertAdjacentText('afterbegin', 'oops...System busy, please try again later.');
      sdFormWrapper.classList.remove('sd-form-submitting');
    }
    sdRquestXhr.open("POST", requestForm.getAttribute('action'));
    sdRquestXhr.send(data);

  })

}()