var bookApplyCon = {
		loaded : false
};

bookApplyCon.init = function() {
   	
	bookApplyCon.initializing();
	
	if (!this.loaded) {
		bookApplyCon.applyList();
		bookApplyCon.borrowDeliveryList();
		bookApplyCon.borrowList();
	}
	
	console.log($(window).height());
	
	console.log($('.myPageBox').height());
	
	$('#donationConditionBorrow').removeClass('reverse');
	$('#keepingConditionBorrow').addClass('reverse');
	
	$('#content').on('click', 'a.receiveDoneBtn', function(event) {
		
		console.log($(this).attr('data-delno'));
		indexGlobal.delNo = $(this).attr('data-delno');
		indexGlobal.regCode = $(this).attr('data-regCode');
		
		bookApplyCon.receiveDone();
		
		event.stopImmediatePropagation();
	});
	
	$('#content').on('click', 'a.returnApplyBtn', function(event) {
		
		console.log($(this).attr('data-delno'));
		indexGlobal.delNo = $(this).attr('data-delno');
		indexGlobal.regCode = $(this).attr('data-regCode');
		
		bookApplyCon.returnApply();
		
		event.stopImmediatePropagation();
	});
	
	$('#content').on('click', '#prevList1', function(event) {
		event.preventDefault();
		if(bookApplyCon.pageNo1 > 1) {
			bookApplyCon.pageNo1--;
			bookApplyCon.applyList();
			
			event.stopImmediatePropagation();
		}
	});
	
	$('#content').on('click', '#nextList1', function(event) {
		event.preventDefault();
		if(bookApplyCon.pageNo1 < bookApplyCon.totalPage1) {
			bookApplyCon.pageNo1++;
			bookApplyCon.applyList();
			
			event.stopImmediatePropagation();
		}
	});
	
	$('#content').on('click', '#prevList2', function(event) {
		event.preventDefault();
		if(bookApplyCon.pageNo2 > 1) {
			bookApplyCon.pageNo2--;
			bookApplyCon.borrowDeliveryList();
			
			event.stopImmediatePropagation();
		}
	});
	
	$('#content').on('click', '#nextList2', function(event) {
		event.preventDefault();
		if(bookApplyCon.pageNo2 < bookApplyCon.totalPage2) {
			bookApplyCon.pageNo2++;
			bookApplyCon.borrowDeliveryList();
			
			event.stopImmediatePropagation();
		}
	});
	
	$('#content').on('click', '#prevList3', function(event) {
		event.preventDefault();
		if(bookApplyCon.pageNo3 > 1) {
			bookApplyCon.pageNo3--;
			bookApplyCon.borrowList();
			
			event.stopImmediatePropagation();
		}
	});
	
	$('#content').on('click', '#nextList3', function(event) {
		event.preventDefault();
		if(bookApplyCon.pageNo3 < bookApplyCon.totalPage3) {
			bookApplyCon.pageNo3++;
			bookApplyCon.borrowList();
			
			event.stopImmediatePropagation();
		}
	});
	
	$('#content').on('click', '#currPageNo1', function(event) {
		event.preventDefault();
		bookApplyCon.applyList();
		
		event.stopImmediatePropagation();
	});
	
	$('#content').on('click', '#currPageNo2', function(event) {
		event.preventDefault();
		bookApplyCon.borrowDeliveryList();
		
		event.stopImmediatePropagation();
	});
	
	$('#content').on('click', '#currPageNo3', function(event) {
		event.preventDefault();
		bookApplyCon.borrowList();
		
		event.stopImmediatePropagation();
	});

};

