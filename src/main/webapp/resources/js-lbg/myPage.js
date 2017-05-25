var myPage = {};

myPage.init = function() {

   	$( '#myPageTabs' ).tabs();
   	
   	this.initializing();
	this.myPageApplyList();
	this.myPageBorrowDeliveryList();
	this.myPageBorrowList();

	this.myPageAcceptList();
	this.myPageLendDeliveryList();
	this.myPageLendList();
	
	this.myPageMyPoint();
	this.myPageMyInfo();
	this.myPointGrant();
	
	/*도서신청현황 탭-----------------------------------------------------------*/

	$('#content').on('click', 'a.receiveDoneBtn', function(event) {
		
		console.log($(this).attr('data-delno'));
		myPage.delNo = $(this).attr('data-delno');
		
		myPage.myPageReceiveDone();
		
		event.stopImmediatePropagation();
	});
	
	$('#content').on('click', 'a.returnApplyBtn', function(event) {
		
		console.log($(this).attr('data-delno'));
		myPage.delNo = $(this).attr('data-delno');
		
		myPage.myPageReturnApply();
		
		event.stopImmediatePropagation();
	});
	
	$('#content').on('click', '#prevList1', function(event) {
		event.preventDefault();
		if(myPage.pageNo1 > 1) {
			myPage.pageNo1--;
			myPage.myPageApplyList();
		}
	});
	
	$('#content').on('click', '#nextList1', function(event) {
		event.preventDefault();
		if(myPage.pageNo1 < myPage.totalPage1) {
			myPage.pageNo1++;
			myPage.myPageApplyList();
		}
	});
	
	$('#content').on('click', '#prevList2', function(event) {
		event.preventDefault();
		if(myPage.pageNo2 > 1) {
			myPage.pageNo2--;
			myPage.myPageBorrowDeliveryList();
		}
	});
	
	$('#content').on('click', '#nextList2', function(event) {
		event.preventDefault();
		if(myPage.pageNo2 < myPage.totalPage2) {
			myPage.pageNo2++;
			myPage.myPageBorrowDeliveryList();
		}
	});
	
	$('#content').on('click', '#prevList3', function(event) {
		event.preventDefault();
		if(myPage.pageNo3 > 1) {
			myPage.pageNo3--;
			myPage.myPageBorrowList();
		}
	});
	
	
	$('#content').on('click', '#nextList3', function(event) {
		event.preventDefault();
		if(myPage.pageNo3 < myPage.totalPage3) {
			myPage.pageNo3++;
			myPage.myPageBorrowList();
		}
	});
	
	$('#content').on('click', '#currPageNo1', function(event) {
		event.preventDefault();
		myPage.myPageApplyList();
	});
	
	$('#content').on('click', '#currPageNo2', function(event) {
		event.preventDefault();
		myPage.myPageBorrowDeliveryList();
	});
	
	$('#content').on('click', '#currPageNo3', function(event) {
		event.preventDefault();
		myPage.myPageBorrowList();
	});

	/*도서수락현황 탭-----------------------------------------------------------*/

	$('#content').on('click', 'a.myPageAcceptForm', function(event) {
		
		console.log($(this).attr('data-applyno'));
		myPage.applyNo = $(this).attr('data-applyno');
		myPage.isbn = $(this).attr('data-isbn');
		$('#content').load('pages/myPage/acceptPage.html');
		
		event.stopImmediatePropagation();
	});

	$('#content').on('click', 'a.deliveryConfirm', function(event) {
		
		console.log($(this).attr('data-applyno'));
		myPage.applyNo = $(this).attr('data-applyno');
		
		myPage.myPageDeliveryConfirm();
		
		event.stopImmediatePropagation();
	});
	
	$('#content').on('click', 'a.returnComplConfirm', function(event) {
		
		console.log($(this).attr('data-applyno'));
		myPage.applyNo = $(this).attr('data-applyno');
		
		myPage.myPageReturnComplConfirm();
		
		event.stopImmediatePropagation();
	});
	
	$('#content').on('click', '#prevList4', function(event) {
		event.preventDefault();
		if(myPage.pageNo4 > 1) {
			myPage.pageNo4--;
			myPage.myPageAcceptList();
		}
	});
	
	$('#content').on('click', '#nextList4', function(event) {
		event.preventDefault();
		if(myPage.pageNo4 < myPage.totalPage4) {
			myPage.pageNo4++;
			myPage.myPageAcceptList();
		}
	});
	
	$('#content').on('click', '#prevList5', function(event) {
		event.preventDefault();
		if(myPage.pageNo5 > 1) {
			myPage.pageNo5--;
			myPage.myPageLendDeliveryList();
		}
	});
	
	$('#content').on('click', '#nextList5', function(event) {
		event.preventDefault();
		if(myPage.pageNo5 < myPage.totalPage5) {
			myPage.pageNo5++;
			myPage.myPageLendDeliveryList();
		}
	});
	
	$('#content').on('click', '#prevList6', function(event) {
		event.preventDefault();
		if(myPage.pageNo6 > 1) {
			myPage.pageNo6--;
			myPage.myPageLendList();
		}
	});
	
	
	$('#content').on('click', '#nextList6', function(event) {
		event.preventDefault();
		if(myPage.pageNo6 < myPage.totalPage6) {
			myPage.pageNo6++;
			myPage.myPageLendList();
		}
	});
	
	$('#content').on('click', '#currPageNo4', function(event) {
		event.preventDefault();
		myPage.myPageAcceptList();
	});
	
	$('#content').on('click', '#currPageNo5', function(event) {
		event.preventDefault();
		myPage.myPageLendDeliveryList();
	});
	
	$('#content').on('click', '#currPageNo6', function(event) {
		event.preventDefault();
		myPage.myPageLendList();
	});
	
	/*개인정보수정 버튼-----------------------------------------------------------*/
	
	$('#content').on('click', '#infoFixBtn', function() {
		$('#content').load('pages/myPage/myInfoFix.html');
	});

	/*포인트 양도에 관한 Dialog 생성 --------------------------------------------*/

	$('#content').on('click', '#grant', function() {
		$( "#myPointDetail" ).dialog( "open" );
	});
};

