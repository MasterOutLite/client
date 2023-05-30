import React, {ReactNode} from 'react';
import styles from './Layout.module.scss'
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";

export interface LayoutProps {
    children: ReactNode;
    className?: string;
    title?: string;
}
function Layout({children, className, title}: LayoutProps) {
    return (
        <div className={styles.root}>
            <Header title={title} />
            <Main>{children}</Main>
            <Footer />
        </div>
    );
}

export default Layout;