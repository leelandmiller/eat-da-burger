const express = require('express');
const router = express.Router();

// import burger model from models
let orm = require('../config/orm');
let burger = require('../models/burger');
let order = require('../models/order');

// routes go here for da burgers

// get all burgers from your order - both devoured and notDevoured
router.get('/eat', (req, res) => {
    order.notDevoured(' WHERE devoured = 0', (notDevoured) => {
        order.devoured(' WHERE devoured = 1', (devoured) => {
            res.render('eat', { notDevoured, devoured });
        });
    });
});

// update a burger from your order (devour a burger)
router.put('/eat/:orderId?', (req, res) => {
    let orderId = req.params.orderId;
    console.log(orderId)
    let condition  = ' WHERE id = ' + orderId;

    order.update(1, condition, (update) => {
        res.redirect('/eat');
    });
});

// gets all da burgers on the menu
router.get('/', (req, res) => {
    // passes callback function into burger.all -
    // to be run when mysql query is complete
    burger.all((burgers) => {
        order.notDevoured(' WHERE devoured = 0', (orders) => {
            // console.log(orders);
            res.render('index', { burgers, orders });
        });
    });
});

// posts a new burger to orders
router.post('/order/:burgerId', (req, res) => {
    let burgerId = req.params.burgerId;

    console.log(burgerId);
    order.create(['burger_id', 'devoured'], [burgerId, 0], () => res.redirect('/'));
});

// posts a new burger to the menu
router.post('/new', (req, res) => {

    burger.create(['name', 'description'], [
        req.body.name, req.body.description
    ], () => {
        res.redirect('/');
    });

});

// removes a burger from the menu - OR - removes a burger from the order
router.delete('/:table/:id', function(req, res) {
    let table = req.params.table;
    let condition = "id = " + req.params.id;

    if (table === 'orders') {
        order.remove(table, condition, () => {
            res.redirect('/eat');
        });
    } else if (table === 'burgers') {
        burger.remove(table, condition, () => {
            res.redirect('/');
        });
    }
});

module.exports = router;
