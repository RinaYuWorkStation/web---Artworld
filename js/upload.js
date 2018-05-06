//from WatchMeCode
// https://github.com/watchmecode/aws-s3-http-post



var Uploader = (function(){
  var $form, $file;

  function start(){
      console.log("uploader start")
    $form = $("#s3form");
     // console.log($form)
    $file = $("#s3file");

    $("#upload-file").click(function(e){
      e.preventDefault();
      handlUpload(function(err){
        if (err) { console.error(err.stack); }
      });
    });
  }
  
  function handlUpload(cb){
      console.log("hanlupload")
    var filename = $file[0].files[0].name;

    getUploadCreds(filename, function(err, creds){
    
    //  console.log(creds);
      if (err) { return cb(err); }
      setFormData(creds);
      $form.submit();
        
//        var color = require('/.color.js');
//     
        
    });
  }

  function getUploadCreds(filename, cb){
//        console.log("getuploadcreds")
    $.ajax({
      type: "post",
      url: "/s3creds",
      dataType: "json",
      data: {
        filename: filename
      },
      success: function(data){
        cb(undefined, data);
      },
      error: cb
    });
}

  function setFormData(creds){

      console.log('setformdata')
//      console.log(creds)
    $form.prop("target", creds.s3Url);
    $("input[name='key']").val(creds.key);
    $("input[name='X-Amz-Signature']").val(creds["x-amz-signature"]);
    $("input[name='X-Amz-Credential']").val(creds["x-amz-credential"]);
    $("input[name='X-Amz-Date']").val(creds["x-amz-date"]);
    $("input[name='Policy']").val(creds.policy);
    $("input[name='success_action_redirect']").val(creds.success_action_redirect);
  }

  return {
    start: start
  };
})();
