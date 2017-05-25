var applyPagePopup = {
		loaded : false
};

applyPagePopup.init = function() {
	
	console.log('메인 페이지에서 책 클릭시 글로벌 변수 indexGlobal에 넣어서 보관(applypagepopup) : ' + indexGlobal.isbn );
	
	if(!this.loaded) {
		
		$('.applyButton').hover(function() {
			$(this).addClass('reverse');
		}, function() {
			$(this).removeClass('reverse');
		});
	
		$('.pagingBtn').on('click', '#prevList', function(event) {
			event.preventDefault();
			if (applyPagePopup.pageNo > 1) {
				applyPagePopup.pageNo--;
				applyPagePopup.applyOwnerInfo();
			}
		});
		
		$('.pagingBtn').on('click', '#nextList', function(event) {
			event.preventDefault();
			if (applyPagePopup.pageNo < applyPagePopup.totalPage) {
				applyPagePopup.pageNo++;
				applyPagePopup.applyOwnerInfo();
			}
		});
		
		$(document).on('click', '#applyConfirm', function(event) {
			
			applyPagePopup.pBN = $("input[name='chkbox']:checked").val();
			applyPagePopup.recId = $("input[name='chkbox']:checked").attr('data-id');
			applyPagePopup.bookTitle = $('#bookTitle').text();
			
			console.log(applyPagePopup.bookTitle);
			console.log(applyPagePopup.recId);
			console.log("여기는 첫번째");
			console.log(applyPagePopup.pBN);
			
			if (applyPagePopup.pBN != null) {
				
				applyPagePopup.applyBook();
				
				event.stopImmediatePropagation();
				
			}
		});
		
		$(document).on('click', '#applyCancel', function(event) {
			
			$.fancybox.close();
			event.stopImmediatePropagation();
			
		});
	
	}
	
	this.applyOwnerInfo();
};

applyPagePopup.applyBookInfo = function() {
	
	$.ajax({
		url : 'ajax/book/bookInfo.do',
		type : 'POST',
		dataType : 'json',
		data : {
			isbn : indexGlobal.isbn
		},
		success : function (data) {
			
			console.log('책 정보 전부');
			console.log(data);
			
			bookDetail = data.bookInfo;
			applyPagePopup.bookTitle = bookDetail.title;
			
			var tagLeftSideInner = $('#leftSideInner');
			
			console.log(bookDetail);
			
//			BookCover
			$('<div>').addClass('detailBookImg').append( $('<img>', {src : bookDetail.bookImgUrl}).addClass('bookImg')).appendTo(tagLeftSideInner);
			
			$('<div>').addClass('detailBookInfo').appendTo(tagLeftSideInner);
			var tagDetailBookInfo = $('.detailBookInfo');
			
//			Title
			$('<h1>').attr('id','bookTitle').addClass('detailBookInfoTitle').text(bookDetail.title).appendTo(tagDetailBookInfo);
			
//			Author
			$('<span>').attr('id','bookAuthor').addClass('detailBookInfoEtc').text(bookDetail.author).appendTo(tagDetailBookInfo);
			
//			Translator
			if (bookDetail.trans != null) {
				
//				Translator
				$('<span>').attr('id','bookTrans').addClass('detailBookInfoEtc').text(bookDetail.trans).appendTo(tagDetailBookInfo);
				
			}
			
//			Pub
			$('<span>').attr('id','bookPub').addClass('detailBookInfoEtc').text(bookDetail.pub).appendTo(tagDetailBookInfo);
			
//			PubDate
			$('<span>').attr('id','bookPubDate').addClass('detailBookInfoEtc').text(bookDetail.pubDate).appendTo(tagDetailBookInfo);
			
			$('<div>').addClass('seperateLine').appendTo(tagDetailBookInfo);
			
			console.log(data.numOneBK);
			console.log(data.numOneBK);
			
//			키핑과 기부 권수 정보
			$('<div>').addClass('numberOfBookDiv').appendTo(tagDetailBookInfo);
			var tagNumberOfBookDiv = $('.numberOfBookDiv');
			
			$('<p>').addClass('numberOfBookK').appendTo(tagNumberOfBookDiv);
			$('<p>').addClass('numberOfBookD').appendTo(tagNumberOfBookDiv);
			
			var tagNumberOfBookK = $('.numberOfBookK');
			var tagNumberOfBookD = $('.numberOfBookD');
			
			$('<span>').addClass('numberOfBook').text('현재 키핑된 도서수 : ').appendTo(tagNumberOfBookK);
			$('<span>').addClass('numberOfBook').text(data.numOneBK).appendTo(tagNumberOfBookK);
			$('<span>').addClass('numberOfBook').text('권').appendTo(tagNumberOfBookK);
			$('<span>').addClass('numberOfBook').text('현재 기부된 도서수 : ').appendTo(tagNumberOfBookD);
			$('<span>').addClass('numberOfBook').text(data.numOneBD).appendTo(tagNumberOfBookD);
			$('<span>').addClass('numberOfBook').text('권').appendTo(tagNumberOfBookD);
			
		},
		
		error : function (jqXHR,  textStatus, errorThrown) {
			console.log('신청페이지 책 상세 정보 보기 실패');
			console.log('applyPagePopup.js -> BookController.java -> bookInfo');
		}
	});
	
};

