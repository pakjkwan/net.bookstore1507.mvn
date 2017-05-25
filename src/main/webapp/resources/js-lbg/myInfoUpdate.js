var myInfoUpdate = {};

myInfoUpdate.init = function(){
	
	$('.updateInformBtn').hover(function() {
		$(this).addClass('reverse');
	}, function() {
		$(this).removeClass('reverse');
	});

	$('#zipCodeLooking').click(function() {
		search_post();
	});
	
	$.getJSON('ajax/member/detail.do',
		function(data){
		
			var postFront = data.member.zipCode.slice(0,3);
			var postBack = data.member.zipCode.slice(3);
			
			var phoneNum11,
				phoneNum12,
				phoneNum13,
				phoneNum = null;
		
			if(data.member.phoNo.length == 11) {
				phoneNum1 = (data.member.phoNo).slice(0,3);
				phoneNum2 = (data.member.phoNo).slice(3,7);
				phoneNum3 = (data.member.phoNo).slice(7);
			} else {
				phoneNum1 = (data.member.phoNo).slice(0,3);
				phoneNum2 = (data.member.phoNo).slice(3,6);
				phoneNum3 = (data.member.phoNo).slice(6);
			}
			
			phoneNum = phoneNum1 + '-' + phoneNum2 + '-' + phoneNum3;
			
			$('#updateFormId').attr('value',data.member.id);
			$('#updateFormPwd').attr('value');
			$('#updateFormConfirmPwd').attr('value');
			$('#updateFormName').attr('value',data.member.name);
			$('#updateFormEmail').attr('value',data.member.email);
			$('#updateFormPhoNo').attr('value',phoneNum);
			$('#joinMemberZipCode1').attr('value',postFront + '-' + postBack);
			$('#addr1').attr('value',data.member.addr1);
			$('#updateFormAddr2').attr('value',data.member.addr2);
		}
	);
	
	$('#content').on('click','#updateBtn',function(event){
		
		console.log($('#updateFormPwd').val());
		console.log($('#updateFormEmail').val());
		console.log($('#updateFormPhoNo').val());
		console.log($('#joinMemberZipCode1').val());
		console.log($('#addr1').val());
		console.log($('#updateFormAddr2').val());
		
		var phoneNum11,
			phoneNum12,
			phoneNum13,
			phoneNum = null;
	
		if($('#updateFormPhoNo').val() == 13) {
			phoneNum1 = ($('#updateFormPhoNo').val()).slice(0,3);
			phoneNum2 = ($('#updateFormPhoNo').val()).slice(4,8);
			phoneNum3 = ($('#updateFormPhoNo').val()).slice(9);
		} else {
			phoneNum1 = ($('#updateFormPhoNo').val()).slice(0,3);
			phoneNum2 = ($('#updateFormPhoNo').val()).slice(4,7);
			phoneNum3 = ($('#updateFormPhoNo').val()).slice(8);
		}
		
		phoneNum = phoneNum1 + phoneNum2 + phoneNum3;
		
		var postFront = $('#joinMemberZipCode1').val().slice(0,3);
		var postBack = $('#joinMemberZipCode1').val().slice(4);
		
		console.log(postFront);
		console.log(postBack);
		
		if($('#updateFormPwd').val()==''){
			
			alert('비밀번호를 입력해주세요.');
			
		}else if($('#updateFormPwd').val()!=$('#updateFormConfirmPwd').val()){
			
			alert('비밀번호가 일치하지 않습니다');
			
		}else {
			
			$.ajax('ajax/member/update.do',{
				type : 'POST',
				data : {
					password : $('#updateFormPwd').val(),
					email    : $('#updateFormEmail').val(),
					phoNo    : phoneNum,
					zipCode  : postFront + postBack,
					addr1    : $('#addr1').val(),
					addr2    : $('#updateFormAddr2').val()
				},
				dataType : 'json',
				success : function(data){
					if(data.status=='success'){
						//window.alert('개인 정보 변경 성공');
						$('#content').load('pages/myPage/myInformation.html');
						;
					}else{
						window.alert('개인 정보 변경  실패입니다');
					}
				},
				error : function(xhr,status,message){
					window.alert('요청실패');
					console.log(message);
				}
			});
		}
	});

};

function search_post() {
	window.open("pages/member/jp2.html", "search_open", "top=0, left=0, width=520px, height=240, resizable=1, scrollbars=no");
}
 