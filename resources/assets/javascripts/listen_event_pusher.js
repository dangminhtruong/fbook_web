Pusher.logToConsole = true;
var pusher = new Pusher(configs.pusher.key, {
  cluster: configs.pusher.cluster,
  encrypted: configs.pusher.encrypted
});

var channel = pusher.subscribe('channel_notification');
channel.bind('App\\Events\\NotificationHandler', function(data) {
    $('#notification_' + data.user_id).html(parseInt($('#notification_' + data.user_id).html()) + 1);
    $('#notification_icon_' + data.user_id).html(parseInt($('#notification_icon_' + data.user_id).html())+1);
    if(data.user_id == $('#get-user-id').html())
    {
        showNotify('info', data.messages, {icon: "glyphicon glyphicon-ok"}, {delay: 5000});
    }
});
