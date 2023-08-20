
const start = () => {
    gapi.client.init({
        'apiKey': 'AIzaSyBySxUV-QWz6dGDf1aduhDjhjDgV2WmvwY',
        'discoveryDocs': ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
    }).then(() => {
        return gapi.client.sheets.spreadsheets.values.get({
            spreadsheetId: '18ZVoROsjhuoBFQn4qu3HlJLhCu39HZyyonLVcat_Ybs',
            range: 'Player_stats!A1:B33', // for example: List 1!A1:B6
        })
    }).then((response) => {
    // parse the response data
        const loadedData = response.result.values;

    // populate the HTML table with the data
        const table = document.getElementsByTagName('table')[0];

    // add column headers
        const columnHeaders = document.createElement('th');
        columnHeaders.innerHTML = `<th>${loadedData[0][0]}</th>
        <th>${loadedData[0][1]}</th>`;
        table.appendChild(columnHeaders);

        // add table data rows
        for (let i = 1; i < loadedData.length; i++) {
            const tableRow = document.createElement('td');
            tableRow.innerHTML = `<td>${loadedData[i][0]}</td>
            <td>${loadedData[i][1]}</td>`;
            table.appendChild(tableRow);
        }
    }).catch((err) => {
    console.log(err.error.message);
    });
};

gapi.load('client', start);
