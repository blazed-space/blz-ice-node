const express = require('express');
//const myRoute = require('./my.route');
const welcomeRoute = require('./welcome.route');

const config = require('../config/config');
const router = express.Router();
// { path: '/my', route: myRoute }
const defaultRoutes = [
    {
        path: '/',
        route: welcomeRoute
    },
];
defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});
module.exports = router;