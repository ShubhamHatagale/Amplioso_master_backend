const User=require('../models/users.model');
const { validationResult } = require('express-validator');
const helper=require('../config/helpers')
var crypto = require('crypto');

exports.getRecords =async  (req,res,next)=>{
    try {
          const Data = await User.findAll({where: {is_deleted:0} });
          if(!Data){            
            return res.status(404).json({
              status: 404,
              message: 'could not find result',              
          })
        }
        res.status(200).json({
            message:"Result Fetched",
            data:Data
        }) 
        helper.logger.info(Data)     
    } catch (error) {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);   
      helper.logger.info(error)
    }   
}

exports.getRecordsById=async(req,res,next)=>{
  try {
    const Data = await User.findAll({where: {id: req.params.userId,is_deleted:0} });
    if(!Data){            
      return res.status(404).json({
        status: 404,
        message: 'could not find result',              
    })
  }
  res.status(200).json({
      message:"Result Fetched",
      data:Data
  }) 
  helper.logger.info(Data)     
} catch (error) {
if (!error.statusCode) {
  error.statusCode = 500;
}
next(error);   
helper.logger.info(error)
}}


exports.postRecords=(req,res,next)=>{
  console.log(req.body)

    const errors=validationResult(req);
var hash = crypto.createHash('sha512');
data = hash.update(req.body.password, 'utf-8');
gen_hash= data.digest('hex');
    if(!errors.isEmpty()){
        return res.status(401).json({
          status: 401,
          message: 'Validation Fialed',
          error: errors  
      })
    }
    const user = new User({          
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        date:req.body.date,
        date_of_joining:req.body.date_of_joining,
        designation:req.body.designation,
        user_role:req.body.user_role,
        company_id:req.body.company_id,
        mobile_no:req.body.mobile_no,
        user_email:req.body.user_email,
        username:req.body.username,
        password:gen_hash,
        address:req.body.address,
      created_by:req.body.created_by,
      updated_by:req.body.updated_by,      
    });
    user
      .save()
      .then(result => {
        res.status(201).json({
          message: 'Post created successfully!',
          post: result
        });
      })
      .catch(err => {
        res.status(201).json({
          message: 'Failed Request!',
          post: err
        });     
       });
  
};
exports.updateRecords = async (req, res, next) => {
  const errors = validationResult(req);
  var hash = crypto.createHash('sha512');
   data = hash.update(req.body.password, 'utf-8');
 gen_hash= data.digest('hex');

  if (!errors.isEmpty()) {
    return res.status(401).json({
      status: 401,
      message: 'Validation Fialed',
      error: errors  
  })
  }
  try{
      
  const userdetails =await User.update({
    first_name:req.body.first_name,
    last_name:req.body.last_name,
    date:req.body.date,
    date_of_joining:req.body.date_of_joining,
    designation:req.body.designation,
    user_role:req.body.user_role,
    company_id:req.body.company_id,
    mobile_no:req.body.mobile_no,
    user_email:req.body.user_email,
    username:req.body.username,
    password:gen_hash,
    address:req.body.address,
    created_by:req.body.created_by,
    updated_by:req.body.updated_by,      
},
{where: {id: req.params.userId} });

  if(!userdetails){
    return res.status(200).json({
      status: 404,
      message: 'No data found'   
  })
  }
  res.status(200).json({
    status: 200,
    message: 'Data Updated Successfully',
 }); 
}catch(error){
  console.log(error)
  return res.status(400).send({
    message:'Unable to Update data',
    errors: error,
    status: 400
});
}    
  }
exports.deleteRecords = async (req, res, next) => {
    const userId = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({
        status: 401,
        message: 'Validation Fialed',
        error: errors  
    })
    }
    try{
    const details =await User.update({
      is_deleted:1
  },
  {where: {id: userId} });
  
    if(!details){
      return res.status(200).json({
        status: 404,
        message: 'No data found'   
    })
    }
    res.status(200).json({
      status: 200,
      message: 'Record Deleted Successfully',
   }); 
  }catch(error){
    console.log(error)
    return res.status(400).send({
      message:'Unable to Delete Record',
      errors: error,
      status: 400
  });
  }
};

