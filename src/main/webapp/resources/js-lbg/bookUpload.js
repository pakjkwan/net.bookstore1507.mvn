var bookUpload = {};

var bookDataInfo = '';

bookUpload.init = function () {
	
	$('#bookUploadBox').on('keypress', function(event) {
			
		if (event.which == 13) {
			
			event.preventDefault();
			
			console.log($('#bookUploadBox').val());
			
			bookUpload.searchBook();
			
			event.stopImmediatePropagation();
			
		}
			
	});
	
	$('#bookUploadConfirm').click(function(event) {
		
		event.preventDefault();
		
		bookUpload.searchBook();
		
		event.stopImmediatePropagation();
	});
	
	
};

bookUpload.searchBook = function () {
//	$('#bookUploadSearch').on('click', function () {
		
		bookUpload.ajaxFilter();
		
		$.ajax({
			url : 'http://apis.daum.net/search/book?apikey=8d42a74c4641dd5c4cb5c6a1122448ad8cf9050f&output=json&callback=book&q=' + $('#bookUploadBox').val(),
			type : 'GET',
			dataType : 'json',
			success : function (data) {
				
				$('#bookUploadInfo').empty();
				bookDataInfo = data;
				
				console.log(bookDataInfo);
				
				for(var i in data.channel.item) {	
					$( '#bookUploadInfo' ).off('click', '.donationAddBook'+i);
					$( '#bookUploadInfo' ).off('click', '.keepingAddBook'+i);
					
					console.log(bookDataInfo.channel.item[i].title);
					console.log('===>', (bookDataInfo.channel.item[i].title).replace(/&lt;b&gt;/gi,'').replace(/&lt;\/b&gt;/gi,''));
					//.replace('&lt;/b&gt;','') + '313123131312312312');
					
					var searchBookTitle = (bookDataInfo.channel.item[i].title).replace(/&lt;b&gt;/gi,'').replace(/&lt;\/b&gt;/gi,'');
					var searchBookAuthor = (bookDataInfo.channel.item[i].author).replace(/&lt;b&gt;/gi,'').replace(/&lt;\/b&gt;/gi,'');
					var searchBookTrans = (bookDataInfo.channel.item[i].translator).replace(/&lt;b&gt;/gi,'').replace(/&lt;\/b&gt;/gi,'');
					var searchBookPubName = (bookDataInfo.channel.item[i].pub_nm).replace(/&lt;b&gt;/gi,'').replace(/&lt;\/b&gt;/gi,'');
					var searchBookPubDate = (bookDataInfo.channel.item[i].pub_date).replace(/&lt;b&gt;/gi,'').replace(/&lt;\/b&gt;/gi,'');
					
					$('#bookUploadInfo').append($('<div>').addClass('bookDetail').append($('<div>').addClass('bookUploadImgInfo').append($('<img>',{
						src : bookDataInfo.channel.item[i].cover_l_url
					}).attr('alt', searchBookTitle))).append($('<div>').addClass('bookUploadTextInfo')
					.append($('<div>').append($('<h1>').addClass('detailBookInfoTitle').append( searchBookTitle )))
					.append($('<div>').addClass('detailBookInfoEtc').append( searchBookAuthor )).append($('<div>')
					.addClass('detailBookInfoEtc').append( searchBookTrans )).append($('<div>')
					.addClass('detailBookInfoEtc').append( searchBookPubName )).append($('<div>')
					.addClass('detailBookInfoEtc').append( searchBookPubDate )).append($('<div>').addClass('seperateLine'))
					.append($('<div>').addClass('numberOfBook').append($('<div>').append('현재 키핑된 도서수 : 5권')).append($('<div>')
					.append('현재 기부된 도서수 : 7권'))).append($('<div>').addClass('bookUploadButton').append($('<button>').addClass('closeAddBook')
					.append('취소')).append($('<button>').addClass('donationAddBook'+i).append('기부')).append($('<button>').addClass('keepingAddBook' + i).append('키핑')))));
					
					bookUpload.keepingAddBook(i);
					
					bookUpload.donationAddBook(i);
				}
			},
			error : function (jqXHR,  textStatus, errorThrown) {
				console.log('실패');
			}
		});
//	});
};

