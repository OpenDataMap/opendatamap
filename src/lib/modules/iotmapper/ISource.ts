interface IIoTMapperSource {
    nodes: Array<IIoTMapperNode>;
    gateways: Array<IIoTMapperGateway>;
    config: {
        name: String
    }
}