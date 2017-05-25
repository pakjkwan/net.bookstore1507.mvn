var loginForm = {};

loginForm.init=function(){
	
	$('#loginForm').on('keypress','#pwdBox',function(event){
		
		if (event.which == 13) {
			loginForm.login();
		}
	});
	
	$('#loginForm').on('click','#loginClick',function(event){
		loginForm.login();
	});
	
	this.joinFormPage();
	 
};

loginForm.login = function () {
	
	$.ajax({
		type : 'POST',
		dataType: 'json',
		url : 'ajax/auth/login.do',
		data: {
			
//			$(this).serializeArray(),
			id:$('#idBox').val(),  //보내주는 키값
			password:$('#pwdBox').val()  //보내주는 키값
//			saveId:'true'
		},

		success:function(data){
			
			indexGlobal.blindCategory();
			console.log(data);
			indexGlobal.userInfo();
			
			$('#pwdBox').val('');
			$('#content').load('pages/main/mainContents.html');
		},

		error:function(xhr, status, message){
			window.alert('요청 실패입니다.');
			console.log(message);
		} 
	});
	
};

loginForm.joinFormPage = function () {
	
	$('#joinMember').click(function (event) {
		
		$('#content').load('pages/member/joinPage.html');
		$.fancybox.close();
		event.stopPropagation();
	});
};
