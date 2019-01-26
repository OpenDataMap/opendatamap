interface IEnvironemntNode {
    pubId: String;
    nodeType: String;
    hasSensor: Boolean;
    hasActuator: Boolean;
    latitude: Number;
    longitude: Number;
    altitude: Number;
    sensors: Array<{
        sensorName: String;
        sensorInterval: String;
        nodeSubType: String;
        sensorType: String;
        dataFormat: String;
        lastData: Number;
    }>;
    actuator: Array<{
        actuatorName: String;
        nodeSubType: String;
        dataFormat: String;
        lastData: Number;
    }>
    showOnMap: Boolean;
}