bookUpload.keepingAddBook = function (i) {
	$( '#bookUploadInfo' ).on('click', '.keepingAddBook'+i, function () {
		$.ajax({
			url : 'ajax/book/addBook.do',
			dataType : 'json',
			type : 'POST',
			data : {
				title : (bookDataInfo.channel.item[i].title).replace('&lt;b&gt;','').replace('&lt;/b&gt;',''),
				author : (bookDataInfo.channel.item[i].author).replace('&lt;b&gt;','').replace('&lt;/b&gt;',''),
				price : (bookDataInfo.channel.item[i].list_price).replace('&lt;b&gt;','').replace('&lt;/b&gt;',''),
				pubDate : (bookDataInfo.channel.item[i].pub_date).replace('&lt;b&gt;','').replace('&lt;/b&gt;',''),
				pub : (bookDataInfo.channel.item[i].pub_nm).replace('&lt;b&gt;','').replace('&lt;/b&gt;',''),
				trans : (bookDataInfo.channel.item[i].translator).replace('&lt;b&gt;','').replace('&lt;/b&gt;',''),
				isbn : (bookDataInfo.channel.item[i].isbn13).replace('&lt;b&gt;','').replace('&lt;/b&gt;',''),
				bookImgUrl : (bookDataInfo.channel.item[i].cover_l_url).replace('&lt;b&gt;','').replace('&lt;/b&gt;',''),
				regCode : '1',
				category : bookDataInfo.channel.item[i].category
			},
			success : function (data) {
				alert('등록성공입니다');
			},
			error : function (jqXHR,  textStatus, errorThrown) {
				alert('실패입니다');
			}
		});
	});
};

bookUpload.donationAddBook = function (i) {
	$( '#bookUploadInfo' ).on('click', '.donationAddBook'+i, function () {
		$.ajax({
			url : 'ajax/book/addBook.do',
			dataType : 'json',
			type : 'POST',
			data : {
				title : (bookDataInfo.channel.item[i].title).replace('&lt;b&gt;','').replace('&lt;/b&gt;',''),
				author : (bookDataInfo.channel.item[i].author).replace('&lt;b&gt;','').replace('&lt;/b&gt;',''),
				price : (bookDataInfo.channel.item[i].list_price).replace('&lt;b&gt;','').replace('&lt;/b&gt;',''),
				pubDate : (bookDataInfo.channel.item[i].pub_date).replace('&lt;b&gt;','').replace('&lt;/b&gt;',''),
				pub : (bookDataInfo.channel.item[i].pub_nm).replace('&lt;b&gt;','').replace('&lt;/b&gt;',''),
				trans : (bookDataInfo.channel.item[i].translator).replace('&lt;b&gt;','').replace('&lt;/b&gt;',''),
				isbn : (bookDataInfo.channel.item[i].isbn13).replace('&lt;b&gt;','').replace('&lt;/b&gt;',''),
				bookImgUrl : (bookDataInfo.channel.item[i].cover_l_url).replace('&lt;b&gt;','').replace('&lt;/b&gt;',''),
				regCode : '2',
				category : bookDataInfo.channel.item[i].category
			},
			success : function (data) {
				alert('등록성공입니다');
			},
			error : function (jqXHR,  textStatus, errorThrown) {
				alert('실패입니다');
			}
		});
	});
	
};

bookUpload.ajaxFilter = function () {
	$.ajaxPrefilter( "json", function( options, originalOptions, jqXHR ) {
		if( options.crossDomain ) {
			options.url = 'http://apis.daum.net/search/book?apikey=8d42a74c4641dd5c4cb5c6a1122448ad8cf9050f&output=json&callback=book&q=' + $('#bookUploadBox').val();
			return 'jsonp';
		} else {
		return 'json';
		}
	});
};


