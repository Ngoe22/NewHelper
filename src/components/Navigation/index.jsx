import { Link, NavLink } from "react-router";
import styles from "./styles.module.scss";

function Navigation() {
    const list = [
        ["/working/remove-html", "Remove Html"],
        ["/working/download-img", "Download image"],
        ["/working/img-resize", "Image Resize"],
    ].map(([path, name], index) => (
        <li key={index}>
            <NavLink
                className={({ isActive }) =>
                    isActive
                        ? `${styles.navActive} ${styles.navLink}`
                        : `${styles.navLink}`
                }
                to={path}
            >
                {name}
            </NavLink>
        </li>
    ));

    return (
        <>
            <ul className={styles.navList}>{list}</ul>
        </>
    );
}

export default Navigation;
