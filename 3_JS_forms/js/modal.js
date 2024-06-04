const createModal = () => {
    const aModal = document.createElement('div')
    aModal.classList.add('aModal')
    aModal.insertAdjacentHTML('beforeend', `
    <div class="modal-overlay">
        <div class="modal">
            <div class="modal-header">
            <h3 class="modal-header__title">Результаты</h3> 
            </div>
            <div class="modal-body">
                <table class="modal-body__table">
                    <tr>
                        <td>Имя</td>
                        <td>Неделя</td>
                        <td>Впечатления</td>
                        <td>Модель</td>
                        <td>Цвет</td>
                        <td>Присутствие</td>
                        <td>Оценка</td>
                    </tr>
                </table>
                <div class="modal-body__select">
                    <select id="selectNames">
                        <optgroup label="Имена">
                            
                        </optgroup>
                    </select>
                </div>
            </div>
            <div class="modal-footer">
                <button class="modal-footer__close">Закрыть</button>
            </div>
        </div>
    </div>`)

    document.body.appendChild(aModal)

    const table = document.querySelector('.modal-body__table')
    const selectNames = document.querySelector('optgroup')
    const close = document.querySelector('.modal-footer__close')

    let personArr = JSON.parse(localStorage.getItem('personArr'))
    personArr.forEach(person => {
        table.insertAdjacentHTML('beforeend', `
        <tr>
            <td>${person.name}</td>
            <td>${person.date}</td>
            <td>${person.effect}</td>
            <td>${person.model}</td>
            <td>${person.color}</td>
            <td>${person.coming}</td>
            <td>${person.range}</td>
        </tr>
        `)

        selectNames.insertAdjacentHTML(`beforeend`, `
        <option value="">${person.name}</option>
        `)
    });

    close.addEventListener('click', (e) => {
        aModal.remove()
    })
}