// 내가 빌린 책(보관) 신청도서 수락/거부 현황 테이블
bookApplyCon.applyList = function() {
	
	if(bookApplyCon.pageNo1 == undefined) {
		bookApplyCon.pageNo1 = 1;
	}

	$.getJSON(
			'ajax/delivery/applyList.do?pageNo=' + bookApplyCon.pageNo1,
			
			function(data) {
				console.log('applyList 수락/거부 현황 테이블 / 신청 첫 테이블');
				console.log(data);
				console.log('applyList 수락/거부 현황 테이블 / 신청 첫 테이블');
				bookApplyCon.pageNo1 = data.pageNo;
				bookApplyCon.recordCount1 = data.recordCount;
				bookApplyCon.pageSize = data.pageSize;
				
				var totalPage1 = parseInt(bookApplyCon.recordCount1 / bookApplyCon.pageSize);
				if((bookApplyCon.recordCount1 % bookApplyCon.pageSize) > 0) {
					totalPage1++;
				}
				
				bookApplyCon.totalPage1 = totalPage1;
				
				bookApplyCon.applyListClear();

			var applyListAdd = $("#applyList");
			var i = null;
			
			for (i in data.applyList) {
				
				bookApplyCon.ascApL = data.applyList[i].applyStatusCode;
				
				switch (bookApplyCon.ascApL) {
				case '1' :
					bookApplyCon.ascApL = '신청 중';
					break;
				case '2' :
					bookApplyCon.ascApL = '수락';
					break;
				case '3' :
					bookApplyCon.ascApL = '거절';
					break;
				case '4' :
					bookApplyCon.ascApL = '대출 완료';
					break;
				}
				
				$("<tr>").addClass('applyListTr').addClass('bookApplyConTableTr')
						.append($('<td>').text($.datepicker.formatDate('yy-mm-dd',
						new Date(data.applyList[i].applyDate))))
						.append($('<td>').text(data.applyList[i].id)
								.addClass('bookApplyConApLID') )
						.append($('<td>').text(data.applyList[i].title)
								.addClass('bookApplyConApLTitle') )
						.append($('<td>').text(bookApplyCon.ascApL))
						.appendTo(applyListAdd);
						
			}
			$('#currPageNo1').text(bookApplyCon.pageNo1);
		}
			
	);		
};

// 내가 빌린 책(신청) 신청도서 배송 현황 테이블	
bookApplyCon.borrowDeliveryList = function() {
	
	if(bookApplyCon.pageNo2 == undefined) {
		bookApplyCon.pageNo2 = 1;
	}
	
	

	$.getJSON(
			'ajax/delivery/borrowDeliveryList.do?pageNo=' + bookApplyCon.pageNo2,
			
		function(data) {
			console.log('신청도서 배송현황 테이블 / 신청 가운데 테이블');	
			console.log(data);
			console.log('신청도서 배송현황 테이블 / 신청 가운데 테이블 끝');
			bookApplyCon.pageNo2 = data.pageNo;
			bookApplyCon.recordCount2 = data.recordCount;
			bookApplyCon.pageSize = data.pageSize;
			
			var totalPage2 = parseInt(bookApplyCon.recordCount2 / bookApplyCon.pageSize);
			if((bookApplyCon.recordCount2 % bookApplyCon.pageSize) > 0) {
				totalPage2++;
			}
			bookApplyCon.totalPage2 = totalPage2;
			bookApplyCon.deliveryListClear();
				
			var borrowDeliveryListAdd = $("#borrowDeliveryList");
			
			var deliveryDate = null
			
			for (i in data.borrowDeliveryList) {
				
				
				if(data.borrowDeliveryList[i].sendDate == null) {
					deliveryDate = '배송준비 중';
				} else {
					deliveryDate = $.datepicker.formatDate('yy-mm-dd',
							new Date(data.borrowDeliveryList[i].sendDate));
				}
				
				bookApplyCon.dcBdl = data.borrowDeliveryList[i].delCode;
				
				switch (bookApplyCon.dcBdl) {
				case '1' :
					bookApplyCon.bLTd = $('<td>').text('배송 준비 중');
					break;
				case '2' :
					bookApplyCon.bLTd = $('<td>').append($('<a>', {
						text:'수취',
						href:'#',
						'data-delno':data.borrowDeliveryList[i].delNo,
						'data-regCode' : data.borrowDeliveryList[i].regCode
					}).addClass('receiveDoneBtn').addClass('wide') );
					break;
				case '3' :
					bookApplyCon.bLTd = $('<td>').text('수취 완료');
					
					break;
				}
				
				$("<tr>").addClass('borrowDeliveryListTr').addClass('bookApplyConTableTr')
						.append($('<td>').text(deliveryDate))
						.append($('<td>').text(data.borrowDeliveryList[i].id)
								.addClass('bookApplyConBdlID') )
						.append($('<td>').text(data.borrowDeliveryList[i].title)
								.addClass('bookApplyConBdlTitle') )
						.append(bookApplyCon.bLTd)
						.appendTo(borrowDeliveryListAdd);
			}
			
			$('#currPageNo2').text(bookApplyCon.pageNo2);
		});
};

