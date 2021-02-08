const companyRoutes=require('./companies.route');
const rolesRoutes=require('./roles.route');
const usersRoutes=require('./users.route');
const countryRoutes=require('./countries.route');
const sectorRoutes=require('./sectors.route');
module.exports =(router) =>{    
    companyRoutes(router);
    rolesRoutes(router);
    usersRoutes(router);
    countryRoutes(router);
    sectorRoutes(router);
    return router;
};
