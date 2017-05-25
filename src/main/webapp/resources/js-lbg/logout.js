var logoutForm = {};

logoutForm.init=function() {
	
	this.logout();
	
};


logoutForm.logOut = function () {

	$( '#usermenu' ).on('click', '#dropMenuLogOut', function () {
		$.ajax({
			type : 'POST',
			dataType: 'json',
			url : 'ajax/auth/logout.do',
			data:{
				id:$('#username').html,  //보내주는 키값
			},
			
			success:function(data){
				
				if (data.status == 'fail') {
				
					/*	$( '#logIn_signUpForm' ).empty();
					$( '#logIn_signUpForm' ).css('display', 'none');
	
					$( '#state' ).empty();
	
					$( '#state' ).append( $( '<span>' ).attr('id','username').addClass('memberState')
									.append( $('<a>', 
									{
										text:data.member.id,
										href:'#'
									}).addClass('wide') ) );
					$( '#state' ).append( $( '<span>' ).attr('id','message')
									 .append( $('<a>', 
									 {
									 	href:'#',
									 	html: $( '<img>', {src: 'img/message03.jpg'})
									 }).addClass('wide') ) );
	
					console.log(data);
					*/
					
				
				} else {
					window.alert('로그아웃이 실패하셨습니다');
				}
			},

			error:function(xhr, status, message){
				window.alert('요청 실패입니다.');
				console.log(message);
			} 
		});
	});
};