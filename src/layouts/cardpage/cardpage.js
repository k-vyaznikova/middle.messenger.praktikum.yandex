export default function cardpage(options) {
    return `
    <html>
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="stylesheet" href="/styles/main.scss" />
            <link rel="stylesheet" href="/layouts/cardpage/cardpage.scss" />
            <title>Messenger</title>        
        </head>
        <body>
            <div class = "cover-container">
                <div class = "form-module">
                    ${options.fn(this)}
                </div>    
            </div>
        </body>
    </html> 
    `;
}
