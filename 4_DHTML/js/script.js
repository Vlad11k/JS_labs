let resetButton = document.querySelector('#reset')
let submitButton = document.querySelector('#submit')
let addButton = document.querySelector('#add')

let textFields = document.querySelectorAll('.input-text')
let size = document.querySelector('#select-size')
let color = document.querySelector('#select-color')

submitButton.addEventListener('click', () => {
    const aModal = document.createElement('div')
    aModal.classList.add('aModal')
    aModal.insertAdjacentHTML('beforeend', `
    <div class="modal-overlay">
        <div class="modal">
            <div class="modal-header">
            <h3 class="modal-header__title">Результаты</h3> 
            </div>
            <div class="modal-body">
            <ol class="list">
            
            </ol>
            </div>
            <div class="modal-footer">
                <button class="close-btn">Закрыть</button>
            </div>
        </div>
    </div>`);

    document.body.appendChild(aModal)

    const close = document.querySelector('.close-btn')
    const list = document.querySelector('.list')

    for (let i = 0; i < textFields.length; i++) {
        list.insertAdjacentHTML('beforeend', `
        <li>${textFields[i].value}</li>
        `)
    }
    list.style.fontSize = size.value;
    list.style.color = color.value;

    close.addEventListener('click', (e) => {
        aModal.remove()
    })
})

resetButton.addEventListener('click', () => {

    textFields.forEach((text) => {
        text.style.width = '200px'
        text.value = '';
    })
})

addButton.addEventListener('click', () => {
    let textDiv = document.querySelector('.text-div')
    textDiv.insertAdjacentHTML('beforeend', '<input type="text" class="input-text" placeholder="Введите текст..">')
    textFields = document.querySelectorAll('.input-text');
})