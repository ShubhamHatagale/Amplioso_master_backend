const usersController=require('../controllers/users.controller');
const User=require('../models/users.model');
const { body } = require('express-validator');

const helper=require('../config/helpers')
module.exports=(router)=>{
  router.get('/users',usersController.getRecords);
  router.get('/users/:userId',usersController.getRecordsById);
  router.post('/users',
  [
      body('first_name').not().isEmpty().isString(),
      body('last_name').not().isEmpty().isString(),
      body('date').not().isEmpty().isDate(),
      body('date_of_joining').not().isEmpty().isDate(),
      body('designation').not().isEmpty().isString(),
      body('user_role').not().isEmpty().isInt(),
      body('company_id').not().isEmpty().isInt(),
      body('mobile_no').not().isEmpty().isLength({ max: 10 }),
      body('user_email').not().isEmpty().isEmail().withMessage('Please enter a valid email.'),
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
