export default function defpage(options) {
    return `
    <div class = "left-side">
        <div class = "left-side-content">
            ${options.fn(this)}
        </div>
    </div>
    `;
}

