import {request} from './graphql-client/index';
interface IGraphResponse {
    getDataSource: string;
}
export function getNodeData (moduleConfig, generalConfig, cb) {
    const graphQuery = `{
      getDataSource(dataSourceName: "` + moduleConfig.layerName + `")
    }`;
    request('/api', graphQuery).then((data: IGraphResponse) => {
        const dataSources = JSON.parse(data.getDataSource);
        cb(dataSources)
    })

}