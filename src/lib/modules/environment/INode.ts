interface IEnvironemntNode {
    node_id: String;
    sensor_type: String;
    description: String;
    latitude: Number;
    longitude: Number;
    dataUnit: String;
    lastData: Number;
    lastDataTimestamp: String;
    showOnMap: Boolean;
}