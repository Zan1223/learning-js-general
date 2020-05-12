const requestForm = (api) => {
  return (
    `<iframe name="snsd-target" style="display:none"></iframe>
    <section>
    <form action="${api}" id="sd-form" enctype="multipart/form-data" method="post" target="snsd-target">
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
  </section>

  














  `
  )
}

module.exports = requestForm;