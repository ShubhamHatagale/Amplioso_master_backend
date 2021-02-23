const Employee=require('../models/employee_strength.model');
const { validationResult } = require('express-validator');
const helper=require('../config/helpers')


exports.getRecords =async  (req,res,next)=>{
    try {
          const Data = await Employee.findAll({where: {is_deleted:0} });
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
    const Data = await Employee.findAll({where: {id: req.params.empId,is_deleted:0} });
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
    const employee = new Employee({          
      number_of_employee:req.body.number_of_employee,
      status:req.body.status,
      created_by:req.body.created_by,
      updated_by:req.body.updated_by,      
    });
    employee
      .save()
      .then(result => {
        res.status(201).json({
          message: 'Post created successfully!',
          post: result,
          status:200
        });
      })
      .catch(err => {
        console.log(err);
      });
  
};
exports.updateRecords = async (req, res, next) => {
  console.log(req.params.empId);
  console.log(req.body)
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({
      status: 401,
      message: 'Validation Fialed',
      error: errors  
  })
  }
  try{
  const employeedetails =await Employee.update({
    number_of_employee:req.body.number_of_employee,
    status:req.body.status,
    created_by:req.body.created_by,
    updated_by:req.body.updated_by,
    created_on:req.body.created_on          
},
{where: {id: req.params.empId} });

  if(!employeedetails){
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

const errors = validationResult(req);
if (!errors.isEmpty()) {
  return res.status(401).json({
    status: 401,
    message: 'Validation Fialed',
    error: errors  
})
}
try{
const details =await Employee.update({
  is_deleted:1
},
{where: {id: id} });

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
}

