const resultsHeader = document.querySelector('.results-header')
const number = document.querySelector('[name="number"]')
const amount = document.querySelector('[name="amount"]')
const phone = document.querySelector('[name="phone"]')
const teachName = document.querySelector('[name="teachName"]')
const submit = document.querySelector('#submit')
const idSelectorItem = document.querySelector('#idSelectorItem')
const removeId = document.querySelector('#removeId')
const maxMinBtn = document.querySelector('#maxMinBtn')
const another = document.querySelector('#addColumn')
const addButton = document.querySelector('#addButton')

const CREATE_TABLE_QUERY = "CREATE TABLE users (id REAL UNIQUE, number INT, amount INT, phone INT, teachName TEXT,  another TEXT)";
const INSERT_INTO_QUERY = "INSERT INTO users (id, number, amount, phone, teachName, another) values(?, ?, ?, ?, ?, ?)";
const SELECT_COUNT_QUERY = "SELECT COUNT(*) FROM users";
const DELETE_QUERY = "DELETE FROM users WHERE id = ?";
const UPDATE_QUERY = "UPDATE users SET another = ? WHERE id = ?";
const SELECT_QUERY = "SELECT * FROM users"
const SELECT_ID_QUERY = "SELECT id FROM users";
const SELECT_MAX_QUERY = "SELECT teachName, MAX(amount) AS maxAmount FROM users"
const SELECT_MIN_QUERY = "SELECT teachName, MIN(amount) AS minAmount FROM users"


let elemId = 0;