interface IIoTMapperSource {
    nodes: Array<IIoTMapperNode>;
    gateways: Array<IIoTMapperGateway>;
    mapper: Array<IIoTMapperNode>;
    config: {
        name: String
    }
}