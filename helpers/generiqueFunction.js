const utils= require("./utils");
const functions = require('./functions');

var generiqueFunction = {
    makeWhereSql(db, req, callback,tableName) {
        // {
        //     "where" : {
        //         "firstName" : "louis"
        //             , "idCategories": "[2,1]"
        //     }
        // }

        //getting all our stuff in the body with some condition
        var body = (typeof req.body != "undefined") ? utils.cleanQuery(req.body) : req;
        var where = (typeof body.where != "undefined") ? body.where : ""
        var order = (typeof body.order != "undefined" && body.order != null) ? body.order : ""
        var join = (typeof body.join != "undefined" && body.join != null) ? body.join : ""

        // only deserve to precise SQL columns to get, if only is not in the body it'll replace by a SQL * 
        let only = (typeof body.only != "undefined") && Array.isArray(body.only) && body.only.length > 0 ? body.only.join(',') : "*";
        if (where == "") {
            let orderString =""
            order == ""? null : orderString = " ORDER BY "+Object.keys(order) + " " + Object.values(order)
            let joinString  = join == "" ? "" : " "+join.type+" "+join.tableJoin+" ON "+tableName+"."+join.keyFrom+" = "+join.tableJoin+"."+join.keyJoin
            let query = "SELECT " + only + " FROM  " + tableName + joinString + orderString;

            return db.query(query, function (err, res) {
                if (err) return callback(err);
                else {
                    
                
                    return callback(null, res)};
            });
        } else { 
            let whereSend = [];
            for (const [key, value] of Object.entries(where)) {
                (key == "like") ? whereSend.push(Object.keys(value) + " LIKE '%"+Object.values(value)+"%'") : null;
                (typeof value == "number") ? whereSend.push(key + " = " + value) : null;
                (typeof value == "string"&&key != "like") ? whereSend.push(key + " = '" + value + "'") : null;
                (Array.isArray(value)) && value.length > 0 ? whereSend.push(key + " IN(" + value.join(",") + ")") : null;
            }
            let orderString =""
            order == ""? null : orderString = " ORDER BY "+Object.keys(order) + " " + Object.values(order)
            let joinString  = join == "" ? "" : " "+join.type+" "+join.tableJoin+" ON "+tableName+"."+join.keyFrom+" = "+join.tableJoin+"."+join.keyJoin

            let query = whereSend.length> 0 ?  "SELECT " + only + " FROM  " + tableName+ joinString+" WHERE " + whereSend.join(" AND ") + orderString : "SELECT " + only + " FROM  " + tableName+ joinString + orderString;
        
            return db.query(query, function (err, res) {
                if (err) return callback(err);
                else{
              
                    return callback(null, res);
                }
                 
            });
        }

    },

    makeUpdateSql(db, req, callback, tableName) {
        
        //getting all our stuff in the body with some condition
        var body = (typeof (req.body) != 'undefined') ? utils.cleanQuery(req.body) : req;
        var where = (typeof body.where != "undefined") ? body.where : "";
        var update =  (typeof body.update != "undefined") ? body.update : "";
       
        // generating arrays composed by SQL piece of queries, they'll be .join() after.
        var whereSend = functions.WhereSql(where);
        var updateSend = functions.UpdateSql(update);
        if(updateSend.length == 0 && whereSend.length == 0 ){
            console.log("error updating");
            return callback("NO UPDATE");
        }else{

            let query = "UPDATE " + tableName + " SET " + updateSend.join(" , ") + " WHERE "+ whereSend.join(" AND ");
            return db.query(query, callback);
        }
        // condition on the callback 
       

    },

    makeInsertSql(db, req, callback, tableName) {
    //getting all our stuff in the body with some condition
    var body = (typeof (req.body) != 'undefined') ? utils.cleanQuery(req.body) : req

        var keys = [];
        var values = [];
        for (const [key, value] of Object.entries(body)) {
                typeof value == "string"
                    ? values.push("'" + value + "'")
                    : typeof value == "number" ?
                        values.push(value) : values.push("'" + JSON.stringify(value) + "'");
                keys.push(key);
            
            
        }
  
        let query = "INSERT INTO " + tableName + " (" +
            keys.join(",") +
            ") VALUES  (" +
            values.join(",") +
            ")";


        return db.query(query, function(err, res){
            if(err) return callback(err);
            else return callback(null, res);
        })
    },
    
    makeDeleteSql : function(db, req, callback, tableName){
        //getting all our stuff in the body with some condition
        var body = (typeof req.body != "undefined") ? utils.cleanQuery(req.body) : req;
        var where =  (typeof body.where != "undefined") ? body.where : ""
         // generating arrays composed by SQL piece of queries, they'll be .join() after.
        var whereSend = functions.WhereSql(where);
        return (whereSend.length > 0) ? db.query("DELETE FROM " + tableName + " WHERE " + whereSend.join(" AND "),callback) :  callback("no delete");    
    },


}

module.exports = generiqueFunction;

