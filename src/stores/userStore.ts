import {create} from "zustand";
import {User} from "../types";
import {userAuth, userLogin} from "../api/request";

interface UserStore {
    user: User | null;
    token: string | null;
    isAuth: boolean;
    login: (user: User) => Promise<boolean>;
    auth: () => Promise<boolean>;
    goOut: () => void;
}

const userStore = create<UserStore>((set, get) => ({
    user: null,
    token: null,
    isAuth: false,
    async login(user: User) {
        // {
        //    Admin@test.ua
        //    kuku
        //   ADMIN
        // }
        // const response = await axios.create({baseURL: "http://localhost:5000/"}).post("api/user/login", {
        //     email: user.email,
        //     password: user.password
        // })
        const response = await userLogin(user);
        const status = response.status === 200;
        console.log("Status" + status)
        if (!status)
            return false;

        const data = response.data;
        localStorage.setItem('auth', JSON.stringify(data.token));

        set({token: data.token, isAuth: status})
        return status;
    },
    async auth() {
        const local: string = localStorage.getItem('auth') || "";
        console.log("Local auth", local)
        if (local === 'undefined' || local === 'null' || local === "")
            return false;
        const token: string = JSON.parse(local);
        console.log("TOKEN AUTH  " + token)
        const response = await userAuth(token);
        if (response.status !== 200)
            return false;
        const data =  response.data;
        const responseToken = data.token;
        set({token: responseToken, isAuth: true})
        localStorage.setItem('auth', JSON.stringify(responseToken));
        return responseToken.trim().length > 0;
    },
    goOut() {
        set({user: null, token: null, isAuth: false})
        localStorage.removeItem('auth');
    }
}))

export default userStore;