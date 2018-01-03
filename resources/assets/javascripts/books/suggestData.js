$('#fillSuggestData').on('click', function (e) {
    suggestTitleBooks();
});

$(document).on('click', '.suggestedTitle', function (e) {
    suggestDataBooks();
});

$(function () {
    $('.btn-reset').click(function () {
        $('.pre-img').remove();
    })
});

function suggestDataBooks() {
    $.ajax({
        url: API_PATH + 'search-books-detail/' + $('.suggestedTitle option:selected' ).val(),
        contentType: 'application/json',
        dataType: 'json',
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
        type: 'GET',
    }).done(function (response) {
        if (response.item) {
            if (typeof response.item.volumeInfo.title != 'undefined') {
                $('#title').val(response.item.volumeInfo.title);
            }

            if (typeof response.item.volumeInfo.authors != 'undefined') {
                $('#author').val(response.item.volumeInfo.authors);
            }

            if (typeof response.item.volumeInfo.publishedDate != 'undefined') {
                $('#publish_date').val(response.item.volumeInfo.publishedDate);
            }

            if (typeof response.item.volumeInfo.description != 'undefined') {
                $('#description').val(response.item.volumeInfo.description);
            }

            showNotify('success', 'Suggest data filled', {icon: 'glyphicon glyphicon-ok'}, {delay: 3000});
        } else {
            showNotify('danger', 'Don \'t have suggest data books', {icon: 'glyphicon glyphicon-remove'}, {delay: 3000});
        }
    }).fail(function (error) {
        showNotify('danger', 'Don \'t have suggest data books', {icon: 'glyphicon glyphicon-remove'}, {delay: 3000});
    });
}

function suggestTitleBooks() {
    $('#data-suggest-book').empty();
    $.ajax({
        url: API_PATH + 'search-books?q=' + $('#title').val(),
        contentType: 'application/json',
        dataType: 'json',
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
        type: 'GET',
    }).done(function (response) {
        var htmlModel;

        if (response.items.length) {
            htmlModel = "<div data-toggle='modal' data-target='#myModal'></div>";
            htmlModel += "<div id='myModal' class='modal fade' role='dialog'>";
            htmlModel += "<div class='modal-dialog'>";
            htmlModel += "<div class='modal-content'>";
            htmlModel += "<div class='modal-header'>";
            htmlModel += "<button type='button' class='close' data-dismiss='modal'>&times;</button>";
            htmlModel += "<h4 class='modal-title'>Please choose a book</h4></div>";
            htmlModel += "<div class='modal-body'>";
            htmlModel += "<select class='form-control suggestedTitle'>";
            response.items.forEach(function (book) {
                htmlModel += "<option value='" + book.id + "'>" + book.volumeInfo.title.substring(0, 100) + '</option>';
            });
            htmlModel += "</select></div>";
            htmlModel += "<div class='modal-footer'>";
            htmlModel += "<button type='button' class='btn btn-default' data-dismiss='modal'>Close</button>";
            htmlModel += "</div></div></div></div>";
            $('#modelSpace').html(htmlModel);
            $('#myModal').modal('toggle');
        } else {
            showNotify('danger', 'Don \'t have suggest data books', {icon: 'glyphicon glyphicon-remove'}, {delay: 3000});
        }
    }).fail(function (error) {
        showNotify('danger', 'Don \'t have suggest data books', {icon: 'glyphicon glyphicon-remove'}, {delay: 3000});
    });
}

$('.title-book').on('keyup', function (e) {
    delay(function(){
        e.preventDefault();
        suggestDataBooksInternal();
    }, 500);
});

var delay = (function() {
    var timer = 0;
    return function(callback, ms) {
        clearTimeout (timer);
        timer = setTimeout(callback, ms);
    };
})();

function suggestDataBooksInternal() {
    if ($('.title-book').val() == "") {
        $('#data-suggest-book').empty();
    } else {
        $.ajax({
            url: API_PATH + 'search',
            contentType: 'application/json',
            dataType: 'json',
            headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
            type: 'POST',
            data: JSON.stringify({
                search: {
                    keyword: $('.title-book').val(),
                    field: 'title'
                }
            }),
        }).done(function (response) {
            $('#data-suggest-book').empty();

            if (response.items.total) {
                $('.form-group-custom').addClass('m-bottom0');
                response.items.data.forEach(function (book) {
                    $('#data-suggest-book').append("<li data-id=" + book.id + "><a href='javascript:void(0)' onclick='return fillDataBookInternal(" + book.id + ");'>" + book.title + '</a></li>');
                });
            } else {
                $('.form-group-custom').removeClass('m-bottom0');
            }
        }).fail(function (error) {
            $('#data-suggest-book').empty();
        });
    }
}

Date.prototype.formattedDate = function (pattern) {
    formattedDate = pattern.replace('yyyy', this.getFullYear().toString());

    var mm = (this.getMonth() + 1).toString();
    mm = mm.length > 1 ? mm : '0' + mm;
    formattedDate = formattedDate.replace('mm', mm);

    var dd = this.getDate().toString();
    dd = dd.length > 1 ? dd : '0' + dd;
    formattedDate = formattedDate.replace('dd', dd);

    return formattedDate;
};

function fillDataBookInternal(bookId) {
    $('#data-suggest-book').empty();
    $.ajax({
        url: API_PATH + 'books/' + bookId,
        contentType: 'application/json',
        dataType: 'json',
        headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
        type: 'GET',
    }).done(function (response) {
        if (response.item) {
            if (typeof response.item.title != 'undefined') {
                $('#title').val(response.item.title);
            }

            if (typeof response.item.author != 'undefined') {
                $('#author').val(response.item.author);
            }

            if (typeof response.item.publish_date != 'undefined') {
                $('#publish_date').val(new Date(response.item.publish_date).formattedDate('yyyy-mm-dd'));
            }

            if (typeof response.item.description != 'undefined') {
                $('#description').val(response.item.description);
            }

            showNotify('success', 'Suggest internal data filled', {icon: 'glyphicon glyphicon-ok'}, {delay: 3000});
        } else {
            showNotify('danger', 'Don \'t have suggest internal data books', {icon: 'glyphicon glyphicon-remove'}, {delay: 3000});
        }
    }).fail(function (error) {
        showNotify('danger', 'Don \'t have suggest internal data books', {icon: 'glyphicon glyphicon-remove'}, {delay: 3000});
    });
}
