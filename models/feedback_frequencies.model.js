const { INTEGER, ENUM } = require('sequelize');
const Sequelize=require('sequelize');
const sequelize=require('../config/database');
const Feedbackfreq=sequelize.define('feedback_frequencies',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    feedback_frequencies:{
        type:Sequelize.CHAR,
        allowNull:false,
    },
    status:{
        type:ENUM('Active','Inactive'),
        allowNull:false
    },
    created_by:{
        type:Sequelize.INTEGER,
        allowNull:false,
    },
    created_on:{
        type:Sequelize.DATE,
        allowNull:false,
    },
    updated_by:{
        type:Sequelize.INTEGER,
        allowNull:true,
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
module.exports=Feedbackfreq;


