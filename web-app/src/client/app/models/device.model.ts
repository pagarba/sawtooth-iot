export class DeviceModel {
    deviceId: string;
    deviceKey: string;
    deviceName: string;
    type: DeviceType;
}

export class NewDeviceModel {
    DeviceKey: string;
    DeviceName: string;
    DeviceType: string;
    Address: string;
}

export class DeviceType {
    deviceTypeId: number;
    deviceTypeName: string;
}
