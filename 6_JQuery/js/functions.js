function first() {
    $('#spisok2 li:contains(A)').each(function () {
        $('ol #A').append("<li> " + $(this).text() + "</li>");
        $(this).remove();
    });
    $('#spisok2 li:contains(B)').each(function () {
        $('ol #B').append("<li> " + $(this).text() + "</li>");
        $(this).remove();
    });
    $('#spisok2 li:contains(C)').each(function () {
        $('ol #C').append("<li> " + $(this).text() + "</li>");
        $(this).remove();
    });
    $('.group1').wrap('<h1></h1>');
    $('.group2').wrap('<h2></h2>');
    $('.group3').wrap('<h3></h3>');
}

function second() {
    $('ol #C li:odd,ol #B li:odd,ol #A li:odd').each(function () {
        if ($(this).text().search('Good') > 0) {
            $(this).css({'color': '#ff00ae', 'font-size': '20px'});
        }
    });
}