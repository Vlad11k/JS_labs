let isFilled = () => { // Проверка на заполненность полей
    return (number.value && amount.value && phone.value && teachName.value);
}

let createElemId = () => { // Создание счётчика id
    let promise = new Promise(function (resolve, reject) {
        db = openDatabase("DB", "0.1", "A list of to do items.", 200000);
        if (!db) {
            alert("Failed to connect to database.");
        }

        resolve(db)
    }).then(db => {
        db.transaction(function (tx) {
            tx.executeSql(SELECT_COUNT_QUERY, [], function (tx, result) {
                elemId = result.rows.item(0)['COUNT(*)'];
            })
        })
    })
}

let sendForm = () => {
    if (isFilled()) {

        let promise = new Promise(function (resolve, reject) {
            db = openDatabase("DB", "0.1", "A list of to do items.", 200000);
            if (!db) {
                alert("Failed to connect to database.");
            }

            resolve(db)
        }).then(db => {
            db.transaction(function (tx) {
                tx.executeSql(SELECT_COUNT_QUERY, [], function (tx, result) {
                }, function (tx, error) {
                    tx.executeSql(CREATE_TABLE_QUERY, [], null, function (tx, error) {
                        alert("error")
                    });
                })
            })

            return db
        }).then(db => {
            let numberField = number.value,
                amountField = amount.value,
                phoneField = phone.value,
                teachNameField = teachName.value,
                anotherField = another.value
            db.transaction(function (tx) {
                tx.executeSql(INSERT_INTO_QUERY, [elemId, numberField, amountField, phoneField, teachNameField, anotherField], function (tx, resuls) {
                }, function (tx, error) {
                    alert("error")
                });
            });
            elemId += 1;
            return ("Данные отправленны")
        }).then(response => {
            alert(response)

            dropTable()
            deleteLabelSelector()
            createTable()
            loadIdSelector()
            document.forms.interviewForm.reset()
        })
    } else {
        alert("Заполните все поля")
    }
}

submit.onclick = (event) => {
    event.preventDefault()
    sendForm()
}

let removeIdFromDB = (id) => {
    db = openDatabase("DB", "0.1", "A list of to do items.", 200000);
    if (!db) {
        alert("Failed to connect to database.");
    }

    db.transaction(function (tx) {
        tx.executeSql(SELECT_COUNT_QUERY, [], function (tx, result) {
        },)
    });

    db.transaction((tx) => {
        tx.executeSql(DELETE_QUERY, [id], function (tx, result) {
        }, (err) => {
            alert("err");
        });
    });

    db.transaction(function (tx) {
        tx.executeSql(SELECT_COUNT_QUERY, [], function (tx, result) {
            if (!result.rows.item(0)['COUNT(*)']) {
                elemId = 0;
            }
        })
    })
}

removeId.onclick = (event) => {
    event.preventDefault()

    const id = document.querySelector('[name="idSelector"]').value
    removeIdFromDB(id)

    dropTable()
    deleteLabelSelector()
    createTable()
    loadIdSelector()
}

let addAnother = (id) => { // Заполнения поля Дополнительно по id
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
        tx.executeSql(UPDATE_QUERY, [another.value, id], function (tx, result) {
        }, (err) => {
            alert("err");
        });
    });
}

addButton.onclick = (event) => {
    event.preventDefault();

    const id = document.querySelector('[name="idSelector"]').value;
    addAnother(id);

    dropTable()
    deleteLabelSelector()
    createTable()
    loadIdSelector()

    alert('Добавлено новое свойство \"' + another.value + '\" к id №' + id);
    setTimeout(() => another.value = '', 100);
}

let maxMin = () => {
    if (document.querySelector('#MaxMinPar')) {document.querySelector('#MaxMinPar').remove()}
    let maxFio, minFio, maxAmount, minAmount
    db = openDatabase("DB", "0.1", "A list of to do items.", 200000);
    if (!db) {
        alert("Failed to connect to database.")
    }

    db.transaction(function (tx) {
        tx.executeSql(SELECT_MAX_QUERY, [], function (tx, result) {
            maxFio = result.rows.item(0)['teachName']
            maxAmount = result.rows.item(0)['maxAmount']
        }, function (tx, error) {
            alert(error);
        });
        tx.executeSql(SELECT_MIN_QUERY, [], function (tx, result) {
            minFio = result.rows.item(0)['teachName']
            minAmount = result.rows.item(0)['minAmount']
        }, function (tx, error) {
            alert(error);
        });
    });
    setTimeout(() => {
        document.querySelector('.interview-buttons').insertAdjacentHTML('afterend', `
        <p id="MaxMinPar" style="text-align: center; font-size: 18px">
        Максимальное количество: <br>
        Учитель: ${maxFio}; Количество: ${maxAmount} <br>
        Минимальное количество <br>
        Учитель: ${minFio}; Количество: ${minAmount}
</p>
        `)
    }, 100)
}

maxMinBtn.onclick = (event) => {
    event.preventDefault();

    maxMin();
}