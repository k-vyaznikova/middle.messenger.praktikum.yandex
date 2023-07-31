
import {resolve} from 'path';
import {defineConfig} from 'vite';
import handlebars from './vite-plugin-handlebars-precompile';

export default defineConfig( {
    root: resolve(__dirname, 'src'),
    build:{
        outDir: resolve(__dirname, 'build'),
        cssCodeSplit: false
    },
    server: {
        //port: 3000
    },
   // middle
    plugins: [handlebars()],

});



/*
import express from 'express';
import { createServer as createViteServer } from 'vite';

async function createServer() {
  const app = express();
  const vite = await createViteServer({
    server: { middlewareMode: true, port: 3000 },
    appType: 'custom'
  })
  // Use vite's connect instance as middleware
  app.use(vite.middlewares);
  app.use('*', async (req, res) => {
    res.sendFile('/index.html', {
        root: __dirname + '/build',
    }); 
  });
}


createServer();
*/



