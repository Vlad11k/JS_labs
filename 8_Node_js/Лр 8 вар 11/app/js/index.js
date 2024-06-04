$(document).ready(function () {
    

    $('#submitBtn').click(function () {
        $.ajax({
            url: "/",
            method: "POST",
            data: { text: $('#surnames').val() },
            success: () => {
                console.log("Данные успешно отправлены");
            },
            error: () => {
                console.log("Произошла ошибка");
            },
        })
    })
    $("#default").click(() => {
        $.ajax({
            url: '/default',
            method: 'POST',
            success: (data) => {
                $("#defaultOl").text('');
                $.each(data, function (index, value) {
                    $("#defaultOl").append(`<li>${value}</li>`);
                });
                console.log("Показан первоначальный массив");
            },
            error: () => {
                console.log("Произошла ошибка");
            },
        });
    });
    $("#format").click(() => {
        $.ajax({
            url: "/format",
            method: 'POST',
            success: (data) => {
                $('#formatOl').text('');
                $.each(data, function (index, value) {
                    $('#formatOl').append(`<li>${value}</li>`);
                });
                console.log("Показан отредактированный массив");
            },
            error: () => {
                console.log("Произошла ошибка");
            },
        });
    });
});