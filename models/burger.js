const orm = require('../config/orm');

let burger = {
    'all': function(renderCb) {
        orm.all('burgers', (res) => {
            // passes res from mysql query into callback
            renderCb(res);
        });
    },
    'create': function(cols, vals, cb) {
        orm.create('burgers', cols, vals, (res) => {
            cb(res);
        });
    },
    'remove': function(table, condition, cb) {
        orm.remove(table, condition, (res) => {
            cb(res);
        });
    },
};

module.exports = burger;
