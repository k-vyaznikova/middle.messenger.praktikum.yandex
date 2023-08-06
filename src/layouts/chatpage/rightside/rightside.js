export default function rightside(options) {
    return `
    <div class = "right-side">
        <div class = "right-side-content">
            ${options.fn(this)}
        </div>
    </div>
    `;
}

