import { StartFunc as StartFuncTableTag } from "./TableTag.js";

const StartFunc = () => {
    StartFuncTableTag();
    jFLocalInitialize().then();
};

const jFLocalInitialize = async () => {
    var $table = $('#table');
    let jVarLocalData = await jFLocalReturnColumns();

    $table.bootstrapTable({
        data: [],
        columns:jVarLocalData
    });
};

const jFLocalReturnColumns = async () => {
    let jVarLocalData = await jFLocalTableSchema();
    let jVarLocalColumns=Object.keys(jVarLocalData);

  let jVarLocalCollection=  jVarLocalColumns.map(element => {
        return{
            field:element,
            title:element
        }
    });

 return   jVarLocalCollection;
};

const jFLocalTableSchema = async () => {
    let jVarLocalResponse = await fetch(`/DataSchema/321/${jVarGlobalTableName}.json`);
    let jVarLocalData = await jVarLocalResponse.json();

    return await jVarLocalData;
};

export { StartFunc };
