var Dots = {
    init: function(){
        var count = 0;
        var height = window.innerHeight;
        var width = window.innerWidth;
        var limit = width*height/(65*65);
        var interval = 100;
        var a = setInterval(function(){
            $('.container').append('<div class="dot"></div>');
            count++;
            if (count > limit){
                clearInterval(a);
            }
        }, interval);
    }
}