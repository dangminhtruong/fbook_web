var Paginate = {};

Paginate.book = function (config) {
    $('#pagination-book').twbsPagination({
        totalPages: config.totalPages,
        visiblePages: 7,
        startPage: config.currentPage,
        onPageClick: function (event, page) {
            var currentUrl = window.location.href;
            var newUrl = null;
            if (currentUrl.search(/&page=\d|\?page=\d+/i) !== -1) {
                newUrl = currentUrl.replace(/page=\d+/i, 'page='+ page);
            } else {
                if (currentUrl.search(/\?/i) !== -1) {
                    newUrl = currentUrl + '&page='+ page;
                } else {
                    newUrl = currentUrl + '/?page='+ page;
                }
            }

            if (page !== null && config.currentPage !== page) {
                window.location.href = newUrl;
            }
        }
    });
};
