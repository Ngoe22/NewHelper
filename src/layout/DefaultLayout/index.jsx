/* eslint-disable no-unused-vars */
import { Outlet } from "react-router";
import Navigation from "../../components/Navigation";

import styles from "./styles.module.scss";

function DefaultLayout() {
    return (
        <>
            <h1>Have a good day</h1>
            <div
                style={{
                    display: "flex",
                    gap: "20px",
                }}
            >
                <div
                    style={{
                        flexShrink: 0,
                    }}
                >
                    <Navigation />
                </div>

                <div
                    style={{
                        flexGrow: 1,
                    }}
                >
                    <Outlet></Outlet>
                </div>
            </div>
        </>
    );
}

export default DefaultLayout;
