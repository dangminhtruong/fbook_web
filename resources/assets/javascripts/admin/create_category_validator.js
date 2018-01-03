$('#create-category').validate({
    rules: {
        name: {
            required: true,
            minlength: 3
        }
    },
    messages: {
        name: {
            required: 'Name field is required',
            minLength: 'Name must have more than 2 characters'
        }
    }
});
