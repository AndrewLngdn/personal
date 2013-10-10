var venmoButton = {
    init: function(){
        console.log("venmo");
        $('.generate-venmo-button').on("input change propertychange paste keyup",
            venmoButton.generate);
    },

    generate: function(e) {
        var  url = $(e.target).val();
        var parsed = parseUri(url);
        var keys = parsed.queryKey;

        if (parsed.host == undefined ||

            parsed.host.indexOf("venmo.com") === -1 ){
            $('.button-area').html("Invalid payment url.");

        } else if (keys.amount == undefined){

            $('.button-area').html("Enter a dollar amount in the payments url.");

        } else {

            var button = "<a class='venmo-button' href=" + url + " ></a>";
            var $button = $(button);
            var buttonHTML = "<div class='venmo-button-plus'>+</div>";
            buttonHTML += "	<div class='venmo-button-amount'>" + keys.amount + "</div> ";
            buttonHTML += "<div class='venmo-logo'></div>";
            $button.append(buttonHTML);
        }

        $('.button-area').html($button);
    }






}