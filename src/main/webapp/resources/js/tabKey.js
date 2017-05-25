/**
 * 탭키 만들기
 */
var tabKey = {
	tab : function() {
		$('.tabKey').children().eq().children('div')
		.css('display','inline-block');
		$('.tabKey li').mouseover(function() {
			$(this).removeClass('on');
			return false;
		});
		$('.tabKey li').click(function() {
			$('.tabKey li').removeClass('on1');
			$(this).addClass('on1');
		});
		$('.depth a').click(function() {
			$('.depth').children('div').hide();
			$(this).next('div').show();
		});
	}
}