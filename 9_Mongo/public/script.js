$(document).ready(function () {
    $('#addBtn').click(function () {
        $(this).hide()
        $('main').append(`
            <form id='addForm' action='/addNew' method='post'>
                <table>
                    <tr>
                        <td><label for='name'>Название:</label></td>
                        <td><input id="name" name="name" required></td>
                    </tr>
                    <tr>
                        <td><label for='time'>Время проведения:</label></td>
                        <td><input type="time" id="time" name="time" required></td>
                    </tr>
                    <tr>
                        <td><label for='tutor'>Преподаватель:</label></td>
                        <td><input id="tutor" name="tutor" required></td>
                    </tr>
                    <tr>
                        <td><label for='room'>Аудитория:</label></td>
                        <td><input id="room" name="room" required></td>
                    </tr>
                    <tr>
                        <td colspan="2">
                            <button type='submit' id='add'>Добавить</button>
                            <button type='button' id='cancel'>Отмена</button>
                        </td>
                    </tr>
                </table>
            </form>
        `)

        $('#addForm').hide().fadeIn('fast')

        $('#cancel').click(function () {
            $('#addForm').fadeOut('fast')
            $('#addForm').remove()
            $('#addBtn').fadeIn('fast')
        })

    })

    $('#show').click(function () {
        $('#list').empty()
        let manager = $('#managerName').val()
        $(`#employees td:contains(${manager})`).parent().each(function (i) {
            let name = $(this).find('td:nth-child(1)').text()
            $('#list').append(`<li>${name}</li>`)
        })
    })

    $('#swapBtn').click(function () {
        let rows = $('tr:nth-child(2), tr:nth-child(3)');
        $('#employees').append(rows);
    })
})