var i = 1;
var uploadImageCount = 1;

$('.add-more-image').on('click', function (e) {
    key = parseInt($(this).attr('key'));
    next = i + 1;
    $('#btn-minus' + key).removeClass('hidden');
    var cloneUpload = $('#row-image' + key).clone(true, true).attr('id', 'row-image' + next);
    cloneUpload.find('#btn-plus' + key).attr('id', 'btn-plus' + next).attr('key', next).removeClass('hidden');
    cloneUpload.find('#btn-minus' + key).attr('id', 'btn-minus' + next).attr('key', next).removeClass('hidden');
    cloneUpload.find('#image' + key).attr('id', 'image' + next).attr('key', next).val('');
    cloneUpload.find('#pre-img' + key).attr('id', 'pre-img' + next).addClass('hidden').attr('src', '');
    $("#append-aria").before(cloneUpload);
    $(this).addClass('hidden');
    i++;
    uploadImageCount++;
});

$('.clear-image').on('click', function (e) {
    key = parseInt($(this).attr('key'));
    nextKey = $('#row-image' + key).next().find('.add-more-image').attr('key');
    if (uploadImageCount > 1) {
        if(typeof(nextKey) == 'undefined') {
            $('#row-image' + key).prev().find('.add-more-image').removeClass('hidden');
        }
        $('#row-image' + key).remove();
        uploadImageCount--;
        if (uploadImageCount == 1) {
            if ($('.upload-image').find('input').val() == '') {
                $('.upload-image').find('.clear-image').addClass('hidden');
            }
        }
    } else {
        $('.upload-image').find('input').val('');
        $('.upload-image').find('.pre-img').addClass('hidden').attr('src', '');
        $('.upload-image').find('.clear-image').addClass('hidden');
    }
});

for (k = 1; k <= i; k++) {
    $('#image' + k).on('change', function () {
        var reader = new FileReader();
        var key = $(this).attr('key');
        reader.onload = function (e) {
            document.getElementById('pre-img' + key).src = e.target.result;
            $('#pre-img' + key).removeClass('hidden');
        };
        reader.readAsDataURL(this.files[0]);
        if (uploadImageCount == 1) {
            $('#btn-minus' + key).removeClass('hidden')
        }
    });
}
