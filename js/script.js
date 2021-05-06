$(document).ready(function(){

    function init(){
        $(".button").css('display','none')
    }

    function amountscrolled(){
        var winheight = $(window).height()
        var docheight = $(document).height()
        var scrollTop = $(window).scrollTop()
        var trackLength = docheight - winheight
        var pctScrolled = Math.floor(scrollTop/trackLength * 100) // gets percentage scrolled (ie: 80 NaN if tracklength == 0)
        //console.log(pctScrolled)
        if(pctScrolled >= 30){
            let x = pctScrolled/100
            $(".button").css('opacity',x)
            $(".button").css('display','block')
        }
        else{
            $(".button").css('display','none')
        }
    }

    init()

    $(window).on("scroll", function(){
        amountscrolled()
    })



});