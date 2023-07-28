import {resolve} from 'path';
import {defineConfig} from 'vite';
import handlebars from './vite-plugin-handlebars-precompile';

//const postcss = require('postcss');
//const postcssNesting = require('postcss-nesting');

export default defineConfig( {
    root: resolve(__dirname, 'src'),
    build:{
        outDir: resolve(__dirname, 'build')
    },
    server: {
        port: 3000,
    },
    plugins: [handlebars()],

});



