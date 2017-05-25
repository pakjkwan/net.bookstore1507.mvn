var lecturerClass = {};

st = new Array();
lt = new Array();
updateId = "";
addId = '';
nt = new Array();
var timeIndex = 0;
var num = 0;
var checkedLec = 0;
tArrText = "";
NtimeIndex = '';

ntLength = 0;

lecturerClass.init = function(){
	$('div[role=dialog]').remove(); // 생성되고 삭제되지 않고 계속 쌓이는 dialog 없애기.
	lecturerClass.classList();  // 수업목록 table만드는 function.
};
//****** click ******
$(document).on("click","a.detailLink",function(event){ // 수업목록 table이 on되면 클릭이벤트 연결.
	$('#content').load('student/studentList.html');
});
//****** click ******
//$(document).on("click","input.timeRow",function(event){ // 등록,수정 팝업에서 시간테이블의 row삭제addTimeRow
$(document).on("click","input#addTimeRow",function(event){
	var delConfirm = window.confirm("시간을 삭제하시겠습니까?");///%%%%%%%%%%%%%%%%%%
	if(delConfirm){
		if($('table#addTimeTable tr').length == 2){
			var removeRow = $(this).parent(); // 해당 row의 부모로 가서 삭제.
			removeRow.parent().remove();
			$('table#addTimeTable').append(
					$('<tr>').attr("id","defaultTime").append($("<td>",{colspan : 4}).text("등록된 시간이 없습니다.")));
		}else{
			var removeRow = $(this).parent(); // 해당 row의 부모로 가서 삭제.
			removeRow.parent().remove();
		}
	}
});
//****** click ******
$(document).on("click","input#NtimeRow",function(event){ // 등록,수정 팝업에서 시간테이블의 row삭제
	var delConfirm = window.confirm("시간을 삭제하시겠습니까?");///%%%%%%%%%%%%%%%%%%
	if(delConfirm){
		if($('table#NaddTimeTable tr').length == 2){
			var removeRow = $(this).parent(); // 해당 row의 부모로 가서 삭제.
			removeRow.parent().remove();
			$('table#NaddTimeTable').append(
					$('<tr>').attr("id","defaultTime").append($("<td>",{colspan : 4}).text("등록된 시간이 없습니다.")));
		}else{
			var removeRow = $(this).parent(); // 해당 row의 부모로 가서 삭제.
			removeRow.parent().remove();
		}
	}
});
//****** click ******
$(document).on('click','#btnAddClass',function(e){ // 강좌(새로)등록 버튼 눌렀을때 팝업안의 입력한 정보 시간,요일 입력하고 DB로 보내는 버튼.
	if($('input#className').val() == ""){
		window.alert("강좌명을 입력하세요.");
		$("input#className").focus();
	}else if($('input#classRoom').val() == ""){
		window.alert("강의실을 입력하세요.");
		$("input#classRoom").focus();
	}else if($("input#classStart").val() == ''){	
		window.alert("시작일을 선택하세요.");
	}else if($("input#classEnd").val() == ''){
		window.alert("종료일을 선택하세요.");
	}else{
		$("tr#defaultTime").remove();
		lecturerClass.plusLecture();
		$("input#classStart, input#classEnd").datepicker("destroy");// datepicker가 남아있는것을 파괴!
	}
});
//****** click ******
$(document).on('click','#NbtnAddClass',function(e){ // 강좌'수정'팝업에서 수정 눌렀을때 현재 테이블에 출력되어있는 시간과 기타 정보 DB로 넘겨주기						
	$('.NtimelistTR').each(function(index){	
		lt[index]=$(this).children(".NtimelistTD:eq(0)").text()+","+$(this).children(".NtimelistTD:eq(1)").text()+","+$(this).children(".NtimelistTD:eq(2)").text();
	}); // ex) 월,11:00,14:00
	tArrText = lt.join('#');  	//ex) 월,11:00,14:00#화,10:00,20:10#.......
	$.ajax('../ajax/a_changeLecture.do', {
		type : 'POST',
		data : { // 현재 출력되어서 string으로 만든 시간들, 강좌번호(PK), 기타 정보들...
			l_no : checkedLec,
			lt_time : tArrText,
			l_name : $('input#NclassName').val(),
			l_room : $('input#NclassRoom').val(),
			l_s_day : $('input#NclassStart').val(),
			l_e_day : $('input#NclassEnd').val()
		},
		dataType:'json',
		success : function() {
			window.alert("강좌 정보가 수정되었습니다.");
			lecturerClass.classList();
			$("#updateClassDialog").dialog("close");
		},
		error : function(xhr,status,message) {
			window.alert('강좌 등록 실패입니다.');
			console.log(error);
		}
	});
	$("input#NclassStart, input#NclassEnd").datepicker("destroy");// datepicker가 남아있는것을 파괴!
});
//****** click ******
$(document).on('click',"#addClass",function(e){// 얘는 그냥 강좌 등록할때 팝업창띄우는건데...input창 비우고.. 요일선택을 '선택하세요'로 셋팅

	$('#addClassDialog').dialog({
		autoOpen : false,
		dialogClass: "no-close",
		modal: true,
		width : 400
	});
	
	$('#addClassDialog').siblings('div.ui-dialog-titlebar').remove();
//	$("input#classStart, input#classEnd").datepicker("destroy");//^^^^^^^^^^^^^^^^^^^
	$(function(){
		$("input#classStart, input#classEnd").datepicker(
				{
					dateFormat : "yy-mm-dd",
					showMonthAfterYear : true,
					dayNamesMin : [ '월', '화', '수', '목', '금', '토', '일' ],
					monthNames : [ '1월', '2월', '3월', '4월', '5월', '6월', '7월',
							'8월', '9월', '10월', '11월', '12월' ],
					showButtonPanel : true,
					currentText : '오늘 날짜',
					closeText : '닫기'
				});
		});
	
	// selectBox 의 default값 설정
	$("#day").val("aaa").attr("selected", "selected");
	// 테이블에서 index로 삭제하기
	$('table#addTimeTable tr').filter(function(index){
		return index != 0;
	}).remove();
	$('table#addTimeTable').append(
			$('<tr>').attr("id","defaultTime").append($("<td>",{colspan : 4}).text("등록된 시간이 없습니다.")));
	$('div#addClassDialog input[id^="class"]').val("");
	$('input#btnAddClass').attr("disabled",true).css("background","rgb(231, 231, 231)");//@@@@@@@@@@@@@@@@@@@@@
	$("#addClassDialog").dialog("open");
		
});
//****** click ******
$(document).on('click','#updateClass',function(e){// 수정팝업열기

	$('#updateClassDialog').dialog({
		autoOpen : false,
		dialogClass: "no-close",
		modal: true,
		width : 400
	});

	$('#updateClassDialog').siblings('div.ui-dialog-titlebar').remove();
	$(function(){
		$("#NclassStart, #NclassEnd").datepicker(
				{
					dateFormat : "yy-mm-dd",
					showMonthAfterYear : true,
					dayNamesMin : [ '월', '화', '수', '목', '금', '토', '일' ],
					monthNames : [ '1월', '2월', '3월', '4월', '5월', '6월', '7월',
							'8월', '9월', '10월', '11월', '12월' ],
					showButtonPanel : true,
					currentText : '오늘 날짜',
					closeText : '닫기'
				});
		});
	var updateLength = $(':checkbox[name=lecturerClass]:checked').length;
	e.stopImmediatePropagation();
	if(updateLength == 0){
		window.alert("선택된 강좌가 없습니다.");
		$('div[role=dialog]').remove(); // 생성되고 삭제되지 않고 계속 쌓이는 dialog 없애기.
	}else if(updateLength > 1){
		window.alert("1개 이상의 강좌는 수정할 수 없습니다.");
		$('div[role=dialog]').remove(); // 생성되고 삭제되지 않고 계속 쌓이는 dialog 없애기.
	}else{
		//현재 checkbox버튼에 check된 값을 알려줌
		checkedLec = $(':checkbox[name=lecturerClass]:checked').val();
		lecturerClass.updateEmpty(); // 수정 팝업창 비우기
		$('#updateClassDialog').dialog("open");

		lecturerClass.updateLecture(checkedLec);
	}

});
//****** click ******
$(document).on("click","a.classLink",function(e){// 테이블에서 상세보기 '상세'눌렀을때 해당강좌의 시간만 보는 팝업
	// 강좌table에서 상세보기를 눌렀을때 뜨는 팝업 옵션 설정
	$('#detailClassDialog').dialog({
		autoOpen : false,
		dialogClass: "no-close",
		modal: true,
		position : { my : "left", at : "bottom left", of : e},// dialog가 생성될 위치를 지정해준다
		width : 250
	});
	$('#detailClassDialog').siblings('div.ui-dialog-titlebar').remove();
	
	lecturerClass.detailPopupEmpty(); // 비워주기
	$("#detailClassDialog").dialog("open");
	var thisId = $(this).attr('id'); // 누른 버튼의 id값으로 해당강좌 번호가 들어가있음.
	lecturerClass.detailTimePop(thisId);
});
//****** click ******
$(document).on("click", "#searchButton", function(e) {// 강사등록 할때 search버튼 클릭
	e.stopImmediatePropagation();
	if($('#searchBox').val() == ""){
		window.alert("검색할 강사의 이름을 입력하세요.");
	}else{
		lecturerClass.search();
	}
});
//****** click ******
$(document).on("click", "#btnCloseClass", function(e) {// 강좌 등록 팝업창안에 닫기 버튼
	$("#addClassDialog").dialog("close");
	$("input#classStart, input#classEnd").datepicker("destroy");// datepicker가 남아있는것을 파괴!**************
	$('div[role=dialog]').remove(); // 생성되고 삭제되지 않고 계속 쌓이는 dialog 없애기.
});
//****** click ******
$(document).on("click", "#NbtnCloseClass", function(e) {// 수정팝업창의 닫기
	$("#updateClassDialog").dialog("close");
	$("input#NclassStart, input#NclassEnd").datepicker("destroy");// datepicker가 남아있는것을 파괴!*****************
	$('div[role=dialog]').remove();
});
//****** click ******
$(document).on("click","#lecCloseButton", function(e){
	$("#addLecturerDialog").dialog("close");
});
//****** click ******
$(document).on("click", "#detailClassDialogClose", function(e) {// 수업시간보는 '상세보기'에서 '상세'버튼 닫기
	$("#detailClassDialog").dialog("close");
	$('div[role=dialog]').remove(); // 생성되고 삭제되지 않고 계속 쌓이는 dialog 없애기.
});
//****** click ******
$(document).on("click","#removeClass",function(e){// 강좌 삭제.
	var ct = new Array();
	checkedLec = $(':checkbox[name=lecturerClass]:checked').val();// 해당강좌 row에서 checkbox버튼의 value값, 해당 강좌의 번호가 val값으로 들어가 있어서 해당번호의 강좌삭제
	var checkLength = $(':checkbox[name=lecturerClass]:checked').length;
	$(":checkbox:checked").each(function(index){
		ct[index]=$(this).val();
	});
	var checkedList = ct.join('#');
	if(checkLength == 0){
		window.alert("선택된 강좌가 없습니다.");
	}else{
		// 강좌 삭제 function
		lecturerClass.removeClass(checkedList);
	}
});
//****** click ******
//강좌'수정'에서 시간 추가할때 그리고 NtimeIndex는 현재 출력되어있는 강좌시간들의 갯수를 나타냄.
$(document).on("click","#NbtnAddTimes",function(e){
	$("tr#defaultTime").remove();
	NtimeIndex = $('table#NaddTimeTable tr:last-child').attr("id");
	if($("#Nday option:selected").text() == '선택하세요'){
		window.alert("요일을 선택하세요.");
	}else if($("input#NclassStartTime").val() == ''){
		window.alert("시작시간을 선택하세요.");
	}else if($("input#NclassEndTime").val() == ''){
		window.alert("종료시간을 선택하세요.");
	}else{
		lecturerClass.NaddTime();
	}	
});
//****** click ******
$(document).on("click","#btnAddTime",function(e){// 팝업창안에 시간 추가버튼
	console.log("왜 안돼!!!!!!!!!!!");
	if($("#day option:selected").text() == '선택하세요'){
		window.alert("요일을 선택하세요.");
	}else if($("input#classStartTime").val() == ''){
		window.alert("시작시간을 선택하세요.");
	}else if($("input#classEndTime").val() == ''){
		window.alert("종료시간을 선택하세요.");
	}else{
		$("tr#defaultTime").remove();
		lecturerClass.addTime();
	}
});
//****** click ******
$(document).on("click",".lecturerLink",function(e){//이건 해당 강좌에 강사를 등록하는 것.. 강사등록[+]버튼 눌렀을때...
	
	$('div[role=dialog]').remove();
	// 강사 '등록'버튼 눌렀을때 search가 들어있는 팝업 옵션 설정
	$('#addLecturerDialog').dialog({
		autoOpen : false,
		dialogClass: "no-close",
		modal: true,
		width : 400
	});
	$('p#searchReusltMsg').empty();
	$('#addLecturerDialog').siblings('div.ui-dialog-titlebar').remove();
	//------------------------AutoComplete를 여기에 넣어보았음. dialog가 열린뒤 준비
	// 이건 jquery ui 의 autoComplete 선언
	$("input#searchBox").autocomplete({
		// 소스 : 소스를 어디에서 ajax 방식으로 '주고''받을'것인가..??? 이것도 잘 모르겠다..ㅠㅠ
		source: function(request, response) {
			// controls 의 L_LectureControl.java 에 있음.
			$.ajax('../ajax/a_autoSearchTeacher.do',{
				dataType: "json",
				data: {
					// !!!! 여긴 진짜 모르겠다!! api 봐도 안나와있어..ㅠㅠ
					featureClass: "P",
					style: "full",
					maxRows: 12,
					name_startsWith: request.term
				},
				success: function(data) {
					response($.map(data.autoList, function(item){
						if (item.t_name.toLowerCase().indexOf($("#searchBox").val().toLowerCase()) >= 0){
							$('p#searchReusltMsg').text("검색되었습니다.");
							return {
								aTeacherName : item.t_name,
								aTeacherEmail : item.t_email,
								aTeacherPic : item.t_picture,
								aTeacherPh : item.t_ph,
								aTeacherAddr : item.t_addr
							};
						}else{
							$('p#searchReusltMsg').text("검색결과가 없습니다.");
							$('input#lecAddButton').attr("disabled",true).css("background","rgb(231, 231, 231)");//@@@@@@@@@@@@@@@@@@@@@
						}
					}));
				},
				error : function(xhr,status,message) {
					window.alert('강사정보 불러오기 실패입니다.');
					console.log(error);
				}
			});
		},
		// 얘는 몇글자 입력했을때 검색된 것을 보여줄것인가 설정하는 것.
		minLength: 1,
		// 검색된 것중에서 선택했을때 log함수를 불러서...
		select: function(event, ui) {
			lecturerClass.reset();
			// dialog의 각각의 항목에 출력시킴.
			$('#lecturerImg').append($('<img>)', {
				src: "http://localhost:9999/intime_server/picture/" + ui.item.aTeacherPic,
				id: 'lecturerPhoto'
			}));
			$('#lecturerName').val(ui.item.aTeacherName);
			$('#lecturerTel').val(ui.item.aTeacherPh);
			$('#lecturerEmail').val(ui.item.aTeacherEmail);
			$('#lecturerAddr').val(ui.item.aTeacherAddr);
			$('input#lecAddButton').attr("disabled",false).css("background","#aaa");//@@@@@@@@@@@@@@@@@@
		},
		// 자동 검색되어서 보여줄때 selectBox처럼 보이게하는...
		open: function() {
//          $( this ).autocomplete("widget").width(500); // 얘는 자동검색결과 출력시 width 조정.
            $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
        },
        // 자동 검색되어서 selectBox처럼 보여주고 닫을때...
        close: function() {
            $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
        }
	})
	//!!!!!!!! 이건 진짜 모르겠다...".data","_renderItem".. 이건 뭐냥...ㅡ,.ㅡ;
	.data('uiAutocomplete')._renderItem = function( ul, item ) {
        return $( "<li></li>" )
        .data( "item.autocomplete", item )
        .append( "<a>" + item.aTeacherName + " [ Email : " + item.aTeacherEmail + "]</a>" )
        .appendTo( ul );
    };
	lecturerClass.reset();
	// 강좌의 강사가 테이블에 출력되어있는지 체크하는것
	var parent = $(this).parent();
	var thisLecturer = parent.children('td:eq(3)').text();
	if(thisLecturer == '---'){ // 강좌에 강사가 등록되어있지 않으면 '---'나오게 해줬기때문에...이건 없는거.
		// 없으니까 바로 등록할수있게...
		
		$("input#lecAddButton").addClass("lecAddButton");
		$("input#lecAddButton").attr("value","등록"); // html에서 value값 지우고 새로 넣은것
		$('input#lecAddButton').attr("disabled",true).css("background","rgb(231, 231, 231)");//@@@@@@@@@@@@@@@@@@@@@
		$("#addLecturerDialog").dialog("open");
		
		addId = $(this).attr('id');
		$(document).on("click",".lecAddButton",function(e){
			e.stopImmediatePropagation();
			lecturerClass.addTeacher(addId);
		});

	}else{ // 이건 기존에 강사가 등록되어 있는 경우에 확인alert과 함께 실행.
		var registConfirm = window.confirm("강사가 등록되어 있는 강좌입니다. 수정하시겠습까?");
		if(registConfirm){
			
			$("input#lecAddButton").addClass("ulecAddButton");
			$("input#lecAddButton").attr("value","수정");// html에서 value값 지우고 새로 넣은것
			$("#addLecturerDialog").dialog("open");
			updateId = $(this).attr('id');
		
			$(document).on("click",".ulecAddButton",function(e){
				e.stopImmediatePropagation();
				$.ajax('../ajax/a_updateTeacher.do',{
					type : 'POST',
					dataType : 'json',
					data : {
						l_no : updateId,
						t_email : $('input#lecturerEmail').val() //수정될 강사의 이메일
					},
					success : function(){
						$("#addLecturerDialog").dialog('close');
						window.alert("강사가 수정되었습니다.");
						$("input#lecAddButton").removeClass("ulecAddButton");
						lecturerClass.classList();		
					},
					error : function(xhr,status,message) {
						window.alert('수정 실패입니다.');
						console.log(error);
					}
				});
			});
		}
	}
});
//***************************************************************************************************
lecturerClass.plusLecture = function(){
	console.log("=========배열의 splice 사용============");
	console.log(nt);// nt 
	ntLength = nt.length;
	nt.splice(0, ntLength); // nt = {};
	console.log(nt);
	console.log("===================================");
	$('.timelistTR').each(function(index){	
		nt[index]=$(this).children(".timelistTD:eq(0)").text()+","+$(this).children(".timelistTD:eq(1)").text()+","+$(this).children(".timelistTD:eq(2)").text();
	}); // ex) 월,11:00,14:00

	$.ajax('../ajax/a_addLecture.do', {
		type : 'POST',
		data : { // l_no는 새로 등록할때 자동증가이므로 안넘김.
			lt_time : /*st.join('#')*/nt.join('#'),//ex) 월,11:00,14:00#화,10:00,20:10#.......
			l_name : $('input#className').val(),
			l_room : $('input#classRoom').val(),
			l_s_day : $('input#classStart').val(),
			l_e_day : $('input#classEnd').val()	
		},
		dataType:'json',
		success : function() {
			window.alert("강좌가 등록되었습니다.");
			$("#addClassDialog").dialog("close");
			$('div[role=dialog]').remove(); // 생성되고 삭제되지 않고 계속 쌓이는 dialog 없애기.
			lecturerClass.classList();

		},
		error : function(xhr,status,message) {
			window.alert('강좌 등록 실패입니다.');
			console.log(error);
		}
	});
};
//강사검색"팝업"에서 강사 "검색하고나서" "등록"버튼눌렀을때 DB에 강사email이 등록됨
lecturerClass.addTeacher  = function(thisId){
	$.ajax('../ajax/a_addTeacher.do',{
		type : 'POST',
		dataType : 'json',
		data : {
			l_no : thisId,
			t_email : $('input#lecturerEmail').val()
		},
		success : function(data){
			$("#addLecturerDialog").dialog("close");
			window.alert('강사 등록되었습니다.');
			$("input#lecAddButton").removeClass("lecAddButton");
			lecturerClass.classList();

		},
		error : function(xhr,status,message) {
			window.alert('강사등록 실패입니다.');
			console.log(error);
		}
	});
};
//강좌 삭제 되는 function
lecturerClass.removeClass = function(checkedList){
	// 확인 alert을 한번띄워줌.
	var confirm = window.confirm("삭제하시겠습니까?");
	if(confirm){
		$.ajax('../ajax/a_removeLecture.do',{
			type : 'POST',
			dataType : 'json',
			data : {
				checkedList : checkedList
			},
			success : function(){
				lecturerClass.classList();
			},
			error : function(xhr,status,message) {
				window.alert('삭제 실패입니다.');
				console.log(error);
			}
		});
	}
};
//이건 '강좌' 수정을 눌렀을때 팝업창에 표시되는 기존에 db에 저장되어있는 수업정보들
lecturerClass.updateLecture = function(checkedLec){
	$.ajax('../ajax/a_updateLecture.do',{
		type : 'POST',
		dataType : 'json',
		data : {
			l_no : checkedLec
		},
		success : function(data){

			$('input#NclassName').val(data.uLecture.l_name);
			$('input#NclassRoom').val(data.uLecture.l_room);
			$('input#NclassStart').val(data.uLecture.l_s_day);
			$('input#NclassEnd').val(data.uLecture.l_e_day);
			$.each(data.uTimeList,function(index,entry){
				
				var sTime = entry.l_s_time;
				var eTime = entry.l_e_time;
				var sTimes2 = sTime.split(":",2);
				var eTimes = eTime.split(":",2);
				sTime = sTimes2.join(":");
				eTime = eTimes.join(":");
				
				$("table#NaddTimeTable").append(
						$('<tr>').attr("id", index).addClass("NtimelistTR")
						.append($('<td>').text(entry.l_date).attr("id","timelist"+index).addClass("NtimelistTD"))
						.append($('<td>').text(sTime).attr("id","timelist"+index).addClass("NtimelistTD"))
						.append($('<td>').text(eTime).attr("id","timelist"+index).addClass("NtimelistTD"))
						.append($('<td>').append($('<input>',{type : "button", value : "삭제", id : "NtimeRow"}).addClass("timeRow")))
				);
			});
		},
		error : function(xhr,status,message) {
			window.alert('수정 실패입니다.');
			console.log(error);
		}
	});
};
//수업 상세보기 했을때 시행되는 detailTimePop() - 이건 시간만 보여주는 팝업
lecturerClass.detailTimePop = function(thisId){
	lecturerClass.detailPopupEmpty();
	$.ajax('../ajax/a_getLectureTime.do',{
		type : 'POST',
		dataType : 'json',
		data : {
			l_no : thisId
		},
		success : function(data){
//			lecturerClass.detailPopupEmpty();
			$.each(data.tList,function(index,entry){
				var lsTime = entry.l_s_time;
				var leTime = entry.l_e_time;
				var lsTimes2 = lsTime.split(":",2);
				var leTimes = leTime.split(":",2);
				lsTime = lsTimes2.join(":");
				leTime = leTimes.join(":");
				$('table#detailTimeDialog').append(
						$('<tr>').append($('<td>').text(entry.l_date))
								 .append($('<td>').text(lsTime))
								 .append($('<td>').text(leTime)));
			});
		},
		error : function(xhr,status,message) {
			window.alert('시간 불러오기 실패입니다.');
			console.log(error);
		}
	});
};
//비우기!! (수업요일,수업시간을 보는 팝업창)
lecturerClass.detailPopupEmpty = function(){ 
//	$("table#detailTimeDialog").empty();
	$('table#detailTimeDialog tr').filter(function(index){
		return index != 0;
	}).remove();
};
//수정팝업 띄웠을때 테이블 비우기
lecturerClass.updateEmpty = function(){
	$("table#NaddTimeTable .NtimelistTR").remove();
	$("table#NaddTimeTable tr[id]").remove();
	// selectBox 의 default값 설정
	$("#Nday").val("aaa").attr("selected", "selected");
	$('div#updateClassDialog input[id$="Time"]').val("");
};
//얘는 강좌 테이블(리스트)만드는 function
lecturerClass.classList = function(){
//	lecturerClass.clearList();
	$.getJSON('../ajax/a_getLecture.do', function(data){ 

		var tdTable = $('#list_table_class');
		var teacherName = '';
		var buttonVal = '';
		if(data.aList.length == 0){
			lecturerClass.clearList();
			$('table#list_table_class').append(
					$('<tr>').attr("id","noList").append($("<td>",{colspan : 9}).text("등록된 강좌가 없습니다.")));
		}else{
			$('#noList').remove();
			lecturerClass.clearList();
		for(var i in data.aList) {
			$.ajaxSetup({
				async: false
			});
			if(data.aList[i].t_email == null){
				teacherName = "---"; // 강사가 없을때는 '---'으로 보여지게!!
				buttonVal = "등록";	
			}else{
				$.ajax('../ajax/a_lecTchName.do?tch_email='+data.aList[i].t_email,{
					type : 'GET',
					dataType : 'json',
					success : function(tch){
						teacherName = tch.lecName;
						buttonVal = "변경";
					}
				});
			}
					var init_Count = 0;
					$.ajax('../ajax/a_stuCount.do?l_no='+data.aList[i].l_no,{
						type : 'GET',
						dataType : 'json',
						success : function(count){
							init_Count = count.stuNo;
						}
					});
					$('<tr>').addClass("class_row")
					.append($('<td>').append($('<input>', { type: 'checkbox', name: 'lecturerClass' , value: data.aList[i].l_no  }).attr("id",data.aList[i].l_no)))
					.append($('<td>').text(data.aList[i].l_no))
					.append($('<td>').append($('<a>', {href: "#", title:"강좌상세정보"}).text(data.aList[i].l_name).addClass("classLink").attr("id",data.aList[i].l_no)))
					.append($('<td>').text(teacherName))
					.append($('<td>').text(data.aList[i].l_room))
					.append($('<td>').text(data.aList[i].l_s_day))
					.append($('<td>').text(data.aList[i].l_e_day))
					.append($('<td>').append($('<a>',{ href: "#"+data.aList[i].l_no/*, title: "수강학생 상세정보"*/, title:"수강인원정보"}).text(init_Count).addClass("detailLink").attr("id",data.aList[i].l_no)))
					.append($('<td>').append($('<input>', {type : "button", value : buttonVal, id : "lec_name"})).addClass("lecturerLink").attr("id",data.aList[i].l_no)).appendTo(tdTable);
					
					// fo문안에  async : false를 주었기 때문에 for문안에서 async : true 로 바꿔주었다. for문의 마지막이 돌때 async는 true인 상태로 나오게 된다.
					$.ajaxSetup({
						async: true
					});
		};
		}
	});
	$('div[role=dialog]').remove();	
};