/*도서신청현황 탭-----------------------------------------------------------*/

// MyPage내 신청도서 수락/거부 현황 테이블
myPage.myPageApplyList = function() {
	
	if(myPage.pageNo1 == undefined) {
		myPage.pageNo1 = 1;
	}

	$.getJSON(
			'ajax/delivery/applyList.do?pageNo=' + myPage.pageNo1,
			
			function(data) {
				console.log('applyList 수락/거부 현황 테이블 / 신청 첫 테이블');
				console.log(data);
				console.log('applyList 수락/거부 현황 테이블 / 신청 첫 테이블');
				myPage.pageNo1 = data.pageNo;
				myPage.recordCount1 = data.recordCount;
				myPage.pageSize = data.pageSize;
				
				var totalPage1 = parseInt(myPage.recordCount1 / myPage.pageSize);
				if((myPage.recordCount1 % myPage.pageSize) > 0) {
					totalPage1++;
				}
				
				myPage.totalPage1 = totalPage1;
				
				myPage.applyListClear();

			var applyListAdd = $("#applyList");
			var i = null;
			
			for (i in data.applyList) {
				
				myPage.ascApL = data.applyList[i].applyStatusCode;
				
				switch (myPage.ascApL) {
				case '1' :
					myPage.ascApL = '신청 중';
					break;
				case '2' :
					myPage.ascApL = '수락';
					break;
				case '3' :
					myPage.ascApL = '거절';
					break;
				case '4' :
					myPage.ascApL = '대출 완료';
					break;
				}
				
				$("<tr>").addClass('myPageApply').addClass('myPageTableTr')
						.append($('<td>').text($.datepicker.formatDate('yy-mm-dd',
						new Date(data.applyList[i].applyDate))))
						.append($('<td>').text(data.applyList[i].id)
								.addClass('myPageApLID') )
						.append($('<td>').text(data.applyList[i].title)
								.addClass('myPageApLTitle') )
						.append($('<td>').text(myPage.ascApL))
						.appendTo(applyListAdd);
						
			}
			$('#currPageNo1').text(myPage.pageNo1);
		}
			
	);		
};

