let StartFunc = (inData) => {
    let jVarLocalWithAggValues = inData;
    var $table = $('#table')
    $table.bootstrapTable("load", jVarLocalWithAggValues);
};

export { StartFunc };