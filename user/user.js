const db = require("../db");
const generiqueFunction = require("../helpers/generiqueFunction");

var tableName = "user";

var user = {
    get: function (req, callback) {
        return generiqueFunction.makeWhereSql(db, req, callback, tableName);
    },

    insert: function (req, callback) {
        return generiqueFunction.makeInsertSql(db, req, callback, tableName);
    },

    update: function (req, callback) {
        return generiqueFunction.makeUpdateSql(db, req, callback, tableName);
    },

    delete : function(req,callback){

        return generiqueFunction.makeDeleteSql(db, req, callback, tableName);
    },
   
}

module.exports = user