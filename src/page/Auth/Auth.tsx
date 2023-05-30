import React, {ChangeEvent, useCallback, useState} from 'react';
import styles from "./Auth.module.scss"
import userStore from "../../stores/userStore";
import {useNavigate} from "react-router-dom";
import Layout from "../../Layout";
import Container from "../../components/Container";


function Auth() {
    const navigate = useNavigate();
    const userLogin = userStore(state => state.login);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const inputEmail = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }
    const inputPassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const goToHome = useCallback(() => {
        navigate('/')
    }, [navigate]);

    const goToRegistration = useCallback(() => {
        navigate('/registration')
    }, [navigate]);

    const loginUser = useCallback(() => {
        console.log("Auth click: ", email, " : ", password)
        if (email.trim().length < 4 || password.trim().length < 2)
            return;
        console.log("Auth post")
        userLogin({email: email, password: password}).then();
        goToHome();
    }, [email, password]);

    return (
        <Layout>
            <Container className={styles.root}>
                <div className={styles.container}>
                    <div className={styles.auth}>
                        <input onChange={inputEmail} className={[styles.auth__input, styles.auth__item].join(' ')}
                               type="email" placeholder="E-mail"/>
                        <input onChange={inputPassword} className={[styles.auth__input, styles.auth__item].join(' ')}
                               type="password" placeholder="Password"/>
                        <a className={styles.auth__registration} onClick={goToRegistration}>Зареєструватися</a>
                        <button onClick={loginUser}
                                className={[styles.auth__btn, styles.auth__item].join(' ')}>{"Auth"}</button>
                    </div>
                </div>
            </Container>
        </Layout>
    );
}

export default Auth;