// MyPage내 신청도서 배송 현황 테이블	
myPage.myPageBorrowDeliveryList = function() {
	console.log("77");
	
	if(myPage.pageNo2 == undefined) {
		myPage.pageNo2 = 1;
	}
	
	

	$.getJSON(
			'ajax/delivery/borrowDeliveryList.do?pageNo=' + myPage.pageNo2,
			
		function(data) {
			console.log('신청도서 배송현황 테이블 / 신청 가운데 테이블');	
			console.log(data);
			console.log('신청도서 배송현황 테이블 / 신청 가운데 테이블 끝');
			myPage.pageNo2 = data.pageNo;
			myPage.recordCount2 = data.recordCount;
			myPage.pageSize = data.pageSize;
			
			var totalPage2 = parseInt(myPage.recordCount2 / myPage.pageSize);
			if((myPage.recordCount2 % myPage.pageSize) > 0) {
				totalPage2++;
			}
			
			myPage.totalPage2 = totalPage2;
			
			myPage.deliveryListClear();
			
				
			var borrowDeliveryListAdd = $("#borrowDeliveryList");
			
		
			
			for (i in data.borrowDeliveryList) {
				
				myPage.dcBdl = data.borrowDeliveryList[i].delCode;
				
				switch (myPage.dcBdl) {
				case '1' :
					myPage.dcBdl = '배송 준비';
					break;
				case '2' :
					myPage.dcBdl = '배송 중';
					break;
				case '3' :
					myPage.dcBdl = '수취';
					break;
				}
				
				console.log('신청도서 배송현황 테이블');
				console.log(data);
				$("<tr>").addClass('myPageDelivery').addClass('myPageTableTr')
						.append($('<td>').text($.datepicker.formatDate('yy-mm-dd',
						new Date(data.borrowDeliveryList[i].sendDate))))
						.append($('<td>').text(data.borrowDeliveryList[i].id)
								.addClass('myPageBdlID') )
						.append($('<td>').text(data.borrowDeliveryList[i].title)
								.addClass('myPageBdlTitle') )
						.append($('<td>').text(myPage.dcBdl))
						.append($('<td>').append($('<a>', {
								text:'수취',
								href:'#',
								'data-delno':data.borrowDeliveryList[i].delNo
							}).addClass('receiveDoneBtn') ))
						.appendTo(borrowDeliveryListAdd);
			}
			
			$('#currPageNo2').text(myPage.pageNo2);
		});
};

//my Page의 신청도서 배송 현황에서 수취를 클릭했을 때 발생하는 이벤트를 위한 함수
myPage.myPageReceiveDone = function() {
	
	console.log(myPage.delNo);

	$.ajax('ajax/delivery/receiveDone.do', {
		
		type :'GET',
		data : {
			delNo : myPage.delNo
		},
		
		dataType : 'json',
		
		success : function(data) {
			console.log('반납 수취시 불러오는 data');
			console.log(data);
			window.alert('책을 읽다가 반납 기간을 놓치지 마세요.');
			myPage.myPageBorrowDeliveryList();
			myPage.myPageBorrowList();
			},
		error : function(xhr, status, message) {
			window.alert('수취 실패입니다.');
			console.log(message);
		}
	});
};

