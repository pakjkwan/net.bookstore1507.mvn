var bookUploadResult = {};

bookUploadResult.init = function () {
	
	if (bookUploadResult.uploadPageNo == undefined) {
		bookUploadResult.uploadPageNo = 1;
	} 
	
	$('#content').on('mousedown', 'a.bookUpSearchImg', function(event) {
		
		event.preventDefault();
		
		bookUploadResult.no = $(this).attr('data-no');
		bookUploadResult.isbn = $(this).attr('data-isbn');
		console.log('isbn : ' + bookUploadResult.isbn);
		
		$('.tmpDiv').empty();
		
		$('.tmpDiv').load('pages/uploadBook/bookUploadPopup.html');
		
		$(this).fancybox({
			helpers :{
				overlay : {
					locked : false
				}
			},
			'scrolling'		: 'no',
			'titleShow'		: false,
			'width'			: 570,
			'height'		: 480,
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
	
	$('#content').on('click', 'a.searchPageNo', function(event) {
		event.preventDefault();
		
		bookUploadResult.uploadPageNo = $(this).attr('data-page');
		
		bookUploadResult.searchBookThumb();
		
		event.stopImmediatePropagation();
	});
	
};

bookUploadResult.searchBookThumb = function() {
	
	bookUploadResult.ajaxFilter();
	
	
	/*yql을 이용하여 네이버 책 API에서 json 값을 가져오는 로직
	
	네이버는 카테고리를 지원하지 않기에 사용을 못함.*/
	
//	var jsonURL = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%20%3D%20%22';
//
//	var qRequest = indexGlobal.searchKw;
//
//	var naverApiURL = 'http%3A%2F%2Fopenapi.naver.com%2Fsearch%3Fkey%3D2490e95dc572925103763e4814ce862a%26query%3D' + qRequest + '%26display%3D100%26start%3D1%26target%3Dbook%22&format=json&diagnostics=true&callback=';
//
//	var query = jsonURL + naverApiURL;
//
//
//	$.getJSON(query, parseXML);
//			
//	function parseXML (data) {
//		
//		bookUploadResult.bookDataInfo = data.query.results.rss.channel.item;
//		
//		console.log(bookUploadResult.bookDataInfo);
//		
//		var tagBookUploadSearchPageInfo = $('.bookUploadSearchPageInfo');
//		
//		for(var i in bookUploadResult.bookDataInfo) {
//			
//			console.log(bookUploadResult.bookDataInfo[i].title);
//			
//			var searchBookTitle = (bookUploadResult.bookDataInfo[i].title).replace(/&lt;b&gt;/gi,'').replace(/&lt;\/b&gt;/gi,'');
//			var searchBookImgUrl = (bookUploadResult.bookDataInfo[i].image);
//			
//			$('<div>').addClass('bookUpResultInfo').addClass('ellipsis')
//			.append( $('<a>', { 
//				href: '#uploadPage',
//				html: $( '<img>', {src: searchBookImgUrl}),
//				'data-no' : i
//			}).addClass('bookUpSearchImg') )
//			.append( $('<h2>', {
//				html: searchBookTitle
//			}) )
//			.appendTo(tagBookUploadSearchPageInfo);
//			
//		}
//		
//		$.fancybox.close();
//		$('#bookUploadBox').val('');
//	}
	
	$.ajax({
		url : 'http://apis.daum.net/search/book?q=daum&apikey=ea763c12e8c5d01734bb8e37fffb51aa58d332f3&result=20&output=json&callback=string&sort=accu&q=' + indexGlobal.searchKw + '&pageno=' + bookUploadResult.uploadPageNo,
		type : 'GET',
		dataType : 'json',
		success : function (data) {
			
			bookUploadResult.clearPage();
			
			bookUploadResult.bookDataInfo = data.channel.item;
			
			console.log(bookUploadResult.bookDataInfo);
			
			var tagBookUploadSearchPageInfo = $('.bookUploadSearchPageInfo');
			
			for(var i in bookUploadResult.bookDataInfo) {
				
				console.log(bookUploadResult.bookDataInfo[i].title);
				
				var searchBookTitle = (bookUploadResult.bookDataInfo[i].title).replace(/&lt;b&gt;/gi,'').replace(/&lt;\/b&gt;/gi,'');
				var searchBookImgUrl = null;
				
				if (bookUploadResult.bookDataInfo[i].cover_l_url != '') {
					
					searchBookImgUrl = bookUploadResult.bookDataInfo[i].cover_l_url;
					
				} else {
					
					if (bookUploadResult.bookDataInfo[i].cover_s_url != '') {
						
						searchBookImgUrl = bookUploadResult.bookDataInfo[i].cover_s_url;
						
					} else {
						
						searchBookImgUrl = 'http://localhost:9999/libridge/img/bookImgNoneR.jpeg';
						
					}
				}
				
				console.log(searchBookImgUrl);
				
				$('<div>').addClass('bookUpResultInfo').addClass('ellipsis').addClass('boxOuterShadow')
				.append( $('<a>', { 
					href: '#uploadPage',
					html: $( '<img>', {src: searchBookImgUrl}),
					'data-no' : i,
					'data-isbn' : bookUploadResult.bookDataInfo[i].isbn13
				}).addClass('bookUpSearchImg') )
				.append( $('<h2>', {
					html: searchBookTitle
				}) )
				.appendTo(tagBookUploadSearchPageInfo);
			}
			
			bookUploadResult.pageNo();
			
			$.fancybox.close();
			$('#bookUploadBox').val('');
			
		},
		
		error : function (jqXHR,  textStatus, errorThrown) {
			console.log('실패');
		}
	});
	
};

bookUploadResult.pageNo = function() {
	
	var tagBookUploadSearchPageInfo = $('.bookUploadSearchPageInfo');
	
	$('<div>').addClass('searchPageOuterDiv').addClass('outerCenter').appendTo(tagBookUploadSearchPageInfo);
	
	var tagSearchPageOuterDiv = $('.searchPageOuterDiv');
	
	$('<div>').addClass('searchPageInnerDiv').addClass('innerCenter').appendTo(tagSearchPageOuterDiv);
	
	var tagSearchPageInnerDiv = $('.searchPageInnerDiv');
	
	var k = null;
	
	var pageNo = parseFloat(bookUploadResult.uploadPageNo);
	
	if ((pageNo - 4) <= 0) {
		pageNo = 1;
	} else {
		pageNo = pageNo - 4;
	}
	
	for (k = pageNo; k <= (pageNo + 8); k++)	{
		
		$('<a>', { 
				href: '#',
				html: '['+k+']',
				'data-page' : k
				}).addClass('searchPageNo')
				.appendTo(tagSearchPageInnerDiv);
	}
	
};

bookUploadResult.ajaxFilter = function () {
	$.ajaxPrefilter( "json", function( options, originalOptions, jqXHR ) {
		if( options.crossDomain ) {
			return 'jsonp';
		} else {
		return 'json';
		}
	});
};


bookUploadResult.clearPage = function() {
	$('.bookUploadSearchPageInfo').empty();
	$('.searchPagingDiv').remove();
};