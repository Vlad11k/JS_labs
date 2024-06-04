$(document).ready(function () {
    $('#res').click(function () {
        $.ajax({
            url: 'http://localhost:3000/doc',

            success: function (data, status) {
                $('#data').text(data)
            }
        })
    })
})