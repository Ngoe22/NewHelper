/* eslint-disable no-unused-vars */

import { HashRouter, Routes, Route } from "react-router";
import styles from "./styles.module.scss";

import DefaultLayout from "../../layout/DefaultLayout";

import DownloadImg from "../../pages/DownloadImg";
import RemoveHtml from "../../pages/RemoveHtml";
import ImageResize from "../../pages/ImageSharpen";

function AppRouter() {
    return (
        <HashRouter>
            <Routes>
                <Route element={<DefaultLayout />}>
                    <Route index element={<div>Home</div>} />
                    <Route path="working">
                        <Route path="remove-html" element={<RemoveHtml />} />
                        <Route path="download-img" element={<DownloadImg />} />
                        <Route path="img-resize" element={<ImageResize />} />
                    </Route>
                </Route>
            </Routes>
        </HashRouter>
    );
}

export default AppRouter;
