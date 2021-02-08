const { INTEGER, ENUM } = require('sequelize');
const Sequelize=require('sequelize');
const sequelize=require('../config/database');
const Question=sequelize.define('questions',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    question:{
        type:Sequelize.TEXT,
        allowNull:false,
    },
    options:{
        type:Sequelize.TEXT,
        allowNull:false
    },
    option1:{
        type:Sequelize.TEXT,
        allowNull:false
    },
    option2:{
        type:Sequelize.TEXT,
        allowNull:false
    },
    option3:{
        type:Sequelize.TEXT,
        allowNull:false
    },
    option4:{
        type:Sequelize.TEXT,
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
module.exports=Question;


