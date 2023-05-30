import React, {memo, MouseEvent, useCallback, useEffect, useState} from 'react';
import style from "./Item.module.scss"
import basket from "src/assets/basket-green.svg"
import basketFull from "src/assets/basket-green-full.svg"

import StarRating from "../StarRating/StarRating";
import {Device} from "../../types";
import deviceStore from "../../stores/deviceStore";
import {useNavigate} from "react-router-dom";
import basketStore from "../../stores/basketStore";

export interface ItemProps {
    device: Device;
    starCount: number;
}

function Item({device, starCount}: ItemProps) {
    const navigate = useNavigate();
    const addDevice = basketStore(state => state.addDevice);
    const removeDevice = basketStore(state => state.removeDevice);
    const checkInBasket = basketStore(state => state.checkDeviceInBasket);
    const setDevice = deviceStore(state => state.setDevice);
    const [inBasket, setInBasket] = useState<boolean>(false);
    const itemOnClick = () => {
        goToAboutItem();
        setDevice(device);
    }
    const likeOnClick = (event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
    }

    const toBasket = (event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        const inBasket = checkInBasket(device.id);
        if (inBasket) {
            removeDevice(device);
        } else {
            addDevice(device);
        }
        setInBasket(!inBasket);
    }

    const goToAboutItem = useCallback(() => {
        navigate('/item/' + device.id)
    }, [navigate]);

    useEffect(() => {
        const res = checkInBasket(device.id)
        setInBasket(res);
    }, []);

    return (
        <div className={style.container} onClick={itemOnClick}>
            <div className={style.column}>
                <strong className={style.title}>Топ пропозиція</strong>
                <div className={style.like} onClick={likeOnClick}></div>
            </div>

            <div className={style.imgContainer}>
                <img className={style.itemImg} src={device.img} alt="Item img"/>
            </div>
            <div className={style.containerInfo}>

                <div>
                    <h5 className={style.titleInfo} title={device.name}>{device.name}</h5>
                    <StarRating amountStar={starCount} currentStar={device.rating}/>
                    <span className={style.price}>{device.price}</span>
                </div>
                <img src={inBasket ? basketFull : basket} className={style.basketImg} alt="basket" onClick={toBasket}/>
            </div>
        </div>
    );
}

export default memo(Item);