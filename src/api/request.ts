import {BasketItem, Device, Orders, User} from "../types";
import {userLoginURL, ordersBuyURL, basketURl, userAuthURL, userURL, userRegistrationURL,} from "./apiURL";


async function userLogin(user: User) {
    const response = await fetch("http://localhost:5000/api/user/login",
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'

            },
            method: "POST", body: JSON.stringify(user)
        })
    return {data: await response.json(), status: response.status};
}

async function userAuth(token: string) {
    const response = await fetch(userAuthURL,
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    return {data: await response.json(), status: response.status};
}

async function getUser(token: string) {
    const response = await fetch(userURL,
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    return {data: await response.json(), status: response.status};
}

async function registrationUser(user: User) {
    const response = await fetch(userRegistrationURL,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'

            },
            method: "POST", body: JSON.stringify(user)
        });
    return {data: await response.json(), status: response.status};
}

async function buyDevice(device: BasketItem[], token: string) {
    const orders: Orders[] = [];
    device.map(value => {
        orders.push({deviceId: value.device.id, amount: value.amount})
    })

    const response = await fetch(ordersBuyURL,
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            method: "POST",
            body: JSON.stringify({
                orders
            })
        });

    return {data: await response.json(), status: response.status};
}

async function basketListSet(device: BasketItem[], token: string) {
    const userInfo = await getUser(token);
    //console.log(userInfo, " : ", token)
    device.map(value => {
        fetch(basketURl,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                method: "POST",
                body: JSON.stringify({
                    userId: userInfo.data.id,
                    deviceId: value.device.id
                })
            });
    });
}

export {buyDevice, userAuth, userLogin, registrationUser, getUser};