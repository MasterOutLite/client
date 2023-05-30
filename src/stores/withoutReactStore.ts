import {createStore} from 'zustand/vanilla'

interface withoutReactStore {
    name: string;
    count: number;
}


const store = createStore<withoutReactStore>(() => (
    {count: 10, name: "tt"}))
const {getState, setState, subscribe} = store

export default store