applyPagePopup.applyOwnerInfo = function() {
	
	if (applyPagePopup.pageNo == undefined) {
		applyPagePopup.pageNo = 1;
	}
	
	console.log(applyPagePopup.pageNo);
	
	$.ajax({
		url : 'ajax/applyPage/applyOwner.do',
		type : 'POST',
		dataType : 'json',
		data : {
			isbn : indexGlobal.isbn,
			pageNo : applyPagePopup.pageNo
			
		},
		success : function (data) {
			
			if (data.status == 'success') {
			
				console.log('applyOwners 모든 data');
				console.log(data);
				
				applyPagePopup.rentalCount = data.rentalCount;
				applyPagePopup.myPoint = data.member.point;
				console.log(applyPagePopup.myPoint);
				console.log(applyPagePopup.rentalCount);
				
				applyPagePopup.pageNo = data.pageNo;
				applyPagePopup.recordCount = data.recordCount;
				applyPagePopup.pageSize = data.pageSize;
				
				var totalPage = parseInt(applyPagePopup.recordCount / applyPagePopup.pageSize);
				
				if ( (applyPagePopup.recordCount % applyPagePopup.pageSize) > 0 ) {
					totalPage++;
				}
				applyPagePopup.totalPage = totalPage;
				
				applyPagePopup.clearList();
				
				var code = null;
				
				var bookOwner = data.owner;
				
				console.log(':::::::::신청페이지 소유자 정보:::::::::::');
				console.log(bookOwner);
			
				var loginUser = data.member;
				console.log(':::::::::신청페이지 신청자(로그인 유저) 정보:::::::::::');
				console.log(loginUser);
				
				var ownerInfoAdd = $( '#ownerInfoAll' );
				
				var k = null;
				
				for (k in bookOwner) {
					
					switch (bookOwner[k].regCode) {
					
					case '1' : 
						code = '키핑';
						break;
					case '2' : 
						code = '기부';
						break;
					}
					
					$('<div>').addClass('applyPagePopupOwnerInfoDiv')
						.append( $('<table>').addClass('ownerImgTable')
							.append( $( '<tr>')
								.append( $( '<td>' )
									.append( $('<input>', {type : 'radio', name : 'chkbox', value : bookOwner[k].persBookNo, 'data-id' : bookOwner[k].id} ).addClass('ownerCheckBox') ) )
								.append( $( '<td>' ).append( $('<img>', {src : "img/profileImg/" + bookOwner[k].photoUrl, height : '88px'}).addClass('popupProfileImg') ) ) ) )
						.append( $('<div>').addClass('ownerInfo')
							.append( $('<span>').text(bookOwner[k].id).addClass('ownerInfoDetail') ).append( $('<br/>'))
							.append( $('<span>').text(bookOwner[k].addr1).addClass('ownerInfoDetail') ).append( $('<br/>'))
							.append( $('<span>').text(code).addClass('ownerInfoDetail') ) )
						.appendTo(ownerInfoAdd);
					
					$('#currPageNo').text(applyPagePopup.pageNo);
					
				}
				
			} else {
				
				$('#applyPageButton').remove();
				
				applyPagePopup.pageNo = data.pageNo;
				applyPagePopup.recordCount = data.recordCount;
				applyPagePopup.pageSize = data.pageSize;
				
				var totalPage = parseInt(applyPagePopup.recordCount / applyPagePopup.pageSize);
				
				if ( (applyPagePopup.recordCount % applyPagePopup.pageSize) > 0 ) {
					totalPage++;
				}
				applyPagePopup.totalPage = totalPage;
				
				applyPagePopup.clearList();
				
				var code = null;
				
				var bookOwner = data.owner;
				
				console.log(':::::::::신청페이지 소유자 위치 정보:::::::::::');
				console.log(bookOwner);
				
				var ownerInfoAdd = $( '#ownerInfoAll' );
				
				var k = null;
				
				for (k in bookOwner) {
					
					switch (bookOwner[k].regCode) {
					
					case '1' : 
						code = '보관';
						break;
					case '2' : 
						code = '나눔';
						break;
					}
					
					$('<div>').addClass('applyPagePopupLocInfoDiv')
						.append( $('<div>').addClass('locInfo')
							.append( $('<span>').text(bookOwner[k].addr1).addClass('locInfoDetail').addClass('locLeft') )
							.append( $('<span>').text(code).addClass('locInfoDetail').addClass('locRight') ) )
						.appendTo(ownerInfoAdd);
				}
				
				$('#currPageNo').text(applyPagePopup.pageNo);
			}
			
		},
		
		error : function (jqXHR,  textStatus, errorThrown) {
			console.log('신청페이지 책 소유주 정보 가져오기 실패');
			console.log('applyPagePopup.js -> ApplyController.java -> applyServiceImp -> applyService -> applyDao');
		}
	});
	
};


