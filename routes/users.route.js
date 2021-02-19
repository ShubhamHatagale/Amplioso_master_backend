const usersController=require('../controllers/users.controller');
const User=require('../models/users.model');
const { body } = require('express-validator');

const helper=require('../config/helpers')
module.exports=(router)=>{
  router.get('/users',usersController.getRecords);
  router.get('/users/:userId',usersController.getRecordsById);
  router.post('/users',
  [
      body('first_name').isString(),
      body('last_name').isString(),
      body('date').isDate(),
      body('date_of_joining').isDate(),
      body('designation').isString(),
      body('user_role').isInt(),
      body('company_id').isInt(),
      body('mobile_no').isLength({ max: 10 }),
      body('user_email').isEmail().withMessage('Please enter a valid email.'),
      body('username').custom(value => {
        return User.findByPk(value).then(user => {
          if (user) {
            return Promise.reject('E-mail already in use');
          }
        });
      }),         
  ],usersController.postRecords);
  router.put('/users/:userId', usersController.updateRecords);
  router.delete('/users/:id', usersController.deleteRecords);
}
