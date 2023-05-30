import {create} from "zustand";
import {BasketItem, Device} from "../types";
import axios from "axios/index";

interface BasketStore {
    basketList: BasketItem[];
    addDevice: (device: Device) => void;
    removeDevice: (device: Device) => void;
    checkDeviceInBasket: (id: number) => boolean;
    clearBasket: ()=> void;
}

const basketStore = create<BasketStore>((set, get) => ({
    basketList: [],
    addDevice(device: Device) {
        const baskets = get().basketList;
        if (!baskets.find(basket => basket.device.id === device.id))
            set({basketList: [...baskets, {device, amount: 1}]});
    },
    removeDevice(device){
        const baskets = get().basketList;
        const updateBaskets = baskets.filter(basket=> basket.device.id !== device.id)
        set({basketList: [...updateBaskets]})
    }
    ,

    checkDeviceInBasket(id: number) {
        const baskets = get().basketList;
        return !!baskets.find(basket => basket.device.id === id);
    },
    clearBasket(){
        set({basketList: []})
    }
}))

export default basketStore;