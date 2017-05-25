var bookAcceptCon = {
		loaded : false
};

bookAcceptCon.init = function() {

   	this.initializing();
   	
   	if(!this.loaded) {
   		bookAcceptCon.acceptList();
   		bookAcceptCon.lendDeliveryList();
   		bookAcceptCon.lendList();
   	}
	
	console.log($(window).height());
	
	console.log($('.myPageBox').height());
	
	$('#donationConditionLend').removeClass('reverse');
	$('#keepingConditionLend').addClass('reverse');
	
	$('#content').on('mousedown', 'a.acceptListBtn', function(event) {
		
		console.log($(this).attr('data-applyno'));
		indexGlobal.applyNo = $(this).attr('data-applyno');
		indexGlobal.isbn = $(this).attr('data-isbn');
		indexGlobal.rStatus = $(this).attr('data-rStatus');
		indexGlobal.regCode = $(this).attr('data-regCode');
		console.log('indexGlobal.regCode : ' + indexGlobal.regCode);
		
		$('.tmpDiv').empty();
		
		$('.tmpDiv').load('pages/accept/acceptPagePopup.html');
		
		acceptPagePopup.init();
		
		$(this).fancybox({
			helpers :{
				overlay : {
					locked : false
				}
			},
			'scrolling'		: 'no',
			'titleShow'		: false,
			'width'			: 920,
			'height'		: 500,
			'autoSize'		: false,
			'opacity'		: true,
			'transitionIn'	: 'elastic',
			'transitionOut'	: 'elastic',
			'speedIn'		: 600, 
			'speedOut'		: 200, 
			'overlayShow'	: false
			
		});
		
		event.stopImmediatePropagation();
	});

	$('#content').on('click', 'a.deliveryConfirm', function(event) {
		
		console.log($(this).attr('data-applyno'));
		bookAcceptCon.applyNo = $(this).attr('data-applyno');
		indexGlobal.regCode = $(this).attr('data-regCode');
		
		bookAcceptCon.deliveryConfirm();
		
		event.stopImmediatePropagation();
	});
	
	$('#content').on('click', 'a.returnComplConfirm', function(event) {
		
		console.log($(this).attr('data-applyno'));
		bookAcceptCon.applyNo = $(this).attr('data-applyno');
		indexGlobal.regCode = $(this).attr('data-regCode');
		
		bookAcceptCon.returnComplConfirm();
		
		event.stopImmediatePropagation();
	});
	
	$('#content').on('click', '#prevList4', function(event) {
		event.preventDefault();
		if(bookAcceptCon.pageNo4 > 1) {
			bookAcceptCon.pageNo4--;
			bookAcceptCon.acceptList();
			
			event.stopImmediatePropagation();
		}
	});
	
	$('#content').on('click', '#nextList4', function(event) {
		event.preventDefault();
		if(bookAcceptCon.pageNo4 < bookAcceptCon.totalPage4) {
			bookAcceptCon.pageNo4++;
			bookAcceptCon.acceptList();
			
			event.stopImmediatePropagation();
		}
	});
	
	$('#content').on('click', '#prevList5', function(event) {
		event.preventDefault();
		if(bookAcceptCon.pageNo5 > 1) {
			bookAcceptCon.pageNo5--;
			bookAcceptCon.lendDeliveryList();
			
			event.stopImmediatePropagation();
		}
	});
	
	$('#content').on('click', '#nextList5', function(event) {
		event.preventDefault();
		if(bookAcceptCon.pageNo5 < bookAcceptCon.totalPage5) {
			bookAcceptCon.pageNo5++;
			bookAcceptCon.lendDeliveryList();
			
			event.stopImmediatePropagation();
		}
	});
	
	$('#content').on('click', '#prevList6', function(event) {
		event.preventDefault();
		if(bookAcceptCon.pageNo6 > 1) {
			bookAcceptCon.pageNo6--;
			bookAcceptCon.lendList();
			
			event.stopImmediatePropagation();
		}
	});
	
	
	$('#content').on('click', '#nextList6', function(event) {
		event.preventDefault();
		if(bookAcceptCon.pageNo6 < bookAcceptCon.totalPage6) {
			bookAcceptCon.pageNo6++;
			bookAcceptCon.lendList();
			
			event.stopImmediatePropagation();
		}
	});
	
	$('#content').on('click', '#currPageNo4', function(event) {
		event.preventDefault();
		bookAcceptCon.acceptList();
		
		event.stopImmediatePropagation();
	});
	
	$('#content').on('click', '#currPageNo5', function(event) {
		event.preventDefault();
		bookAcceptCon.lendDeliveryList();
		
		event.stopImmediatePropagation();
	});
	
	$('#content').on('click', '#currPageNo6', function(event) {
		event.preventDefault();
		bookAcceptCon.lendList();
		
		event.stopImmediatePropagation();
	});
	
};


// 수락결정여부 현황 테이블

