var loginForm = {};

loginForm.init = function(){
	$('div[role=dialog]').remove();
	this.changeButtonStatus('new');
	
//	$('#content').on("click","#btnLogin",function(event){
////	$(document).on("click","#btnLogin",function(event){
//		$.ajax('../ajax/auth/login2.do',{
//			type : 'POST',
//			dataType : 'json',
//			data : {
//				id : $('#id').val(),
//				password : $('#password').val(),
//				saveEmail : 'true'
//			},
//			success : function(data){
//				
//				window.alert("로그인 되었습니다.");
//				if(data.status=='success'){
//					if(data.j_status == 1){
//						console.log("로그인 성공했다!");
//						loginForm.changeButtonStatus('load');
//						$('#content').load('../inTime/account/account.html');
//					}else{
//						window.alert("승인요청중입니다...");
//					}
//
//				}else{
//					window.alert("You Wrong!!!");
//				}
//			},
//			error : function(xhr, status, message){
//				window.alert("Error..!!!");
//				console.log(message);
//			}
//		});
//		
//	});
};
//$('#content').on("click","#btnLogin",function(event){
$(document).on("click","#btnLogin",function(event){
	if($('#id').val() == ''){
		window.alert("아이디를 입력하세요.");
	}else if($('#password').val() == ''){
		window.alert("비밀번호를 입력하세요.");
	}else{
		$.ajax('../ajax/auth/login2.do',{
			type : 'POST',
			dataType : 'json',
			data : {
				id : $('#id').val(),
				password : $('#password').val(),
				saveEmail : 'true'
			},
			success : function(data){
			
				if(data.loginStatus == "loginSuccess"){
					if(data.admin.j_status == 0){
						window.alert("승인대기중입니다...");
					}else{
						loginForm.changeButtonStatus('load');
						$('#content').load('../inTime/account/account.html');
					}
				}else if(data.loginStatus == "idFail"){
					window.alert("등록되지 않은 아이디입니다.");
				}else if(data.loginStatus == "pwFail"){
					window.alert("패스워드가 일치하지 않습니다.");
				}						
////				if(data.status=='success'){
//				if(data.j_status == 1){
////					window.alert("로그인 되었습니다.");
//					loginForm.changeButtonStatus('load');
//					$('#content').load('../inTime/account/account.html');
//				}else{
//					window.alert("승인요청중입니다...");
//				}
////				}else{
////				window.alert("You Wrong!!!");
////				}
			},
			error : function(xhr, status, message){
				window.alert("Error..!!!");
				console.log(message);
			}
		});
	}

});
//$(document).on("click","#btnLogin",function(event){
//	$.ajax('../ajax/auth/login2.do',{
//		type : 'POST',
//		dataType : 'json',
//		data : {
//			id : $('#id').val(),
//			password : $('#password').val(),
//			saveEmail : 'true'
//		},
//		success : function(data){
//			window.alert("도대체 몇번째냐!!!!");
//			if(data.status=='success'){
//				if(data.j_status == 1){
//					console.log("로그인 성공했다!");
//					loginForm.changeButtonStatus('load');
//					$('#content').load('../inTime/account/account.html');
//				}else{
//					window.alert("승인요청중입니다...");
//				}
//
//			}else{
//				window.alert("You Wrong!!!");
//			}
//		},
//		error : function(xhr, status, message){
//			window.alert("Error..!!!");
//			console.log(message);
//		}
//	});
//});
loginForm.changeButtonStatus = function(state) {
	if (state == 'load') {
		// 로그인 후 보이는 메뉴
		$('#login').css('display', 'none');
		$('#join').css('display', 'none');
		$('#lecturerList').css('display', '');
		$('#lecturerClass').css('display', '');
		$('#myInfo').css('display', '');
		$('#logOut').css('display', '');
	} else {
		// 로그인 전 보이는 메뉴
		$('#login').css('display', '');
		$('#join').css('display', '');
		$('#lecturerList').css('display', 'none');
		$('#lecturerClass').css('display', 'none');
		$('#myInfo').css('display', 'none');
		$('#logOut').css('display', 'none');
	}
};