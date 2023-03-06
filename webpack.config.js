const path = require('path');

//Things to do to make this work:
//1. move the html and css files to a hosted folder
//2. create page1 and page2 files that import what's currently in client js with 
//   the purpose of only using the post stuff for page1 and and get stuff for page 2
module.exports = {
    entry: {
        page1: './client/page1.js',
        page2: './client/page2.js'
    },
    mode: 'development',
    watchOptions: {
        aggregateTimeout: 200,
    },
    output: {
        path: path.resolve(__dirname, 'hosted'),
        filename: '[name]-bundle.js',
    },
};