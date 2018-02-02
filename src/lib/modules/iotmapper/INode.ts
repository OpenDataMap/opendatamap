interface IIoTMapperNode {
    latitude: Number;
    longitude: Number;
    showOnMap: Boolean;
    name: String;
    dB: Number;
    gateways: Array<IIoTMapperGateway>;
}