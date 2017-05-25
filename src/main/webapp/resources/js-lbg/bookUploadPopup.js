var bookUploadPopup = {
		loaded : false
};

bookUploadPopup.init =  function () {
	
	$('.uploadButtons').hover(function() {
		$(this).addClass('reverse');
	}, function() {
		$(this).removeClass('reverse');
	});
	
	var i = bookUploadResult.no;
	
	console.log(i);
	
	console.log(bookUploadResult.bookDataInfo);
	
	bookUploadPopup.title = (bookUploadResult.bookDataInfo[i].title).replace('&lt;b&gt;','').replace('&lt;/b&gt;','');
	bookUploadPopup.author = (bookUploadResult.bookDataInfo[i].author).replace('&lt;b&gt;','').replace('&lt;/b&gt;','');
	bookUploadPopup.trans = (bookUploadResult.bookDataInfo[i].translator).replace('&lt;b&gt;','').replace('&lt;/b&gt;','');
	bookUploadPopup.price = (bookUploadResult.bookDataInfo[i].list_price);
	bookUploadPopup.pubDate = (bookUploadResult.bookDataInfo[i].pub_date).replace('&lt;b&gt;','').replace('&lt;/b&gt;','');
	bookUploadPopup.pub = (bookUploadResult.bookDataInfo[i].pub_nm).replace('&lt;b&gt;','').replace('&lt;/b&gt;','');
	bookUploadPopup.isbn = (bookUploadResult.bookDataInfo[i].isbn13).replace('&lt;b&gt;','').replace('&lt;/b&gt;','');
	
	var bookUpCategory = bookUploadResult.bookDataInfo[i].category;
	
	bookUploadPopup.category = bookUpCategory.replace(/\s+/g, '');
	
	console.log('bookUploadPopup.js -> category : ' + bookUploadPopup.category);
	
	if (bookUploadResult.bookDataInfo[i].cover_l_url != null) {
		
		bookUploadPopup.bookImgUrl = bookUploadResult.bookDataInfo[i].cover_l_url;
		
	} else {
		
		if (bookUploadResult.bookDataInfo[i].cover_s_url != null) {
			
			bookUploadPopup.bookImgUrl = bookUploadResult.bookDataInfo[i].cover_s_url;
			
		} else {
			
			bookUploadPopup.bookImgUrl = '../../img/notImg.jpg';
			
		}
	}
	
	
	/*네이버 책 API는 isbn10과 13을 하나의 key에 담아서 주기 때문에 slice로 잘라서 따로 담아야함*/
//	bookUploadPopup.isbn10 = (bookUploadResult.bookDataInfo[i].isbn).replace('&lt;b&gt;','').replace('&lt;/b&gt;','').slice(0,1);
//	bookUploadPopup.isbn13 = (bookUploadResult.bookDataInfo[i].isbn13).replace('&lt;b&gt;','').replace('&lt;/b&gt;','').slice(1);
	
//	if (bookUploadPopup.isbn13 != null) {
//		bookUploadPopup.isbn = bookUploadPopup.isbn13;
//	} else {
//		bookUploadPopup.isbn = bookUploadPopup.isbn10;
//	}
//	
//	console.log(bookUploadPopup.isbn);
	
	if (!this.loaded) {
		
		$(document).on('click', '#uploadCancel', function(event) {
			event.preventDefault();
			$.fancybox.close();
			event.stopImmediatePropagation();
		});
		
		$(document).on('click', '#uploadKeeping', function(event) {
			event.preventDefault();
			bookUploadResult.keepingAddBook();
			event.stopImmediatePropagation();
		});
		
		$(document).on('click', '#uploadDonation', function(event) {
			event.preventDefault();
			bookUploadResult.donationAddBook();
			event.stopImmediatePropagation();
		});
		
	}
};

bookUploadPopup.bookUploadInfo = function () {
	
//	var tagDetailBookInfo = $('.detailBookInfo');
		
//	책표지
	$( '.detailBookImg' ).append( $( '<img>', {src : bookUploadPopup.bookImgUrl}).addClass('bookImg') );
		
//	제목
	$( '.detailBookInfoTitle' ).text(bookUploadPopup.title);
		
//	작가
	$( '#bookAuthor' ).text(bookUploadPopup.author);
		
//	출판사
	$( '#bookPub' ).text(bookUploadPopup.pub);
		
//	출판일
//	출판일은 xxxxyyzz형식이기 때문에 4글자 2글자 2글자로 잘라서 담아야함
	var year = bookUploadPopup.pubDate.slice(0,4);
	var month = bookUploadPopup.pubDate.slice(4,6);
	var day = bookUploadPopup.pubDate.slice(6);
	
	$( '#bookPubDate' ).text(year + '-' + month + '-' + day);
	
//	가격
	$( '#bookPrice' ).text(bookUploadPopup.price + '원');
		
	if (bookUploadPopup.trans == '') {
			
//		번역자가 없는 경우 객체 삭제
		$( '#bookTrans' ).remove();
			
			
	} else {
			
		$( '#bookTrans' ).text(bookUploadPopup.trans);
		
	}
		
//	console.log(data.numOneBK);
//	console.log(data.numOneBK);
	
};

bookUploadResult.numBook = function () {
	
	$.ajax({
		url : 'ajax/book/numBook.do',
		dataType : 'json',
		type : 'POST',
		data : { isbn : bookUploadResult.isbn },
		success : function (data) {
			
			console.log(data);
			
			var tagDetailBookInfo = $('.detailBookInfo');
			
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
		}
	});
	
};

bookUploadResult.keepingAddBook = function () {
	
	$.ajax({
		url : 'ajax/book/addBook.do',
		dataType : 'json',
		type : 'POST',
		data : {
			title : bookUploadPopup.title,
			author : bookUploadPopup.author,
			price : bookUploadPopup.price,
			pubDate : bookUploadPopup.pubDate,
			pub : bookUploadPopup.pub,
			trans : bookUploadPopup.trans,
			isbn : bookUploadPopup.isbn,
			bookImgUrl : bookUploadPopup.bookImgUrl,
			regCode : '1',
			category : bookUploadPopup.category
		},
		success : function (data) {
			alert('등록성공입니다');
			
			$.fancybox.close();
		},
		error : function (jqXHR,  textStatus, errorThrown) {
			alert('실패입니다');
			
			$.fancybox.close();
		}
	});
};

bookUploadResult.donationAddBook = function () {
	
	$.ajax({
		url : 'ajax/book/addBook.do',
		dataType : 'json',
		type : 'POST',
		data : {
			title : bookUploadPopup.title,
			author : bookUploadPopup.author,
			price : bookUploadPopup.price,
			pubDate : bookUploadPopup.pubDate,
			pub : bookUploadPopup.pub,
			trans : bookUploadPopup.trans,
			isbn : bookUploadPopup.isbn,
			bookImgUrl : bookUploadPopup.bookImgUrl,
			regCode : '2',
			category : bookUploadPopup.category
		},
		success : function (data) {
			alert('등록성공입니다');
			
			$.fancybox.close();
		},
		error : function (jqXHR,  textStatus, errorThrown) {
			alert('실패입니다');
			
			$.fancybox.close();
		}
	});
	
};