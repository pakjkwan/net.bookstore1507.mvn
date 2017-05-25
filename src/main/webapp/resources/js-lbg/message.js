var message = {
		loaded : false
};

message.init = function(){
	
	console.log('message.init()');
	
if(!this.loaded) {	
	message.receivedBox();
	
	$('.btnInline').hover(function() {
		$(this).addClass('reverse');
	}, function() {
		$(this).removeClass('reverse');
	});
	
	
	if(indexGlobal.msgCountZero == 0) {
		console.log('test');
	} else {
		$('#receivedBoxBtn').append( $('<div>').attr('id', 'unreadUserMsg').addClass('messageBoxCount')
				 .append($('<img>', {src : 'img/unreadMsg.png'})))
		 .append( $('<div>').attr('id', 'unreadUserMsgCount').text(indexGlobal.msgCount1).addClass('messageBoxCount'));
		 
		$('#sysReceivedBoxBtn').append( $('<div>').attr('id', 'unreadSysMsg').addClass('messageBoxCount')
				 .append($('<img>', {src : 'img/unreadMsg.png'})))
		 .append( $('<div>').attr('id', 'unreadSysMsgCount').text(indexGlobal.msgCount2).addClass('messageBoxCount'));
	}
	
	$('#writeMsgBtn').hover(function(event){  
		$(this).addClass('reverse');
	},function() {
		$(this).removeClass('reverse');
	});
	
	// 메시지 버튼
	$('#writeMsgBtn').fancybox({
		
		helpers :{
			overlay : {
				locked : false
			}
		},
		'scrolling'		: 'no',
		'titleShow'		: false,
		'width'			: 400,
		'height'		: 420,
		'autoSize'		: false,
		'transitionIn'	: 'elastic',
		'transitionOut'	: 'elastic',
		'overlayShow'	: false,
		afterShow: function(){
		    $('#msgReceiver').focus();
		}
		
	});
	
	// 쪽지 제목을 클릭(보낸 쪽지 확인)
	$('#content').on('mouseenter', 'a.sendMsgPopup', function() {
		
		console.log($(this).attr('data-no'));
		
		message.msgNo = $(this).attr('data-no');
		
		message.readSendMsg();
		
		$(this).fancybox({
			
			helpers :{
				overlay : {
					locked : false
				}
			},
			'scrolling'		: 'no',
			'titleShow'		: false,
			'width'			: 400,
			'height'		: 460,
			'autoSize'		: false,
			'transitionIn'	: 'elastic',
			'transitionOut'	: 'elastic',
			'overlayShow'	: false
		});
		
		event.stopImmediatePropagation();
	});
	
	// 쪽지 제목을 클릭(받은 쪽지 확인)
	$('#content').on('mouseenter', 'a.recMsgPopup', function() {
		
		console.log($(this).attr('data-no'));
		
		message.msgNo = $(this).attr('data-no');
		
		message.readRecMsg();
		
		$(this).fancybox({
			
			helpers :{
				overlay : {
					locked : false
				}
			},
			'scrolling'		: 'no',
			'titleShow'		: false,
			'width'			: 400,
			'height'		: 460,
			'autoSize'		: false,
			'transitionIn'	: 'elastic',
			'transitionOut'	: 'elastic',
			'overlayShow'	: false,
			afterClose	 	: function() {
				
				message.receivedBox();
				indexGlobal.userInfo();
				
			}
		});
		
		event.stopImmediatePropagation();
	});
	
	
	//시스템 메세지 fancy box 생성
	
	$('#content').on('mouseenter', 'a.sysRecMsgPopup', function() {
			
		console.log($(this).attr('data-no'));
		
		message.msgNo = $(this).attr('data-no');
		
		message.readSysMsg();
		
		$(this).fancybox({
			
			helpers :{
				overlay : {
					locked : false
				}
			},
			'scrolling'		: 'no',
			'titleShow'		: false,
			'width'			: 400,
			'height'		: 460,
			'autoSize'		: false,
			'transitionIn'	: 'elastic',
			'transitionOut'	: 'elastic',
			'overlayShow'	: false,
			afterClose	 	: function() {
				
				message.sysReceivedBox(); 
				indexGlobal.userInfo();
				
			}
		});
		
		event.stopImmediatePropagation();
	});
	
	$('#prevList').click(function(event) {
		event.preventDefault();
		if (message.pageNo > 1) {
			message.pageNo--;
			message.sendMsgBox();
		}
	});
	
	$('#nextList').click(function(event) {
		event.preventDefault();
		if (message.pageNo < message.totalPage) {
			message.pageNo++;
			message.sendMsgBox();
		}
	});
	
	// 수신함 버튼 클릭시 반응
	$('#receivedBoxBtn').click(function(event){  
		 
		message.receivedBox(); 
		event.stopImmediatePropagation();
	});
	
	$('#receivedBoxBtn').hover(function(event){  
		$(this).addClass('reverse');
	},function() {
		$(this).removeClass('reverse');
	});
	
	// 수신함(시스템) 버튼 클릭시 반응
	$('#sysReceivedBoxBtn').click(function(event){  
		 
		message.sysReceivedBox(); 
		event.stopImmediatePropagation();
	});
	
	$('#sysReceivedBoxBtn').hover(function(event){  
		$(this).addClass('reverse');
	},function() {
		$(this).removeClass('reverse');
	});
	
	// 발신함 버튼 클릭시 반응
	$('#sendBoxBtn').click(function(event){  
		 
		message.sendMsgBox(); 
		event.stopImmediatePropagation();
	});
	
	$('#sendBoxBtn').hover(function(event){  
		$(this).addClass('reverse');
	},function() {
		$(this).removeClass('reverse');
	});
	
	//메시지 작성 후 보내기
	$(document).on('click','#msgSend',(function(event){ 
		
		$.ajax('ajax/member/checkMember.do',{
			type : 'POST',
			data : {recId : $('#msgReceiver').val()},
			dataType : 'json',
			success : function(data){
				
				if($('#msgReceiver').val().length == 0) {
					
					alert('받는 분의 아이디를 입력하셔야합니다.');
					
				} else if ($('#msgTitle').val()==0) {
					
					alert('제목을 입력하셔야합니다.');
					
				} else if ($('#msgContent').val()==0) {
					
					alert('내용을 입력하셔야합니다.');
					
				} else {
					console.log('메시지 보내기data : ');
					console.log(data);
					message.sendMsg();
				}
			},
			error: function(){
				console.log('아이디가 없습니다.');
			}
		});
		
		event.preventDefault();
	}));
}
};

