const connection = require('./connection');

let printQuestionMarks = (vals) => {
    let questionMarks = vals.map((num) => {
        return '?';
    });

    return questionMarks.toString();
};

let printDoubleMarks = (vals) => {
    let questionMarks = vals.map((num) => {
        return '??';
    });

    return questionMarks.toString();
};

let orm = {
    'all': function(table, cb) {
        let query = 'SELECT * FROM ??';

        connection.query(query, [table], (err, result) => {
            if (err) throw err;
            // passes mysql query result into callback
            cb(result);
        });
    },
    'create': function(table, cols, vals, cb) {
        let queryStr = 'INSERT INTO ' + table + ' (' + cols.toString() + ') ';
        queryStr += 'VALUES (' + printQuestionMarks(vals) + ')';

        connection.query(queryStr, vals, (err, result) => {
            cb(result);
        });

        // console.log(queryStr);
    },
    'update': function(table, col, newVal, condition, cb) {
        let queryStr = 'UPDATE ' + table + ' SET ' + col;
        queryStr += ' = ' + newVal + condition;

        connection.query(queryStr, (err, res) => {
            // console.log(res);
            cb(res);
        });
    },
    'remove': function(table, condition, cb) {
        let queryStr = 'DELETE FROM ' + table + ' WHERE ' + condition;

        connection.query(queryStr, (err, res) => {
            if (err) throw err;

            cb(res);
        });
    },
    'selectAndJoin': function(selections, t1, t2, on1, on2, cb) {
        let sqlQuery = 'SELECT ' + printDoubleMarks(selections);
        sqlQuery += ' FROM ' + t1 + ' JOIN ' + t2 + ' ON ' + on1;
        sqlQuery += ' = ' + on2;

        connection.query(sqlQuery, selections, (err, res) => {
            if (err) throw err;
            // console.log(res);
            cb(res);
        });
    },
    'selectAndJoinWhere': function(selections, t1, t2, on1, on2, condition, cb) {
        // let sqlQuery = 'SELECT orders.id, burgers.id, burgers.name FROM orders JOIN burgers ON orders.burger_id = burgers.id';

        let sqlQuery = 'SELECT ' + printDoubleMarks(selections);
        sqlQuery += ' FROM ' + t1 + ' JOIN ' + t2 + ' ON ' + on1;
        sqlQuery += ' = ' + on2 + condition;

        // console.log(sqlQuery);

        connection.query(sqlQuery, selections, (err, res) => {
            if (err) throw err;
            // console.log(res);
            cb(res);
        });
    }
};

module.exports = orm;
