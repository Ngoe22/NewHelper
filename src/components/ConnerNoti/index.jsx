import styles from "./styles.module.scss";

function ConnerNotification(text, color) {
    console.log(`hhere`);

    const mainNotificationNode = document.createElement(`div`);
    mainNotificationNode.className = styles.mainNotificationNode;
    mainNotificationNode.textContent = text;

    document.body.appendChild(mainNotificationNode);

    setTimeout(() => {
        mainNotificationNode.classList.add(styles.show);
        mainNotificationNode.classList.add(styles[color]);
    }, 0);

    setTimeout(() => {
        mainNotificationNode.classList.remove(styles.show);
        mainNotificationNode.textContent = ``;
        mainNotificationNode.remove();
    }, 4000);
    return null;
}

export default ConnerNotification;
