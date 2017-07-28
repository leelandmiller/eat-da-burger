const orm = require('../config/orm');

let order = {
    'all': function(cb) {
        orm.selectAndJoin(['orders.id', 'orders.devoured', 'burgers.id', 'burgers.name'], 'orders', 'burgers', 'orders.burger_id', 'burgers.id', (res) => {
            cb(res);
        });
    },
    'notDevoured': function(condition, cb) {
        orm.selectAndJoinWhere(['orders.id', 'orders.devoured', 'burgers.name'], 'orders', 'burgers', 'orders.burger_id', 'burgers.id', condition, (res) => {
            cb(res);
        });
    },
    'devoured': function(condition, cb) {
        orm.selectAndJoinWhere(['orders.id', 'orders.devoured', 'burgers.name'], 'orders', 'burgers', 'orders.burger_id', 'burgers.id', condition, (res) => {
            cb(res);
        });
    },
    'update': function(newVal, condition, cb) {
        orm.update('orders', 'devoured', newVal, condition, (res) => {
            cb(res);
        })
    },
    'create': function(cols, vals, cb) {
        orm.create('orders', cols, vals, (res) => {
            cb(res);
        });
    },
    'remove': function(table, condition, cb) {
        orm.remove(table, condition, (res) => {
            cb(res);
        });
    },
};

module.exports = order;
