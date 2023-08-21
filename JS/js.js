
var DataSource = 0
const start = () => {
    gapi.client.init({
        'apiKey': 'AIzaSyBySxUV-QWz6dGDf1aduhDjhjDgV2WmvwY',
        'discoveryDocs': ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
    }).then(() => {
        return gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: '18ZVoROsjhuoBFQn4qu3HlJLhCu39HZyyonLVcat_Ybs',
            range: 'Player_stats!A:AO', // for example: List 1!A1:B6
        })
    }).then((response) => {
    // parse the response data
        const loadedData = response.result.values;
        console.log("loadedData",response.result.values)
    // populate the HTML table with the data
        const table = document.getElementsByTagName('table')[0];

    // add column headers
        const columnHeaders = document.createElement('tr');
        columnHeaders.innerHTML = `<th>${loadedData[0][0]}</th>
        <th>${loadedData[0][1]}</th><th>${loadedData[0][2]}</th><th>${loadedData[0][23]}</th>`;
        table.appendChild(columnHeaders);

        // add table data rows
        for (let i = 1; i < loadedData.length; i++) {
            const tableRow = document.createElement('tr');
            tableRow.innerHTML = `<td>${loadedData[i][0]}</td>
            <td>${loadedData[i][1]}</td><td>${loadedData[i][2]}</td><td>${loadedData[i][23]}</td>`;
            table.appendChild(tableRow);
        }
    }).catch((err) => {
    console.log(err.error.message);
    });
};

gapi.load('client', start);

let c;
const fetcheddata = () => {
    const columnSumTop1 = loadedData2.slice(1).reduce((sum, row) => sum + parseInt(row[21], 10), 0);
    document.getElementById('Top1').innerHTML = columnSumTop1.toLocaleString();   
    const columnSumScore = loadedData2.slice(1).reduce((sum, row) => sum + parseInt(row[20], 10), 0);
    document.getElementById('Score').innerHTML = columnSumScore.toLocaleString();
    const columnSumTop3 = loadedData2.slice(1).reduce((sum, row) => sum + parseInt(row[22], 10), 0);
    document.getElementById('Top3').innerHTML = columnSumTop3.toLocaleString();
    const columnSumTop5 = loadedData2.slice(1).reduce((sum, row) => sum + parseInt(row[23], 10), 0);
    document.getElementById('Top5').innerHTML = columnSumTop5.toLocaleString();
    
    function calculateAndDisplaySum(filterCondition, elementId) {
        const filteredRows = loadedData2.filter(row => row[0] === filterCondition);
        const sumOfFilteredColumn = filteredRows.reduce((sum, row) => sum + parseInt(row[20], 10), 0);
        console.log(sumOfFilteredColumn.toLocaleString());
        document.getElementById(elementId).innerHTML = sumOfFilteredColumn.toLocaleString();

    }
    
    calculateAndDisplaySum('solo', 'PerfSolo');
    calculateAndDisplaySum('duo', 'PerfDuo');
    calculateAndDisplaySum('trio', 'PerfTrio');
    calculateAndDisplaySum('squad', 'PerfSquad');
}





const start2 =() => {
    gapi.client.init({
        'apiKey': 'AIzaSyBySxUV-QWz6dGDf1aduhDjhjDgV2WmvwY',
        'discoveryDocs': ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
    }).then(() => {
        return gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: '18ZVoROsjhuoBFQn4qu3HlJLhCu39HZyyonLVcat_Ybs',
            range: 'Player_stats!A:ZA', // for example: List 1!A1:B6
        });
    }).then((response) => {
        loadedData2 = response.result.values;
        
        fetcheddata();

    }).catch((err) => {
        console.log(err.error.message);
    });
};
gapi.load('client', start2);



