var Saturate = {
    options: {
        boxCount: 10,
        degreeStep: 1.0,
        alternateBlack: true,
        filters: {
            saturate: 1
        },
        opacity: {
            one: 1,
            two: 1,
            three: 1,
            four: 1
        },
        palette: colorPalettes["Giant Goldfish"]
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
        var colorIndex = 0;

        function transformBoxes(){
            var box1 = $(".one");
            var box2 = $(".two");
            var box3 = $(".three");
            var box4 = $(".four");

            j++;

            for (var i = 0; i < box2.length; i++){
                degrees += Saturate.options.degreeStep;

                var degreeRotate = (i+1)*degrees/(5*Saturate.options.boxCount);

                var boxTransform = "-webkit-transform: rotate(" + degreeRotate + "deg);"

                var colorTransform = function() {
                    if (Saturate.options.alternateBlack && i%2 == 0)
                        return "background-color: rgba(0, 0, 0, 0.2);"

                    var index = Math.floor((degrees/720)%4);
                    var RGB= "#" + Saturate.options.palette[index];
                    var A='0.2';
                    var RGBA = 'background-color: rgba('+
                        parseInt(RGB.substring(1,3),16)+','+
                        parseInt(RGB.substring(3,5),16)+','+
                        parseInt(RGB.substring(5,7),16)+','+
                        A+');'
                    return RGBA;
                }

                var opacityOne = "opacity: " + Saturate.options.opacity.one + ";";
                var opacityTwo = "opacity: " + Saturate.options.opacity.two + ";";
                var opacityThree = "opacity: " + Saturate.options.opacity.three + ";";
                var opacityFour = "opacity: " + Saturate.options.opacity.four + ";";

                box1[i].setAttribute("style", boxTransform + colorTransform() + opacityOne );
                box2[i].setAttribute("style", boxTransform + colorTransform() + opacityTwo );
                box3[i].setAttribute("style", boxTransform + colorTransform() + opacityThree );
                box4[i].setAttribute("style", boxTransform + colorTransform() + opacityFour );
            }
        }


        var calculateAmount = function(filter, direction){
            var amount = Saturate.options.filters[filter];
            if (filter == "saturate"){
                increment = 1;
            }

            if (direction == "+"){
                amount += increment;
            } else if (direction == "-") {
                amount = Math.max(amount-increment, 0);
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


        $('.layer-one, .layer-two, .layer-three, .layer-four').addClass('selected');

        $('.layer-one, .layer-two, .layer-three, .layer-four').click(function(e){
            var $this = $(this);
            var layer = $(this).attr('data-layer');

            $this.toggleClass('selected');
            if ($this.hasClass('selected')){
                Saturate.options.opacity[layer] = 1;

            } else {
                Saturate.options.opacity[layer] = 0.0;
                console.log(Saturate.options.opacity[layer]);
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

        for (var key in colorPalettes){
            var div = $("<div class='palette'> <div class='key'>" + key + "</div></div>").appendTo(".palettes");
            for (var i in colorPalettes[key]){
                var color = "<div " +
                    "class='color' " +
                    "style='height:20px; width:20px;" +
                    "background-color: #" + colorPalettes[key][i] + ";" +
                    "display: inline-block" +
                    "'></div>";

                div.append(color);
            }
        }

        $('.color').click(function(event){
            var palette = $.trim($(this).parent($(".key")).text());
            console.log(palette);
            Saturate.options.palette = colorPalettes[palette];
        });

        $('.key').click(function(event){
            var palette = $(this).text();
            console.log(palette);
            Saturate.options.palette = colorPalettes[palette];
        })

    }
};

