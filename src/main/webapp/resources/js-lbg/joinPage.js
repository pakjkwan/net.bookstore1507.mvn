var joinMem = {};

joinMem.init = function(){
	
	$(document).ready(function(){ 
		
		$('input#memberId').keyup(function(e){
			console.log($('input#memberId').val());
			console.log($('a#checkMsg').text());
			if($('input#memberId').val().length<1){
				$('a#checkMsg').text('');
			}else{
				$.ajax('ajax/member/checkDuplId.do',{
					type : 'POST',
					dataType : 'json',
					data : {
						memberId : $('input#memberId').val()
					},
					success : function(data){
						console.log(data);
						
						if(data.duplication) {
							$('.confirmId').remove();
							$('#joinMemberId').append( $('<a>', {text : '중복된 아이디입니다', href : '#'}).css('color','red').addClass('confirmId') );
							
						} else {
							$('.confirmId').remove();
							$('#joinMemberId').append( $('<a>', {text : '사용가능한 아이디입니다', href : '#'}).css('color','blue').addClass('confirmId') );
						}
					},
					error : function(xhr, status, message){
						console.log(message);
						alert('아이디 중복체크 실패입니다.');
					}
				});
			};
			
		});
	});
	
	
	$('.joinMemberBtn').hover(function() {
		$(this).addClass('reverse');
	}, function() {
		$(this).removeClass('reverse');
	});
	
	$('#zipCodeLooking').click(function() {
		search_post();
	});
	
	$('#content').on('click', '#joinBtn', function(event){
		
		if($('#memberId').val()==''){
			alert('아이디는 필수입력 사항입니다');
			$('#memberId').focus();
			
		} else if($('#memberPwd').val()==''){
			alert('비밀번호는 필수입력 사항입니다');
			$('#memberPwd').focus();
			
		} else if($('#memberPwd').val()!=$('#confirmPwd').val()){
			
			$('.equalPwd').remove();
			$('#joinMemberPassword').append( $('<a>', {text : '비밀번호가 일치하지 않습니다', href : '#'}).css('color','red').addClass('equalPwd') );
			
			$('#memberPwd').val('');
			$('#confirmPwd').val('');
			$('#memberPwd').focus();
			
			
		} else if($('#name').val()==''){
			alert('이름은 필수입력 사항입니다');
			$('#memberId').focus();
			
			
		} else {
			
			var postFront = $('#joinMemberZipCode1').val().slice(0,3);
			var postBack = $('#joinMemberZipCode1').val().slice(4);
			
			$.ajax('ajax/member/add.do',{
				type : 'POST',
				dataType: 'json',
				data:{
					id:$('#memberId').val(),
					password:$('#memberPwd').val(),
					name:$('#name').val(),
					email:$('#email').val(),
					phoNo:$('#phoNo').val(),
					zipCode:postFront + postBack,
					addr1:$('#addr1').val(),
					addr2:$('#addr2').val()
					
				},
				success:function(data){
					if(data.status='success') {
					console.log(data);
					window.alert("가입이 완료되었습니다.");
					$('#content').load('pages/main/mainContents.html');
					}
				},
				
				error:function(xhr, status, message){
					alert('회원가입 실패입니다');
		    	}
			});
		}
		
		event.stopImmediatePropagation();
	});
};

function search_post() {
	window.open("pages/member/jp2.html", "search_open", "top=0, left=0, width=520px, height=240, resizable=1, scrollbars=no");
}