// 메시지 전송기능
message.sendMsg = function(){
	
	$.ajax('ajax/message/sendMsg.do',{
	
		type: 'POST',	
		data: {
			recId : $('#msgReceiver').val(),
			title : $('#msgTitle').val(),
			content: $('#msgContent').val()
		},
		dataType :'json',
		success : function(data){
			
			console.log('메시지전송Data:'+data);
			
			message.sendMsgBox();
			
			$.fancybox.close();
			
		},
		error : function(xhr, status, message){
			
			alert('메시지 전송 실패입니다.');
			console.log(message);
		}
	
	});
};

//시스템 메세지 전송
message.sendSysMsg = function(){
	
	$.ajax('ajax/message/sendSysMsg.do',{
	
		type: 'POST',	
		data: {
			bookTitle : applyPagePopup.bookTitle,
			recId : applyPagePopup.recId,
		},
		dataType :'json',
		success : function(data){
			
			console.log('메시지전송Data:'+data);
			
		},
		error : function(xhr, status, message){
			
			alert('메시지 전송 실패입니다.');
			console.log(message);
		}
	
	});
};

//메시지 발신함
message.sendMsgBox = function(){
	
	$('#msgMain').load('pages/message/sendMessage.html');
	
	if(message.pageNo_send == undefined){
		message.pageNo_send = 1;
	}
	
	$("#msgMainTable_rec").remove();
	$("#msgMainTable_send").remove();
	
	$.ajax({
		url : 'ajax/message/sendMsgList.do',
		type : 'POST',
		dataType : 'json',
		data : {
			pageNo : 1
		},
		success : function(data){
			
		//전역변수.[$(#).val()] = data.모델객체 키값
			console.log('메시지 발신함 Data :');
			console.log(data);
			
			message.pageNo_send = data.pageNo;
			message.recordCount_send = data.recordCount;
			message.pageSize_send = data.pageSize;
			
			var totalPage_send = parseInt(message.recordCount_send / message.pageSize_send);
			
			if((message.recordCount_send % message.pageSize_send) > 0){
				totalPage_send ++;
			}
			
			message.totalPage_send = totalPage_send;
			
			var tagMsgTable = $('#msgTable');
			
			for(var i in data.sendMsgList){
				$('<tr>')
					.append($('<td>').append($('<input>').attr('type','checkbox').attr('id','sendMsgCheckBox')))
					.append($('<td>').append($('<a>',{
													text:data.sendMsgList[i].recId,
													href:'#'}))) //받는이 클릭시 메시지 발송 팝업
					.append($('<td>').append($('<a>',{
													text:data.sendMsgList[i].title,
													href:'#readMsgDialog',
													'data-no' : data.sendMsgList[i].msgNo}).addClass('sendMsgPopup'))) //타이틀 클릭시 내용 팝업 
					.append($('<td>').text($.datepicker.formatDate('y-mm-dd',
							new Date(data.sendMsgList[i].sendDate))))
					.appendTo(tagMsgTable);
				
			} $('#currPageNo').text(message.pageNo_send); 
			console.log('페이지수:'+ message.pageNo_send);
			
		},
		error : function(xhr, status, message){
			alert('보낸메시지 리스트 실패입니다');
			alert(message);
		}
		
	});
};

