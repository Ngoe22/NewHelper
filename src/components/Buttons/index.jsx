import styles from "./styles.module.scss";

function Button({
    children = ``,
    classNames = ``,
    background = `gray`,
    size = `medium`,
    shape = ``,
    selfCopy = false,
    callbackOnClick,
    //
    ...rest
}) {
    const cll = `${styles.btn} ${styles[background]} ${styles[size]} ${styles[shape]} ${classNames}`;
    const Tag = rest.href ? `a` : `button`;

    return (
        <Tag
            className={cll}
            onClick={() => {
                if (callbackOnClick) callbackOnClick();

                if (selfCopy) {
                    navigator.clipboard.writeText(children);
                }
            }}
            {...rest}
        >
            {children}
        </Tag>
    );
}

export default Button;
