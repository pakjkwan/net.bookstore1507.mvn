var acceptPagePopup = {};

acceptPagePopup.init =  function () {
	
	this.acceptBookInfo();
	this.applicantInfoTable();
	
	console.log('indexGlobal.regCode : ' + indexGlobal.regCode);
	
	$(document).on('click', '#acceptConfirm', function(event) {
		acceptPagePopup.applicantConfirm();
		event.stopImmediatePropagation();
	});
	
	$(document).on('click', '#acceptDeny', function(event) {
		acceptPagePopup.applicantDeny();
		event.stopImmediatePropagation();
	});
	
	$(document).on('mouseenter','#acceptConfirm', function(){
		$(this).addClass('reverse');
	});
	
	$(document).on('mouseleave','#acceptConfirm', function(){
		$(this).removeClass('reverse');
	});
	
	$(document).on('mouseenter','#acceptDeny', function(){
		$(this).addClass('reverse');
	});
	
	$(document).on('mouseleave','#acceptDeny', function(){
		$(this).removeClass('reverse');
	});

};

acceptPagePopup.acceptBookInfo = function () {
	
	console.log(indexGlobal.isbn);
	
	$.ajax({
		url : 'ajax/book/bookInfo.do',
		type : 'POST',
		dataType : 'json',
		data : {
			isbn : indexGlobal.isbn
		},
		success : function (data) {
			
			var bookDetail = data.bookInfo;
			
			console.log('수락 페이지 bookInfo 전부');
			console.log(data);
			console.log(bookDetail);
			
			var tagDetailBookInfo = $('.detailBookInfo');
			
//			BookCover
			$( '.detailBookImg' ).append( $( '<img>', {src : bookDetail.bookImgUrl}).addClass('bookImg') );
			
//			Title
			$( '.detailBookInfoTitle' ).text(bookDetail.title);
			
//			Author
			$( '#bookAuthor' ).text(bookDetail.author);
			
//			Pub
			$( '#bookPub' ).text(bookDetail.pub);
			
//			PubDate
			$( '#bookPubDate' ).text($.datepicker.formatDate('yy-mm-dd',
					new Date(bookDetail.pubDate)));
			
			if (bookDetail.trans == null) {
				
//				Translator Remove
				$( '#bookTrans' ).remove();
				
				
			} else {
				
//				Translator
				$( '#bookTrans' ).text(bookDetail.trans);;
			
			}
			
			console.log(data.numOneBK);
			console.log(data.numOneBK);
//			키핑과 기부 권수 정보
			
			$('<div>').addClass('numberOfBookDiv').appendTo(tagDetailBookInfo);
			var tagNumberOfBookDiv = $('.numberOfBookDiv');
			
			$('<p>').addClass('numberOfBookK').appendTo(tagNumberOfBookDiv);
			$('<p>').addClass('numberOfBookD').appendTo(tagNumberOfBookDiv);
			
			var tagNumberOfBookK = $('.numberOfBookK');
			var tagNumberOfBookD = $('.numberOfBookD');
			
			$('<span>').addClass('numberOfBook').text('현재 키핑된 도서수').appendTo(tagNumberOfBookK);
			$('<span>').addClass('numberOfBook').text(data.numOneBK).appendTo(tagNumberOfBookK);
			$('<span>').addClass('numberOfBook').text('권').appendTo(tagNumberOfBookK);
			$('<span>').addClass('numberOfBook').text('현재 기부된 도서수').appendTo(tagNumberOfBookD);
			$('<span>').addClass('numberOfBook').text(data.numOneBD).appendTo(tagNumberOfBookD);
			$('<span>').addClass('numberOfBook').text('권').appendTo(tagNumberOfBookD);
			
			
//			$('#oneBookK').text(data.numOneBK);
//			$('#oneBookD').text(data.numOneBD);
			
		},
		
		error : function (jqXHR,  textStatus, errorThrown) {
			console.log('수락페이지 책 정보 보기 실패');
			console.log('acceptPagePopup.js -> BookController.java -> bookInfo');
		}
	});
	
};

