const { INTEGER } = require('sequelize');
const Sequelize=require('sequelize');
const sequelize=require('../config/database');
const Role=sequelize.define('roles',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    role:{
        type:Sequelize.CHAR,
        allowNull:false,
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
        type:Sequelize.BOOLEAN,
        defaultValue:'0',
        allowNull:false
    },   
   
},{
    freezeTableName:true
});
module.exports=Role;


