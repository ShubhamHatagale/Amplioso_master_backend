const Feedback=require('../models/feedback_frequencies.model');
const { validationResult } = require('express-validator');
const helper=require('../config/helpers')


exports.getRecords =async  (req,res,next)=>{
    try {
          const Data = await Feedback.findAll();
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

exports.postRecords=async(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(401).json({
          status: 401,
          message: 'Validation Fialed',
          error: errors  
      })
    }
    const feedback = new Feedback({          
        feedback_frequencies:req.body.feedback_frequencies,
      status:req.body.status,
      created_by:req.body.created_by,
      created_on:req.body.created_on,      
    });
    feedback
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
      message: 'Validation Fialed',
      error: errors  
  })
  }
  try{
  const feedbackdetails =await Feedback.update({
    feedback_frequencies:req.body.feedback_frequencies,
    status:req.body.status,
    created_by:req.body.created_by,
    created_on:req.body.created_on          
},
{where: {id: req.params.feedId} });

  if(!feedbackdetails){
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
    const id = req.params.id;
    try{
    const feedbackdetails=await Feedback.destroy({
        where: { id: id }
       });
    if(!feedbackdetails){
      return res.status(200).send({
        status: 404,
        message: 'No data found'   
    })
  }
  res.status(200).send({
    status: 200,
    message: 'Data Delete Successfully'
 });
}
catch(error){
  console.log(error)
  return res.status(400).send({
    message:'Unable to Delete data',
    errors: error,
    status: 400
});
}
};

