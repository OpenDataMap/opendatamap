import importConfig from '../config.json';

const config = (importConfig as any);
export default {
    config: config,
    getConfig: () => {
        return config
    },
    modifyModule: (layerName, newCurrent) => {
        for (const i in config.modules) {
            if (config.modules.hasOwnProperty(i)) {
                const module = config.modules[i];
                if (module.config.layerName === layerName) {
                    module.current = newCurrent;
                }
            }
        }
    }
}