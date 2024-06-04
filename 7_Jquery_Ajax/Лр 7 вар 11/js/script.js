let file
let selectedCity;

$(function () {
    selectedCity = $('#selected');
    selectedCity.on('change', function () {
        file = '../txt/' + selectedCity.val() + '.txt'
        $.ajax({
            type: 'GET',
            url: file,
            success: function (data) {
                $('#headerText').remove(); //Удаление блока для отсутствия дублирования
                $('#text2').empty(); //Очистка блока
                $('.imageDiv').empty(); //Очистка блока
                $('#capitalText').remove();
                $('#text1').text(data) //Заполнение блока информацией из файла
            },
            error:function () {
                alert("Произошла ошибка")
            }
        })
    })

    $('#jsonBtn').on('click', function () {
        if (file) {
            if ($('#text1').children().length !== 0) return 0; //Проверка против двойного срабатывания кнопки
            file = '../json/' + selectedCity.val() + '.json'
            $.getJSON(file, function (data) {
                $('#text1').append(`
                <ul>
                <li>Дата упоминания: ${data.mention}</li>
                <li>Площадь: ${data.area}</li>
                <li>Реки: ${data.rivers.join(', ')}</li>
                </ul>
                `)
            })
        } else {
            alert('Не выбран город')
        }
    })

    $('#textBtn').on('click', function () {
        if (file) {
            if ($('#headerText').length !== 0) return 0; //Проверка против двойного срабатывания кнопки
            file = '../txt/Capitals.txt';
            $('<p id="headerText"></p>').insertBefore('#text1')
            $('#headerText').load(file + ' #' + selectedCity.val()) //Подгрузка информации в блок

            $('#text2').before('<p id="capitalText"></p>')
            $('#capitalText').load(file + ' #' + selectedCity.val() + ', #Capital')
        } else {
            alert('Не выбран город')
        }
    })

    $('#htmlBtn').on('click', function () {
        if (file) {
            if ($('.imageDiv').children().length !== 0) return 0; //Проверка против двойного срабатывания кнопки
            file = '../html/' + selectedCity.val() + '.html';
            $('.imageDiv').load(file + ' figure'); //Подгрузка картинки
            $('#text2').load(file + ' .cityText'); //Подгрузка текста
        } else {
            alert('Не выбран город')
        }
    })

    $(document).on('ajaxStart', function () {
        console.log(file + ' Работа началась')
    })
    $(document).on('ajaxSend', function () {
        console.log(file + ' Отправлен запрос')
    })
    $(document).on('ajaxSuccess', function () {
        console.log(file + ' Отправленный запрос исполнен')
    })
    $(document).on('ajaxComplete', function () {
        console.log(file + ' Запрос завершён')
    })
    $(document).on('ajaxStop', function () {
        console.log(file + ' Нет активных запросов')
    })
    $(document).on('ajaxError', function () {
        console.log(file + ' Произошла ошибка')
    })
})