//<input type="button" class="sss" onclick="function.name(this.value)">
// this - input:button을 나타내고. value - ex) class.. id... value...이런 것들...이
// function.name 함수를 호출하면서 this.value를 인자로 넘긴다..
// 그러면 클릭된 객체를 인식하고 따라간다.

//강좌 등록 팝업에서 시간추가 눌렀을때 테이블에 추가되게 하는 function
lecturerClass.addTime = function(){
	
	$("table#addTimeTable").append($('<tr>').attr("id",timeIndex).addClass("timelistTR")
			.append($('<td>').text($("#day option:selected").text()).addClass("timelistTD"))
			.append($('<td>').text($("input#classStartTime").val()).addClass("timelistTD"))
			.append($('<td>').text($("input#classEndTime").val()).addClass("timelistTD"))
			.append($('<td>').append($('<input>',{type : "button", value : "삭제", id : "addTimeRow"}).addClass("timeRow")))
//			.append($('<td>').append($('<input>',{type : "button", value : "삭제"}).addClass("timeRow")))
	);
	$('input#btnAddClass').attr("disabled",false).css("background","#aaa");//@@@@@@@@@@@@@@@@@@
	timeIndex++;
};
//강좌 수정 할때 시간추가 눌렀을때 테이블에 추가되게 하는 function +기존에 DB에 있던거에 새롭게 추가되는...
lecturerClass.NaddTime = function(){
	NtimeIndex++; // 기존의 db에 저장되어있는 수업시간의 개수
	$("table#NaddTimeTable").append($('<tr>').attr("id",NtimeIndex).addClass("NtimelistTR")
			.append($('<td>').text($("#Nday option:selected").text()).addClass("NtimelistTD"))
			.append($('<td>').text($("input#NclassStartTime").val()).addClass("NtimelistTD"))
			.append($('<td>').text($("input#NclassEndTime").val()).addClass("NtimelistTD"))
			.append($('<td>').append($('<input>',{type : "button", value : "삭제", id : "NtimeRow"}).addClass("timeRow")))
	);
};
//검색박스 안에 검색한 내용 지우기
lecturerClass.reset = function() { 
	$("input[id^='lecturer']").val("");
	$("div#lecturerImg").empty();
	$("input[id^='searchBox']").val("");
};
//강좌 목록 테이블 중복되는거 삭제
lecturerClass.clearList = function() {
	$(".class_row").remove();
};