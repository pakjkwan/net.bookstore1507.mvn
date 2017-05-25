var myInfo  = {};

var admin_tel;
var admin_email;
var admin_group;

myInfo.init = function(){
	$('div[role=dialog]').remove();
	
	$('input#btnInfoConfirm').attr("disabled",true).css("background","rgb(231, 231, 231)");
//	myInfo.buttonState('read');
	$.getJSON('../ajax/auth/detail2.do',function(data){
		var adminData = data.admin;
		$('#name').val(adminData.a_name);
		$('#id').val(adminData.a_id);
		$('#tel').val(adminData.a_ph);
		$('#email').val(adminData.a_email);
		$('#group').val(adminData.a_group);
		admin_tel = adminData.a_ph;
		admin_email = adminData.a_email;
		admin_group = adminData.a_group;
	});
	$(document).ready(function(){
		$("input#tel").keyup(function(e){
			console.log("keyup 이벤트 호출되었음.." + "input#tel 의 value는 " + $('input#tel').val() + "..이고 admin_tel의 값은 " + admin_tel +" 이다.");
			if($('input#tel').val() != admin_tel && $('input#tel').val() != ''){
				$('input#btnInfoConfirm').attr("disabled",false).css("background","#aaa");
			}else{
				$('input#btnInfoConfirm').attr("disabled",true).css("background","rgb(231, 231, 231)");
			}
		});
		$("input#email").keyup(function(e){
			if($('input#email').val() != admin_email && $('input#email').val() != ''){
				$('input#btnInfoConfirm').attr("disabled",false).css("background","#aaa");
			}else{
				$('input#btnInfoConfirm').attr("disabled",true).css("background","rgb(231, 231, 231)");
			}
		});
		$("input#group").keyup(function(e){
			if($('input#group').val() != admin_group && $('input#group').val() != ''){
				$('input#btnInfoConfirm').attr("disabled",false).css("background","#aaa");
			}else{
				$('input#btnInfoConfirm').attr("disabled",true).css("background","rgb(231, 231, 231)");
			}
		});
	});
};

$(document).on("click","input#tel", function(event){
	myInfo.update();
});
$(document).on("click","input#email", function(event){
	myInfo.update();
});
$(document).on("click","input#group", function(event){
	myInfo.update();
});
$(document).on("click","#btnInfoCancle", function(event){
	$('#content').load('account/account.html');
});
//계정 탈퇴 눌렀을때 
$(document).on("click","#btnDel", function(event){
	console.log($('input#id').val());
	var result = window.confirm('정말 탈퇴하시겠습니까?');
	if(result) {
		$.ajax('../ajax/auth/a_deleteAdmin.do', {
			type : 'POST',
			dataType : 'json',
			data : {
				a_id : $('input#id').val()
			},
			success : function(){
				location.href = "../../intime_server/inTime/index.html";
			},
			error : function(xhr, status, message){
				window.alert('계정 탈퇴 오류입니다.');
				console.log(message);
			}
		});
	}
});

$(document).on('click','#btnInfoConfirm',function(e) {
	$.ajax('../ajax/auth/update2.do', {
		type : 'POST',
		dataType : 'json',
		data : {
			a_ph : $("#tel").val(),
			a_email : $("#email").val(),
			a_group : $('#group').val()
		},
		success : function(){
			window.alert("정보가 수정되었습니다.");
			$('#content').load("../inTime/lecturer/myInfo/myInfo.html");
		},
		error : function(xhr, status, message){
			window.alert('변경 실패입니다.');
			console.log(message);
		}
	});
});

//수정 눌렀을때 이름 아이디만 readonly
myInfo.update = function(){
	$('input[id="tel"]').attr("readonly", false);
	$('input[id="email"]').attr("readonly", false);
	$('input[id="group"]').attr("readonly", false);
//	myInfo.buttonState('update');
};

myInfo.buttonState = function(state){
	if(state == 'update'){
		// 수정버튼 누르면 보이는 버튼	
		$('#btnDel').css("display",'none');
		$('#btnInfoConfirm').css("display",'');
		$('#btnInfoCancle').css("display",'');
	}else{
		// 내정보 눌렀을때 보이는 버튼 
		$('#btnDel').css("display",'');
		$('#btnInfoConfirm').css("display",'none');
		$('#btnInfoCancle').css("display",'none');
	}
};
