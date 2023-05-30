import React, {ChangeEvent, useCallback, useEffect, useState} from 'react';
import styles from './BasketDevice.module.scss'

import {BasketItem, Device} from "../../types";
import deviceStore from "../../stores/deviceStore";
import basketStore from "../../stores/basketStore";
import clsx from "clsx";


export interface BasketDeviceProps {
    basketItem: BasketItem;
}

function BasketDevice({basketItem}: BasketDeviceProps) {
    const device: Device = basketItem.device;
    const [amount, setAmount] = useState<number>(basketItem.amount);
    const removeDeviceInBasket = basketStore(state => state.removeDevice);
    const removeDevice = () => {
        removeDeviceInBasket(device);
    }

    const incrementAmount = () => {
        const newValue = amount + 1;
        setAmount(prevState => prevState + 1);
        basketItem.amount = newValue;
    }
    const decrementAmount = () => {
        const newValue = amount - 1;
        if (newValue > 0) {
            setAmount(prevState => prevState - 1);
            basketItem.amount = newValue;
        }
    }

    const changeAmount = (event: any) => {
        let value = event.target.value;
        if (!value)
            value = 1;
        setAmount(parseInt(value));
        basketItem.amount = value;
    }

    return (
        <div className={styles.root}>
            <div className={styles.imgContainer}>
                <img src={device.img} className={styles.img}/>
            </div>
            <div className={styles.infoContainer}>
                <div className={styles.infoContainer__key}>Назва</div>
                <div className={styles.infoContainer__value}>{device.name}</div>
                <div className={styles.lineHr}></div>
                <div className={styles.infoContainer__key}>Ціна</div>
                <div className={styles.infoContainer__value}>{device.price}</div>
            </div>
            <div className={styles.btnContainer}>
                <button className={clsx(styles.btn, styles.btn__buy)} onClick={removeDevice}>Видалити</button>
                <div className={styles.amount}>
                    <button className={clsx(styles.btn, styles.btn__amount)} onClick={incrementAmount}>+</button>
                    <input className={styles.amount__count} min={1} type="number" value={amount}
                           onChange={changeAmount}/>
                    <button className={clsx(styles.btn, styles.btn__amount)} onClick={decrementAmount}>-</button>
                </div>
            </div>
        </div>
    );
}

export default BasketDevice;