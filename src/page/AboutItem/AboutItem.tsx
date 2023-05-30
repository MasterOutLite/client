import React, {MouseEvent, useCallback, useEffect, useState} from 'react';
import styles from "./AboutItem.module.scss"
import {useNavigate, useParams} from "react-router-dom";
import deviceStore from "../../stores/deviceStore";
import {Device} from "../../types";
import Layout from "../../Layout";
import basketStore from "../../stores/basketStore";
import clsx from "clsx";
import basketFull from "../../assets/basket-green-full.svg";
import basket from "../../assets/basket-green.svg";
import style from "../../components/Item/Item.module.scss";

function AboutItem() {
    const params = useParams();
    const navigate = useNavigate();
    const getDevice = deviceStore(state => state.getDeviceById)
    const addDeviceToBasket = basketStore(state => state.addDevice);
    const [device, setDevice] = useState<Device>();

    const addDevice = basketStore(state => state.addDevice);
    const removeDevice = basketStore(state => state.removeDevice);
    const checkInBasket = basketStore(state => state.checkDeviceInBasket);
    const [inBasket, setInBasket] = useState<boolean>(false);
    const toBasket = (event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        if (device) {
            const inBasket = checkInBasket(device.id);
            if (inBasket) {
                removeDevice(device);
            } else {
                addDevice(device);
            }
            setInBasket(!inBasket);
        }
    }

    const goToBasket = useCallback(() => {
        navigate('/basket')
    }, [navigate]);

    const goToBuy = () => {
        if (!device)
            return;
        addDeviceToBasket(device);
        goToBasket();
    }

    useEffect(() => {
        const deviceId = parseInt(params.id || "-1");
        const get = async () => {
            const device = await getDevice(deviceId);
            setDevice(device);
            return device;
        }
        get().then();

        const res = checkInBasket(deviceId);
        setInBasket(res);

    }, []);

    return (
        <Layout>
            <div className={styles.title}>
                <strong>
                    {device?.name}
                </strong>
            </div>

            <div className={styles.container}>
                <div className={styles.container__item} style={{flex: '0 1 60%'}}>
                    <img className={styles.container__itemImg} src={device?.img} alt="item photo"/>

                </div>

                <div className={styles.container__item} style={{flex: '0 1 35%'}}>


                    <div className={clsx(styles.infoBox, styles.main)}>
                        <div>
                            <span className={styles.price}>{device?.price}</span>
                            <span className={styles.hasItem}>{"Has item"}</span>
                            {/*<div className={styles.buttonContainer}>*/}
                            {/*   */}
                            {/*    <button className={[styles.button, styles.button_blue].join(' ')}>{"В кредит"}</button>*/}
                            {/*</div>*/}
                            <button onClick={goToBuy}
                                    className={[styles.button, styles.button_green].join(' ')}>{"Купити"}</button>

                        </div>
                        <div className={styles.imgCenter}>
                            <img src={inBasket ? basketFull : basket} className={style.basketImg} alt="basket"
                                 onClick={toBasket}/>
                        </div>
                    </div>

                    <div className={styles.infoBox}>
                        {device?.info.map((value, index) => (
                            <div key={index} className={[styles.description].join(' ')}>
                                <span className={styles.description__key}> {value.title}</span>
                                <span
                                    className={styles.description__value}>{value.description}</span>
                                <div className={styles.description__lineHr}></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default AboutItem;