// MyPage내 신청도서 반납 현황 테이블
myPage.myPageBorrowList = function() {
	
	if(myPage.pageNo3 == undefined) {
		myPage.pageNo3 = 1;
	}

	$.getJSON(
			'ajax/delivery/borrowList.do?pageNo=' + myPage.pageNo3,
			
		function(data) {
			console.log('신청도서 반납 현황 테이블 / 신청 세번째 테이블');
			console.log(data);
			console.log('applyList 수락/거부 현황 테이블 / 신청 세번째 테이블 끝');
			myPage.pageNo3 = data.pageNo;
			myPage.recordCount3 = data.recordCount;
			myPage.pageSize = data.pageSize;
			
			var totalPage3 = parseInt(myPage.recordCount3 / myPage.pageSize);
			if((myPage.recordCount3 % myPage.pageSize) > 0) {
				totalPage3++;
			}
			
			myPage.totalPage3 = totalPage3;
			
			myPage.borrowListClear();
				
				
			var borrowListAdd = $("#borrowList");
	
			for (var i in data.borrowList) {
				
				myPage.dcBl = data.borrowList[i].delCode;
				
				switch (myPage.dcBl) {
				case '3' :
					myPage.dcBl = '대여 중';
					break;
				case '4' :
					myPage.dcBl = '반납 중';
					break;
				case '5' :
					myPage.dcBl = '반납 완료';
					break;
				}
				
				$("<tr>").addClass('myPageBorrow').addClass('myPageTableTr')
						.append($('<td>').text($.datepicker.formatDate('yy-mm-dd',
						new Date(data.borrowList[i].recDate))))
						.append($('<td>').text(data.borrowList[i].id)
								.addClass('myPageBlID') )
						.append($('<td>').text(data.borrowList[i].title)
								.addClass('myPageBlTitle') )
						.append($('<td>').append($('<a>', {
								text:myPage.dcBl,
								href:'#',
								'data-delno':data.borrowList[i].delNo
							}).addClass('returnApplyBtn') ))
						.appendTo(borrowListAdd);
			}
			$('#currPageNo3').text(myPage.pageNo3);
		}
	);
};

//my Page의 신청도서 반납 현황에서 반납을 클릭했을 때 발생하는 이벤트를 위한 함수
myPage.myPageReturnApply = function() {

	$.ajax('ajax/delivery/returnApply.do', {
		
		type :'GET',
		data : {
			delNo : myPage.delNo
		},
		
		dataType : 'json',
		
		success : function(data) {
			console.log('반납 신청시 불러오는 data');
			console.log(data);
			myPage.myPageBorrowList();
			window.alert('즐거운 독서가 되셨나요.');
		},
		error : function(xhr, status, message) {
			window.alert('수취 실패입니다.');
			console.log(message);
		}
	});
};

/*도서수락현황 탭-----------------------------------------------------------*/

// MyPage내 수락결정여부 현황 테이블

myPage.myPageAcceptList = function() {
	
	if(myPage.pageNo4 == undefined) {
		myPage.pageNo4 = 1;
	}

	$.getJSON(
		'ajax/accept/acceptList.do?pageNo=' +  myPage.pageNo4,
		
		function(data) {
			
			console.log('수락결졍 여부 테이블 Data :::::::::::::::: ');
			console.log(data);
			myPage.pageNo4 = data.pageNo;
			myPage.recordCount4 = data.recordCount;
			myPage.pageSize = data.pageSize;
			
			var totalPage4 = parseInt(myPage.recordCount4 / myPage.pageSize);
			if((myPage.recordCount4 % myPage.pageSize) > 0) {
				totalPage4++;
			}
			
			myPage.totalPage4 = totalPage4;
			
			myPage.acceptListClear();

			var acceptListAdd = $("#acceptList");
			
			for (var i in data.acceptList) {
				
				myPage.ascAcL = data.acceptList[i].applyStatusCode;
				
				switch (myPage.ascAcL) {
				case '1' :
					myPage.ascAcL = '수락 대기';
					myPage.ascAcLS = '신청 중';
					break;
				case '2' :
					myPage.ascAcL = '수락';
					myPage.ascAcLS = '수락';
					break;
				case '3' :
					myPage.ascAcL = '거절';
					myPage.ascAcLS = '거절';
					break;
				case '4' :
					myPage.ascAcL = '대출 완료';
					myPage.ascAcLS = '대출 완료';
					break;
				}
				
				$("<tr>").addClass('myPageAccept').addClass('myPageTableTr')
						.append($('<td>').text($.datepicker.formatDate('yy-mm-dd',
						new Date(data.acceptList[i].applyDate))))
						.append( $('<td>').text(data.acceptList[i].id)
								.addClass('myPageAcLID') )
						.append( $('<td>').text(data.acceptList[i].title)
								.addClass('myPageAcLTitle') )
						.append( $('<td>').append($('<a>', {
									text:myPage.ascAcL,	
									href:'#',
									'data-isbn':data.acceptList[i].isbn,
									'data-applyNo':data.acceptList[i].applyNo})
								.addClass('myPageAcceptForm') ) )
						.appendTo(acceptListAdd);
			}
			
			$('#currPageNo4').text(myPage.pageNo4);
		}
	);
};