//메시지 수신함
message.receivedBox = function(){
	
	$('#msgMain').load('pages/message/receivedMessage.html');
	
	console.log('메시지 수신함');
	
	if(message.pageNo_rec == undefined){
		message.pageNo_rec = 1;
	}
	
	$("#msgMainTable_rec").remove();
	$("#msgMainTable_send").remove();
	
	console.log('메시지 수신함2');
	
	$.ajax({
		url : 'ajax/message/recMsgList.do',
		type : 'POST',
		dataType : 'json',
		data : {
			pageNo : message.pageNo_rec
		},
		
		success : function(data){
			
			console.log('수신함data : ');
			console.log(data);
			
//			if(data.receivedMsg)
			
			message.pageNo_rec = data.pageNo;
			message.recordCount_rec = data.recordCount;
			message.pageSize_rec = data.pageSize;
			var totalPage_rec = parseInt(message.recordCount_rec / message.pageSize_rec);
			if((message.recordCount_rec % message.pageSize_rec) > 0){
				totalPage_rec ++;
			}
			message.totalPage_rec = totalPage_rec;
			
			var tagMsgTable = $('#msgTable');
			
			var msgStatus = null;
			
			for(var i in data.receivedMsgList) {
				
				switch (data.receivedMsgList[i].status) {
				
					case 'Y' :
						msgStatus = '읽음';
						break;
						
					case 'N' :
						msgStatus = '안읽음';
						break;
				}
				
				$('<tr>')
					.append($('<td>').append($('<input>').attr('type','checkbox').attr('id','recMsgCheckbox')))
					.append($('<td>').append($('<a>',{
						text:data.receivedMsgList[i].sendId,
						href:'#'})))
					.append($('<td>').append($('<a>',{
													text:data.receivedMsgList[i].title,
													href:'#readMsgDialog',
													'data-no' : data.receivedMsgList[i].msgNo}).addClass('recMsgPopup')))
					.append($('<td>').text($.datepicker.formatDate('y-mm-dd',
							new Date(data.receivedMsgList[i].sendDate))))
					.append($('<td>').text(msgStatus))
					.appendTo(tagMsgTable);  
			}
			
			$('#currPageNo').text(message.pageNo_rec);
				
		},
		error : function(xhr, status, message ){
			alert('메시지수신함 실패입니다');
			alert(message);
		}
	});
};


//메시지 수신함(시스템)
message.sysReceivedBox = function(){
	
	$('#msgMain').load('pages/message/receivedMessage.html');
	
	console.log('메시지 수신함');
	
	if(message.pageNo_srec == undefined){
		message.pageNo_srec = 1;
	}
	
	$("#msgMainTable_rec").remove();
	$("#msgMainTable_send").remove();
	
	console.log('메시지 수신함2');
	
	$.ajax({
		url : 'ajax/message/sysRecMsgList.do',
		type : 'POST',
		dataType : 'json',
		data : {
			pageNo : message.pageNo_srec
		},
		
		success : function(data){
			
			console.log('수신함(시스템) data : ');
			console.log(data);
			
			message.pageNo_srec = data.pageNo;
			message.recordCount_srec = data.recordCount;
			message.pageSize_srec = data.pageSize;
			var totalPage_srec = parseInt(message.recordCount_srec / message.pageSize_srec);
			if((message.recordCount_srec % message.pageSize_srec) > 0){
				totalPage_srec ++;
			}
			message.totalPage_srec = totalPage_srec;
			
			var tagMsgTable = $('#msgTable');
			
			var msgStatus = null;
			
			for(var i in data.sysReceivedMsgList) {
				
				switch (data.sysReceivedMsgList[i].status) {
				
					case 'Y' :
						msgStatus = '읽음';
						break;
						
					case 'N' :
						msgStatus = '안읽음';
						break;
				}
				
				$('<tr>')
					.append($('<td>').append($('<input>').attr('type','checkbox').attr('id','recMsgCheckbox')))
					.append($('<td>').append($('<a>',{
						text:data.sysReceivedMsgList[i].sendId,
						href:'#'})))
					.append($('<td>').append($('<a>',{
													text:data.sysReceivedMsgList[i].title,
													href:'#readMsgDialog',
													'data-no' : data.sysReceivedMsgList[i].msgNo}).addClass('sysRecMsgPopup')))
					.append($('<td>').text($.datepicker.formatDate('y-mm-dd',
							new Date(data.sysReceivedMsgList[i].sendDate))))
					.append($('<td>').text(msgStatus))
					.appendTo(tagMsgTable);  
			}
			
			$('#currPageNo').text(message.pageNo_srec);
				
		},
		error : function(xhr, status, message ){
			alert('메시지수신함 실패입니다');
			alert(message);
		}
	});
};


