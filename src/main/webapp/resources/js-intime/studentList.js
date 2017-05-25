var student = {};
var pathArray = {};
var lList = new Array();
//var lectureNo;
lectureNo;

student.init = function() {
	$('div[role=dialog]').remove();
	// 강좌번호가 주소와 함께 넘어감. ex)http://localhost:9999/intime_server/inTime/index.html#5
	var lecturePath = window.location.href;
	// 주소를 배열로 만들어 강좌번호만 뽑아냄.
	console.log(lecturePath);
	pathArray=lecturePath.split('#');
	lectureNo = pathArray[1];
	console.log(lectureNo);
	
	// 강좌에 대한 강사정보, 강좌이름, 학생리스트를 뽑아낸다.
	student.studentList(lectureNo);

	$(document).ready(function(event){
		$('#addStudentDialog').dialog({
			autoOpen : false,
			dialogClass: "no-close",
			modal: true
		});
		$('#addStudentDialog').siblings('div.ui-dialog-titlebar').remove();
		$(function(){
			//'등록'버튼 눌렀을때 팝업이 뜸
			$("#studentRegistButton").click(function(){
				$('input#studentEmail').val("");
				$("#addStudentDialog").dialog("open");
			});
			//'등록'팝업이 떴을때 닫기 이벤트
			$("#btnCloseStudent").click(function(){
				$('#addStudentDialog').dialog("close");
			});
			// '등록'팝업에서 'regist'버튼 눌렀을때 해당 강좌(주소와 함께 넘어와서 뽑아낸 강좌번호)에 등록.
			$("#btnAddStudent").click(function(){
				if($('input#studentEmail').val()==''){
					window.alert("등록할 학생을 입력하세요.");
				}else{
					student.studentRegist(lectureNo);
				}		
			});
			// '삭제'버튼 눌렀을때 학생 삭제되는 이벤트 *현재는 console에 해당 학생의 email이 출력됨. remove하면 됨.
			$(document).on("click","#deleteStudentButton",function(e){
				e.stopImmediatePropagation();
				student.deleteStudent();
			});
		});
	});
};
//학생 등록 function
student.studentRegist = function(lectureNo){
	$.ajax('../ajax/a_registStudent.do',{
		type : 'POST',
		dataType : 'json',
		data : {
			s_email : $('input#studentEmail').val(), // 등록팝업의 input에 입력한 학생의 email값
			l_no : lectureNo // 강좌번호
		},
		success : function(){
			student.studentList(lectureNo); // 강좌번호에 대한 리스트를 출력한다. 새로등록된 학생도 포함해서...*눈깜짝할때 나옴 ㅋ
			$('#addStudentDialog').dialog("close");
		},
		error : function(xhr,status,message) { // 그냥 에러처리..
			window.alert('학생 등록 실패입니다.');
			console.log(error);
		}
	});
};
//학생리스트에서 학생삭제할때
student.deleteStudent = function(){
	console.log($(":checkbox[name='lecturerClass']:checked").val());
	// 해당강좌 row에서 checkbox버튼의 value값, 해당 강좌의 번호가 val값으로 들어가 있어서 해당번호의 강좌삭제
	var checkLength = $(':checkbox[name=lecturerClass]:checked').length;
	$(":checkbox:checked").each(function(index){
		lList[index]=$(this).val();
	});
	var checkedTeacherList = lList.join('#');
	if(checkLength == 0){
		window.alert("선택된 학생이 없습니다.");
	}else{
		// 확인 alert을 한번띄워줌.
		var confirm = window.confirm("삭제하시겠습니까?");
		if(confirm){
			$.ajax('../ajax/a_removeStudent.do',{
				type : 'POST',
				dataType : 'json',
				data : {
					l_no : lectureNo,
					checkedTeacherList : checkedTeacherList
				},
				success : function(){
					student.clearList();
					student.studentList(lectureNo);
				},
				error : function(xhr,status,message) {
					window.alert('학생 삭제 실패입니다.');
					console.log(error);
				}
			});
		}

	}
};
//학생등록 팝업에서 input태그 비우기
student.RegistInputClear = function(){
	$('#studentEmail').val("");
};
//학생 리스트출력, lectureNo는 주소와 함께 넘어온 값
student.studentList = function(lectureNo) {
	
	console.log("xxxxxxxxxxxxxxxxxx  "+lectureNo);
	$.ajax('../ajax/a_studentList.do',{
		type : 'POST',
		dataTyep : 'json',
		data : {
			l_no : lectureNo // 해당 강좌에 대한 필요한 정보들을 뽑아내기 위해 data로 lectureNo를 넘겨줌.
		},
		success : function(data){
			console.log(data);
			var tdTable = $('#list_table_student'); // table에 붙임.
			
			if(data.stuList.length == 0){
				student.clearList();
				$('table#list_table_student').append(
						$('<tr>').attr("id","no_List").append($("<td>",{colspan : 5}).text("등록된 학생이 없습니다.")));
			}else{
				$('#no_List').remove();
				student.clearList();
				
			for(var i in data.stuList) { //stuList : 해당 강좌를 듣는 학생 목록
				$('<tr>').addClass("student_row")
				.append($('<td>')	
						.append($('<input>', { type: 'checkbox', name: 'lecturerClass' , value: data.stuList[i].s_email  })))
						// 나중에 삭제를 위해서 checkbox 에 value값으로 PK인 ST_EMAIL
						.append($('<td>').text(data.stuList[i].s_name))
						.append($('<td>').text(data.stuList[i].s_ph))
						.append($('<td>').text(data.stuList[i].s_email))
						.append($('<td>').text(data.stuList[i].s_addr))
						.appendTo(tdTable);

			}
			}
			// 강좌이름, 강사에 대한 정보.
			console.log("여기찍어본다.");
			student.tTableClear();
			console.log("우와왕아");
			$('div#lecturerPicture').append($('<img>)', {
				src: "http://localhost:9999/intime_server/picture/" + data.lecList.t_picture
			}));
			$('td#detailClassName').text(data.lecInfo.l_name); // lecInfo는 강좌정보
			$('td#detailName').text(data.lecList.t_name); // lecList는 강사에 대한 정보
			$('td#detailTel').text(data.lecList.t_ph ? data.lecList.t_ph : "[전화번호 미등록]");
			$('td#detailEmail').text(data.lecList.t_email);
			$('td#detailAddr').text(data.lecList.t_addr ? data.lecList.t_addr : "[주소 미등록]");
			
		},
		error : function(xhr,status,message) {
			window.alert('학생 리스트 출력 실패입니다.');
			console.log(error);
		}
	});
};
student.tTableClear = function(){ // 강사정보 뽑을때 한번 삭제하고 출력
	$("table#tblList td[id]").empty();
	$("div#lecturerPicture").empty();
};
student.clearList = function(){ // 학생정보 뽑을때 한번 삭제하고 출력
	$('tr#no_List').remove();
	$(".student_row").remove();
};