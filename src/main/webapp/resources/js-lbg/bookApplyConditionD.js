var bookApplyConD = {
		loaded : false
};

bookApplyConD.init = function() {
   	
	bookApplyConD.initializing();
	
	if(!this.loaded) {
		bookApplyConD.applyList();
		bookApplyConD.borrowDeliveryList();
		bookApplyConD.borrowList();
	}
	
	console.log($(window).height());
	
	console.log($('.myPageBox').height());
	
	$('#keepingConditionBorrow').removeClass('reverse');
	$('#donationConditionBorrow').addClass('reverse');

	$('#content').on('click', 'a.receiveDoneDBtn', function(event) {
		
		console.log($(this).attr('data-delno'));
		indexGlobal.delNo = $(this).attr('data-delno');
		indexGlobal.regCode = $(this).attr('data-regCode');
		indexGlobal.isbn = $(this).attr('data-isbn');
		
		bookApplyConD.receiveDone();
		
		event.stopImmediatePropagation();
	});
	
	$('#content').on('click', 'a.readCompleteDBtn', function(event) {
		
		console.log($(this).attr('data-delno'));
		indexGlobal.delNo = $(this).attr('data-delno');
		indexGlobal.pbn = $(this).attr('data-pbn');
		indexGlobal.regCode = $(this).attr('data-regCode');
		
		bookApplyConD.readCompleteDBtn();
		
		event.stopImmediatePropagation();
	});
	
	$('#content').on('click', '#prevListD1', function(event) {
		event.preventDefault();
		if(bookApplyConD.pageNo1 > 1) {
			bookApplyConD.pageNo1--;
			bookApplyConD.applyList();
			
			event.stopImmediatePropagation();
		}
	});
	
	$('#content').on('click', '#nextListD1', function(event) {
		event.preventDefault();
		if(bookApplyConD.pageNo1 < bookApplyConD.totalPage1) {
			bookApplyConD.pageNo1++;
			bookApplyConD.applyList();
			
			event.stopImmediatePropagation();
		}
	});
	
	$('#content').on('click', '#prevListD2', function(event) {
		event.preventDefault();
		if(bookApplyConD.pageNo2 > 1) {
			bookApplyConD.pageNo2--;
			bookApplyConD.borrowDeliveryList();
			
			event.stopImmediatePropagation();
		}
	});
	
	$('#content').on('click', '#nextListD2', function(event) {
		event.preventDefault();
		if(bookApplyConD.pageNo2 < bookApplyConD.totalPage2) {
			bookApplyConD.pageNo2++;
			bookApplyConD.borrowDeliveryList();
			
			event.stopImmediatePropagation();
		}
	});
	
	$('#content').on('click', '#prevListD3', function(event) {
		event.preventDefault();
		if(bookApplyConD.pageNo3 > 1) {
			bookApplyConD.pageNo3--;
			bookApplyConD.borrowList();
			
			event.stopImmediatePropagation();
		}
	});
	
	$('#content').on('click', '#nextListD3', function(event) {
		event.preventDefault();
		if(bookApplyConD.pageNo3 < bookApplyConD.totalPage3) {
			bookApplyConD.pageNo3++;
			bookApplyConD.borrowList();
			
			event.stopImmediatePropagation();
		}
	});
	
	$('#content').on('click', '#currPageNoD1', function(event) {
		event.preventDefault();
		bookApplyConD.applyList();
		
		event.stopImmediatePropagation();
	});
	
	$('#content').on('click', '#currPageNoD2', function(event) {
		event.preventDefault();
		bookApplyConD.borrowDeliveryList();
		
		event.stopImmediatePropagation();
	});
	
	$('#content').on('click', '#currPageNoD3', function(event) {
		event.preventDefault();
		bookApplyConD.borrowList();
		
		event.stopImmediatePropagation();
	});

};

