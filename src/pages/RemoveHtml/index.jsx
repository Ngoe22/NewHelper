import React from "react";
import styles from "./styles.module.scss";
import Button from "../../components/Buttons";
import ConnerNotification from "../../components/ConnerNoti";

function removeHtmlTags(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    return doc.body.textContent || "";
}

function RemoveHtml() {
    const [input, setInput] = React.useState();

    return (
        <div className={styles.RemoveHtml}>
            <Button
                classNames={styles.clearBtn}
                background="red"
                size="medium"
                shape="roundS"
                callbackOnClick={() => {
                    setInput(``);
                }}
            >
                clear
            </Button>

            <textarea
                value={input}
                className={styles.input}
                onChange={(e) => {
                    setInput(e.target.value);
                }}
            ></textarea>

            <div className={styles.converted}> {removeHtmlTags(input)}</div>
            <Button
                size="medium"
                shape="roundS"
                callbackOnClick={() => {
                    ConnerNotification(`COPIED`, `green`);
                    navigator.clipboard.writeText(removeHtmlTags(input));
                }}
            >
                Copy
            </Button>
        </div>
    );
}

export default RemoveHtml;
