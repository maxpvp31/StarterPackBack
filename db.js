var mysql      = require('mysql2');
var connection = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'digicoach'
});


module.exports=connection;