// 내가 빌린 책(기부) 신청도서 수락/거부 현황 테이블
bookApplyConD.applyList = function() {
	
	if(bookApplyConD.pageNo1 == undefined) {
		bookApplyConD.pageNo1 = 1;
	}

	$.getJSON(
			'ajax/delivery/applyListD.do?pageNo=' + bookApplyConD.pageNo1,
			
			function(data) {
				console.log('applyList 수락/거부 현황 테이블 / 신청 첫 테이블');
				console.log(data);
				console.log('applyList 수락/거부 현황 테이블 / 신청 첫 테이블');
				bookApplyConD.pageNo1 = data.pageNo;
				bookApplyConD.recordCount1 = data.recordCount;
				bookApplyConD.pageSize = data.pageSize;
				
				var totalPage1 = parseInt(bookApplyConD.recordCount1 / bookApplyConD.pageSize);
				if((bookApplyConD.recordCount1 % bookApplyConD.pageSize) > 0) {
					totalPage1++;
				}
				
				bookApplyConD.totalPage1 = totalPage1;
				
				bookApplyConD.applyListClear();

			var applyListAdd = $("#applyList");
			var i = null;
			
			for (i in data.applyList) {
				
				bookApplyConD.ascApL = data.applyList[i].applyStatusCode;
				
				switch (bookApplyConD.ascApL) {
				case '1' :
					bookApplyConD.ascApL = '신청 중';
					break;
				case '2' :
					bookApplyConD.ascApL = '수락';
					break;
				case '3' :
					bookApplyConD.ascApL = '거절';
					break;
				case '4' :
					bookApplyConD.ascApL = '대출 완료';
					break;
				}
				
				$("<tr>").addClass('applyListTr').addClass('bookApplyConTableTr')
						.append($('<td>').text($.datepicker.formatDate('yy-mm-dd',
						new Date(data.applyList[i].applyDate))))
						.append($('<td>').text(data.applyList[i].id)
								.addClass('bookApplyConApLID') )
						.append($('<td>').text(data.applyList[i].title)
								.addClass('bookApplyConApLTitle') )
						.append($('<td>').text(bookApplyConD.ascApL))
						.appendTo(applyListAdd);
						
			}
			$('#currPageNoD1').text(bookApplyConD.pageNo1);
		}
			
	);		
};

// 내가 빌린 책(기부) 신청도서 배송 현황 테이블	
bookApplyConD.borrowDeliveryList = function() {
	
	if(bookApplyConD.pageNo2 == undefined) {
		bookApplyConD.pageNo2 = 1;
	}

	$.getJSON(
			'ajax/delivery/borrowDeliveryListD.do?pageNo=' + bookApplyConD.pageNo2,
			
		function(data) {
			console.log('신청도서 배송현황 테이블 / 신청 가운데 테이블');	
			console.log(data);
			console.log('신청도서 배송현황 테이블 / 신청 가운데 테이블 끝');
			bookApplyConD.pageNo2 = data.pageNo;
			bookApplyConD.recordCount2 = data.recordCount;
			bookApplyConD.pageSize = data.pageSize;
			
			var totalPage2 = parseInt(bookApplyConD.recordCount2 / bookApplyConD.pageSize);
			if((bookApplyConD.recordCount2 % bookApplyConD.pageSize) > 0) {
				totalPage2++;
			}
			bookApplyConD.totalPage2 = totalPage2;
			bookApplyConD.deliveryListClear();
				
			var borrowDeliveryListAdd = $("#borrowDeliveryList");
			
			var deliveryDate = null
			
			for (i in data.borrowDeliveryList) {
				
				if(data.borrowDeliveryList[i].sendDate == null) {
					deliveryDate = '배송준비 중';
				} else {
					deliveryDate = $.datepicker.formatDate('yy-mm-dd',
							new Date(data.borrowDeliveryList[i].sendDate));
				}
				
				bookApplyConD.dcBdl = data.borrowDeliveryList[i].delCode;
				
				switch (bookApplyConD.dcBdl) {
				case '1' :
					bookApplyConD.bLTd = $('<td>').text('배송 준비 중');
					break;
					
				case '2' :
					bookApplyConD.bLTd = $('<td>').append($('<a>', {
						text:'수취',
						href:'#',
						'data-delno':data.borrowDeliveryList[i].delNo,
						'data-isbn' :data.borrowDeliveryList[i].isbn,
						'data-regCode' :data.borrowDeliveryList[i].regCode,
					}).addClass('receiveDoneDBtn').addClass('wide') );
					break;
					
				case '3' :
					bookApplyConD.bLTd = $('<td>').text('수취 완료');
					
					break;
				}
				
				$("<tr>").addClass('borrowDeliveryListTr').addClass('bookApplyConTableTr')
						.append($('<td>').text(deliveryDate))
						.append($('<td>').text(data.borrowDeliveryList[i].id)
								.addClass('bookApplyConBdlID') )
						.append($('<td>').text(data.borrowDeliveryList[i].title)
								.addClass('bookApplyConBdlTitle') )
						.append(bookApplyConD.bLTd)
						.appendTo(borrowDeliveryListAdd);
			}
			
			$('#currPageNoD2').text(bookApplyConD.pageNo2);
		});
};

