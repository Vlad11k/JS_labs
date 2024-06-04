let arraysHeaders = [
    "id",
    "№ Класса",
    "количество учащихся",
    "телефон",
    "фио классного",
    "дополнительно"
]

let getTableHeader = () => {
    return JSON.parse(localStorage.getItem('tableHeaderArr')) ?? arraysHeaders
}

let createTableHeader = () => {
    const tableHead = document.querySelector('#tHead')
    let tableHeadContent = getTableHeader()

    tableHeadContent.forEach(element => {
        tableHead.insertAdjacentHTML(`beforeend`, `<td>${element}</td>`)
    });
}

let createTableContent = () => {
    const tableBody = document.querySelector('#tBody')
    let tableHead = getTableHeader()

    db = openDatabase("DB", "0.1", "A list of to do items.", 200000);
    if (!db) {
        alert("Failed to connect to database.");
    }

    db.transaction(function (tx) {
        tx.executeSql(SELECT_COUNT_QUERY, [], function (tx, result) {
        }, function (tx, error) {
            tx.executeSql(CREATE_TABLE_QUERY, [], null, null);
        })
    });

    db.transaction(function (tx) {
        tx.executeSql(SELECT_QUERY, [], function (tx, result) {
            for (let i = 0; i < result.rows.length; i++) {
                tableBody.insertAdjacentHTML(`beforeend`, `
                <tr>
                    <td>${result.rows.item(i)['id']}</td>
                    <td>${result.rows.item(i)['number']}</td>
                    <td>${result.rows.item(i)['amount']}</td>
                    <td>${result.rows.item(i)['phone']}</td>
                    <td>${result.rows.item(i)['teachName']}</td>
                    <td>${result.rows.item(i)['another']}</td>
                </tr>
                `)
            }
        }, (err) => {
            alert("err");
        });
    });
}

function deleteLabelSelector() {
    document.querySelector('[name="idSelector"]').remove()
}

function loadIdSelector() {
    idSelectorItem.insertAdjacentHTML(`afterbegin`, `
    <select name="idSelector" class="interview-operations__field">

    </select>
    `)
    const idSelector = document.querySelector('[name="idSelector"]')

    db = openDatabase("DB", "0.1", "A list of to do items.", 200000);
    if (!db) {
        alert("Failed to connect to database.");
    }

    db.transaction(function (tx) {
        tx.executeSql(SELECT_COUNT_QUERY, [], function (tx, result) {
        }, function (tx, error) {
            tx.executeSql(CREATE_TABLE_QUERY, [], null, null);
        })
    });

    db.transaction((tx) => {
        tx.executeSql(SELECT_ID_QUERY, [], function (tx, result) {
            for (let i = 0; i < result.rows.length; i++) {
                idSelector.insertAdjacentHTML(`beforeend`, `
                    <option class="optionId" value="${result.rows.item(i)['id']}">${result.rows.item(i)['id']}</option>
                `)
            }
        }, (err) => {
            alert("err");
        });
    });
}

function tablePattern() {
    resultsHeader.insertAdjacentHTML('afterend',
        `
    <table class="results-table" id="resultsTable">
        <thead>
            <tr id="tHead">
            </tr>
        </thead>
        <tbody id="tBody">
            
        </tbody>
    </table>
    `)
}


function createTable() {
    tablePattern()

    createTableHeader()
    createTableContent()

}

function dropTable() {
    document.querySelector('#resultsTable').remove()
}