var tchContent = {};
var thisTch;
var tch_List = new Array();
var lectureNo;
tchContent.init = function() {
	
	$('div[role=dialog]').remove();
	$('table#tchList').append(
			$('<tr>').attr("id","noClick").append($("<td>",{colspan : 9}).text("강사이름을 클릭해주세요.")));
	tchContent.studentList();
	$(document).on("click",".tchClasses",function(e){
		thisTch = $(this).attr('id');
		thisTName = $(this).text();
		tchContent.tchClassesView(thisTch);
	});
	$(document).on("click","a.loadDetail",function(e){
		$('#content').load('student/studentList.html');
	});
/*	$(document).ready(function(event){
		// '삭제'버튼 눌렀을때 학생 삭제되는 이벤트 *현재는 console에 해당 학생의 email이 출력됨. remove하면 됨.
		$(document).on("click","#deleteStudentButton",function(e){
			student.deleteStudent();
		});
	});*/
};

//강사 리스트출력, lectureNo는 주소와 함께 넘어온 값
tchContent.studentList = function() {
	$.getJSON('../ajax/auth/a_getTchList.do', function(data){ 
		// A_AdminControl 에 Mapping 되어있음.
		var tdTable = $('#tch_list_table');
		if(data.aTchList.length == 0){
			tchContent.clearList();
			$('table#tch_list_table').append(
					$('<tr>').attr("id","noLecturer").append($("<td>",{colspan : 9}).text("등록된 강사가 없습니다.먼저 강좌에 강사를 등록하세요.")));
		}else{
			$('#noLecturer').remove();
		tchContent.clearList();
		
		for(var i in data.aTchList){
			if( i != 0 && data.aTchList[i].t_email == data.aTchList[i-1].t_email){
				continue;
			}else{
				$('<tr>').addClass('.tch_row')
//				.append($('<td>').append($('<input>',{type:'checkbox', value : data.aTchList[i].t_email})))
				.append($('<td>').append($('<a>',{href:'#'}).text(data.aTchList[i].t_name).addClass("tchClasses").attr("id",data.aTchList[i].t_email)))
				.append($('<td>').text(data.aTchList[i].t_ph?data.aTchList[i].t_ph : "[전화번호 미등록]"))
				.append($('<td>').text(data.aTchList[i].t_email))
				.append($('<td>').text(data.aTchList[i].t_addr?data.aTchList[i].t_addr : "[주소 미등록]"))
				.appendTo(tdTable);
			}
		};
		}
	});
};
tchContent.tTableClear = function(){ // 강사정보 뽑을때 한번 삭제하고 출력
	$("table#tblList td[id]").empty();
};
tchContent.clearList = function(){ // 학생정보 뽑을때 한번 삭제하고 출력
	$(".tch_row").remove();
};

// 클릭한 강사가 가르치는 관리자 소속의 강좌
tchContent.tchClassesView = function(thisTch){
	$('#noClick').remove();
	$.ajax("../ajax/auth/a_tchClasses.do",{ // A_AdminControl에 있음
		type : 'POST',
		dataType : 'json',
		data : {
			t_email : thisTch
		},
		success : function(data){
			
			$('table#tchList tr').filter(function(index){
				return index > 1;
			}).remove();
			$('#detailTchName').empty();
			
			
			$('#detailTchName').text(thisTName);
			for(var i in data.aTchClassesList){
				$('<tr>')
				.append($('<td>').append($('<a>',{href :'#'+data.aTchClassesList[i].l_no}).text(data.aTchClassesList[i].l_name).addClass("loadDetail")))
				.append($('<td>').text(data.aTchClassesList[i].l_room))
				.append($('<td>').text(data.aTchClassesList[i].l_s_day))
				.append($('<td>').text(data.aTchClassesList[i].l_e_day))
				.appendTo($('table#tchList'));
			}
		},
		error : function(xhr,status,message) {
			window.alert('강사의 수업 출력 실패입니다.');
			console.log(error);
		}
	});
};