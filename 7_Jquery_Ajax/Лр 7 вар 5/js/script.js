let file;

$(function () {
    let submitBtn = $('#submitBtn');
    let infoBtn = $('#infoBtn');
    let disableBtn = $('#disableBtn');




    submitBtn.on('click', function () {
        let city = $('#citiesSelect').val()
        file = '../html/' + city + '.html'

        $.ajax({
            type: 'GET',
            url: file,
            success: function (data) {
                $('.informationDiv').load(file)

                $('#selectedCity').attr('value', $('#citiesSelect').val());
            },

            error:function () {

            }
        })
    })

    infoBtn.on('click', function () {
        if ($('.informationDiv').children().length > 0 && $('li').children().length < 1) {
            file = '../json/' + $('#citiesSelect').val() + '.json';
            $.getJSON(file, function (data) {
                $('#country').append('<span style="color: #ff0000;">' + data.country + '</span>');
                $('#population').append('<span style="color: #ff0000;">' + data.population + '</span>')
                $('#nationality').append('<span style="color: #ff0000;">' + data.nationality.join(', ') + '</span>')
            })
        } else {
            console.log('Не выбран город')
        }
    })

    disableBtn.on('click', function () {
        if (submitBtn.is(':disabled') && infoBtn.is(':disabled')) {
            submitBtn.attr('disabled', false)
            infoBtn.attr('disabled', false)
        } else {
            submitBtn.attr('disabled', true)
            infoBtn.attr('disabled', true)
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