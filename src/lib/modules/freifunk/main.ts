import {getNodes} from "./getNodes";
import {toJSON} from "./toJSON";

export default function moduleFreifunk(moduleConfig, cb) {
    getNodes(moduleConfig, function (rawNodes) {
        toJSON(moduleConfig, rawNodes, function (formattedNodes) {
            cb(formattedNodes);
        });
    });
};