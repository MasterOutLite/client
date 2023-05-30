import React, {ReactNode} from 'react';
import styles from './Container.module.scss'
import clsx from "clsx";

export interface ContainerProps {
    children?: ReactNode;
    className?: string;
}

function Container({children, className}: ContainerProps) {
    return (
        <div className={clsx(styles.root, className)}>
            {children}
        </div>
    );
}

export default Container;