const Questions=require('../models/questions.models');
const { validationResult } = require('express-validator');
const helper=require('../config/helpers')


exports.getRecords =async  (req,res,next)=>{
    try {
          const Data = await Questions.findAll({where: {is_deleted:0} });
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
    const Data = await Questions.findAll({where: {id: req.params.questionId,is_deleted:0} });
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



exports.postRecords=async(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(401).json({
          status: 401,
          message: 'Validation Fialed',
          error: errors  
      })
    }
    const question = new Questions({          
        question:req.body.question,
        options:req.body.options,
        option1:req.body.option1,
        option2:req.body.option2,
        option3:req.body.option3,
        option4:req.body.option4,
      created_by:req.body.created_by,
      created_on:req.body.created_on,      
    });
    question
      .save()
      .then(result => {
        res.status(201).json({
          message: 'Post created successfully!',
          post: result
        });
      })
      .catch(err => {
        console.log(err);
      });
  
};
exports.updateRecords = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({
      status: 401,
      message: 'Validation Fialed',/** commit changes */
      error: errors  
  })
  }
  try{
  const questiondetails =await Questions.update({
    question:req.body.question,
    options:req.body.options,
    option1:req.body.option1,
    option2:req.body.option2,
    option3:req.body.option3,
    option4:req.body.option4,
    created_by:req.body.created_by,
    created_on:req.body.created_on           
},
{where: {id: req.params.questionId} });

  if(!questiondetails){
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
    const questionid = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({
        status: 401,
        message: 'Validation Fialed',
        error: errors  
    })
    }
    try{
    const details =await Questions.update({
      is_deleted:1
  },
  {where: {id: questionid} });
  
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
