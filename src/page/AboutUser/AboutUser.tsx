import React, {ChangeEvent, memo, MouseEvent, useCallback, useEffect, useState} from 'react';
import styles from './AboutUser.module.scss'

import userStore from "../../stores/userStore";
import {useNavigate, useParams} from "react-router-dom";
import Layout from "../../Layout";
import Container from "../../components/Container";

function AboutUser() {
    //{email: "Admin@test.ua", password: "kuku"}
    const params = useParams();
    const navigate = useNavigate();
    const user = userStore(state => state.user);
    const userToken = userStore(state => state.token);
    const isAuth = userStore(state => state.isAuth);
    const userAuth = userStore(state => state.auth);
    const goOut = userStore(state => state.goOut);


    const goOutAuth = () => {
        goOut();
    }

    const goToAuth = useCallback(() => {
        navigate('/auth')
    }, [navigate]);

    useEffect(() => {
        const auth = async () => {
            const res = await userAuth();
        }

        if (!isAuth)
            auth().then();
    }, []);

    if (!isAuth)
        return (
            <Layout>
                <Container className={styles.root}>
                    <div className={styles.title}>
                        Користувач не авторизований!
                    </div>
                    <div className={styles.authContainer}>
                        <button onClick={goToAuth} className={styles.btn}>Авторизуватися</button>
                    </div>
                </Container>
            </Layout>

        )

    return (
        <Layout>
            <Container className={styles.root}>
                <button className={styles.btn} onClick={goOutAuth}>Вийти</button>
                <div className={styles.title}>
                    Користувач авторизований
                </div>
                <span className={styles.info}>
                    Токен користувача {userToken}
                </span>
            </Container>
        </Layout>
    );
}

export default memo(AboutUser);