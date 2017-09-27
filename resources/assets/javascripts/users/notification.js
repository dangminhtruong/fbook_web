$(document).ready(function() {
    $('.notification_onclick').on('click', function (e) {
        var notificationId = $(this).data('notification-id');
        $.ajax({
            url: API_PATH + 'notification/update/' + notificationId,
            contentType: 'application/json',
            dataType: 'json',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': access_token,
            },
            type: 'GET',
            data: {},
        }).done(function (response) {
            if (response.message.code == 200) {
            } else {
                showNotify('danger', "Data Invalid", {icon: "glyphicon glyphicon-remove"}, {delay: 1000});
            }
        }).fail(function (error) {
            showNotify('danger', "Data Invalid", {icon: "glyphicon glyphicon-remove"}, {delay: 1000});
        });
    });
});
