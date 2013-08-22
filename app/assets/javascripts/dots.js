var Dots = {
    count: 0,
    dotHeight:0,
    dotWidth:0,
    interval: 100,
    init: function(){
        var count = 0;
        var height = window.innerHeight;
        var width = window.innerWidth;
        var limit = width*height/(65*65);
        var interval = 100;
        var append = setInterval(function(){
            $('.container').append('<div class="dot"></div>');
            count++;
            if (count > limit){
                clearInterval(append);
            }
        }, interval);
    }
}