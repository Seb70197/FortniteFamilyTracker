
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

    function calculateAndDisplaySumTop1(filterCondition, elementId) {
        const filteredRows = loadedData2.filter(row => row[0] === filterCondition);
        const sumOfFilteredColumn = filteredRows.reduce((sum, row) => sum + parseInt(row[21], 10), 0);
        console.log(sumOfFilteredColumn.toLocaleString());
        document.getElementById(elementId).innerHTML = sumOfFilteredColumn.toLocaleString();

    }
    
    calculateAndDisplaySumTop1('solo', 'Top1Solo');
    calculateAndDisplaySumTop1('duo', 'Top1Duo');
    calculateAndDisplaySumTop1('trio', 'Top1Trio');
    calculateAndDisplaySumTop1('squad', 'Top1Squad');

    function calculateAndDisplaySumKills(filterCondition, elementId) {
        const filteredRows = loadedData2.filter(row => row[0] === filterCondition);
        const sumOfFilteredColumn = filteredRows.reduce((sum, row) => sum + parseFloat(row[31], 10), 0);
        console.log(sumOfFilteredColumn.toLocaleString());
        document.getElementById(elementId).innerHTML = sumOfFilteredColumn.toLocaleString();

    }
    
    calculateAndDisplaySumKills('solo', 'KillsSolo');
    calculateAndDisplaySumKills('duo', 'KillsDuo');
    calculateAndDisplaySumKills('trio', 'KillsTrio');
    calculateAndDisplaySumKills('squad', 'KillsSquad');

    function calculateAndDisplaySumWinRatio(filterCondition, elementId) {
        const filteredRows = loadedData2.filter(row => row[0] === filterCondition);
        const sumOfFilteredColumn = filteredRows.reduce((sum, row) => {
            const winRatio = row[29].replace(',','.');
            return sum + parseFloat(winRatio);
        },0)
        console.log(sumOfFilteredColumn.toLocaleString());
        document.getElementById(elementId).innerHTML = `${((sumOfFilteredColumn/(loadedData2.filter(row => row[0] === filterCondition)).length)*100).toFixed(2)}%`;

    }
    
    calculateAndDisplaySumWinRatio('solo', 'WinSolo');
    calculateAndDisplaySumWinRatio('duo', 'WinDuo');
    calculateAndDisplaySumWinRatio('trio', 'WinTrio');
    calculateAndDisplaySumWinRatio('squad', 'WinSquad');


    function calculateAndDisplaySumKillDeath(filterCondition, elementId) {
        const filteredRows = loadedData2.filter(row => row[0] === filterCondition);
        const sumOfFilteredColumn = filteredRows.reduce((sum, row) => {
            const winRatio = row[28].replace(',','.');
            return sum + parseFloat(winRatio);
        },0)
        console.log(sumOfFilteredColumn.toLocaleString());
        document.getElementById(elementId).innerHTML = (sumOfFilteredColumn/(loadedData2.filter(row => row[0] === filterCondition)).length).toFixed(2);

    }
    
    calculateAndDisplaySumKillDeath('solo', 'killSolo');
    calculateAndDisplaySumKillDeath('duo', 'killDuo');
    calculateAndDisplaySumKillDeath('trio', 'killTrio');
    calculateAndDisplaySumKillDeath('squad', 'killSquad');

    function calculateAndDisplaySumMinPlayed(filterCondition, elementId) {
        const filteredRows = loadedData2.filter(row => row[0] === filterCondition);
        const sumOfFilteredColumn = filteredRows.reduce((sum, row) => sum + parseFloat(row[32], 10), 0);
        console.log(sumOfFilteredColumn.toLocaleString());
        document.getElementById(elementId).innerHTML = sumOfFilteredColumn.toLocaleString();

    }
    
    calculateAndDisplaySumMinPlayed('solo', 'MinSolo');
    calculateAndDisplaySumMinPlayed('duo', 'MinDuo');
    calculateAndDisplaySumMinPlayed('trio', 'MinTrio');
    calculateAndDisplaySumMinPlayed('squad', 'MinSquad');

    function calculateAndDisplaySumKillMin(filterCondition, elementId) {
        const filteredRows = loadedData2.filter(row => row[0] === filterCondition);
        const sumOfFilteredColumn = filteredRows.reduce((sum, row) => {
            const winRatio = row[33].replace(',','.');
            return sum + parseFloat(winRatio);
        },0)
        console.log(sumOfFilteredColumn.toLocaleString());
        document.getElementById(elementId).innerHTML = (sumOfFilteredColumn/(loadedData2.filter(row => row[0] === filterCondition)).length).toFixed(2);

    }
    
    calculateAndDisplaySumKillMin('solo', 'KillMinSolo');
    calculateAndDisplaySumKillMin('duo', 'KillMinDuo');
    calculateAndDisplaySumKillMin('trio', 'KillMinTrio');
    calculateAndDisplaySumKillMin('squad', 'KillMinSquad');

    function calculateAndDisplaySumScoreGame(filterCondition, elementId) {
        const filteredRows = loadedData2.filter(row => row[0] === filterCondition);
        const sumOfFilteredColumn = filteredRows.reduce((sum, row) => {
            const winRatio = row[36].replace(',','.');
            return sum + parseFloat(winRatio);
        },0)
        console.log(sumOfFilteredColumn.toLocaleString());
        document.getElementById(elementId).innerHTML = (sumOfFilteredColumn/(loadedData2.filter(row => row[0] === filterCondition)).length).toFixed(2);;

    }
    
    calculateAndDisplaySumScoreGame('solo', 'ScoreGameSolo');
    calculateAndDisplaySumScoreGame('duo', 'ScoreGameDuo');
    calculateAndDisplaySumScoreGame('trio', 'ScoreGameTrio');
    calculateAndDisplaySumScoreGame('squad', 'ScoreGameSquad');

    function calculateAndDisplaySumKillGame(filterCondition, elementId) {
        const filteredRows = loadedData2.filter(row => row[0] === filterCondition);
        const sumOfFilteredColumn = filteredRows.reduce((sum, row) => {
            const winRatio = row[34].replace(',','.');
            return sum + parseFloat(winRatio);
        },0)
        console.log(sumOfFilteredColumn.toLocaleString());
        document.getElementById(elementId).innerHTML = (sumOfFilteredColumn/(loadedData2.filter(row => row[0] === filterCondition)).length).toFixed(2);

    }
    
    calculateAndDisplaySumKillGame('solo', 'KillGameSolo');
    calculateAndDisplaySumKillGame('duo', 'KillGameDuo');
    calculateAndDisplaySumKillGame('trio', 'KillGameTrio');
    calculateAndDisplaySumKillGame('squad', 'KillGameSquad');

    function calculateAndDisplaySumTest(filterCondition1, filterCondition2) {
        const filteredRows = loadedData2.filter(row => row[1] === filterCondition1);
        const filteredRows2 = filteredRows.filter(row => row[0] === filterCondition2);
        const sumOfFilteredColumn = filteredRows2.reduce((sum, row) => {
            const winRatio = row[34].replace(',','.');
            return sum + parseFloat(winRatio);
        },0)
        console.log(sumOfFilteredColumn);

         

    }    
    calculateAndDisplaySumTest('CIL20-24', 'solo')
}
function addOption(selectBox, text, value) {
    var optn = document.createElement("OPTION");
    optn.text = text;
    optn.value = value;
    selectBox.options.add(optn);
    

}

function addOption_list(){
    var player = new Array("CIL20-24", "Seb24Stutt","Cedrike");
    for (var i=0; i<player.length;++i){
        addOption(document.drop_list.Player_list, player[i], player[i]);
    }


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
        console.log(loadedData2)
        fetcheddata();

    }).catch((err) => {
        console.log(err.error.message);
    });
};
gapi.load('client', start2);



