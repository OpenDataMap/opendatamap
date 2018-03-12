interface IIoTMapperNode {
    latitude: Number;
    longitude: Number;
    showOnMap: Boolean;
    name: String;
    dB: Number;
    time: String;
    gateways: Array<IIoTMapperGateway>;
}