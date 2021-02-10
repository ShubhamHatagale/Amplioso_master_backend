const Company=require('../models/companies.model');
const { validationResult } = require('express-validator');
const helper=require('../config/helpers')
// const 


exports.getRecords =async  (req,res,next)=>{
    try {
          const comData = await Company.findAll();
          if(!comData){            
            return res.status(404).json({
              status: 404,
              message: 'could not find result',              
          })
        }
        res.status(200).json({
            message:"Result Fetched",
            data:comData
        }) 
        helper.logger.info(comData)     
    } catch (error) {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);   
      helper.logger.info(error)
    }   
}

exports.postRecords=async(req,res,next)=>{
   console.log("data: ",req.body);
   /*  const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(401).json({
          status: 401,
          message: 'Validation Fialed',
          error: errors  
      })
    } */
    // if(!req.file){
    //   return res.status(422).json({
    //     status: 422,
    //     message: 'No image Provided'         
    // })
    // }
    // const imageUrl=req.file;
    // console.log(imageUrl);       
   /* const post = new Company({          
      company_name:req.body.company_name,
      company_logo:req.body.company_logo,
      comapany_headquaters:req.body.comapany_headquaters,
      date_of_inception:req.body.date_of_inception,
      number_of_employee:req.body.number_of_employee,
      business_sector:req.body.business_sector,
      business_sector:req.body.business_sector,
      feed_back_frequency:req.body.feed_back_frequency,
      average_employee_compansation:req.body.average_employee_compansation,
      created_by:req.body.created_by,
      updated_by:req.body.updated_by,      
    });
    post
      .save()
      .then(result => {
        res.status(201).json({
          message: 'Post created successfully!',
          post: result
        });
      })
      .catch(err => {
        console.log(err);
      }); */
  
};
exports.updateRecords = async (req, res, next) => {
  const comId = req.params.comId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({
      status: 401,
      message: 'Validation Fialed',
      error: errors  
  })
  }
  try{
  const companydetails =await Company.update({
     company_name:req.body.company_name,
      company_logo:req.body.company_logo,
      comapany_headquaters:req.body.comapany_headquaters,
      date_of_inception:req.body.date_of_inception,
      number_of_employee:req.body.number_of_employee,
      business_sector:req.body.business_sector,
      business_sector:req.body.business_sector,
      feed_back_frequency:req.body.feed_back_frequency,
      average_employee_compansation:req.body.average_employee_compansation,
      created_by:req.body.created_by,
      updated_by:req.body.updated_by      
     
},
{where: {id: req.params.comId} });

  if(!companydetails){
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
    const companydetail=await Company.destroy({
        where: { id: id }
       });
    if(!companydetail){
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