bookAcceptCon.acceptList = function() {
	
	if(bookAcceptCon.pageNo4 == undefined) {
		bookAcceptCon.pageNo4 = 1;
	}

	$.getJSON(
		'ajax/accept/acceptList.do?pageNo=' +  bookAcceptCon.pageNo4,
		
		function(data) {
			
			console.log('수락결졍 여부 테이블 Data :::::::::::::::: ');
			console.log(data);
			bookAcceptCon.pageNo4 = data.pageNo;
			bookAcceptCon.recordCount4 = data.recordCount;
			bookAcceptCon.pageSize = data.pageSize;
			
			var totalPage4 = parseInt(bookAcceptCon.recordCount4 / bookAcceptCon.pageSize);
			if((bookAcceptCon.recordCount4 % bookAcceptCon.pageSize) > 0) {
				totalPage4++;
			}
			
			bookAcceptCon.totalPage4 = totalPage4;
			
			bookAcceptCon.acceptListClear();

			var acceptListAdd = $("#acceptList");
			
			for (var i in data.acceptList) {
				
				bookAcceptCon.ascAcL = data.acceptList[i].applyStatusCode;
				
				switch (bookAcceptCon.ascAcL) {
				
				case '1' :
					bookAcceptCon.ascAcL = $('<td>').append($('<a>', {
						text:'수락 대기',	
						href:'#popupPage',
						'data-isbn':data.acceptList[i].isbn,
						'data-applyNo':data.acceptList[i].applyNo,
						'data-rStatus':data.acceptList[i].rentalStatus,
						'data-regCode' :data.acceptList[i].regCode}).addClass('wide')
					.addClass('acceptListBtn') );
					
					break;
				
//				case '1' :
//					bookAcceptCon.ascAcL = $('<td>').text('수락대기', {
//						'data-isbn':data.acceptList[i].isbn,
//						'data-applyNo':data.acceptList[i].applyNo,
//						'data-rStatus':data.acceptList[i].rentalStatus,
//						'data-regCode' :data.acceptList[i].regCode})
//					.addClass('acceptListBtn').addClass('tableTdBtn').css('background-color', '#DE31F5');
//					
//					break;
					
				case '2' :
					bookAcceptCon.ascAcL = $('<td>').text('수락');
					break;
					
				case '3' :
					bookAcceptCon.ascAcL = $('<td>').text('거절');
					break;
					
				case '4' :
					bookAcceptCon.ascAcL = $('<td>').text('대출 완료');
					break;
					
				}
				
				$("<tr>").addClass('acceptListTr').addClass('bookAcceptConTableTr')
						.append($('<td>').text($.datepicker.formatDate('yy-mm-dd',
						new Date(data.acceptList[i].applyDate))))
						.append( $('<td>').text(data.acceptList[i].id)
								.addClass('bookAcceptConAcLID') )
						.append( $('<td>').text(data.acceptList[i].title)
								.addClass('bookAcceptConAcLTitle') )
						.append( bookAcceptCon.ascAcL )
						.appendTo(acceptListAdd);
			}
			
			$('#currPageNo4').text(bookAcceptCon.pageNo4);
		}
	);
};

// 수락도서 발송 현황 테이블

bookAcceptCon.lendDeliveryList = function() {

	if(bookAcceptCon.pageNo5 == undefined) {
		bookAcceptCon.pageNo5 = 1;
	}
	
	$.getJSON(
			
		'ajax/accept/lendDeliveryList.do?pageNo=' + bookAcceptCon.pageNo5,
		
		function(data) {
			console.log('::::::::::::::수락도서 발송현황::::::::::::::');
			console.log(data);
			bookAcceptCon.pageNo5 = data.pageNo;
			bookAcceptCon.recordCount5 = data.recordCount;
			bookAcceptCon.pageSize = data.pageSize;
			
			var totalPage5 = parseInt(bookAcceptCon.recordCount5 / bookAcceptCon.pageSize);
			
			if((bookAcceptCon.recordCount5 % bookAcceptCon.pageSize5) > 0) {
				totalPage5++;
			}
			
			bookAcceptCon.totalPage5 = totalPage5;
			
			bookAcceptCon.lendDeliveryListClear();
			
			var lendDeliveryListAdd = $("#lendDeliveryList");
		
			for (var i in data.lendDeliveryList) {
				
				bookAcceptCon.dcLDL = data.lendDeliveryList[i].delCode;
				
				switch (bookAcceptCon.dcLDL) {
				
				case '1' :
					bookAcceptCon.dcLDL = $('<td>').append($('<a>', {
						text:'발송 준비',
						href:'#',
						'data-applyno':data.lendDeliveryList[i].applyNo})
						.addClass('deliveryConfirm').addClass('wide') );
					
					break;
				case '2' :
					bookAcceptCon.dcLDL = $('<td>').text('발송 중');
					break;
				case '3' :
					bookAcceptCon.dcLDL = $('<td>').text('배송 완료');
					break;
				}
				
				$("<tr>").addClass('lendDeliveryListTr').addClass('bookAcceptConTableTr')
						.append($('<td>').text($.datepicker.formatDate('yy-mm-dd',
						new Date(data.lendDeliveryList[i].assignDate))))
						.append($('<td>').text(data.lendDeliveryList[i].id)
								.addClass('bookAcceptConLdlID') )
						.append($('<td>').text(data.lendDeliveryList[i].title)
								.addClass('bookAcceptConLdlTitle') )
						.append(bookAcceptCon.dcLDL)
						.appendTo(lendDeliveryListAdd);
			}
			$('#currPageNo5').text(bookAcceptCon.pageNo5);
		});
};

