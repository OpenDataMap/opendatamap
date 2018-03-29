interface INode {
    name: String;
    online: Boolean;
    latitude: Number;
    longitude: Number;
    showOnMap: Boolean;
    showOnSitebar: Boolean;
    clients: Number;
    ipAdresses: Array<String>;
    contact: String;
    nodeID: String;
    hardware: String;
    autoupdater: Boolean;
    firmwareRelease: String;
    firstseen: Date;
    lastseen: Date;
    memoryUsage: number;
    load: number;
    gateway: String;
    uptime: number;
    siteName: String;
}