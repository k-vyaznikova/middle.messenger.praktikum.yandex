import {resolve} from 'path';
import {defineConfig} from 'vite';
import handlebars from 'vite-plugin-handlebars';

import defpage from "./src/layouts/defpage/defpage";
import leftside from "./src/layouts/chatpage/leftside/leftside";
import rightside from "./src/layouts/chatpage/rightside/rightside";
import cardpage from "./src/layouts/cardpage/cardpage";
import profpage from "./src/layouts/profpage/profpage";
import popup from "./src/layouts/popup/popup";
import if_eq from "./src/utils/ifequal";

export default defineConfig( {
    root: resolve(__dirname, 'src'),

    plugins: [handlebars({
        helpers: {
            if_eq,
            defpage,
            cardpage,
            profpage,
            popup,
            leftside,
            rightside
        },
        build: {
            rollupOptions: {
                input: {
                    index: resolve(__dirname, 'index.html'),
                    auth: resolve(__dirname, 'src/pages/auth/auth.html')
                }
            }
        },
        partialDirectory: resolve(__dirname, "src/components")      
    })
    ]

});