// MyPage내 수락도서 발송 현황 테이블	
myPage.myPageLendDeliveryList = function() {

	if(myPage.pageNo5 == undefined) {
		myPage.pageNo5 = 1;
	}
	
	$.getJSON(
			
		'ajax/accept/lendDeliveryList.do?pageNo=' + myPage.pageNo5,
		
		function(data) {
			console.log('::::::::::::::수락도서 발송현황::::::::::::::');
			console.log(data);
			myPage.pageNo5 = data.pageNo;
			myPage.recordCount5 = data.recordCount;
			myPage.pageSize = data.pageSize;
			
			var totalPage5 = parseInt(myPage.recordCount5 / myPage.pageSize);
			
			if((myPage.recordCount5 % myPage.pageSize5) > 0) {
				totalPage5++;
			}
			
			myPage.totalPage5 = totalPage5;
			
			myPage.lendDeliveryListClear();
			
			var lendDeliveryListAdd = $("#lendDeliveryList");
		
			for (var i in data.lendDeliveryList) {
				
				myPage.dcLDL = data.lendDeliveryList[i].delCode;
				
				switch (myPage.dcLDL) {
				case '1' :
					myPage.dcLDL = '발송 준비';
					break;
				case '2' :
					myPage.dcLDL = '발송 중';
					break;
				case '3' :
					myPage.dcLDL = '발송 완료';
					break;
				}
				
				console.log(data.lendDeliveryList);
				$("<tr>").addClass('myPageLendDeliveryList').addClass('myPageTableTr')
						.append($('<td>').text($.datepicker.formatDate('yy-mm-dd',
						new Date(data.lendDeliveryList[i].assignDate))))
						.append($('<td>').text(data.lendDeliveryList[i].id)
								.addClass('myPageLdlID') )
						.append($('<td>').text(data.lendDeliveryList[i].title)
								.addClass('myPageLdlTitle') )
						.append($('<td>').append($('<a>', {
								text:myPage.dcLDL,
								href:'#',
								'data-applyno':data.lendDeliveryList[i].applyNo})
								.addClass('deliveryConfirm') ))
						.appendTo(lendDeliveryListAdd);
			}
			$('#currPageNo5').text(myPage.pageNo5);
		});
};

//my Page의 대여 현황에서 발송을 클릭하면 발생하는 이벤트
myPage.myPageDeliveryConfirm = function() {
	
	console.log(myPage.applyNo);
	
	$.ajax('ajax/accept/deliveryConfirm.do', {
		type : 'GET',
		data : { applyNo : myPage.applyNo },
		dataType : 'json',
		success : function () {
			
			myPage.myPageLendDeliveryList();
			window.alert('발송하였습니다.');
			
		},
		error : function(xhr, status, message) {
			window.alert('발송 실패입니다.');
			console.log(message);
		}
	});
};

// MyPage내 수락도서 회수 현황 테이블
myPage.myPageLendList = function() {
	
	if(myPage.pageNo6 == undefined) {
		myPage.pageNo6 = 1;
	}

	$.getJSON(
			'ajax/accept/lendList.do?pageNo=' +  myPage.pageNo6,
		function(data) {
				console.log('lendList');
				console.log(data);
				
				myPage.pageNo6 = data.pageNo;
				myPage.recordCount6 = data.recordCount;
				myPage.pageSize6 = data.pageSize;
				
				var totalPage6 = parseInt(myPage.recordCount6 / myPage.pageSize);
				
				if((myPage.recordCount6 % myPage.pageSize) > 0) {
					totalPage6++;
				}
				
				myPage.totalPage6 = totalPage6;
				
				myPage.lendListClear();
				
			var lendListAdd = $("#lendList");
			
			for (var i in data.lendList) {
				
				myPage.dcLL = data.lendList[i].delCode;
				
				switch (myPage.dcLL) {
				case '3' :
					myPage.dcLL = '대출 중';
					break;
				case '4' :
					myPage.dcLL = '반납 확인';
					break;
				case '5' :
					myPage.dcLL = '반납 완료';
					break;
				}
				
				$("<tr>").addClass('myPageLendList').addClass('myPageTableTr')
						.append($('<td>').text($.datepicker.formatDate('yy-mm-dd',
						new Date(data.lendList[i].recDate))))
						.append($('<td>').text(data.lendList[i].id)
								.addClass('myPageLlID') )
						.append($('<td>').text(data.lendList[i].title)
								.addClass('myPageLlTitle') )
						.append($('<td>').append($('<a>', {
								text:myPage.dcLL,
								href:'#',
								'data-applyno':data.lendList[i].applyNo})
								.addClass('returnComplConfirm')))
				.appendTo(lendListAdd);
			}
			$('#currPageNo6').text(myPage.pageNo6);
		});
};