//my Page의 대여 현황에서 발송을 클릭하면 발생하는 이벤트
bookAcceptCon.deliveryConfirm = function() {
	
	console.log(bookAcceptCon.applyNo);
	
	$.ajax('ajax/accept/deliveryConfirm.do', {
		type : 'GET',
		data : { applyNo : bookAcceptCon.applyNo },
		dataType : 'json',
		success : function () {
			
			bookAcceptCon.lendDeliveryList();
			window.alert('발송하였습니다.');
			
		},
		error : function(xhr, status, message) {
			window.alert('발송 실패입니다.');
			console.log(message);
		}
	});
};

// MyPage내 수락도서 회수 현황 테이블
bookAcceptCon.lendList = function() {
	
	if(bookAcceptCon.pageNo6 == undefined) {
		bookAcceptCon.pageNo6 = 1;
	}

	$.getJSON(
			'ajax/accept/lendList.do?pageNo=' +  bookAcceptCon.pageNo6,
		function(data) {
				console.log('lendList');
				console.log(data);
				
				bookAcceptCon.pageNo6 = data.pageNo;
				bookAcceptCon.recordCount6 = data.recordCount;
				bookAcceptCon.pageSize6 = data.pageSize;
				
				var totalPage6 = parseInt(bookAcceptCon.recordCount6 / bookAcceptCon.pageSize);
				
				if((bookAcceptCon.recordCount6 % bookAcceptCon.pageSize) > 0) {
					totalPage6++;
				}
				
				bookAcceptCon.totalPage6 = totalPage6;
				
				bookAcceptCon.lendListClear();
				
			var lendListAdd = $("#lendList");
			
			for (var i in data.lendList) {
				
				bookAcceptCon.dcLL = data.lendList[i].delCode;
				
				switch (bookAcceptCon.dcLL) {
				case '3' :
					bookAcceptCon.dcLL = $('<td>').text('대출 중');
					break;
				case '4' :
					bookAcceptCon.dcLL = $('<td>').append($('<a>', {
						text:'반납 확인',
						href:'#',
						'data-applyno':data.lendList[i].applyNo})
						.addClass('returnComplConfirm').addClass('wide'));
					break;
				case '5' :
					bookAcceptCon.dcLL = $('<td>').text('반납 완료');
					break;
				}
				
				$("<tr>").addClass('lendListTr').addClass('bookAcceptConTableTr')
						.append($('<td>').text($.datepicker.formatDate('yy-mm-dd',
						new Date(data.lendList[i].recDate))))
						.append($('<td>').text(data.lendList[i].id)
								.addClass('bookAcceptConLlID') )
						.append($('<td>').text(data.lendList[i].title)
								.addClass('bookAcceptConLlTitle') )
						.append(bookAcceptCon.dcLL)
				.appendTo(lendListAdd);
			}
			$('#currPageNo6').text(bookAcceptCon.pageNo6);
		});
};

//my Page의 대여 현황에서 회수완료를 클릭하면 발생하는 이벤트
bookAcceptCon.returnComplConfirm = function() {
	
	console.log(bookAcceptCon.applyNo);
	
	$.ajax('ajax/accept/returnComplConfirm.do', {
		type : 'GET',
		data : { applyNo : bookAcceptCon.applyNo },
		dataType : 'json',
		success : function (data) {
			
			bookAcceptCon.acceptListClear();
			bookAcceptCon.acceptList();
			bookAcceptCon.lendListClear();
			bookAcceptCon.lendList();
			window.alert('반납완료 처리하였습니다.');
			
		},
		error : function(xhr, status, message) {
			window.alert('반납완료 실패입니다.');
			console.log(message);
		}
	});
};



/*테이블 초기화 -----------------------------------------------------------------------------------------------*/

/*테이블이 중복되서 append되지 않도록 로딩될 때마다 table 초기화*/

bookAcceptCon.initializing = function() {
	$( '.bookAcceptConTableTr' ).remove();
};


bookAcceptCon.acceptListClear = function() {
	$('.acceptListTr').remove();
};


bookAcceptCon.lendDeliveryListClear = function() {
	$('.lendDeliveryListTr').remove();
};


bookAcceptCon.lendListClear = function() {
	$('.lendListTr').remove();
};