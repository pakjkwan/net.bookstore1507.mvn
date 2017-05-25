$(document).ready( function() { 
	$('#btnLogin').click(function(){
		$.ajax('../../ajax/auth/login.do', {
			type: 'POST',
			dataType: 'json',
			data: {
				email: $('#email').val(),
				password: $('#password').val(),
				saveEmail: 'true'
			},
			success: function(data) {
				if (data.status == 'success') {
					location.href = '../index.html';
				} else {
					window.alert('사용자 아이디 또는 암호가 일치하지 않습니다!');
				}
			},
			error: function(xhr, status, message) {
				window.alert('요청 실패입니다.');
				console.log(message);
			}
		});
	});
} );
	

