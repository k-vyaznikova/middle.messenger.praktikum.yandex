export default function defpage(options){
    const result =  `
        <html>
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <script type="module" src="index.ts"></script>
                <title>Messenger</title>        
            </head>
            <body>
                <div class = "container">
                    ${options.fn(this)}
                </div>
            </body>
        </html>    
    `;
    console.log(result)
    return result;
}

