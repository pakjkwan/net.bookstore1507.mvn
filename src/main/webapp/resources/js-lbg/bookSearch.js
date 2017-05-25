var bookSearch = {
		loaded : false
};

bookSearch.init =  function () {
	
	if (!this.loaded) {
	
		console.log('bookSearch.js');
		
		$('#content').on('mousedown', 'a.bookSearchImg', function(event) {
			
			event.preventDefault();
			
			indexGlobal.isbn = $(this).attr('data-isbn');
			indexGlobal.regCode = $(this).attr('data-regCode');
			
			console.log(indexGlobal.isbn);
			console.log(indexGlobal.regCode);
			
			console.log('검색 결과 페이지에서 책 클릭시 글로벌 변수 bookSearch에 넣어서 보관 : ' + indexGlobal.isbn );
			
			$('.tmpDiv').empty();
			
			$('.tmpDiv').load('pages/apply/applyPagePopup.html');
			
			$('a.bookSearchImg').fancybox({
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
				'transitionIn'	: 'elastic',
				'transitionOut'	: 'elastic',
				'overlayShow'	: false
				
			});
			
			event.stopImmediatePropagation();
					
		});
	}
	
};

bookSearch.searchResult = function() {
	
	console.log('bookSearch -> indexGlobal.searchKw');
	console.log(indexGlobal.searchKw);
	
	$.ajax({
		type : 'POST',
		dataType: 'json',
		url : 'ajax/book/dbSearch.do',
		data:{
			keyword:indexGlobal.searchKw
		},

		success:function(data){
			
			console.log(':::::::::::::::검색결과 data:::::::::::::::');
			console.log(data);
			
			var i = null;
			
			var tagBookSearchPageInfo = $('.bookSearchPageInfo');
			
			for (i in data.searchR) {
				
				$('<div>').addClass('bookSearchInfo').addClass('ellipsis').addClass('boxOuterShadow')
				.append( $('<a>', { 
					href: '#popupPage',
					html: $( '<img>', {src: data.searchR[i].bookImgUrl}),
					'data-isbn': data.searchR[i].isbn,
					'data-regCode': data.searchR[i].regCode
					}).addClass('bookSearchImg') )
				.append( $('<h2>', {
					html: data.searchR[i].title
					}) )
				.appendTo(tagBookSearchPageInfo);
			}
			
			$('#searchInput').val('');
		},

		error:function(xhr, status, message){
			window.alert('검색 요청 실패입니다.');
			console.log(message);
		} 
	});
	
};