//내가 빌린 책(보관) 배송 현황에서 수취를 클릭했을 때 발생하는 이벤트를 위한 함수
bookApplyCon.receiveDone = function() {
	
	$.ajax('ajax/delivery/receiveDone.do', {
		
		type :'GET',
		data : {
			delNo : indexGlobal.delNo
		},
		
		dataType : 'json',
		
		success : function(data) {
			console.log('반납 수취시 불러오는 data');
			console.log(data);
			window.alert('책을 읽다가 반납 기간을 놓치지 마세요.');
			bookApplyCon.borrowDeliveryList();
			bookApplyCon.borrowList();
			},
		error : function(xhr, status, message) {
			window.alert('수취 실패입니다.');
			console.log(message);
		}
	});
};

// 내가 빌린 책(신청) 도서 반납 현황 테이블
bookApplyCon.borrowList = function() {
	
	if(bookApplyCon.pageNo3 == undefined) {
		bookApplyCon.pageNo3 = 1;
	}

	$.getJSON(
			'ajax/delivery/borrowList.do?pageNo=' + bookApplyCon.pageNo3,
			
		function(data) {
			console.log('신청도서 반납 현황 테이블 / 신청 세번째 테이블');
			console.log(data);
			console.log('applyList 수락/거부 현황 테이블 / 신청 세번째 테이블 끝');
			bookApplyCon.pageNo3 = data.pageNo;
			bookApplyCon.recordCount3 = data.recordCount;
			bookApplyCon.pageSize = data.pageSize;
			
			var totalPage3 = parseInt(bookApplyCon.recordCount3 / bookApplyCon.pageSize);
			if((bookApplyCon.recordCount3 % bookApplyCon.pageSize) > 0) {
				totalPage3++;
			}
			
			bookApplyCon.totalPage3 = totalPage3;
			
			bookApplyCon.borrowListClear();
				
				
			var borrowListAdd = $("#borrowList");
	
			for (var i in data.borrowList) {
				
				bookApplyCon.dcBl = data.borrowList[i].delCode;
				
				switch (bookApplyCon.dcBl) {
				
				case '3' :
					bookApplyCon.dcBl = $('<td>').append($('<a>', {
						text:'반납 신청',
						href:'#',
						'data-delno':data.borrowList[i].delNo
					}).addClass('returnApplyBtn').addClass('wide') );
					
					break;
					
				case '4' :
					bookApplyCon.dcBl = $('<td>').text('반납 중');
					break;
				case '5' :
					bookApplyCon.dcBl = $('<td>').text('반납 완료');
					break;
				}
				
				$("<tr>").addClass('borrowListTr').addClass('bookApplyConTableTr')
						.append($('<td>').text($.datepicker.formatDate('yy-mm-dd',
						new Date(data.borrowList[i].recDate))))
						.append($('<td>').text(data.borrowList[i].id)
								.addClass('bookApplyConBlID') )
						.append($('<td>').text(data.borrowList[i].title)
								.addClass('bookApplyConBlTitle') )
						.append(bookApplyCon.dcBl)
						.appendTo(borrowListAdd);
			}
			$('#currPageNo3').text(bookApplyCon.pageNo3);
		}
	);
};

//내가 빌린 책(보관) 반납 현황에서 반납을 클릭했을 때 발생하는 이벤트를 위한 함수
bookApplyCon.returnApply = function() {

	$.ajax('ajax/delivery/returnApply.do', {
		
		type :'GET',
		data : {
			delNo : indexGlobal.delNo
		},
		
		dataType : 'json',
		
		success : function(data) {
			console.log('반납 신청시 불러오는 data');
			console.log(data);
			
//			if(indexGlobal.regCode=='1') {
				bookApplyCon.borrowList();
//			}
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

bookApplyCon.initializing = function() {
	$( '.bookApplyConTableTr' ).remove();
};


bookApplyCon.applyListClear = function() {
	$('.applyListTr').remove();
};


bookApplyCon.deliveryListClear = function() {
	$('.borrowDeliveryListTr').remove();
};


bookApplyCon.borrowListClear = function() {
	$('.borrowListTr').remove();
};