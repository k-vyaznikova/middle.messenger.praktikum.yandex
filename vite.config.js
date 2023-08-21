import {resolve} from 'path';
import {defineConfig} from 'vite';
import handlebars from './vite-plugin-handlebars-precompile';

import defpage from "./src/layouts/defpage/defpage";
import leftside from "./src/layouts/chatpage/leftside/leftside";
import rightside from "./src/layouts/chatpage/rightside/rightside";
import cardpage from "./src/layouts/cardpage/cardpage";
import profpage from "./src/layouts/profpage/profpage";
import popup from "./src/layouts/popup/popup";
import if_eq from "./src/utils/ifequal";



export default defineConfig( {
    root: resolve(__dirname, 'src'),
    build: {
        outDir: resolve(__dirname, "build"),
        rollupOptions: {
            input: {
                index: resolve(__dirname, 'src/index.html'),
                auth: resolve(__dirname, 'src/pages/auth/auth.html'),
                chat1: resolve(__dirname, 'src/pages/chat/chat.html'),
                chat2: resolve(__dirname, 'src/pages/chat/chat-empty.html'),
                chat3: resolve(__dirname, 'src/pages/chat/chat-choose-attach.html'),
                chat4: resolve(__dirname, 'src/pages/chat/chat-choose-attach-pic.html'),
                chat5: resolve(__dirname, 'src/pages/chat/chat-choose-attach-file.html'),
                community1: resolve(__dirname, 'src/pages/community/community.html'),
                community2: resolve(__dirname, 'src/pages/community/community-edit.html'),
                error404: resolve(__dirname, 'src/pages/error/404.html'),
                error500: resolve(__dirname, 'src/pages/error/500.html'),
                password_edit: resolve(__dirname, 'src/pages/password-edit/password-edit.html'),
                profile1: resolve(__dirname, 'src/pages/profile/profile.html'),
                profile2: resolve(__dirname, 'src/pages/profile/profile-edit.html'),
                profile3: resolve(__dirname, 'src/pages/profile/profile-edit-photo.html'),
                register: resolve(__dirname, 'src/pages/register/register.html')
            }
        }
    },
    server: {
        open: 'index.html'
    },
    plugins: [handlebars()]

});
