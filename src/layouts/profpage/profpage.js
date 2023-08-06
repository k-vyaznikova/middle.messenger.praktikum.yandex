export default function profpage(options) {
    return `
    <html>
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="stylesheet" href="/styles/main.scss" />
            <link rel="stylesheet" href="/layouts/profpage/profpage.scss" />
            <title>Messenger</title>        
        </head>
        <body>
            <div class = "container">
                <a href =  "${options.hash.linkUrl}" class = "back-link"></a>
                <div class = "container-inner">
                ${options.fn(this)}
                </div>
            </div>
        </body>
    </html> 
    `;
}

