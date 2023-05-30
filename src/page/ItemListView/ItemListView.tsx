import React, {memo, useEffect, useMemo, useState} from 'react';
import style from "./ItemListView.module.scss"
import Item from "src/components/Item/Item";

import deviceStore from "src/stores/deviceStore";
import userStore from "src/stores/userStore";
import Layout from "src/Layout";
import Container from "../../components/Container";

export interface ItemListViewProps {

}

function ItemListView({}: ItemListViewProps) {
    const deviceAsync = deviceStore(state => state.getDevice);
    const deviceList = deviceStore(state => state.deviceList);
    const selectDevice = deviceStore(state => state.selectDevice);

    useEffect(() => {
        const get = async () => {
            await deviceAsync();
        }
        get().then();
    }, [])

    return (
        <Layout>
            <Container className={style.container}>
                {deviceList.map((value, index) => (
                    <Item key={value.id} device={value} starCount={5}/>
                ))}
            </Container>
        </Layout>
    );
};

export default memo(ItemListView);