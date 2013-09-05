var staticPages = {
    tracks: {
        activate: "/tracks/72671937",
        night_visions:"/tracks/52567975",
        misplaced2: "/tracks/70002188",
        roadtrip: "/tracks/7459051",
        chimera: "/tracks/1072355",
        summit: "/tracks/4130941",
        thought_check: "/tracks/71379272"
    },

    currentSound: undefined,

    init: function(){
        $('.dropdown-bar').click(function(){
            $(this).children('.triangle').toggleClass("rotate-n90");
            $(this).children('.to-drop').toggleClass("height-0");
        });

        SC.initialize({
            client_id: 'de925f065dafa57b3847a539ad7e84b6'
        });
    },
    playTrack: function(track){
        SC.stream(track, function(sound){
            if (currentSound !== undefined) {
                sound.stop();
            }
            staticPages.currentSound = sound;
            sound.play();
        });
    },
    getArtworkUrl: function(track){
        SC.get(track, function(trackObject){
            return trackObject["artwork_url"];
        });
    }
}