// 쪽지 읽기(보낸 쪽지)

message.readSendMsg = function() {
	
	$.ajax({
		url : 'ajax/message/msgContent.do',
		type : 'POST',
		dataType : 'json',
		data : {
			msgNo : message.msgNo
		},
		
		success : function(data){
			
			$('#readMsgDialog').remove();
			
			console.log('보낸 쪽지 읽기');
			console.log(data);
			
			console.log(data.message.recId);
			console.log(data.message.title);
			console.log(data.message.sendDate);
			console.log(data.message.content);
			
			var tagReadMsgPopupDiv = $('#readMsgPopupDiv');
			
			$('<div>').attr('id','readMsgDialog')
				.append($('<p>')
					.append($('<input>').attr('type','text').attr('id','memberId').addClass('msgInput').val(data.message.recId)))
				.append($('<p>')
					.append($('<input>').attr('type','text').attr('id','msgPopupTitle').addClass('msgInput').val(data.message.title)))
				.append($('<p>')
					.append($('<input>').attr('type','text').attr('id','msgPopupTime').addClass('msgInput').val($.datepicker.formatDate('yy-mm-dd', 
							new Date(data.message.sendDate)))))
				.append($('<p>')
					.append($('<textarea>').attr('id','msgContent').addClass('popupContent').val(data.message.content)))
			.appendTo(tagReadMsgPopupDiv);
			
		},
		error : function(xhr, status, message ){
			alert('메시지수신함 실패입니다');
			alert(message);
		}
	});
};


// 쪽지 읽기(받은 쪽지)
message.readRecMsg = function() {
	
	$.ajax({
		url : 'ajax/message/msgContent.do',
		type : 'POST',
		dataType : 'json',
		data : {
			msgNo : message.msgNo
		},
		
		success : function(data){
			
			$('#readMsgDialog').remove();
			
			console.log('받은 쪽지 읽기');
			console.log(data);
			
			console.log(data.message.sendId);
			console.log(data.message.title);
			console.log(data.message.sendDate);
			console.log(data.message.content);
			
			var tagReadMsgPopupDiv = $('#readMsgPopupDiv');
			
			$('<div>').attr('id','readMsgDialog')
				.append($('<p>')
					.append($('<input>').attr('type','text').attr('id','memberId').addClass('msgInput').val(data.message.sendId)))
				.append($('<p>')
					.append($('<input>').attr('type','text').attr('id','msgPopupTitle').addClass('msgInput').val(data.message.title)))
				.append($('<p>')
					.append($('<input>').attr('type','text').attr('id','msgPopupTime').addClass('msgInput').val($.datepicker.formatDate('yy-mm-dd', 
							new Date(data.message.sendDate)))))
				.append($('<p>')
					.append($('<textarea>').attr('id','msgContent').addClass('popupContent').val(data.message.content)))
			.appendTo(tagReadMsgPopupDiv);
				
		},
		error : function(xhr, status, message ){
			alert('메시지수신함 실패입니다');
			alert(message);
		}
	});
};

//시스템 메세지 내용 확인
message.readSysMsg = function() {
	
	$.ajax({
		url : 'ajax/message/sysMsgContent.do',
		type : 'POST',
		dataType : 'json',
		data : {
			msgNo : message.msgNo
		},
		
		success : function(data){
			
			
			$('#readMsgDialog').remove();
			
			console.log('시스템 받은 쪽지 읽기');
			console.log(data);
			
			console.log(data.message.sendId);
			console.log(data.message.title);
			console.log(data.message.sendDate);
			console.log(data.message.content);
			
			console.log(data);
			var tagReadMsgPopupDiv1 = $('#readMsgPopupDiv');
			
			$('<div>').attr('id','readMsgDialog')
				.append($('<p>')
					.append($('<input>').attr('type','text').attr('id','memberId').addClass('msgInput').val(data.message.sendId)))
				.append($('<p>')
					.append($('<input>').attr('type','text').attr('id','msgPopupTitle').addClass('msgInput').val(data.message.title)))
				.append($('<p>')
					.append($('<input>').attr('type','text').attr('id','msgPopupTime').addClass('msgInput').val($.datepicker.formatDate('yy-mm-dd', 
							new Date(data.message.sendDate)))))
				.append($('<p>')
					.append($('<textarea>').attr('id','msgContent').addClass('popupContent').val(data.message.content)))
			.appendTo(tagReadMsgPopupDiv1);
				
		},
		error : function(xhr, status, message ){
			alert('시스템 메시지수신함 실패입니다');
			alert(message);
		}
	});
};