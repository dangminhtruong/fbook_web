function showNotify(message, messageType, timer)
{
    $.toast({
        heading: 'Notification',
        text: message,
        position: 'top-right',
        loaderBg: '#ff6849',
        icon: messageType,
        hideAfter: timer
    });
}
