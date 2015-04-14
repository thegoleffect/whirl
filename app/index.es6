'use strict';

var $ = require('jQuery');
var { Router, Route, DefaultRoute, Redirect } = require('react-router');

var routes = require('./routes.jsx');

var el = document.getElementById('app-root');

Router.run(routes, function (Handler) {
    React.render(<Handler/>, el);
});


// var { StyleResolverMixin, BrowserStateMixin } = require('radium');

// function test() {
//     console.log(__('hello'));
// }

// class Application {
//     constructor (options) {
//         this.routes = [];
//     }
//     run () {
//         $('test');
//         console.log('ohai');
//     }
//     static getRoutingTable () {
//         return [];
//     }
// }

// test();
// console.log('hello');

// var app = new Application();
// app.run();