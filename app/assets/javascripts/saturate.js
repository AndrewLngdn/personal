var Saturate = {
    options: {
        boxCount: 10,
        degreeStep: 1.0,
        alternateBlack: true,
        filters: {
            saturate: 1,
            grayscale: 0
        },
        opacity: {
            one: 0.2,
            two: 0.2,
            three: 0.2,
            four: 0.2
        }
    },

    init: function(){
        Saturate.run();
    },

    addBoxes: function(number){
        for (var i = 0; i < number; i++){
            var html = "";
            html += "<div class='one'>";
            html +=  	"<div class='two'>";
            html += 		"<div class='three'>";
            html += 			"<div class='four'></div>";
            html += "</div></div></div>";

            $('body').append(html);
        }

    },
    run: function() {
        Saturate.addBoxes(10);

        setInterval(transformBoxes, 100);

        var degrees = 0;
        var j = 0;

        function transformBoxes(){
            var box1 = $(".one");
            var box2 = $(".two");
            var box3 = $(".three");
            var box4 = $(".four");
            var colorR, colorG, colorB;

            j++;

            for (var i = 0; i < box2.length; i++){
                degrees += Saturate.options.degreeStep;

                var degreeRotate = (i+1)*degrees/(5*Saturate.options.boxCount);

                if (Saturate.options.alternateBlack && i%2 == 0){
                    colorR = colorG = colorB = 0;
                } else {
                    colorR = 100;
                    colorG = 30;
                    colorB = Math.floor(degrees/2)%255;
                }

                var boxTransform = "-webkit-transform: rotate(" + degreeRotate + "deg);"
                var boxWidth = "width: " + Math.floor(600*(Math.sin((degrees))+1))%255 + "px; "
                var boxHeight = "height: " + Math.floor(600*(Math.sin((degrees))+1))%255 + "px; "
                var colorTransform = function(r, g, b, a) {
                    return "background-color: rgba(" + r + "," + g + "," + b + ", " + a + ");"
                }

                var opacityOne = Saturate.options.opacity.one;
                var opacityTwo = Saturate.options.opacity.two;
                var opacityThree = Saturate.options.opacity.three;
                var opacityFour = Saturate.options.opacity.four;

                box1[i].setAttribute("style", boxTransform + colorTransform(colorR, colorG, colorB, opacityOne));
                box2[i].setAttribute("style", boxTransform + colorTransform(0, 0, 0, opacityTwo));
                box3[i].setAttribute("style", boxTransform + colorTransform(colorR, colorG, colorB, opacityThree));
                box4[i].setAttribute("style", boxTransform + colorTransform(0, 0, 0, opacityFour));
            }
        }


        var calculateAmount = function(filter, direction){
            var amount = Saturate.options.filters[filter];
            if (filter == "grayscale"){
                increment = 0.2;
            } else if (filter == "saturate"){
                increment = 1;
            }

            if (direction == "+"){
                amount += increment;
            } else if (direction == "-") {
                amount = Math.max(amount-increment, 0);
            }

            if (filter == "grayscale"){
                amount = Math.min(amount,1);
            }

            Saturate.options.filters[filter] = amount;

            return amount;
        }

        var updateFilter = function(filter, target){
            var direction = $(target).text()
            var amount = calculateAmount(filter, direction);

            $('body').addClass('body-' + filter);
            $('.body-' + filter).css("-webkit-filter", filter + "(" + amount + ")");
            $('.' + filter + '-amount').text(amount.toFixed(2));
        }

        $('.saturate').click(function(e){
            updateFilter('saturate', e.target);
        });

        $('.grayscale').click(function(e){
            updateFilter('grayscale', e.target);
        });

        $('.layer-one, .layer-two, .layer-three, .layer-four').addClass('selected');

        $('.layer-one, .layer-two, .layer-three, .layer-four').click(function(e){
            var $this = $(this);
            var layer = $(this).attr('data-layer');

            $this.toggleClass('selected');
            if ($this.hasClass('selected')){
                Saturate.options.opacity[layer] = 0.8;

            } else {
                Saturate.options.opacity[layer] = 0.0;
            }
        });

        $('.speed').slider({
            value: Saturate.degreeStep,
            step: 0.01,
            max: 10,
            min: -10,
            slide: function(event, ui){
                Saturate.options.degreeStep = ui.value;
            }
        });


    }
};

