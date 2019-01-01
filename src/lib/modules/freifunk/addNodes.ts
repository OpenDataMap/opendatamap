import * as L from 'leaflet';
import {rotate} from "./tools";
import {nodeDetailOnClick} from "./initDetails";
import {appendToLayerChooser} from "../../layerChooser/initLayerChooser";

export function addNodes(sourceJSON, leafletMap, leafletLayerControl?, layerFreifunkNodes?) {
	const nodes = sourceJSON.nodes;
	if (layerFreifunkNodes !== undefined && layerFreifunkNodes !== null) {
		layerFreifunkNodes.clearLayers();
	} else {
		layerFreifunkNodes = L.layerGroup();
	}
	const clientDistance = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0.04, 0.02, 0.01, 0.00512, 0.00256, 0.00128, 0.00064, 0.00032, 0.00016, 0.00008];
	nodes.forEach((currentNode) => {
		if (currentNode.latitude !== 0 && currentNode.longitude !== 0 && currentNode.latitude !== undefined && currentNode.longitude !== undefined) {
			let nodeColorOnMap;
			const currentTimeLastseenDiff = ((new Date().getTime() - currentNode.lastseen.getTime()) / 1000 / 60);
			if (currentTimeLastseenDiff < 15 && currentNode.online) {
				nodeColorOnMap = '#1565C0';
			} else {
				nodeColorOnMap = '#C62828';
			}
			const customMapNodeCircle = L.CircleMarker.extend({
				options: {
					dataObj: Object
				}
			});
			const mapNodeCircle = new customMapNodeCircle([currentNode.latitude, currentNode.longitude], {
				radius: 7,
				color: nodeColorOnMap,
				fillOpacity: 0.9,
				clickable: true,
				dataObj: currentNode
			}).on('click', nodeDetailOnClick);

			let mapNodeCircleClients = [];
			let point = [];
			for(let i = 0; (i < currentNode.clients) && (i < 90); i++) {
				switch(true) {
					case(i < 12):
						point = rotate(currentNode.latitude, currentNode.longitude, currentNode.latitude + clientDistance[13], currentNode.longitude, - 30 * i);
						break;
					case((i > 11) && (i < 30)):
						point = rotate(currentNode.latitude, currentNode.longitude, currentNode.latitude + clientDistance[13] * 1.5, currentNode.longitude, - 20 * (i-12));
						break;
					case((i > 29) && (i < 54)):
						point = rotate(currentNode.latitude, currentNode.longitude, currentNode.latitude + clientDistance[13] * 2, currentNode.longitude, - 15 * (i-30));
						break;
					case((i > 53) && (i < 90)):
						point = rotate(currentNode.latitude, currentNode.longitude, currentNode.latitude + clientDistance[13] * 2.5, currentNode.longitude, - 10 * (i-54));
						break;	
				}
				mapNodeCircleClients[i] = new L.CircleMarker([point[0], point[1]], {
					radius: 1.5,
					color: '#FF22DD',
					fillOpacity: 0.9
				});
				layerFreifunkNodes.addLayer(mapNodeCircleClients[i]);
				// Settings and functions that keep the size of the mapNodeCircleClients on the map
				const myZoom = {
					start: leafletMap.getZoom(),
					end: leafletMap.getZoom()
				};
				leafletMap.on('zoomstart', function (e) {
					myZoom.start = leafletMap.getZoom();
				});
				leafletMap.on('zoomend', function (e) {
					myZoom.end = leafletMap.getZoom();
					if(myZoom.end <= 12) {                    // hide the mapNodeCircleClients on the map if zoomed out
						mapNodeCircleClients[i].setStyle({opacity: 0, fillOpacity: 0});
					} else {
						mapNodeCircleClients[i].setStyle({opacity: 1, fillOpacity: 0.9});
						let clientPoint = [];
						switch(true) {
							case(i < 12):
								clientPoint = rotate(currentNode.latitude, currentNode.longitude, currentNode.latitude + clientDistance[myZoom.end], currentNode.longitude, - 30 * i);
								break;
							case((i > 11) && (i < 30)):
								clientPoint = rotate(currentNode.latitude, currentNode.longitude, currentNode.latitude + clientDistance[myZoom.end] * 1.5, currentNode.longitude, - 20 * (i-12));
								break;
							case((i > 29) && (i < 54)):
								clientPoint = rotate(currentNode.latitude, currentNode.longitude, currentNode.latitude + clientDistance[myZoom.end] * 2, currentNode.longitude, - 15 * (i-30));
								break;
							case((i > 53) && (i < 90)):
								clientPoint = rotate(currentNode.latitude, currentNode.longitude, currentNode.latitude + clientDistance[myZoom.end] * 2.5, currentNode.longitude, - 10 * (i-54));
								break;
							}
						mapNodeCircleClients[i].setLatLng(L.latLng(clientPoint[0], clientPoint[1]));
					}
				});
			}
			// add Tooltip to cicle
			mapNodeCircle.bindTooltip(currentNode.name, {
				className: 'leaflet-tooltip-node'
			});
			layerFreifunkNodes.addLayer(mapNodeCircle);
		}
	});
	if (localStorage.getItem('rememberLayers') === null) {
		if (sourceJSON.config.standardActivated) {
			layerFreifunkNodes.addTo(leafletMap);
		}
	} else {
		let rememberLayers = JSON.parse(localStorage.getItem('rememberLayers'));
		let found = false;
		for(let rememberLayer of rememberLayers) {
			if (rememberLayer.name === sourceJSON.config.name) {
				found = true;
				if (rememberLayer.checked) {
					layerFreifunkNodes.addTo(leafletMap);
				}
				return;
			}
		}
		if(!found) {
			rememberLayers.push({
				"name": sourceJSON.config.name,
				"checked": true
			});
			localStorage.setItem('rememberLayers', JSON.stringify(rememberLayers));
			layerFreifunkNodes.addTo(leafletMap);
		}
	}
	if (leafletLayerControl !== undefined && leafletLayerControl !== null) {
		appendToLayerChooser(sourceJSON.config.name, sourceJSON.config.standardActivated);
		leafletLayerControl.addOverlay(layerFreifunkNodes, sourceJSON.config.name);
	}
	return layerFreifunkNodes;
}