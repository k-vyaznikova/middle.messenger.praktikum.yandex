import type {THelperOptions} from 'handlebars';
export default function defpage(this: object, options: THelperOptions): string {
	return `
    <html>
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="stylesheet" href="/styles/main.scss" />
            <link rel="stylesheet" href="/layouts/defpage/defpage.scss" />
            <title>Messenger</title>        
        </head>
        <body>
            <div class = "container ${options.hash.addClass}">
                ${options.fn(this)}
            </div>
        </body>
    </html> 
    `;
}
