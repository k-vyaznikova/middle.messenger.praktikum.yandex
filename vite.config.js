import {resolve} from 'path';
import {defineConfig} from 'vite';
import handlebars from 'vite-plugin-handlebars';

import defpage from "./src/layouts/defpage/defpage";

import if_eq from "./src/utils/ifequal.js";

export default defineConfig( {
    root: resolve(__dirname, 'src'),
    
    /*build:{
        outDir: resolve(__dirname, 'build'),
        cssCodeSplit: false
    },*/
    plugins: [handlebars({
        helpers: {
            if_eq,
            defpage
           
        },
        build:{
            rollupOptions: {
                input:{
                    index: "index.html",
                    community: "src/pages/community/community.htmls"
                }
            }
        },
        partialDirectory: resolve(__dirname, "src/components")      
    })
    ]

});










