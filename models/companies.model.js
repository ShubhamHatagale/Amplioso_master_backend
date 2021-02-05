const { INTEGER } = require('sequelize');
const Sequelize=require('sequelize');
const sequelize=require('../config/database');
const Company=sequelize.define('companies',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    company_name:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    company_logo:{
        type:Sequelize.STRING,
        allowNull:true
    },
    comapany_headquaters:{
        type:Sequelize.STRING,
        allowNull:false
    },
    date_of_inception:{
        type:Sequelize.DATE,
        allowNull:false
    },
    number_of_employee:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    business_sector:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    average_employee_compansation:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    feed_back_frequency:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    created_by:{
        type:Sequelize.INTEGER,
        allowNull:false,
    },
    created_on:{
        type:Sequelize.DATE,
        allowNull:true,
    },
    updated_by:{
        type:Sequelize.INTEGER,
        allowNull:false,
    },
    updated_on:{
        type:Sequelize.DATE,
        allowNull:true,
    },
    is_deleted:{
        type:Sequelize.ENUM('0', '1'),
        defaultValue:'0',
        allowNull:false
    },
   
},{
    freezeTableName:true
});
module.exports=Company;

//Migration**
//Transaction**
//API Gateway**

