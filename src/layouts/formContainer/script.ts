import type {HelperOptions} from "handlebars";
import styles from "./style.module.scss";
export default function formContainer(this: object, options: HelperOptions): string {
    return `
        <div class = "${styles.formContainer} ${options.hash.class??  ''}">
            <div class = "${styles.formContainer__frame}" >
                ${options.fn(this)}
            </div>
        </div>
    `;
}

