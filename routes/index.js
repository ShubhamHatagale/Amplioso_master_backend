const companyRoutes=require('./companies.route');
const rolesRoutes=require('./roles.route');
const usersRoutes=require('./users.route');
module.exports =(router) =>{    
    companyRoutes(router);
    rolesRoutes(router);
    usersRoutes(router);
    return router;

};
