import React, {useEffect, useState} from 'react';
import styles from './BasketList.module.scss'

import Layout from "src/Layout";
import Container from "src/components/Container";
import basketStore from "../../stores/basketStore";
import BasketDevice from "../../components/BasketDevice/BasketDevice";
import userStore from "../../stores/userStore";
import withoutReactStore from "../../stores/withoutReactStore";
import {buyDevice} from "../../api/request";

console.log(withoutReactStore.getState().name)

function BasketList() {
    const token = userStore(state => state.token);
    const basketList = basketStore(state => state.basketList);
    const clearBasket = basketStore(state => state.clearBasket);
    const [basketPrice, setBasketPrice] = useState<number>(0);

    const handlerBuyDevice = async () => {
        if (basketList.length <= 0)
            return;

        if (token)
            await buyDevice(basketList, token).then(r=> console.log(r.data));
        else
        {
            alert('Користувач не авторизований!');
            return;
        }

        clearBasket();
        alert('Ваше замовлення відправлено на обробку. Очікуйте дзвінка із підтвердженням.');
    }

    useEffect(() => {
        let allPrice: number = 0;
        basketList.map(value => allPrice += value.device.price);
        setBasketPrice(allPrice)
    }, [basketList]);

    return (
        <Layout>
            <Container className={styles.container}>
                <div className={styles.basketWrapper}>
                    {basketList.map(value => (<BasketDevice key={value.device.id} basketItem={value}/>))}
                </div>
                <div className={styles.basketInfo}>
                    <span> <strong>Ціна за все:</strong> {basketPrice}</span>
                    <button className={styles.basketInfo__btn} onClick={handlerBuyDevice}>Замовити</button>
                </div>
            </Container>
        </Layout>
    );
}

export default BasketList;