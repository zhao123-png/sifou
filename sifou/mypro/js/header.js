(function() {
    ajax({
        url: "sf_header.html",
        type: "get"
    }).then(function(result) {
        var getHeader = document.getElementById("pubHeader");
        // var getHead = document.getElementsByTagName("head")[0];
        // getHead.appendChild(`
        // <link rel="stylesheet" href="css/sf_header.css">
        // <link rel="stylesheet" href="css/all.css">
        // <link rel="stylesheet" href="css/font-awesome.css">
        // <link rel="stylesheet" href="css/normalize_zh.css">
        // <link rel="stylesheet" href="css/bootstrap.css">
        // `);
        getHeader.innerHTML = result;
    });
})();