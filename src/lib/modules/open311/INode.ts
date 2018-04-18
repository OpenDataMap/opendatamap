interface IOpen311Node {
    service_request_id: String;
    status: String;
    service_code: Number;
    service_name: String;
    description: String;
    requested_datetime: String;
    updated_datetime: String;
    address: String;
    zipcode: String;
    latitude: Number;
    longitude: Number;
    showOnMap: Boolean;
}