acceptPagePopup.applicantInfoTable = function() {
	
	$.ajax({
		url : 'ajax/acceptPage/applicantInfo.do',
		datatype : 'json',
		type : 'GET',
		data : { applyNo :indexGlobal.applyNo },
		
		success : function(data) {
			console.log('::::::::::::::::::::수락페이지 신청자 정보::::::::::::::');	
			console.log(data);
				
			var applicantInfo = data.applicant;
			acceptPagePopup.memNo = applicantInfo.memNo;
			acceptPagePopup.point = applicantInfo.point;
			acceptPagePopup.applyNo = applicantInfo.applyNo;
			
			var phoneNum1,
				phoneNum2,
				phoneNum3,
				phoneNum = null;
			
			if(applicantInfo.phoNo.length == 11) {
				phoneNum1 = applicantInfo.phoNo.slice(0,3);
				phoneNum2 = applicantInfo.phoNo.slice(3,7);
				phoneNum3 = applicantInfo.phoNo.slice(7);
			} else {
				phoneNum1 = applicantInfo.phoNo.slice(0,3);
				phoneNum2 = applicantInfo.phoNo.slice(3,6);
				phoneNum3 = applicantInfo.phoNo.slice(6);
			}
			
			phoneNum = phoneNum1 + '-' + phoneNum2 + '-' + phoneNum3;
			
			$( '.applicantImg' ).append( $( '<img>', {src : 'img/profileImg/'+applicantInfo.photoUrl}).addClass('popupProfileImg') );
			$( '.applicantName' ).text(applicantInfo.name);
			$( '.applicantAddr1' ).text(applicantInfo.addr1);
			$( '.applicantPhoneNo' ).text(phoneNum);
			$( '.applicantEmail' ).text(applicantInfo.email);
//			$( '.applicantDefaultDay' ).text(applicantInfo.defaultDay);
			$( '.applicantApplyDate' ).text($.datepicker.formatDate('yy-mm-dd',new Date(applicantInfo.applyDate)) );
			
			if (indexGlobal.rStatus == '1') {
			
				$('<div>').attr('id', 'acceptPageButton')
					.append( $('<span>').append( $('<a>', {
						href : '#',
						text : '거절'
					}).addClass('wide') ).attr('id', 'acceptDeny').addClass('acceptBtn') )
					.append( $('<span>').append( $('<a>', {
						href : '#',
						text : '수락'
					}).addClass('wide') ).attr('id', 'acceptConfirm').addClass('acceptBtn') )
				.appendTo( $('.applicant') );
			
			} else {
			
				$('<div>').attr('id', 'acceptPageButton')
					.append( $('<span>').append( $('<a>', {
						href : '#',
						text : '거절'
					}).addClass('wide') ).attr('id', 'acceptDeny').addClass('acceptBtn') )
				.appendTo( $('.applicant') );
			
			}
			
		},
		error:function(xhr, status, message){
			window.alert(error);
			
		}
	});		
};


acceptPagePopup.applicantConfirm = function() {
	
	 console.log(indexGlobal.applyNo);
		
	$.ajax({
		url : 'ajax/acceptPage/applicantConfirm.do',
		dataType : 'json',
		type : 'POST',
		data : {
			
			applyNo : indexGlobal.applyNo,
			regCode : indexGlobal.regCode
		},
		
		success : function (data) {
			
			console.log('indexGlobal.regCode : ' + indexGlobal.regCode);
			
			if (indexGlobal.regCode == '1') {
				bookAcceptCon.acceptList();
				bookAcceptCon.lendDeliveryList();
			} else {
				bookAcceptConD.acceptList();
				bookAcceptConD.lendDeliveryList();
			}
			
			alert('신청된 책을 수락하셨습니다. 발송해 주세요.');
			$.fancybox.close();
			
		},
		
		error : function (jqXHR,  textStatus, errorThrown) {
			console.log('수락 실패');
			console.log('applycantConfirm 정보 보내기 실패');
			console.log('acceptPagePopup.js -> applicantConfirm.do -> ApplyController.java ->  applyService -> applyServiceImp -> applyDao');
			$.fancybox.close();
		}
	});
};

acceptPagePopup.applicantDeny = function() {
	
	console.log('책 신청 수락 거부시 신청자에게 포인트 되돌려줌!!!!!!!');
	console.log(acceptPagePopup.point);
	
	$.ajax({
		url : 'ajax/acceptPage/applicantDeny.do',
		dataType : 'json',
		type : 'POST',
		data : {
			memNo : acceptPagePopup.memNo,
			point : acceptPagePopup.point,
			applyNo : acceptPagePopup.applyNo
		},
		
		success : function (data) {
			
			if (indexGlobal.regCode == '1') {
				bookAcceptCon.acceptListClear();
				bookAcceptCon.acceptList();
			} else {
				bookAcceptConD.acceptListClear();
				bookAcceptConD.acceptList();
			}
			
			alert('신청한 책에 대해서 거절하셨습니다.');
			$.fancybox.close();
			
		},
		
		error : function (jqXHR,  textStatus, errorThrown) {
			console.log('거절이 실패하였습니다.');
			console.log('acceptBook 정보 보내기 실패');
			console.log('acceptPagePopup.js -> ApplyBook.do -> ApplyController.java ->  applyService -> applyServiceImp -> applyDao');
			console.log(error);
			$.fancybox.close();
		}
	});
	
};