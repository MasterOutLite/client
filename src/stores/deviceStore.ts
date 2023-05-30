import {create} from "zustand";
import {Device} from "../types";
import {Value} from "sass";

interface DeviceStore {
    deviceList: Device [];
    selectDevice: Device | null;
    getDevice: () => Promise<Device[]>;
    getDeviceById: (id: string | number) => Promise<Device>;
    setDevice: (device: Device) => Device;
}

type DeviseResponse = {
    count: number;
    rows: Device[];
}

const deviceStore = create<DeviceStore>((set, get) => {
    return ({

        deviceList: [],
        selectDevice: null,
        getDevice: async () => {
            const response = await fetch("http://localhost:5000/api/device");
            const object = await response.json() as DeviseResponse;
            const devices: Device[] = object.rows;
            devices.map(value => value.img = "http://localhost:5000/" + value.img);
            set({deviceList: [...devices]});
            return devices;
        },
        async getDeviceById(id) {
            const response = await fetch("http://localhost:5000/api/device/" + id);
            const device = await response.json() as Device;
            device.img = 'http://localhost:5000/' + device.img;
            return device;
        }
        ,

        setDevice(device: Device) {
            set({selectDevice: device});
            return device;
        }
    });
})

export default deviceStore;
