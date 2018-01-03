$(document).ready(function() {
    $('.btn-follow').on('click', function (e) {
        e.preventDefault();
        var userId = $('.hide-userId').data('user-id');
        var isFollow = $('.hide-userId').attr('follow');
        var userName = $('.hide-userId').attr('user-name');
        if (isFollow == 'unfollow') {
            var title = "Are you sure Follow \""  + userName + "\" ?";
        } else {
            var title = "Are you sure Unfollow \"" + userName + "\" ?";
        }
        swal({
            title: title,
            type: "info",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes",
            closeOnConfirm: true
        },
        function() {
            if (typeof(access_token) === 'undefined') {
                showNotify('danger', 'Follow fail', {icon: 'glyphicon glyphicon-remove'}, {delay: 3000});

                return false;
            }

            $.ajax({
                url: API_PATH + 'users/follow',
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
                        user_id : userId
                    }
                }),
            }).done(function (response) {
                if (response.message.code == 200) {
                    if (isFollow == 'unfollow') {
                        showNotify('success', "Follow success", {icon: "glyphicon glyphicon-ok"}, {delay: 1000});
                        $('.btn-follow').removeClass('btn-success').addClass('btn-primary').text('Following');
                        $('.hide-userId').attr('follow', 'follow');
                    } else {
                        showNotify('success', "Unfollow success", {icon: "glyphicon glyphicon-ok"}, {delay: 1000});
                        $('.btn-follow').removeClass('btn-primary').addClass('btn-success').text('Follow');
                        $('.hide-userId').attr('follow', 'unfollow');
                    }
                } else {
                    showNotify('danger', "Follow fail", {icon: "glyphicon glyphicon-remove"}, {delay: 1000});
                }
            }).fail(function (error) {
                showNotify('danger', "Follow fail", {icon: "glyphicon glyphicon-remove"}, {delay: 1000});
            });
        });
    });

    $(function () {
        $(".show-more").slice(0, 8).show();
        $("#load-more-user").on('click', function (e) {
            e.preventDefault();
            $(".show-more:hidden").slice(0, 8).slideDown();
            if ($(".show-more:hidden").length == 0) {
                $("#load").fadeOut('slow');
            }
            $('.modal').animate({
                scrollTop: $(this).offset().top
            }, 1500);
        });
    });
});
