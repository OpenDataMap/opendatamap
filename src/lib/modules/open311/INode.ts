interface IOpen311Node {
    service_request_id: String;
    status: String;
    service_code: String;
    service_name: String;
    description: String;
    requested_datetime: String;
    updated_datetime: String;
    first_name: String;
    last_name: String;
    address: String;
    address_string: String;
    address_id: Number;
    zipcode: String;
    email: String;
    phone: String;
    device_id: String;
    account_id: String;
    latitude: Number;
    longitude: Number;
    showOnMap: Boolean;
}