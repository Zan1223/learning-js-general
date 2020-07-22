! function () {
  console.log('in page form loading')
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
    <section id="sd-form-inpage-wrapper-inpage">
    <style>
      #sd-form-inpage-wrapper-inpage {
        position: relative;
      }

      #sd-form-inpage-wrapper-inpage.thank-you-shown #sd-form-inpage {
        display: none;
      }

      #sd-form-inpage-wrapper-inpage.thank-you-shown #sd-thank-you-inpage {
        display: block;
      }

      #sd-form-inpage-wrapper-inpage.sd-form-inpage-submitting #sd-loading-spinner-inpage{
        display: block;
      }

      #sd-form-inpage-wrapper-inpage #sd-form-inpage-section-inpage {
        background-color: #fff;
        max-width: 600px;
        margin: auto;
        position: relative;
        padding: 40px 30px;
        z-index: 2;
      }
  
      #sd-form-inpage-wrapper-inpage #sd-drop-shadow-inpage {
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

      #sd-form-inpage-wrapper-inpage #sd-res-error-inpage {
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
      #sd-form-inpage-wrapper-inpage * {
        color: #293e40;
      }
      
      #sd-form-inpage-wrapper-inpage #sd-form-inpage{
        display: block
      }

      #sd-form-inpage-wrapper-inpage #sd-thank-you-inpage {
        display: none
      }
  
      #sd-form-inpage-wrapper-inpage #sd-thank-you-inpage p {
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

      #sd-form-inpage-wrapper-inpage #sd-form-inpage #sd-attachments-section-inpage {
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

      #sd-form-inpage-wrapper-inpage #sd-form-inpage #sd-attachments-section-inpage span{
        display: block;
        font-family: inherit;
        font-size: inherit;
        padding: 4px 0;
      }
  
      #sd-form-inpage-wrapper-inpage #sd-form-inpage label {
        margin-bottom: 8px;
        text-align: left;
      }
      #sd-form-inpage-wrapper-inpage h2 {
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
      #sd-form-inpage-wrapper-inpage #sd-form-inpage h3 {
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

      #sd-uploadFile-inpage-mock-wrapper-inpage {
        margin-top: 20px;
      }

      #sd-form-inpage-wrapper-inpage #sd-form-inpage label#sd-uploadFile-inpage-mock {
        display: inline-block;
        width: auto;
      }
      #sd-form-inpage-wrapper-inpage #sd-form-inpage label#sd-uploadFile-inpage-mock div {
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

      #sd-form-inpage-wrapper-inpage #sd-form-inpage label#sd-uploadFile-inpage-mock div:hover {
        cursor: pointer;
        opacity: 0.8;
      }
  
      #sd-form-inpage-wrapper-inpage #sd-form-inpage label,
      #sd-form-inpage-wrapper-inpage #sd-form-inpage label .sd-form-inpage-field-inpage {
        display: block;
        position: relative;
        width: 100%;
      }
  
      #sd-form-inpage-wrapper-inpage #sd-form-inpage label .sd-form-inpage-field-inpage {
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

      #sd-form-inpage-wrapper-inpage #sd-form-inpage label select.sd-form-inpage-field-inpage {
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
      #sd-form-inpage-wrapper-inpage #sd-form-inpage label select.sd-form-inpage-field-inpage.field-has-value {
        font-size: 16px;
        padding-left: 16px;
      }
      
      #sd-form-inpage-wrapper-inpage #sd-form-inpage label:focus, #sd-form-inpage label .sd-form-inpage-field-inpage:focus {
        outline: none !important;
      }
  
      #sd-form-inpage-wrapper-inpage #sd-form-inpage label .sd-form-inpage-field-inpage.error-occured, #sd-form-inpage-wrapper-inpage #sd-form-inpage #sdRecaptcha-inpage.sd-form-inpage-field-inpage.error-occured > div {
        outline: 1px solid #b33233;
      }

      #sd-form-inpage-wrapper-inpage #sd-form-inpage label .sd-form-inpage-field-inpage:not([type=file]):not(select) {
        background-color: #f7f7f7;
        padding: 20px 20px 0 16px;
      }
  
      #sd-form-inpage-wrapper-inpage #sd-form-inpage label .sd-form-inpage-field-inpage[type=file] {
        cursor: pointer;
        font-size: 14px;
        height: auto;
        line-height: 0;
        margin: 30px 0;
        max-width: 320px;
        width: 100%;
      }
  
      #sd-form-inpage-wrapper-inpage #sd-form-inpage label textarea.sd-form-inpage-field-inpage {
        height: 100px;
        resize: none;
      }
  
      #sd-form-inpage-wrapper-inpage #sd-form-inpage label .sd-form-inpage-field-inpage:focus~.sd-form-inpage-label-inpage,
      #sd-form-inpage-wrapper-inpage #sd-form-inpage label .sd-form-inpage-field-inpage.field-has-value~.sd-form-inpage-label-inpage {
        font-size: 12px;
        left: 16px;
        top: 8px;
      }
  
      #sd-form-inpage-wrapper-inpage #sd-form-inpage label .sd-form-inpage-label-inpage {
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
  
      #sd-form-inpage-wrapper-inpage #sd-form-inpage .sd-field-error-msg, #sd-form-inpage-wrapper-inpage #sd-form-inpage label+.sd-field-error-msg {
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

      #sd-form-inpage-wrapper-inpage ul#sn-issue-origin-sec {
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
        display: none;
      }

      #sd-form-inpage-wrapper-inpage ul#sn-issue-origin-sec li{
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

      #sd-form-inpage-wrapper-inpage ul#sn-issue-origin-sec li span {
        display: block;
        color: inherit;
        position: relative;
      }

      #sd-form-inpage-wrapper-inpage ul#sn-issue-origin-sec li:hover {
        color: #fff;
        background-color: #293e40;
      }

      #sd-form-inpage-wrapper-inpage ul#sn-issue-origin-sec li:hover span {
        color: inherit;
      }

      #sd-form-inpage-wrapper-inpage ul#sn-issue-origin-sec li:last-child {
        margin-right: 0;
      }

      #sd-form-inpage-wrapper-inpage ul#sn-issue-origin-sec li.selected {
        color: #fff;
        background-color: #293e40;
      }

      #sd-form-inpage-wrapper-inpage #sd-form-inpage button {
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

      #sd-form-inpage-wrapper-inpage #sn-consent-container-inpage {
        margin-top: 25px;
      }
      #sd-form-inpage-wrapper-inpage #sn-consent-container-inpage p {
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

      #sd-form-inpage-wrapper-inpage #sn-consent-container-inpage p a {
        font-family: inherit;
        font-size: inherit;
      }
  
      #sd-form-inpage-wrapper-inpage #sd-form-inpage button:hover {
        background-color: #293e40;
        color: #fff;
      }
  
      #sd-form-inpage-wrapper-inpage #sd-overlay-close-inpage {
        display: inline-block !important;
        padding: 0 15px;
        position: absolute;
        right: 0;
        top: 15px;
        z-index: 2;
      }
  
      #sd-form-inpage-wrapper-inpage #sd-overlay-close-inpage > svg {
        opacity: 0.3;
      }
  
      #sd-form-inpage-wrapper-inpage #sd-overlay-close-inpage > svg g {
        stroke: #293e40;
      }
  
      #sd-form-inpage-wrapper-inpage #sd-overlay-close-inpage:hover > svg{
        cursor: pointer;
        opacity: 1;
      }

      #sd-form-inpage-wrapper-inpage #sd-loading-spinner-inpage {
        bottom: 0;
        display: none;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
      }

      #sd-form-inpage-wrapper-inpage .sd-spinner-lds-roller-inpage {
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
     #sd-form-inpage-wrapper-inpage .sd-spinner-lds-roller-inpage div {
        animation: sd-spinner-lds-roller-inpage 1.2s linear infinite;
        transform-origin: 42px 42px;
     }
     #sd-form-inpage-wrapper-inpage .sd-spinner-lds-roller-inpage div:after, #sd-form-inpage-wrapper-inpage .sd-spinner-lds-roller-inpage div::after {
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
     #sd-form-inpage-wrapper-inpage .sd-spinner-lds-roller-inpage div:nth-child(1) {
        animation-delay: -1.1s;
        transform: rotate(0deg);
     }
     #sd-form-inpage-wrapper-inpage .sd-spinner-lds-roller-inpage div:nth-child(2) {
        animation-delay: -1s;
        transform: rotate(30deg);
     }
     #sd-form-inpage-wrapper-inpage .sd-spinner-lds-roller-inpage div:nth-child(3) {
        animation-delay: -0.9s;
        transform: rotate(60deg);
     }
     #sd-form-inpage-wrapper-inpage .sd-spinner-lds-roller-inpage div:nth-child(4) {
        animation-delay: -0.8s;
        transform: rotate(90deg);
     }
     #sd-form-inpage-wrapper-inpage .sd-spinner-lds-roller-inpage div:nth-child(5) {
        animation-delay: -0.7s;
        transform: rotate(120deg);
     }
     #sd-form-inpage-wrapper-inpage .sd-spinner-lds-roller-inpage div:nth-child(6) {
        animation-delay: -0.6s;
        transform: rotate(150deg);
     }
     #sd-form-inpage-wrapper-inpage .sd-spinner-lds-roller-inpage div:nth-child(7) {
        animation-delay: -0.5s;
        transform: rotate(180deg);
     }
     #sd-form-inpage-wrapper-inpage .sd-spinner-lds-roller-inpage div:nth-child(8) {
        animation-delay: -0.4s;
        transform: rotate(210deg);
     }
     #sd-form-inpage-wrapper-inpage .sd-spinner-lds-roller-inpage div:nth-child(9) {
        animation-delay: -0.3s;
        transform: rotate(240deg);
     }
     #sd-form-inpage-wrapper-inpage .sd-spinner-lds-roller-inpage div:nth-child(10) {
        animation-delay: -0.2s;
        transform: rotate(270deg);
     }
     #sd-form-inpage-wrapper-inpage .sd-spinner-lds-roller-inpage div:nth-child(11) {
        animation-delay: -0.1s;
        transform: rotate(300deg);
     }
     #sd-form-inpage-wrapper-inpage .sd-spinner-lds-roller-inpage div:nth-child(12) {
        animation-delay: 0s;
        transform: rotate(330deg);
     }
      @keyframes sd-spinner-lds-roller-inpage {
        0% {
          opacity: 1;
       }
        100% {
          opacity: 0;
       }
     }

     #sd-form-inpage-wrapper-inpage #sd-recaptcha-container-inpage {
      margin-top: 20px; 
     }
      
      @media (min-width: 768px) {
        #sd-form-inpage-wrapper-inpage #sd-form-inpage-section-inpage {
          padding: 45px 50px;
        }
        #sd-form-inpage-wrapper-inpage #sd-form-inpage label .sd-form-inpage-label-inpage {
          top: 15px;
        }
        #sd-form-inpage-wrapper-inpage #sd-overlay-close-inpage {
          padding: 0 25px;
          top: 25px;
        }
        #sd-form-inpage-wrapper-inpage #sd-thank-you-inpage p {
          font-size: 18px;
        }

        #sd-form-inpage-wrapper-inpage ul#sn-issue-origin-sec {
          flex-wrap: nowrap;
        }

        #sd-form-inpage-wrapper-inpage ul#sn-issue-origin-sec li {
          padding: 15px 10px;
          margin-right: 10px;
          width: 20%;
        }
      }
      @media (min-width: 1024px) {
        #sd-form-inpage-wrapper-inpage #sd-form-inpage label .sd-form-inpage-field-inpage {
          height: 56px;
        }
      }
    </style>
    <section id="sd-form-inpage-section-inpage">
      <form action="${actionPath}" id="sd-form-inpage">
        <h2 id="sd-form-inpage-title">${SD_TXT.sdFormTitle}</h2>
        <input type="hidden" name="caller_id" class="sd-form-inpage-field-inpage" value="Guest" />
        <input type="hidden" name="contact_type" class="sd-form-inpage-field-inpage" value="form" />
        <input type="hidden" name="u_source_url" class="sd-form-inpage-field-inpage" value="${window.location.href}" />
        <label>
          <input type="email" name="u_email" class="sd-form-inpage-field-inpage mandatory-field-inpage" />
          <span class="sd-form-inpage-label-inpage">${SD_TXT.email}</span>
        </label>
        <!-- <label>
          <select name="subcategory" class="sd-form-inpage-field-inpage mandatory-field-inpage">
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
          </select>
        </label> -->
        <!-- <label>
          <input type="text" name="short_description" class="sd-form-inpage-field-inpage mandatory-field-inpage" />
          <span class="sd-form-inpage-label-inpage">${SD_TXT.subject}</span>
        </label> -->
      <!-- <h3>${SD_TXT.issueOriginTitle}?</h3> -->
        <ul id="sn-issue-origin-sec">
          <li class="selected default"><span>Events Gateway UAT</span></li>
          <li><span>Developer Portal</span></li>
          <li><span>Partner Portal</span></li>
          <li><span>Community Site</span></li>
          <li><span>Somewhere Else</span></li>
        </ul>
        <label>
          <textarea name="description" class="sd-form-inpage-field-inpage mandatory-field-inpage"></textarea>
          <span class="sd-form-inpage-label-inpage">${SD_TXT.description}</span>
        </label>
        <label style="display:none">
          <input type="file" name="attachment" id="sd-uploadFile-inpage" multiple class="sd-form-inpage-field-inpage" accept="image/png, image/jpeg"/>
        </label>
        <div id="sd-uploadFile-inpage-mock-wrapper-inpage">
          <h3 id="sd-uploadFile__attachment_label-inpage">${SD_TXT.attachmentLabel}.</h3>
          <label for="sd-uploadFile-inpage" id="sd-uploadFile-inpage-mock">
              <div>${SD_TXT.chooseFiles}</div>
          </label>
        </div>
        <section id="sd-attachments-section-inpage">
          <span>${SD_TXT.noFilesChosen}</span>
        </section>

        <section id="sd-recaptcha-container-inpage">
          <div id="sdRecaptcha-inpage" class="g-recaptcha sd-form-inpage-field-inpage" data-sitekey="6Lc4XHAUAAAAABSFGSTYQheacoJo5S5BgOyExoE7"></div>
        </section>
        <span id="sd-res-error-inpage"></span>
        <button type="submit" value="submit">${SD_TXT.submit}</button>
        <section id="sn-consent-container-inpage">
          <p>By submitting this form, I confirm that I have read and agree to the <a href="https://www.servicenow.com/privacy-statement.html" target="_blank">Privacy Statement</a>.</p>
        </section>
      </form>
      <div id="sd-thank-you-inpage">
        <p>${SD_TXT.submissionThankYou}</p>
      </div>
      <section id="sd-loading-spinner-inpage">
        <div class="sd-spinner-lds-roller-inpage">
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
  
   <!-- <section id="sd-drop-shadow-inpage"></section> -->
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

  document.getElementById('sd-form-inpage-container').insertAdjacentHTML('beforeend', renderHTML());

  if (!document.querySelector('script[src^="https://www.google.com/recaptcha/api.js"]')) {
    // only execute this when there is no recaptcha script on the page yet
    document.head.append(sdRecaptchaScriptTag());
  }

  const sdFormWrapper = document.getElementById('sd-form-inpage-wrapper-inpage');
  const requestForm = sdFormWrapper.querySelector('#sd-form-inpage');
  const uploadFileBtn = requestForm.querySelector('#sd-uploadFile-inpage');
  const mockUploadFileBtn = requestForm.querySelector('#sd-uploadFile-inpage-mock');
  const attachmentSection = requestForm.querySelector('#sd-attachments-section-inpage');
  const sdErrTag = requestForm.querySelector('#sd-res-error-inpage');
  const requiredFields = requestForm.querySelectorAll('.sd-form-inpage-field-inpage');
  // const formCloseBtn = document.querySelector('#sd-form-inpage-section-inpage #sd-overlay-close-inpage');
  // const formShadowDrop = sdFormWrapper.querySelector('#sd-drop-shadow-inpage');
  const sdRecaptchaEle = requestForm.querySelector('#sdRecaptcha-inpage');
  // let closeOverlayCounter = null;
  let sdRecaptchaWidget = null;
  let issueOriginSec = null;
  let issueLocation = '';

  const IssueOrigin = {
    init() {
      this.issueTiles = Array.from(document.querySelectorAll('#sd-form-inpage #sn-issue-origin-sec li'));
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
    sdFormWrapper.classList.remove('sd-form-inpage-active');
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
  
  function loadRecapcha(){
    try {
      if (grecaptcha && !sdRecaptchaEle.classList.contains('sd-recaptcha-inpage-loaded')) {
        sdRecaptchaWidget = sdWidgetRender('sdRecaptcha-inpage',
          function success(e) {
            hideErrorMessageSD(sdRecaptchaEle)
          },
          function error(err) {
            showErrorMessageSD(sdRecaptchaEle, SD_TXT.required)
          });
        // add the flag
        sdRecaptchaEle.classList.add('sd-recaptcha-inpage-loaded');
      }
    }catch(err){
      setTimeout(loadRecapcha,500)
    }
  }

  loadRecapcha();

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
  // formCloseBtn.addEventListener('click', function (e) {
  //   clearTimeout(closeOverlayCounter);
  //   closeOutSdOverlay(requiredFields);
  // });
  // close the overlay while clicking outside the form
  // formShadowDrop.addEventListener('click', function (e) {
  //   clearTimeout(closeOverlayCounter);
  //   closeOutSdOverlay(requiredFields);
  // });

  issueOriginSec = IssueOrigin.init();

  requestForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const fields = requestForm.querySelectorAll('.sd-form-inpage-field-inpage');

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
      if ((field.classList.contains('mandatory-field-inpage') && !fieldValue) || (field.id === 'sdRecaptcha-inpage' && !grecaptcha.getResponse(sdRecaptchaWidget))) {
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
    data.append('short_description', `${issueLocation}`);
    // console.log('data ====>', data);
    if (!validFields) {
      return;
    };

    // validations passed, entering Ajax call to submit the form
    // initiate the spinner
    sdFormWrapper.classList.add('sd-form-inpage-submitting');

    const sdRquestXhr = new XMLHttpRequest();

    sdRquestXhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4 && this.status === 201) {
        // 201 means request inserted to Service Desk successfully
        sdFormWrapper.classList.remove('sd-form-inpage-submitting');
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
        sdFormWrapper.classList.remove('sd-form-inpage-submitting');
      }

    });
    sdRquestXhr.timeout = 10000;
    sdRquestXhr.ontimeout = function () {
      sdErrTag.insertAdjacentText('afterbegin', 'oops...System busy, please try again later.');
      sdFormWrapper.classList.remove('sd-form-inpage-submitting');
    }
    sdRquestXhr.open("POST", requestForm.getAttribute('action'));
    sdRquestXhr.send(data);

  })

}()