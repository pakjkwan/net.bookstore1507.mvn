// 로그인 눌렀을 때 로그인 폼 불러오기
//로그인에 아이디 준다(로그인 클릭 하면) 내용부분이(content라고 id줬음) loginForm.html 파일을 불러서 넣는다

paramL_no = '';//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

$(document).ready(function() {
	$('div[role=dialog]').remove();
	// content 부분에 account내용이 먼저 뜨게 하기 위해
	$('#content').load('account/account.html');
	
	$('#login').click(function(event){
//		event.stopImmediatePropagation();//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
		$('#content').load('login/loginForm.html');	
	});
	
	$('#join').click(function(){
		$('#content').load('join/joinForm.html');
	});
	
	$('#lecturerList').click(function(){
		$('#content').load('lecturer/lecturerList/lecturerList.html');
	});
	
	$('#lecturerClass').click(function(){
		$('#content').load('lecturer/lecturerClass/lecturerClass.html');
	});
	
	$('#myInfo').click(function(){
		$('#content').load('lecturer/myInfo/myInfo.html');
	});
	
	$('#logOut').click(function(){
		loginForm.changeButtonStatus('new');
		$('#content').load('account/account.html');
//		$(document).off("click",'#btnLogin');//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
	});
	
	$('#title').click(function(){
		$('#content').load('account/account.html');	
	});
	
});
	


