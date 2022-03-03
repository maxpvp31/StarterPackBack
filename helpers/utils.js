
var Utils = {
    cleanQuery: function (query) {
      var query_clean = query;
      for (const i in query_clean) {
        if (typeof (query_clean[i]) == "string") {
          if (query_clean[i].indexOf("'")) {
            query_clean[i] = query_clean[i].replace("'", "''");
  
          }
        }
      }
      return query_clean;
    },
    isDefArray: function (val) {
      if (typeof val == 'undefined') return false
      if (!Array.isArray(val)) return false
      if (val.length == 0) return false
      if (!(val.every(el => typeof el != 'undefined'))) return false
      return true
    },
  
  
    isDef: function (val) {
      return Array.isArray(val)
        ? (val.every(el => typeof el != 'undefined'))
        : typeof val != 'undefined';
    },
  
    isArrayAndNotEmpty: function (arr) {
      return Array.isArray(arr) && arr.length > 0
    },
  
    createGetQuery: function (req) {
      let body = isDef(req.body) ? req.body : req;
      let target = (typeof body.only != "undefined") && Array.isArray(body.only) && body.only.length > 0 ? body.only.join(',') : "*";
      let table = []
  
      if (isDef(body.id)) {
        (Array.isArray(body.id))
          ? table.push("id IN (" + body.id.join(',') + ")")
          : table.push("id = " + body.id)
      }
      if (!isDef(body.id)) table.push("1")
  
      let query = "SELECT " + target + " FROM " + tableName + " WHERE " + table.join('AND ')
    },
  
    dateNow: function (onlyDate) {
      var date = new Date();
      var now_utc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
        date.getUTCHours() + 2, date.getUTCMinutes(), date.getUTCSeconds());
  
      var finalDate = new Date(now_utc).toISOString().replace(/T/, " ").replace(/\..+/, "");
      finalDate = onlyDate ? finalDate.substring(0, 10) : finalDate
  
      return finalDate
    },
  
    cleanQuery: function (query) {
      var query_clean = query;
      for (const i in query_clean) {
        if (typeof (query_clean[i]) == "string") {
          if (query_clean[i].indexOf("'")) {
            query_clean[i] = query_clean[i].replace("'", "''");
  
          }
        }
      }
      return query_clean;
    },
  
    TableJsonId: function (table_json, table_array, id_type) {
      table_json = {};
      table_array.forEach((el) => table_json[el[id_type]] = el);
      return table_json;
  
    },
  
    calculatePercentageFromMark: function (average) {
      avg = (typeof average == 'string') ? parseFloat(average) : average;
      let high_mark = 1.0; // 1 is best
      let low_mark = 4.0; // 4 is worst
      let percentage = ((low_mark - avg) / (low_mark - high_mark)) * 100.0
      return percentage.toFixed(2);
    },
  
  }
  
  
  
  module.exports = Utils;