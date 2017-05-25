var bookAcceptConD = {
		loaded : false
};

bookAcceptConD.init = function() {

   	this.initializing();

   	if (!this.loaded) { 
   		bookAcceptConD.acceptList();
   		bookAcceptConD.lendDeliveryList();

   	}
	
	console.log($(window).height());
	
	console.log($('.myPageBox').height());
	
	$('#keepingConditionLend').removeClass('reverse');
	$('#donationConditionLend').addClass('reverse');
	
	$('#content').on('mousedown', 'a.acceptListDBtn', function(event) {
		
		console.log('data-applyno' + $(this).attr('data-applyno'));
		indexGlobal.applyNo = $(this).attr('data-applyno');
		console.log('bookAcceptConD.applyNo : ' + indexGlobal.applyNo);
		indexGlobal.isbn = $(this).attr('data-isbn');
		console.log('bookAcceptConD.isbn : ' + indexGlobal.isbn);
		indexGlobal.rStatus = $(this).attr('data-rStatus'); 
		console.log('Rental Status : ' + indexGlobal.rStatus);
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

	$('#content').on('click', 'a.deliveryConfirmD', function(event) {
		
		console.log($(this).attr('data-applyno'));
		indexGlobal.applyNo = $(this).attr('data-applyno');
		indexGlobal.regCode = $(this).attr('data-regCode');
		
		bookAcceptConD.deliveryConfirm();
		
		event.stopImmediatePropagation();
	});
	
	$('#content').on('click', '#prevListD4', function(event) {
		event.preventDefault();
		if(bookAcceptConD.pageNo4 > 1) {
			bookAcceptConD.pageNo4--;
			bookAcceptConD.acceptList();
			
			event.stopImmediatePropagation();
		}
	});
	
	$('#content').on('click', '#nextListD4', function(event) {
		event.preventDefault();
		if(bookAcceptConD.pageNo4 < bookAcceptConD.totalPage4) {
			bookAcceptConD.pageNo4++;
			bookAcceptConD.acceptList();
			
			event.stopImmediatePropagation();
		}
	});
	
	$('#content').on('click', '#prevListD5', function(event) {
		event.preventDefault();
		if(bookAcceptConD.pageNo5 > 1) {
			bookAcceptConD.pageNo5--;
			bookAcceptConD.lendDeliveryList();
			
			event.stopImmediatePropagation();
		}
	});
	
	$('#content').on('click', '#nextListD5', function(event) {
		event.preventDefault();
		if(bookAcceptConD.pageNo5 < bookAcceptConD.totalPage5) {
			bookAcceptConD.pageNo5++;
			bookAcceptConD.lendDeliveryList();
			
			event.stopImmediatePropagation();
		}
	});
	
	$('#content').on('click', '#currPageNoD4', function(event) {
		event.preventDefault();
		bookAcceptConD.acceptList();
		
		event.stopImmediatePropagation();
	});
	
	$('#content').on('click', '#currPageNoD5', function(event) {
		event.preventDefault();
		bookAcceptConD.lendDeliveryList();
		
		event.stopImmediatePropagation();
	});
	
};


// 수락결정여부 현황 테이블

bookAcceptConD.acceptList = function() {
	
	if(bookAcceptConD.pageNo4 == undefined) {
		bookAcceptConD.pageNo4 = 1;
	}

	$.getJSON(
		'ajax/accept/acceptListD.do?pageNo=' +  bookAcceptConD.pageNo4,
		
		function(data) {
			
			console.log('수락결졍 여부 테이블 Data :::::::::::::::: ');
			console.log(data);
			bookAcceptConD.pageNo4 = data.pageNo;
			bookAcceptConD.recordCount4 = data.recordCount;
			bookAcceptConD.pageSize = data.pageSize;
			
			var totalPage4 = parseInt(bookAcceptConD.recordCount4 / bookAcceptConD.pageSize);
			if((bookAcceptConD.recordCount4 % bookAcceptConD.pageSize) > 0) {
				totalPage4++;
			}
			
			bookAcceptConD.totalPage4 = totalPage4;
			
			bookAcceptConD.acceptListClear();

			var acceptListAdd = $("#acceptList");
			
			for (var i in data.acceptList) {
				
				bookAcceptConD.ascAcL = data.acceptList[i].applyStatusCode;
				
				switch (bookAcceptConD.ascAcL) {
				
				case '1' :
					bookAcceptConD.ascAcL = $('<td>').append($('<a>', {
						text:'수락 대기',	
						href:'#popupPage',
						'data-isbn':data.acceptList[i].isbn,
						'data-applyNo':data.acceptList[i].applyNo,
						'data-rStatus' : data.acceptList[i].rentalStatus,
						'data-regCode' : data.acceptList[i].regCode
						}).addClass('wide')
					.addClass('acceptListDBtn') );
					
					break;
					
				case '2' :
					bookAcceptConD.ascAcL = $('<td>').text('수락');
					break;
					
				case '3' :
					bookAcceptConD.ascAcL = $('<td>').text('거절');
					break;
					
				case '4' :
					bookAcceptConD.ascAcL = $('<td>').text('대출 완료');
					break;
					
				}
				
				$("<tr>").addClass('acceptListTr').addClass('bookAcceptConTableTr')
						.append($('<td>').text($.datepicker.formatDate('yy-mm-dd',
						new Date(data.acceptList[i].applyDate))))
						.append( $('<td>').text(data.acceptList[i].id)
								.addClass('bookAcceptConAcLID') )
						.append( $('<td>').text(data.acceptList[i].title)
								.addClass('bookAcceptConAcLTitle') )
						.append( bookAcceptConD.ascAcL )
						.appendTo(acceptListAdd);
			}
			
			$('#currPageNoD4').text(bookAcceptConD.pageNo4);
		}
	);
};

// 수락도서 발송 현황 테이블

bookAcceptConD.lendDeliveryList = function() {

	if(bookAcceptConD.pageNo5 == undefined) {
		bookAcceptConD.pageNo5 = 1;
	}
	
	$.getJSON(
			
		'ajax/accept/lendDeliveryListD.do?pageNo=' + bookAcceptConD.pageNo5,
		
		function(data) {
			console.log('::::::::::::::수락도서 발송현황::::::::::::::');
			console.log(data);
			bookAcceptConD.pageNo5 = data.pageNo;
			bookAcceptConD.recordCount5 = data.recordCount;
			bookAcceptConD.pageSize = data.pageSize;
			
			var totalPage5 = parseInt(bookAcceptConD.recordCount5 / bookAcceptConD.pageSize);
			
			if((bookAcceptConD.recordCount5 % bookAcceptConD.pageSize5) > 0) {
				totalPage5++;
			}
			
			bookAcceptConD.totalPage5 = totalPage5;
			
			bookAcceptConD.lendDeliveryListClear();
			
			var lendDeliveryListAdd = $("#lendDeliveryList");
		
			for (var i in data.lendDeliveryList) {
				
				bookAcceptConD.dcLDL = data.lendDeliveryList[i].delCode;
				
				switch (bookAcceptConD.dcLDL) {
				
				case '1' :
					bookAcceptConD.dcLDL = $('<td>').append($('<a>', {
						text:'발송 준비',
						href:'#',
						'data-applyno':data.lendDeliveryList[i].applyNo,
						'data-regCode' : data.lendDeliveryList[i].regCode
						}).addClass('wide')
						.addClass('deliveryConfirmD') );
					
					break;
				case '2' :
					bookAcceptConD.dcLDL = $('<td>').text('발송 중');
					break;
				case '3' :
					bookAcceptConD.dcLDL = $('<td>').text('배송 완료');
					break;
				}
				
				console.log(data.lendDeliveryList);
				$("<tr>").addClass('lendDeliveryListTr').addClass('bookAcceptConTableTr')
						.append($('<td>').text($.datepicker.formatDate('yy-mm-dd',
						new Date(data.lendDeliveryList[i].assignDate))))
						.append($('<td>').text(data.lendDeliveryList[i].id)
								.addClass('bookAcceptConLdlID') )
						.append($('<td>').text(data.lendDeliveryList[i].title)
								.addClass('bookAcceptConLdlTitle') )
						.append(bookAcceptConD.dcLDL)
						.appendTo(lendDeliveryListAdd);
			}
			$('#currPageNoD5').text(bookAcceptConD.pageNo5);
		});
};

//my Page의 대여 현황에서 발송을 클릭하면 발생하는 이벤트
bookAcceptConD.deliveryConfirm = function() {
	
	console.log(indexGlobal.applyNo);
	
	$.ajax('ajax/accept/deliveryConfirmD.do', {
		type : 'GET',
		data : { applyNo : indexGlobal.applyNo },
		dataType : 'json',
		success : function () {
			
			console.log('발송 버튼 누른 후');
			
			bookAcceptConD.lendDeliveryList();
			window.alert('발송하였습니다.');
			
			console.log('발송 완료');
			
		},
		error : function(xhr, status, message) {
			window.alert('발송 실패입니다.');
			console.log(message);
		}
	});
};



/*테이블 초기화 -----------------------------------------------------------------------------------------------*/

/*테이블이 중복되서 append되지 않도록 로딩될 때마다 table 초기화*/

bookAcceptConD.initializing = function() {
	$( '.bookAcceptConTableTr' ).remove();
};


bookAcceptConD.acceptListClear = function() {
	$('.acceptListTr').remove();
};


bookAcceptConD.lendDeliveryListClear = function() {
	$('.lendDeliveryListTr').remove();
};