//내가 빌린 책(기부) 배송 현황에서 수취를 클릭했을 때 발생하는 이벤트를 위한 함수
bookApplyConD.receiveDone = function() {
	
	$.ajax('ajax/delivery/receiveDoneD.do', {
		
		type :'POST',
		data : {
			delNo : indexGlobal.delNo,
			isbn : indexGlobal.isbn
		},
		
		dataType : 'json',
		
		success : function(data) {
			console.log('수취시 불러오는 data');
			console.log(data);
			window.alert('수취 완료되었습니다.');
			bookApplyConD.borrowDeliveryList();
			bookApplyConD.borrowList();
		},
		error : function(xhr, status, message) {
			window.alert('수취 실패입니다.');
			console.log(message);
		}
	});
};

//내가 빌린 책(나눔) 도서 현황 테이블
bookApplyConD.borrowList = function() {
	
	if(bookApplyConD.pageNo3 == undefined) {
		bookApplyConD.pageNo3 = 1;
	}

	$.getJSON(
			'ajax/delivery/borrowListD.do?pageNo=' + bookApplyConD.pageNo3,
			
		function(data) {
			console.log('신청도서 반납 현황 테이블 / 신청 세번째 테이블');
			console.log(data);
			console.log('applyList 수락/거부 현황 테이블 / 신청 세번째 테이블 끝');
			bookApplyConD.pageNo3 = data.pageNo;
			bookApplyConD.recordCount3 = data.recordCount;
			bookApplyConD.pageSize = data.pageSize;
			
			var totalPage3 = parseInt(bookApplyConD.recordCount3 / bookApplyConD.pageSize);
			if((bookApplyConD.recordCount3 % bookApplyConD.pageSize) > 0) {
				totalPage3++;
			}
			
			bookApplyConD.totalPage3 = totalPage3;
			
			bookApplyConD.borrowListClear();
				
				
			var borrowListAdd = $("#borrowList");
	
			for (var i in data.borrowList) {
				
				bookApplyConD.rSts = data.borrowList[i].rentalStatus;
				
				switch (bookApplyConD.rSts) {
				
				case '1' :
					bookApplyConD.rSts = $('<td>').text('나눔 가능');
					break;
				
				case '3' :
					bookApplyConD.rSts = $('<td>').append($('<a>', {
						text:'독서 완료',
						href:'#',
						'data-delno':data.borrowList[i].delNo,
						'data-pbn' :data.borrowList[i].persBookNo,
						'data-regCode' : data.borrowList[i].regCode
					}).addClass('readCompleteDBtn').addClass('wide') );
					
					break;
					
				case '4' :
					bookApplyConD.rSts = $('<td>').text('나눔 완료');
					break;
				}
				
//				$("<tr>").addClass('borrowListTr').addClass('bookApplyConTableTr')
//						.append($('<td>').text($.datepicker.formatDate('yy-mm-dd',
//						new Date(data.borrowList[i].recDate))))
//						.append($('<td>').text(data.borrowList[i].id)
//								.addClass('bookApplyConBlID') )
//						.append($('<td>').text(data.borrowList[i].title)
//								.addClass('bookApplyConBlTitle') )
//						.append(bookApplyConD.dcBl)
//						.appendTo(borrowListAdd);
				
				$("<tr>").addClass('borrowListTr').addClass('bookApplyConTableTr')
				.append($('<td>').text(data.borrowList[i].id)
						.addClass('bookApplyConBlID') )
				.append($('<td>').text(data.borrowList[i].title)
						.addClass('bookApplyConBlTitle') )
				.append(bookApplyConD.rSts)
				.appendTo(borrowListAdd);
			}
			$('#currPageNoD3').text(bookApplyConD.pageNo3);
		}
	);
};

// 나눔 도서 대출 현황에서 독서 완료를 클릭했을 때 발생하는 이벤트를 위한 함수
bookApplyConD.readCompleteDBtn = function() {
	
	console.log(indexGlobal.pbn);

	$.ajax('ajax/delivery/readCompleteD.do', {
		
		type :'POST',
		data : {
//			regCode : indexGlobal.regCode,
			persBookNo : indexGlobal.pbn
		},
		
		dataType : 'json',
		
		success : function(data) {
			console.log('반납 신청시 불러오는 data');
			console.log(data);
			
			bookApplyConD.borrowList();
			
			window.alert('즐거운 독서가 되셨나요.');
		},
		error : function(xhr, status, message) {
			window.alert('수취 실패입니다.');
			console.log(message);
		}
	});
};



/*테이블 초기화 -----------------------------------------------------------------------------------------------*/

/*테이블이 중복되서 append되지 않도록 로딩될 때마다 table 초기화*/

bookApplyConD.initializing = function() {
	$( '.bookApplyConTableTr' ).remove();
};


bookApplyConD.applyListClear = function() {
	$('.applyListTr').remove();
};


bookApplyConD.deliveryListClear = function() {
	$('.borrowDeliveryListTr').remove();
};


bookApplyConD.borrowListClear = function() {
	$('.borrowListTr').remove();
};