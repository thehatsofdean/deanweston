/*var lastScroll = 0;
$(window).scroll(function() {
     clearTimeout($.data(this, 'scrollTimer'));
    $(".top").animate({ top: '-10px' }, 60);
    $.data(this, 'scrollTimer', setTimeout(function() {
        $(".top").animate({ top: '2px' }, 20).animate({ top: '0' }, 20);// do something
        console.log("Haven't scrolled in 250ms!");
    }, 30)); 
	
	 
	 var st = $(this).scrollTop();
          //Determines up-or-down scrolling
          if (st > lastScroll){
             clearTimeout($.data(this, 'scrollTimer'));
    $(".top").animate({ top: '-10px' }, 60);
    $.data(this, 'scrollTimer', setTimeout(function() {
        $(".top").animate({ top: '2px' }, 20).animate({ top: '0' }, 20);// do something
        console.log("Haven't scrolled in 250ms!");
    }, 30));
          }
          
          //Updates scroll position
          lastScroll = st;
});*/
var year = new Date().getFullYear()
$(".js-year").html(year);
toggled = false;

$('.js-menuTrigger').click(function(){
    $('.js-menuTrigger').closest('.header').toggleClass('menu-active');
	$('.menu-icon').toggleClass('toggled');
});

var scroll_happened = false;
var che_at_top = $('.js-set-che').offset().top - 150;
var boris_at_top = $('.js-set-hardhat').offset().top - 150;
var skills_at_top = $('.js-skill-anim').offset().top - 150;

$window = $(window);

$window.scroll(function()
{
    scroll_happened = true;
});



setInterval(function()
{
    if(scroll_happened == true)
    {
        scroll_happened = false;
        if($window.scrollTop() >= che_at_top )
        {
            $('.logo > .hat').removeClass('stetson').addClass('che');
		}
		else
        {
            $('.logo > .hat').removeClass('che hard').addClass('stetson');
		}

		if($window.scrollTop() >= boris_at_top )
        {
            $('.logo > .hat').removeClass('che').addClass('hard');
		}
		else
        {
            $('.logo > .hat').removeClass('hard').addClass('stetson');
		}

		

		
		
		
		
		if($window.scrollTop() >= skills_at_top )
        {
			$('.skills-graph ul').children().eq(0).find('.top-hat__top').addClass('top-hat__top--grow-1');
			setTimeout(
				function() 
				{
					$('.skills-graph ul').children().eq(1).find('.top-hat__top').addClass('top-hat__top--grow-2');
				}, 75);
				setTimeout(
				function() 
				{
					$('.skills-graph ul').children().eq(2).find('.top-hat__top').addClass('top-hat__top--grow-3');
				}, 100);
				setTimeout(
				function() 
				{
					$('.skills-graph ul').children().eq(3).find('.top-hat__top').addClass('top-hat__top--grow-4');
				}, 115);
				setTimeout(
				function() 
				{
						$('.skills-graph ul').children().eq(4).find('.top-hat__top').addClass('top-hat__top--grow-5');
				}, 120);
				setTimeout(
				function() 
				{
						$('.skills-graph ul').children().eq(5).find('.top-hat__top').addClass('top-hat__top--grow-6');
				}, 122);
            
			
			
			
		
			
        } else {
			$('.skills-graph ul').children().eq(0).find('.top-hat__top').removeClass('top-hat__top--grow-1');
			$('.skills-graph ul').children().eq(1).find('.top-hat__top').removeClass('top-hat__top--grow-2');
			$('.skills-graph ul').children().eq(2).find('.top-hat__top').removeClass('top-hat__top--grow-3');
			$('.skills-graph ul').children().eq(3).find('.top-hat__top').removeClass('top-hat__top--grow-4');
			$('.skills-graph ul').children().eq(4).find('.top-hat__top').removeClass('top-hat__top--grow-5');
			$('.skills-graph ul').children().eq(5).find('.top-hat__top').removeClass('top-hat__top--grow-6');
		}
    }
} , 250);