import React, {memo, ReactNode} from 'react';
import styles from "./StarRating.module.scss"

export interface StarRatingProps {
    amountStar: Number;
    currentStar: Number;
}

function StarRating({amountStar, currentStar}: StarRatingProps) {

    const drawStar = () => {
        const arrStar: ReactNode[] = [];
        for (let i = 0; i < amountStar; i++) {
            const star: ReactNode =  i < currentStar? " ": <div className={styles.starEmpty}></div>;
            arrStar.push(
                <div key={i} className={styles.star}>
                    {star}
                </div>
            );
        }
        return arrStar
    }

    return (
        <div className={styles.starContainer}>
            {
                drawStar().map(value => value)
            }
        </div>
    );
}

export default memo(StarRating);