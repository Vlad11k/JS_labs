const getPerson = () => {
    let person = {}
    person.name = nameField.value
    person.date = dateField.value
    let effectValues = []
    effectField.forEach((eff) => {
        (eff.checked === true) ? effectValues.push(eff.value) : null
    });
    person.effect = effectValues;
    person.model = model.value
    person.color = colorField.value
    comingField.forEach(item => {
        (item.checked === true) ? person.coming = item.value : null
    });
    person.range = rangeField.value

    return person
}

const sendForm = () => { //отправка формы (сохранение в Local Storage)
    personArr = JSON.parse(localStorage.getItem("personArr")) ?? []
    personArr.push(getPerson())
    localStorage.setItem("personArr", JSON.stringify(personArr))
}

form.addEventListener("submit", sendForm)
reject.addEventListener("click", (e) => {
    e.preventDefault()

    form.reset()
})