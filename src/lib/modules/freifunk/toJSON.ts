import './INode';
import './ISource';

export function toJSON (config, rawData, cb) {
    let source = <ISource> {
        nodes: [],
        config: {
            name: config.layerName,
            standardActivated: config.standardActivated
        }
    };
    rawData = rawData.nodes;
    rawData.forEach((currentNode) => {
        let node = <INode> {
            name: "",
            online: false,
            latitude: 0,
            longitude: 0,
            showOnMap: false,
            showOnSitebar: true,
            clients: 0,
            ipAdresses: currentNode.nodeinfo.network.addresses,
            contact: "",
            nodeID: currentNode.nodeinfo.node_id,
            hardware: currentNode.nodeinfo.hardware.model,
            autoupdater: false,
            firmwareRelease: "",
            firstseen: new Date(currentNode.firstseen),
            lastseen: new Date(currentNode.lastseen),
            memoryUsage: (currentNode.statistics.memory_usage * 100),
            load: (currentNode.statistics.loadavg * 100),
            gateway: currentNode.statistics.gateway,
            uptime: currentNode.statistics.uptime,
            siteName: ""
        };
        if (currentNode.nodeinfo.system !== undefined) {
            node.siteName = currentNode.nodeinfo.system.site_code;
        }
        if (currentNode.nodeinfo.owner !== undefined && currentNode.nodeinfo.owner !== null) {
            if (currentNode.nodeinfo.owner.contact !== 0 && currentNode.nodeinfo.owner.contact !== "" && currentNode.nodeinfo.owner.contact !== undefined && currentNode.nodeinfo.owner.contact !== null) {
                node.contact = currentNode.nodeinfo.owner.contact;
            }
        }
        if (currentNode.nodeinfo.software !== undefined) {
            if (currentNode.nodeinfo.software.autoupdater !== undefined) {
                if (currentNode.nodeinfo.software.autoupdater.enabled !== undefined) {
                    node.autoupdater = currentNode.nodeinfo.software.autoupdater.enabled;
                }
            }
            if (currentNode.nodeinfo.software.firmware !== undefined && currentNode.nodeinfo.software.firmware.base !== undefined) {
                if(currentNode.nodeinfo.software.firmware.release !== undefined) {
                    node.firmwareRelease = currentNode.nodeinfo.software.firmware.release + " / " + currentNode.nodeinfo.software.firmware.base;
                } else {
                    node.firmwareRelease = currentNode.nodeinfo.software.firmware.base;
                }
            }
        }
        if(currentNode.nodeinfo.location !== undefined) {
            node.latitude = currentNode.nodeinfo.location.latitude;
            node.longitude = currentNode.nodeinfo.location.longitude;
            node.showOnMap = true;
        }
        node.online = !!currentNode.flags.online;
        node.name = currentNode.nodeinfo.hostname;
        if(currentNode.statistics.clients !== undefined) {
            node.clients = currentNode.statistics.clients;
        }
        source.nodes.push(node);
    });
    source.nodes.sort((a:any,b:any) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
    cb(source);
}