var admin = {};

admin.init = function(){
	$('div[role=dialog]').remove();
	
	$("#btnJoin").click(function(e){
		if($('#name').val() == ''){
			alert("사용자 이름을 입력하세요.");
			$("input#name").focus();
		}else if($('#id').val()==''){
			alert("사용자 id를 입력하세요.");
			$("input#id").focus();
		}else if($("#pw").val()==''){
			alert("패스워드를 입력하세요.");
			$("input#pw").focus();
		}else if($("#pw2").val()=='' || $('#pw2').val() != $('#pw').val()){
			alert("패스워드가 다릅니다.확인해주세요.");
			$("input#pw2").focus();
		}else if($('#tel').val()==''){
			alert("전화번호를 입력하세요.");
			$("input#tel").focus();
		}else if($("#email").val()==''){
			alert("이메일을 입력하세요.");
			$("input#email").focus();
		}else if($("#group").val()==''){
			alert("소속기관을 입력하세요.");
			$("input#group").focus();
		}else if($("a#checkMsg").text() == "중복된 아이디입니다."){
			window.alert("아이디가 중복되었습니다.");
			$("input#id").focus();
		}else{
			$.ajax('../ajax/auth/register.do',{
				type : 'POST',
				data : {
					a_name : $('#name').val(),
					a_id : $('#id').val(),
					a_pw : $('#pw').val(),
					a_ph : $('#tel').val(),
					a_email : $('#email').val(),
					a_group : $('#group').val(),
					j_status : 0 //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
				},
				dataType : 'json',
				success : function(){
					window.alert("승인요청되었습니다.");
					location.href = "../../intime_server/inTime/index.html";
				},
				error : function(xhr, status, message){
					window.alert("회원가입 실패입니다.");
					console.log(message);
				}
			});
		}
	});
	$(document).ready(function(){
		$('input#id').keyup(function(e){
//			var tooltips = $("[titles]").tooltip();
			
			if($('input#id').val().length < 1){
				$("a#checkMsg").text('');
			}else{
			$.ajax('../ajax/auth/a_existId.do',{
				type : 'POST',
				dataType : 'json',
				data : {
					a_id : $("input#id").val()
				},
				success : function(data){
					
//					$("a#checkMsg").text(data.duplication ? "중복된 아이디입니다.":"사용가능한 아이디입니다.");
					if(data.duplication){
						$("a#checkMsg").text("중복된 아이디입니다.").css("color", "red");
					}else{
						$("a#checkMsg").text("사용가능한 아이디입니다.").css("color", "green");
					}

//					if(data.duplication){
//						console.log("아싸! 중복!");
//						$("input#id").attr("titles","중복된 아이디입니다.");
//						tooltips.tooltip("open");
//						
//					}else{
//						console.log("젠장! 가능!");
//						$("input#id").attr("titles","사용가능한 아이디입니다.");
//						tooltips.tooltip("open");
//					}
//					$("#sss").text(data.duplication == 'xx' ? "중복" : "가능");
				},
				error : function(xhr, status, message){
					window.alert("중복된 아이디입니다.");
					console.log(message);
				}
			});
			}
		});
	});
};

//$(document).ready(function() {
//
//	$("#xxx").validate({
//		rules: {
//			id:{
//				required: true,
//				minlength: 4,
//				remote: {type:"post", url:"../ajax/auth/a_existId.do"}
//				}					
//			company:{ required: true, bssn:true },
//			name: {required: true,  kor:true, minlength: 2 },
//			ssn:{ required: true, ssn:true },					
//			email: { required: true, email: true, minlength: 4 }
//		},
//
//		messages: {
//			id: {required: "아이디를 입력하시오",minlength: jQuery.format("{0}자 이상"),remote: "이미 등록된 아이디"}
//			
//			company: {required: "사업자번호를 입력하세요.",bssn:"사업자번호가 바르지 않습니다."},
//			name: {kor: "한글만 가능해요.", required: "이름을 입력하세요.", minlength: "한글 2글자 이상" },
//			ssn: {required: "주민번호를 입력",ssn:"형식이 바르지 않습니다."},
//			email: {required: "메일 입력", email:"형식이 바르지 않습니다.", minlength: "4자리 이상" }
//		},
//		success: function(label) {
//			label.html("&nbsp;").addClass("checked");
//		success: function() {
//			window.alert("우와 성공이다!");
//		}
//
//	});
//});