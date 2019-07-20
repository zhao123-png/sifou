(function() {
    ajax({
        url: "footer.html",
        type: "get"
    }).then(function(result) {
        var getFooter = document.getElementById("footer_container");
        getFooter.innerHTML = result;
    });
})();