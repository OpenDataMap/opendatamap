import './INode';
import './ISource';

export function toJSON (config, rawNodes, cb) {
    let source = <IOpen311Source> {
        nodes: [],
        config: {
            name: config.layerName,
            standardActivated: config.standardActivated
        }
    };
    rawNodes.forEach((currentNode) => {
        let node = <IOpen311Node> {
            service_request_id: "",
            status: "",
            service_code: "",
            service_name: "",
            description: "",
            requested_datetime: "",
            updated_datetime: "",
            first_name: "",
            last_name: "",
            address: "",
            address_string: "",
            address_id: 0,
            zipcode: "",
            email: "",
            phone: "",
            device_id: "",
            account_id: "",
            latitude: 0,
            longitude: 0,
            showOnMap: false
        };
        if(currentNode.lat !== undefined) {
            node.latitude = currentNode.lat;
            node.longitude = currentNode.long;
            node.showOnMap = true;
        }
        node.service_request_id = currentNode.service_request_id;
        node.status = currentNode.status;
        node.service_code = currentNode.service_code;
        if(currentNode.service_name == "") {
            node.service_name = currentNode.service_code;
        } else {
            node.service_name = currentNode.service_name;
        }
        node.description = currentNode.description;
        node.requested_datetime = new Date(Date.parse(currentNode.requested_datetime)).toLocaleString();
        node.updated_datetime = new Date(Date.parse(currentNode.updated_datetime)).toLocaleString();
        if(currentNode.address !== undefined && currentNode.address != null) {
            node.address = currentNode.address;
        }
        if(currentNode.zipcode !== undefined && currentNode.zipcode != null) {
            node.zipcode = currentNode.zipcode;
        }
        source.nodes.push(node);
    });
    source.nodes.sort((a:any,b:any) => (a.service_name > b.service_name) ? 1 : ((b.service_name > a.service_name) ? -1 : 0));
    cb(source);
}