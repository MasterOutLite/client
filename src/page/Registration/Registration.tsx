import React, {ChangeEvent, memo, useCallback, useState} from 'react';
import Layout from "../../Layout";
import Container from "../../components/Container";
import styles from "../Auth/Auth.module.scss";
import {useNavigate} from "react-router-dom";
import userStore from "../../stores/userStore";
import {registrationUser} from "../../api/request";


export interface RegistrationProps {

}

function Registration() {
    const navigate = useNavigate();
    const userLogin = userStore(state => state.login);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');

    const inputEmail = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }
    const inputPassword = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }
    const inputPasswordConfirmation = (event: ChangeEvent<HTMLInputElement>) => {
        setPasswordConfirmation(event.target.value)
    }

    const goToAuth = useCallback(() => {
        navigate('/auth')
    }, [navigate]);

    const registrationUserHandler = useCallback(() => {
        console.log("Auth click: ", email, " : ", password)
        if ((email.trim().length < 4 || password.trim().length < 6) && password !== passwordConfirmation){
            alert("Введенна вами пошта або пароль є не вірними!")
            return;
        }

        console.log("Auth post")
        registrationUser({email: email, password: password}).then();
        goToAuth();
    }, [email, password]);

    return (
        <Layout>
            <Container>
                <div className={styles.container}>
                    <div className={styles.auth}>
                        <input onChange={inputEmail} className={[styles.auth__input, styles.auth__item].join(' ')}
                               type="email" placeholder="E-mail"/>

                        <input onChange={inputPassword} className={[styles.auth__input, styles.auth__item].join(' ')}
                               type="password" placeholder="Password"/>
                        <input onChange={inputPasswordConfirmation}
                               className={[styles.auth__input, styles.auth__item].join(' ')}
                               type="password" placeholder="Password"/>

                        <button onClick={registrationUserHandler}
                                className={[styles.auth__btn, styles.auth__item].join(' ')}>{"Registration"}</button>
                    </div>
                </div>
            </Container>
        </Layout>
    );
}

export default memo(Registration);