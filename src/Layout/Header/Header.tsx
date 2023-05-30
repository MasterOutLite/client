import {memo, useCallback, useEffect, useState} from "react";
import style from "./Header.module.scss";

import basket from "src/assets/basket.svg";
import menu from "src/assets/menu.svg";
import userImg from "src/assets/user.svg";
import userStore from "../../stores/userStore";
import {useNavigate} from "react-router-dom";

export interface HeaderProps {
    title?: string;
}

function Header({title}: HeaderProps) {
    const defaultTitle = 'Шароварники';
    const navigate = useNavigate();
    //const userLogin = userStore(state => state.login)
    const user = userStore(state => state.user);


    const goToHome = useCallback(() => {
        navigate('/' )
    }, [navigate]);

    const goToAboutUser = useCallback(() => {
        navigate('/user/' + user)
    }, [navigate]);

    const goToBasket = useCallback(() => {
        navigate('/basket')
    }, [navigate]);


    return (
        <header className={style.header}>
            <div className={style.container}>
                {/*<img src={menu} className={style.item} alt="menu"/>*/}
                <span className={style.logoText} onClick={goToHome}>{title? title: defaultTitle}</span>
                <img src={userImg} className={style.item} alt="user" onClick={goToAboutUser}/>
                <img src={basket} className={style.item} alt="basket" onClick={goToBasket}/>
            </div>
        </header>
    );
}

export default memo(Header);
