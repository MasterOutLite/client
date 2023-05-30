import React, {useEffect} from "react";
import Header from "./Layout/Header";
import "./styles/global.scss";
import Main from "./Layout/Main/Main";

import Routes from "./routes";
import basketStore from "./stores/basketStore";
import userStore from "./stores/userStore";

function App() {
    const auth = userStore(state => state.auth);

    useEffect(() => {
        auth().then();
    }, [])

    return (
        <>
            <Routes/>
        </>
    );
}

export default App;
