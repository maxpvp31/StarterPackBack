module.exports = functions = {
    WhereSql(where){
      var whereSend =[]
        if(where==""){return whereSend}
        else{
            for (const[key,value] of Object.entries(where)){
                (typeof value == "number" ) ? whereSend.push(key+" = "+value) : null;
                (typeof value == "string" ) ? whereSend.push(key+" = '"+value+"'") : null;
                (Array.isArray(value)) && value.length>0 ? whereSend.push(key+" IN("+value.join(",")+")") : null;
             
            }
         
        return whereSend
        }

    },
    UpdateSql(update){
      var updateSend = []
      if(update != ""){

              for (const[key,value] of Object.entries(update)){
          
                  (typeof value == "number" ) ? updateSend.push(key+" = "+value) : null;
                  (typeof value == "string" ) ? updateSend.push(key+" = '"+value+"'") : null;
                  (typeof value == "object"&&value != null) ? updateSend.push(key+" = '"+JSON.stringify(value)+"'") : null;
                  (value == null) ? updateSend.push(key+" = "+value) : null
                }
          return updateSend
      }else{
        return []
      }
  
    },
    InsertSql(body){
      
      var keys = [];
      var values = [];
      for (const [key, value] of Object.entries(body)) {
          if (value != null && value!="") {
              typeof value == "string"
                  ? values.push("'" + value + "'")
                  : typeof value == "int" ?
                      values.push(value) : values.push("'" + JSON.stringify(value) + "'")
              keys.push(key);
          }
      }
      // keys.push("date_added");
      // values.push("'" + Functions.dateNow() + "'");
      
  let a = {keys : keys,values:values}
  return a
    }
}