applyPagePopup.applyBook = function() {
	
	console.log(applyPagePopup.pBN);
	console.log("여기는 두번째");
	applyPagePopup.applyOwnerInfo();
	
	if (applyPagePopup.rentalCount < 6) {
		
		if (100 <= applyPagePopup.myPoint) {
			
			console.log('책등록시 포인트 차감!!!!!!! Controller에서 차감!!!!');
			console.log(applyPagePopup.myPoint);
			
			$.ajax({
				url : 'ajax/applyPage/applyBook.do',
				dataType : 'json',
				type : 'POST',
				data : {
					persBookNo : applyPagePopup.pBN,
					point : applyPagePopup.myPoint
				},
				success : function (data) {
					
					message.sendSysMsg();
					alert('신청완료 되었습니다. 대출 페이지에서 신청 내역을 확인하세요');	
					$.fancybox.close();
					
				},
				
				error : function (jqXHR,  textStatus, errorThrown) {
					
					console.log('신청이 실패하였습니다.');
					console.log(error);
					console.log('applyBook 정보 보내기 실패');
					console.log('applyPagePopup.js -> ApplyBook.do -> ApplyController.java ->  applyService -> applyServiceImp -> applyDao');
				}
			});
			
		} else {
			window.alert('포인트가 부족합니다.');
		}
		
	} else {
		window.alert('30일 이내 대여 가능 권수를 초과하셨습니다.');
	}
	
};

applyPagePopup.clearList = function() {
	$('.applyPagePopupOwnerInfoDiv').remove();
};