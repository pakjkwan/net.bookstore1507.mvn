var mainContentsBookCategory = {
		
		loaded : false
};

mainContentsBookCategory.init = function() {
	
	if(!this.loaded) {
		
		$('#content').on('mousedown', 'a.mainBookImg', function(event) {
			
			event.preventDefault();
			
			indexGlobal.isbn = $(this).attr('data-no');
			
			indexGlobal.regCode = $(this).attr('data-regCode');
			
			console.log(indexGlobal.isbn);
			
			console.log('메인 페이지에서 책 클릭시 글로벌 변수 indexGlobal에 넣어서 보관 : ' + indexGlobal.isbn );
			
			$('.tmpDiv').empty();
			
			$('.tmpDiv').load('pages/apply/applyPagePopup.html');
			
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
				'transitionIn'	: 'elastic',
				'transitionOut'	: 'elastic',
				'overlayShow'	: false
				
			});
			
			event.stopImmediatePropagation();
			
		});
	}
	
};


mainContentsBookCategory.mainBookPage = function() {
	
	$.ajax({
		url : 'ajax/book/mainBook.do',
		type : 'POST',
		dataType : 'json',
		success : function (data) {
			
			mainContentsBookCategory.mainBookData = data.mainBook;
			console.log(mainContentsBookCategory.mainBookData);
			
			var typeCodeCount = [0,0,0,0,0,0,0,0];
			var k = null;

			for (k in mainContentsBookCategory.mainBookData) {
				
				console.log(mainContentsBookCategory.mainBookData[k].title + '  :  ' + mainContentsBookCategory.mainBookData[k].typeCode);
				
//				var m = parseInt(mainBookData[k].typeCode);
//				(typeCodeCount[m-1]++;
				
				
				
				switch(mainContentsBookCategory.mainBookData[k].typeCode) {
				case '1' :
					if(typeCodeCount[0]++ <= 7) {
						mainContentsBookCategory.categoryContents(k);
					}
					break;
				case '2' :
					if(typeCodeCount[1]++ <= 7) {
						mainContentsBookCategory.categoryContents(k);
					}
					break;
				case '3' :
					if(typeCodeCount[2]++ <= 7) {
						mainContentsBookCategory.categoryContents(k);
					}
					break;
				case '4' :
					if(typeCodeCount[3]++ <= 7) {
						mainContentsBookCategory.categoryContents(k);
					}
					break;
				case '5' :
					if(typeCodeCount[4]++ <= 7) {
						mainContentsBookCategory.categoryContents(k);
					}
					break;
				case '6' :
					if(typeCodeCount[5]++ <= 7) {
						mainContentsBookCategory.categoryContents(k);
					}
					break;
				case '7' :
					if(typeCodeCount[6]++ <= 7) {
						mainContentsBookCategory.categoryContents(k);
					}
					break;
				case '8' :
					if(typeCodeCount[7]++ <= 7) {
						mainContentsBookCategory.categoryContents(k);
				
					}
					break;
				}
				
			}
		},
		
		error : function (jqXHR,  textStatus, errorThrown) {
			console.log('메인 페이지 책 목록 로드 실패');
		}
	});
	
};

mainContentsBookCategory.categoryContents=function(k) {
	
	var mainCategoryBookInfo = null;
	var tc = mainContentsBookCategory.mainBookData[k].typeCode;
	mainCategoryBookInfo = '#mainCategoryBookInfo' + tc;
	var tagMainCategoryBookInfo = $(mainCategoryBookInfo + '');
	
	$('<div>').addClass('mainBookInfo').addClass('ellipsis').addClass('boxOuterShadow')
	.append( $('<a>', { 
		href: '#popupPage',
		html: $( '<img>', {src: mainContentsBookCategory.mainBookData[k].bookImgUrl}),
		'data-no': mainContentsBookCategory.mainBookData[k].isbn,
		'data-regCode': mainContentsBookCategory.mainBookData[k].regCode,
	}).addClass('mainBookImg') )
	.append( $('<h2>', {
		html: mainContentsBookCategory.mainBookData[k].title
	}) )
	.appendTo(tagMainCategoryBookInfo);
};