interface IIoTMapperNode {
    latitude: number;
    longitude: number;
    showOnMap: Boolean;
    name: String;
    dB: number;
    time: String;
    gateways: Array<IIoTMapperGateway>;
}