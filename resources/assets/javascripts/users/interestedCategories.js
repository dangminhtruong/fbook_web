$(document).ready(function() {
    $('.btn-save').on('click', function(e) {
        e.preventDefault();
        var interestedCategoryIds = [];
        var categoryIds = $('.hide-categoryIds').data('categoryIds');
        if (typeof(access_token) === 'undefined') {
            showNotify('danger', 'Update interested categories fail', {icon: 'glyphicon glyphicon-remove'}, {delay: 3000});

            return false;
        }

        for (var i=0; i< categoryIds.length; i++) {
            if ($("#category" + i).is(":checked")) {
                interestedCategoryIds.push(i);
            }
        }

        $.ajax({
            url: API_PATH + 'users/add-tags',
            contentType: 'application/json',
            dataType: 'json',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': access_token,
            },
            type: 'POST',
            data: JSON.stringify({
                item: {
                    tags: interestedCategoryIds.toString()
                }
            }),
        }).done(function (response) {
            if (response.message.code == 200) {
                showNotify('success', "Update interested categories success", {icon: "glyphicon glyphicon-ok"}, {delay: 1000});
            } else {
                showNotify('danger', "Update interested categories fail", {icon: "glyphicon glyphicon-remove"}, {delay: 1000});
            }
        }).fail(function (error) {
            showNotify('danger', "Update interested categories fail", {icon: "glyphicon glyphicon-remove"}, {delay: 1000});
        });
    });
});
