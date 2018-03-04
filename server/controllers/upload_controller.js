"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const multer = require('multer');
// const multer = require('multer');
const moment = require("moment");
const path = require("path");
function storageDestination(destinationPath) {
  try {
      // Configuring appropriate storage
      let storage = multer.diskStorage({
          // Absolute path
          destination: function (req, file, callback) {
              callback(null, './dist/assets/' + destinationPath);
          },
          // Match the field name in the request body
          filename: function (req, file, callback) {

              callback(null, file.originalname);
          }
      });
      return storage;
  }
  catch (ex) {
      console.log(`Error :\n ${ex}`);
  }
}
// Document Path
var storage = multer.diskStorage({ //multers disk storage settings
  destination: function (req, file, cb) {
      cb(null, './dist/assets/');
  },
  filename: function (req, file, cb) {
      var datetimestamp = Date.now();
      cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
  }
});
var upload = multer({ //multer settings
              storage: storage
          }).single('file');
exports.default = {
    image(req, res, next) {
        const uploadImage = multer({
            storage: storageDestination('images')
        }).single('file');
        uploadImage(req, res, function (err) {
            console.log(req.file);
            if (err) {
                res.json({ error_code: 1, err_desc: err });
                return;
            }
            res.json({ error_code: 0, err_desc: null });
        });
    },
    document(req, res, next){
      const uploadDoc = multer({
          storage: storageDestination('documents')
      }).single('file');

      uploadDoc(req, res, function (err) {
          console.log(req.file);
          if (err) {
              res.json({ error_code: 1, err_desc: err });
              return;
          }
          res.json({ error_code: 0, err_desc: null });
      });
      //   upload(req,res,function(err){
      //     console.log(req.file);
      //     if(err){
      //          res.json({error_code:1,err_desc:err});
      //          return;
      //     }
      //      res.json({error_code:0,err_desc:null});
      // });
    }
};
//# sourceMappingURL=upload_controller.js.map