//my Page의 대여 현황에서 회수완료를 클릭하면 발생하는 이벤트
myPage.myPageReturnComplConfirm = function() {
	
	console.log(myPage.applyNo);
	
	$.ajax('ajax/accept/returnComplConfirm.do', {
		type : 'GET',
		data : { applyNo : myPage.applyNo },
		dataType : 'json',
		success : function (data) {
			
			myPage.myPageLendList();
			window.alert('반납완료 처리하였습니다.');
			
		},
		error : function(xhr, status, message) {
			window.alert('반납완료 실패입니다.');
			console.log(message);
		}
	});
};


/*나의 정보-----------------------------------------------------------*/

myPage.myPageMyPoint = function() {
	
	$.getJSON(
		'ajax/member/myInfo.do',
			
		function(data){
			console.log(data);
			
			$( '#pointForm' ).append( $( '<span>' ).addClass( 'myInfoLabel' ).text( '잔여 포인트 : ' ) )
							.append( $( '<span>' ).addClass( 'simpleMyInfo' ).text( data.member.point ) );
		}
	);
};

myPage.myPageMyInfo = function () {
	
	$.getJSON(
		'ajax/member/myInfo.do',
		
		function(data){
			
			$( '#infoList' ).append( $( '<div>' ).addClass('myInfoUnderLine')
							.append( $( '<span>' ).addClass( 'myInfoLabel' ).text( '이메일 : ' ) )
							.append( $( '<span>' ).addClass( 'simpleMyInfo' ).text( data.member.email ) ) )
							.append( $( '<div>' ).addClass('myInfoUnderLine')
							.append( $( '<span>' ).addClass( 'myInfoLabel' ).text( '전화번호 : ' ) )
							.append( $( '<span>' ).addClass( 'simpleMyInfo' ).text( data.member.phoNo ) ) )
							.append( $( '<div>' ).addClass('myInfoUnderLine')
							.append( $( '<span>' ).addClass( 'myInfoLabel' ).text( '주소 : ' ) )
							.append( $( '<span>' ).addClass( 'simpleMyInfo' ).text( data.member.addr1 ) ) );

			console.log(data);
				
		}
	);
};

/*포인트 양도에 관한 팝업 js. 수정이 필요함*/

myPage.myPointGrant = function() {

	$( "#grant" ).click(function() {
		$( "#myPointDetail" ).dialog( "open" );
	});

	$( "#myPointDetail" ).dialog({
    	autoOpen: false,
		resizable: false,
		height:250,
		modal: true,
		position: 'center',
		width: 300,
		buttons: {
			"확인": function() {
				$( this ).dialog( "close" );
			},
			취소: function() {
				$( this ).dialog( "close" );
			}
		}
	});
};

/*테이블 초기화 -----------------------------------------------------------------------------------------------*/

/*테이블이 중복되서 append되지 않도록 로딩될 때마다 table 초기화*/

myPage.initializing = function() {
	$( '.myPageTableTr' ).remove();
};

myPage.applyListClear = function() {
	$('.myPageApply').remove();
};


myPage.borrowListClear = function() {
	$('.myPageBorrow').remove();
};


myPage.deliveryListClear = function() {
	$('.myPageDelivery').remove();
};


myPage.acceptListClear = function() {
	$('.myPageAccept').remove();
};


myPage.lendDeliveryListClear = function() {
	$('.myPageLendDeliveryList').remove();
};


myPage.lendListClear = function() {
	$('.myPageLendList').remove();
};