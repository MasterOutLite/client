export type Info = {
    title: string;
    description: string;
}

export type Device = {
    brandId: number;
    id: number;
    img: string;
    name: string;
    price: number;
    rating: number;
    typeId: number;
    info: Info[];
}

export type BasketItem = {
    device: Device;
    amount: number;
}

export type User = {
    email: string;
    password: string;
    token?: string;
}

export type Orders = {
    deviceId: number;
    amount: number;
}