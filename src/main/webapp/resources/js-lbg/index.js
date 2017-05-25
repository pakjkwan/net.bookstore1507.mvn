var indexGlobal = {};

$(document).ready(function () {
	
	$('#content').load('pages/main/mainContents.html');
	
	// 메뉴에 마우스 오버시 반전
	menuMouseOver();

	// 메인메뉴
	logoDropMenu();
	
	// 카테고리
	categoryMenu();
	
	// 카테고리 서브 메뉴
	categorySubMenu();
	
	// 2레벨 하위 카테고리
	twoLevelCategorySubMenu();
	
	// 사용자 메뉴
	usernameDropMenu();
	
	// 도서 등록(Upload)
	bookUploadPu();
	
	// 로그인 팝업
	login();
	
	//로그아웃
	logoutDropMenu();
	
	// html 문서를 클릭하면 메뉴가 사라짐
	$('html').click(function() {

		if ($('#logomenu').css('display') == 'block') {
			$('#logomenu').css('display', 'none');
		}

		if ($('#usermenu').css('display') == 'block') {
			$('#usermenu').css('display', 'none');
		}
	});

	// 로고 메뉴에서 홈을 누르면 메인페이지로
	$( '#returnHome' ).click(function() {
		indexGlobal.blindCategory();
		$('#content').load('pages/main/mainContents.html');
	});

	// 공지사항
	$( '#noticeLink' ).click(function() {
		indexGlobal.blindCategory();
		$('#content').load('pages/notice/notice.html');
	});

	// 가이드
	$( '#guideLink' ).click(function() {
		indexGlobal.blindCategory();
		$('#content').load('pages/guide/guide.html');
	});	

	// 대출 현황
	$( '#usermenu' ).on('click', '#dropMenuBorrowCon', function() {
		indexGlobal.blindCategory();
		$('#content').load('pages/myPage/bookApplyCondition.html');
	});
	
	//대여 현황
	$( '#usermenu' ).on('click', '#dropMenuLendCon', function() {
		indexGlobal.blindCategory();
		$('#content').load('pages/myPage/bookAcceptCondition.html');
	});
	
	// 나의 서재
	$( '#usermenu' ).on('click', '#dropMenuMyLibrary', function () {
		indexGlobal.blindCategory();
		$('#content').load('pages/myLibrary/myLibrary.html');
	});
	
	// 내 정보 수정, 포인트 양도
	$( '#usermenu' ).on('click', '#dropMenuMyInform', function() {
		indexGlobal.blindCategory();
		$('#content').load('pages/myPage/myInformation.html');
	});

	// 로그인 폼에서 회원 가입
	$( '#lonIn_signUpForm' ).on('click', '#joinMember', function() {
		indexGlobal.blindCategory();
		$('#content').load('pages/member/joinPage.html');
	});
	
	$('#topmenu').on('click', '#profile', function() {
		$('#content').load('pages/myPage/myInformation.html');
	});
	
	$('#state').on('mouseenter','#message',function() {
		$('#msgImg').css('background-position', '0px -35px');
	});
	
	$('#state').on('mouseleave','#message',function() {
		$('#msgImg').css('background-position', '0px 0px');
	});
	
	// 쪽지함
	$('#state').on('click','#message',function(){
		indexGlobal.blindCategory();
		$('#content').load('pages/message/message.html');
	});
	
	// 대여, 대출현황에서 키핑과 기부 버튼 클릭 이벤트
	$('#content').on('click','#keepingConditionBorrow', function() {
		$('#content').load('pages/myPage/bookApplyCondition.html');
	});
	
	$('#content').on('click','#donationConditionBorrow', function() {
		$('#content').load('pages/myPage/bookApplyConditionD.html');
	});
	
	$('#content').on('click','#keepingConditionLend', function() {
		$('#content').load('pages/myPage/bookAcceptCondition.html');
	});
	
	$('#content').on('click','#donationConditionLend', function() {
		$('#content').load('pages/myPage/bookAcceptConditionD.html');
	});
	
	// 검색(db검색)시 엔터키 인식
	$('#searchInput').on('keypress',  function(event) {
		
		if (event.which == 13) {
			
			event.preventDefault();
			
			indexGlobal.blindCategory();
			
			console.log($('#searchInput').val());
			
			indexGlobal.searchKw = $('#searchInput').val();
			
			console.log('index -> indexGlobal.searchKw');
			console.log(indexGlobal.searchKw);
			
			$('#content').load('pages/bookSearch/bookSearch.html');
			
			bookSearch.searchResult();
			
			event.stopImmediatePropagation();
			
		}
		
	});
	
	//검색(다음 api)시 엔터키로 인식
	$('#bookUploadBox').keypress(function(event) {
		
		if (event.which == 13) {
			
			event.preventDefault();
			
			indexGlobal.blindCategory();
			
			console.log($('#bookUploadBox').val());
			
			var keyword = $('#bookUploadBox').val();
			
			indexGlobal.searchKw = keyword.replace(/\s+/g, '');
			
			console.log('index -> indexGlobal.searchKw');
			console.log(indexGlobal.searchKw);
			
			$('#content').load('pages/uploadBook/bookUpResult.html');
			
			event.stopImmediatePropagation();
			
		}
		
	});
	
	// 다음 api검색시 마우스 클릭으로 인식
	$('#bookUpSearchConfirm').click(function(event) {
		
			event.preventDefault();
			
			indexGlobal.blindCategory();
			
			console.log($('#bookUploadBox').val());
			
			indexGlobal.searchKw = $('#bookUploadBox').val();
			
			console.log('index -> indexGlobal.searchKw');
			console.log(indexGlobal.searchKw);
			
			$('#content').load('pages/uploadBook/bookUpResult.html');
			
			event.stopImmediatePropagation();
			
	});
	
	$('#content').on('mousedown', 'a.bookCateImg', function(event) {
		
		event.preventDefault();
		
		indexGlobal.isbn = $(this).attr('data-isbn');
		
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
	
});


/*메뉴에 마우스 오버하면 배경색 반전 js*/
function menuMouseOver() {

    $('.hovereverse').hover(function () {
        $(this).addClass('reverse');
    }, function () {
        $(this).removeClass('reverse');
    });
}

/* 메인 메뉴*/
function logoDropMenu() {

	$('#logo').click(function(e){
		if ($('#logomenu').css('display') == 'block') {
			$('#logomenu').css('display', 'none');
		} else {
			$('#logomenu').css('display', 'block');
		}
		
		if ($('#usermenu').css('display') == 'block') {
			$('#usermenu').css('display', 'none');
		}
		
		e.stopImmediatePropagation();
	});
}

/* 카테고리 */
function categoryMenu() {

	$('#topMenuInjection').on('click','.topCategory', function(event){
		
		if ($('#usermenu').css('display') == 'block') {
			$('#usermenu').css('display', 'none');
		} 
		
		if ($('#logomenu').css('display') == 'block') {
			$('#logomenu').css('display', 'none');
		}
		
		if ($('#categoryMenu').css('display') != 'block') {
			
			/*for (var i = 1; i <= 8; i++) {
				
				$('#cate' + i).css('width','12%');
				$('#cate' + i).css('color','#000');
			}
			
			var cateRandom = Math.floor((Math.random()*8)+1);
			console.log(cateRandom);
			var cateR = '#cate' + cateRandom;
			
			$(cateR).css('width','16%');
			$(cateR).css('color','#FFF');*/
		
			$('#categoryMenu').slideDown('slow');
			
			if($('#wrapper').css('margin-top') < '30px') {
			
				$('#wrapper').animate({"margin-top": "+=30"}, 600);
			}
		} else {
			
			$('.subCate').remove();
			
			$('#categoryMenu').slideUp('slow');
			
			if($('#wrapper').css('margin-top') == '30px') {
				$('#wrapper').animate({"margin-top": "-=30"}, 600);
			} else if ($('#wrapper').css('margin-top') == '60px') {
				$('#wrapper').animate({"margin-top": "-=60"}, 600);
			}
		}
		
		event.stopImmediatePropagation();

	});
}

function categorySubMenu() {
	
	$('.cateSubMenu').css('z-index','10');
	
	$('#cate1').click(function(event) {
		
		indexGlobal.searchKw = '1';
		
		indexGlobal.categorySearch();
		
		$('.subCate').remove();
		
		var clickedNodeId = $('#novel').attr('id');
		
		if (clickedNodeId == undefined) {
			
//			event.preventDefault();
			
			$( $('#literature').append( $( '<div>' ).addClass('subCate').addClass('cateLiterature').attr('id','novel').append( $('<a>', {href : '#', text:'소설'}).addClass('wide') ) ) );
			$( $('#literature').append( $( '<div>' ).addClass('subCate').addClass('cateLiterature').attr('id','poemEssay').append( $('<a>', {href : '#', text:'시 / 에세이'}).addClass('wide') ) ) );
			
		}
		
		if ( $('#literature').css('display') != 'block' ) {
			$('#literature').css('display', 'block');
		}
		
		if($('#wrapper').css('margin-top') != '60px') {
			
			$('#wrapper').animate({"margin-top": "+=30"}, 600);
		}
		
		event.stopImmediatePropagation();
		
	});
	
	$('#cate2').click(function() {
		
		indexGlobal.searchKw = '2';
		
		indexGlobal.categorySearch();
		
		$('.subCate').remove();
		
		var clickedNodeId = $('#history').attr('id');
		
		if (clickedNodeId == undefined) {
		
			$( $('#liberalArts').append( $( '<div>' ).addClass('subCate').addClass('cateLiberalArts').attr('id','humanities').append( $('<a>', {href : '#', text:'인문'}).addClass('wide') ) ) );
			$( $('#liberalArts').append( $( '<div>' ).addClass('subCate').addClass('cateLiberalArts').attr('id','history').append( $('<a>', {href : '#', text:'역사 / 문화'}).addClass('wide') ) ) );
			$( $('#liberalArts').append( $( '<div>' ).addClass('subCate').addClass('cateLiberalArts').attr('id','politics').append( $('<a>', {href : '#', text:'정치 / 사회'}).addClass('wide') ) ) );
			$( $('#liberalArts').append( $( '<div>' ).addClass('subCate').addClass('cateLiberalArts').attr('id','economic').append( $('<a>', {href : '#', text:'경제 / 경영'}).addClass('wide') ) ) );
			$( $('#liberalArts').append( $( '<div>' ).addClass('subCate').addClass('cateLiberalArts').attr('id','religion').append( $('<a>', {href : '#', text:'종교'}).addClass('wide') ) ) );
		}
		
		if ( $('#liberalArts').css('display') != 'block' ) {
			$('#liberalArts').css('display', 'block');
		}
		
		if($('#wrapper').css('margin-top') != '60px') {
			
			$('#wrapper').animate({"margin-top": "+=30"}, 600);
		}
		
		event.stopImmediatePropagation();
	});
	
	$('#cate3').click(function() {
		
		indexGlobal.searchKw = '3';
		
		indexGlobal.categorySearch();
		
		$('.subCate').remove();
		
		var clickedNodeId = $('#science').attr('id');
		
		if (clickedNodeId == undefined) {
		
			$( $('#scienceEngineer').append( $( '<div>' ).addClass('subCate').addClass('cateScienceEngineer').attr('id','science').append( $('<a>', {href : '#', text:'과학'}).addClass('wide') ) ) );
			$( $('#scienceEngineer').append( $( '<div>' ).addClass('subCate').addClass('cateScienceEngineer').attr('id','computer').append( $('<a>', {href : '#', text:'컴퓨터 / IT'}).addClass('wide') ) ) );
			$( $('#scienceEngineer').append( $( '<div>' ).addClass('subCate').addClass('cateScienceEngineer').attr('id','engineering').append( $('<a>', {href : '#', text:'기술 / 공학'}).addClass('wide') ) ) );
		}
		
		if ( $('#scienceEngineer').css('display') != 'block' ) {
			$('#scienceEngineer').css('display', 'block');
		}
		
		if($('#wrapper').css('margin-top') != '60px') {
			
			$('#wrapper').animate({"margin-top": "+=30"}, 600);
		}
		
		event.stopImmediatePropagation();
	});
	
	$('#cate4').click(function() {
		
		indexGlobal.searchKw = '4';
		
		indexGlobal.categorySearch();
		
		$('.subCate').remove();
		
		var clickedNodeId = $('#life').attr('id');
		
		if (clickedNodeId == undefined) {
		
			$( $('#lifeStyle').append( $( '<div>' ).addClass('subCate').addClass('cateLifeStyle').attr('id','life').append( $('<a>', {href : '#', text:'가정 / 생활'}).addClass('wide') ) ) );
			$( $('#lifeStyle').append( $( '<div>' ).addClass('subCate').addClass('cateLifeStyle').attr('id','cooking').append( $('<a>', {href : '#', text:'요리'}).addClass('wide') ) ) );
			$( $('#lifeStyle').append( $( '<div>' ).addClass('subCate').addClass('cateLifeStyle').attr('id','health').append( $('<a>', {href : '#', text:'건강'}).addClass('wide') ) ) );
			$( $('#lifeStyle').append( $( '<div>' ).addClass('subCate').addClass('cateLifeStyle').attr('id','sports').append( $('<a>', {href : '#', text:'취미 / 스포츠'}).addClass('wide') ) ) );
			$( $('#lifeStyle').append( $( '<div>' ).addClass('subCate').addClass('cateLifeStyle').attr('id','travel').append( $('<a>', {href : '#', text:'여행 / 기행'}).addClass('wide') ) ) );
		}		
		
		if ( $('#lifeStyle').css('display') != 'block' ) {
			$('#lifeStyle').css('display', 'block');
		}
		
		if($('#wrapper').css('margin-top') != '60px') {
			
			$('#wrapper').animate({"margin-top": "+=30"}, 600);
		}
		
		event.stopImmediatePropagation();
	});
	
	$('#cate5').click(function() {
		
		indexGlobal.searchKw = '5';
		
		indexGlobal.categorySearch();
		
		$('.subCate').remove();

		var clickedNodeId = $('#comics').attr('id');
		
		if (clickedNodeId == undefined) {
		
			$( $('#culture').append( $( '<div>' ).addClass('subCate').addClass('cateCulture').attr('id','popCulture').append( $('<a>', {href : '#', text:'예술 / 대중문화'}).addClass('wide') ) ) );
			$( $('#culture').append( $( '<div>' ).addClass('subCate').addClass('cateCulture').attr('id','comics').append( $('<a>', {href : '#', text:'만화'}).addClass('wide') ) ) );
		}		
		
		if ( $('#culture').css('display') != 'block' ) {
			$('#culture').css('display', 'block');
		}
		
		if($('#wrapper').css('margin-top') != '60px') {
			
			$('#wrapper').animate({"margin-top": "+=30"}, 600);
		}
		
		event.stopImmediatePropagation();		
	});
	
	$('#cate6').click(function() {
		
		indexGlobal.searchKw = '6';
		
		indexGlobal.categorySearch();
		
		$('.subCate').remove();
		
		var clickedNodeId = $('#middleEdu').attr('id');
		
		if (clickedNodeId == undefined) {
		
			$( $('#education').append( $( '<div>' ).addClass('subCate').addClass('cateEducation').attr('id','middleEdu').append( $('<a>', {href : '#', text:'중 / 고등학습'}).addClass('wide') ) ) );
			$( $('#education').append( $( '<div>' ).addClass('subCate').addClass('cateEducation').attr('id','childEng').append( $('<a>', {href : '#', text:'어린이 영어'}).addClass('wide') ) ) );
			$( $('#education').append( $( '<div>' ).addClass('subCate').addClass('cateEducation').attr('id','elementaryEdu').append( $('<a>', {href : '#', text:'초등학습'}).addClass('wide') ) ) );
			$( $('#education').append( $( '<div>' ).addClass('subCate').addClass('cateEducation').attr('id','foreignLang').append( $('<a>', {href : '#', text:'외국어'}).addClass('wide') ) ) );
			$( $('#education').append( $( '<div>' ).addClass('subCate').addClass('cateEducation').attr('id','exam').append( $('<a>', {href : '#', text:'수험서'}).addClass('wide') ) ) );
			$( $('#education').append( $( '<div>' ).addClass('subCate').addClass('cateEducation').attr('id','dictionary').append( $('<a>', {href : '#', text:'사전'}).addClass('wide') ) ) );
		}		
		
		if ( $('#education').css('display') != 'block' ) {
			$('#education').css('display', 'block');
		}
		
		if($('#wrapper').css('margin-top') != '60px') {
			
			$('#wrapper').animate({"margin-top": "+=30"}, 600);
		}
		
		event.stopImmediatePropagation();		
		
	});
	
	$('#cate7').click(function() {
		
		indexGlobal.searchKw = '7';
		
		indexGlobal.categorySearch();
		
		$('#cate7').css('color','#FFF');
		
		$('.subCate').remove();
		
		var clickedNodeId = $('#kid').attr('id');
		
		if (clickedNodeId == undefined) {
		
			$( $('#childTeen').append( $( '<div>' ).addClass('subCate').addClass('cateChilTeen').attr('id','adolscent').append( $('<a>', {href : '#', text:'청소년'}).addClass('wide') ) ) );
			$( $('#childTeen').append( $( '<div>' ).addClass('subCate').addClass('cateChilTeen').attr('id','kid').append( $('<a>', {href : '#', text:'어린이'}).addClass('wide') ) ) );
			$( $('#childTeen').append( $( '<div>' ).addClass('subCate').addClass('cateChilTeen').attr('id','kidSeries').append( $('<a>', {href : '#', text:'어린이 전집'}).addClass('wide') ) ) );
			$( $('#childTeen').append( $( '<div>' ).addClass('subCate').addClass('cateChilTeen').attr('id','child').append( $('<a>', {href : '#', text:'아동'}).addClass('wide') ) ) );
			$( $('#childTeen').append( $( '<div>' ).addClass('subCate').addClass('cateChilTeen').attr('id','infant').append( $('<a>', {href : '#', text:'유아'}).addClass('wide') ) ) );
		}		
		
		if ( $('#childTeen').css('display') != 'block' ) {
			$('#childTeen').css('display', 'block');
		}
		
		if($('#wrapper').css('margin-top') != '60px') {
			
			$('#wrapper').animate({"margin-top": "+=30"}, 600);
		}
		
		event.stopImmediatePropagation();		
		
	});
	
	$('#cate8').click(function() {
		
		indexGlobal.searchKw = '8';
		
		indexGlobal.categorySearch();
		
		$('.subCate').remove();
		
		var clickedNodeId = $('#life').attr('id');
		
		if (clickedNodeId == undefined) {
		
			$( $('#etc').append( $( '<div>' ).addClass('subCate').addClass('cateEtc').attr('id','magazine').append( $('<a>', {href : '#', text:'잡지'}).addClass('wide') ) ) );
			$( $('#etc').append( $( '<div>' ).addClass('subCate').addClass('cateEtc').attr('id','selfImprovement').append( $('<a>', {href : '#', text:'자기계발'}).addClass('wide') ) ) );
			$( $('#etc').append( $( '<div>' ).addClass('subCate').addClass('cateEtc').attr('id','official').append( $('<a>', {href : '#', text:'정부간행물'}).addClass('wide') ) ) );
		}		
		
		if ( $('#etc').css('display') != 'block' ) {
			$('#etc').css('display', 'block');
		}
		
		if($('#wrapper').css('margin-top') != '60px') {
			
			$('#wrapper').animate({"margin-top": "+=30"}, 600);
		}
		
		event.stopImmediatePropagation();		
		
	});
}

/* 2레벨 서브 메뉴들 */
function twoLevelCategorySubMenu() {
	
	$('#subCategoryMenu').on('click','#novel', function(event) {
		
		indexGlobal.searchKw = '소설';
		
		indexGlobal.twoLevelCategorySearch();
	});
	
	$('#subCategoryMenu').on('click','#poemEssay', function(event) {
		
		indexGlobal.searchKw = '시/에세이';
		
		indexGlobal.twoLevelCategorySearch();
	});
	
	$('#subCategoryMenu').on('click','#humanities', function(event) {
		
		indexGlobal.searchKw = '인문';
		
		indexGlobal.twoLevelCategorySearch();
	});
	
	$('#subCategoryMenu').on('click','#history', function(event) {
		
		indexGlobal.searchKw = '역사/문화';
		
		indexGlobal.twoLevelCategorySearch();
	});
	
	$('#subCategoryMenu').on('click','#politics', function(event) {
		
		indexGlobal.searchKw = '정치/사회';
		
		indexGlobal.twoLevelCategorySearch();
	});
	
	$('#subCategoryMenu').on('click','#economic', function(event) {
		
		indexGlobal.searchKw = '경제/경영';
		
		indexGlobal.twoLevelCategorySearch();
	});
	
	$('#subCategoryMenu').on('click','#religion', function(event) {
		
		indexGlobal.searchKw = '종교';
		
		indexGlobal.twoLevelCategorySearch();
	});
	
	$('#subCategoryMenu').on('click','#science', function(event) {
		
		indexGlobal.searchKw = '과학';
		
		indexGlobal.twoLevelCategorySearch();
	});
	
	$('#subCategoryMenu').on('click','#computer', function(event) {
		
		indexGlobal.searchKw = '컴퓨터/IT';
		
		indexGlobal.twoLevelCategorySearch();
	});
	
	$('#subCategoryMenu').on('click','#engineering', function(event) {
		
		indexGlobal.searchKw = '기술/공학';
		
		indexGlobal.twoLevelCategorySearch();
	});
	
	$('#subCategoryMenu').on('click','#life', function(event) {
		
		indexGlobal.searchKw = '가정/생활';
		
		indexGlobal.twoLevelCategorySearch();
	});
	
	$('#subCategoryMenu').on('click','#cooking', function(event) {
		
		indexGlobal.searchKw = '요리';
		
		indexGlobal.twoLevelCategorySearch();
	});
	
	$('#subCategoryMenu').on('click','#health', function(event) {
		
		indexGlobal.searchKw = '건강';
		
		indexGlobal.twoLevelCategorySearch();
	});
	
	$('#subCategoryMenu').on('click','#sports', function(event) {
		
		indexGlobal.searchKw = '취미/스포츠';
		
		indexGlobal.twoLevelCategorySearch();
	});
	
	$('#subCategoryMenu').on('click','#travel', function(event) {
		
		indexGlobal.searchKw = '여행/기행';
		
		indexGlobal.twoLevelCategorySearch();
	});
	
	$('#subCategoryMenu').on('click','#popCulture', function(event) {
		
		indexGlobal.searchKw = '예술/대중문화';
		
		indexGlobal.twoLevelCategorySearch();
	});
	
	$('#subCategoryMenu').on('click','#comics', function(event) {
		
		indexGlobal.searchKw = '만화';
		
		indexGlobal.twoLevelCategorySearch();
	});
	
	$('#subCategoryMenu').on('click','#middleEdu', function(event) {
		
		indexGlobal.searchKw = '중/고등학습';
		
		indexGlobal.twoLevelCategorySearch();
	});
	
	$('#subCategoryMenu').on('click','#childEng', function(event) {
		
		indexGlobal.searchKw = '어린이 영어';
		
		indexGlobal.twoLevelCategorySearch();
	});
	
	$('#subCategoryMenu').on('click','#elementaryEdu', function(event) {
		
		indexGlobal.searchKw = '초등학습';
		
		indexGlobal.twoLevelCategorySearch();
	});
	
	$('#subCategoryMenu').on('click','#foreignLang', function(event) {
		
		indexGlobal.searchKw = '외국어';
		
		indexGlobal.twoLevelCategorySearch();
	});
	
	$('#subCategoryMenu').on('click','#exam', function(event) {
		
		indexGlobal.searchKw = '수험서';
		
		indexGlobal.twoLevelCategorySearch();
	});
	
	$('#subCategoryMenu').on('click','#dictionary', function(event) {
		
		indexGlobal.searchKw = '사전';
		
		indexGlobal.twoLevelCategorySearch();
	});
	
	$('#subCategoryMenu').on('click','#adolscent', function(event) {
		
		indexGlobal.searchKw = '청소년';
		
		indexGlobal.twoLevelCategorySearch();
	});
	
	$('#subCategoryMenu').on('click','#kid', function(event) {
		
		indexGlobal.searchKw = '어린이';
		
		indexGlobal.twoLevelCategorySearch();
	});
	
	$('#subCategoryMenu').on('click','#kidSeries', function(event) {
		
		indexGlobal.searchKw = '어린이 전집';
		
		indexGlobal.twoLevelCategorySearch();
	});
	
	$('#subCategoryMenu').on('click','#child', function(event) {
		
		indexGlobal.searchKw = '아동';
		
		indexGlobal.twoLevelCategorySearch();
	});
	
	$('#subCategoryMenu').on('click','#infant', function(event) {
		
		indexGlobal.searchKw = '유아';
		
		indexGlobal.twoLevelCategorySearch();
	});
	
	$('#subCategoryMenu').on('click','#magazine', function(event) {
		
		indexGlobal.searchKw = '잡지';
		
		indexGlobal.twoLevelCategorySearch();
	});
	
	$('#subCategoryMenu').on('click','#selfImprovement', function(event) {
		
		indexGlobal.searchKw = '자기계발';
		
		indexGlobal.twoLevelCategorySearch();
	});
	
	$('#subCategoryMenu').on('click','#official', function(event) {
		
		indexGlobal.searchKw = '정부간행물';
		
		indexGlobal.twoLevelCategorySearch();
	});
}
		

/* 도서 등록 */
function bookUploadPu() {
	
	$('#bookUploadPopup').fancybox({
		helpers :{
			overlay : {
				locked : false
			}
		},
		'scrolling'		: 'no',
		'titleShow'		: false,
        'width'			: 400,
        'height'		: 200,
        'autoSize'		: false,
        'opacity'		: true,
        'transitionIn'	:	'elastic',
		'transitionOut'	:	'elastic',
		'speedIn'		:	600, 
		'speedOut'		:	200, 
		'overlayShow'	:	false,
		afterShow: function(){
		    $('#bookUploadBox').focus();
		}
        
	});
	
//	$('#content').load('pages/bookUploadSearch/bookUpload.html');
		
}

// 사용자 메뉴
function usernameDropMenu() {

	$('#topmenu').on('click', '#username', function(event){
		
		if ($('#usermenu').css('display') == 'block') {
			$('#usermenu').css('display', 'none');
		} else {
			$('#usermenu').css('display', 'block');
		}
		
		if ($('#logomenu').css('display') == 'block') {
			$('#logomenu').css('display', 'none');
		}
		
		event.stopImmediatePropagation();
	});
}

// 로그인 팝업
function login() {
	
	$('#loginPopup').fancybox({
		helpers :{
			overlay : {
				locked : false
			}
		},
		'scrolling'		: 'no',
		'titleShow'		: false,
        'width'			: 400,
        'height'		: 260,
        'autoSize'		: false,
        'opacity'		: true,
        'transitionIn'	:	'elastic',
		'transitionOut'	:	'elastic',
		'speedIn'		:	600, 
		'speedOut'		:	200, 
		'overlayShow'	:	false,
		afterShow: function(){
		    $('#idBox').focus();
		}
	});
	
}

//로그아웃 버튼
function logoutDropMenu(){
	$('#usermenu').on('click','#dropMenuLogOut',function(event){
		
		$.getJSON(
			'ajax/auth/logout.do',
			function(data) {
				indexGlobal.userInfo();
				$('#content').load('pages/main/mainContents.html');
			}
		);
		
		event.stopImmediatePropagation();
	});
}

// 로그인 유무 판단(인터셉터에서 걸러 보낸다)
indexGlobal.userInfo = function() {
	
	$.ajax({
		type : 'GET',
		dataType: 'json',
		url : 'ajax/auth/userInfo.do',

		success:function(data){
			
			console.log(data);
			
			indexGlobal.status = data.status;
			
			indexGlobal.msgCountZero = data.count;
			indexGlobal.msgCount1 = data.count1;
			indexGlobal.msgCount2 = data.count2;
			indexGlobal.msgCount = data.count1 + data.count2;
			
			console.log(indexGlobal.msgCount1);
			console.log(indexGlobal.msgCount1);
			console.log(indexGlobal.msgCount);
			
//			$('#content').load('pages/main/mainContents.html');
			
			if (data.status == 'success') {
				
				console.log(indexGlobal.status);
				
				$('#searchBox').css('margin-left','30px');
				
				$('#topMenuInjection').empty();
				
				$('#topMenuInjection').load('pages/topMenuInjec/menuInjecD.html');
				
				// 상단 메뉴 영역
				$( '#state' ).empty();
				
				$( '#state' ).append( $( '<span>' ).attr('id','username').addClass('memberState')
								.append( $('<a>', 
								{
									text:data.member.id,
									href:'#'
								}).addClass('wide') ) );
				
				$( '#state' ).append( $( '<span>' ).attr('id','profile')
						.append( $('<a>', 
								{
							href:'#',
							html: $( '<img>',
									{src: "img/profileImg/" + data.member.photoUrl,
									 id : 'profileImg'})
								}).attr('id', 'profileImgA').addClass('wide') ) );
				
				// 쪽지 개수가 0개일 때
				if (data.count == 0) {
					
//					$( '#state' ).append( $( '<span>' ).attr('id','message')
//									 .append( $('<a>', 
//									 {
//									 	href:'#',
//									 	html: $( '<img>', {src: 'img/message3.png'})
//									 }).attr('id', 'messageImg').addClass('wide') ) );
					
					$( '#state' ).append( $( '<div>' ).attr('id','message')
							 .append( $('<div>').attr('id', 'msgImg') ) );
							 
				// 쪽지 개수가 1개 이상
				} else {
					
//					$( '#state' ).append( $( '<span>' ).attr('id','message')
//							 .append( $('<a>', 
//							 {
//							 	href:'#',
//							 	html: $( '<img>', {src: 'img/message3.png'})
//							 }).attr('id', 'messageImg').addClass('wide') )
//							 .append( $('<div>').attr('id', 'unreadMsg')
//									 .append($('<img>', {src : 'img/unreadMsg.png'})))
//							 .append( $('<div>').attr('id', 'unreadMsgCount').text(indexGlobal.msgCount)) );
					
					$( '#state' ).append( $( '<div>' ).attr('id','message')
							 .append( $('<div>').attr('id', 'msgImg') )
							 .append( $('<div>').attr('id', 'unreadMsg')
									 .append($('<img>', {src : 'img/unreadMsg.png'})))
							 .append( $('<div>').attr('id', 'unreadMsgCount').text(indexGlobal.msgCount)) );
					
				}
				
				// 관리자일 때
				if(data.member.admin==1){
					
					$.fancybox.close();
					
					console.log(data);
				
				// 일반 회원일 때
				} else {
					
					$.fancybox.close();
					
					console.log(data);
				}
				
			} else {
				
				console.log('로그인 상태가 아닙니다(세션에 정보없음');
				
				console.log(indexGlobal.status);
				
				console.log('data.error' + data.error);
				
				$('#searchBox').css('margin-left','96px');
				
				$('#topMenuInjection').empty();
				$('#state').empty();
				
				$('#topMenuInjection').load('pages/topMenuInjec/menuInjecS.html');
				
				$( '#state' ).append( $( '<span>' ).attr('id','login').addClass('memberState')
						.append( $('<a>', 
						{
							text:'Sign Up / Log In',
							href:'#loginForm'
						}).addClass('wide').attr('id','loginPopup') ) );
				
				if ($('#usermenu').css('display') == 'block') {
					$('#usermenu').css('display', 'none');
				}
				
			}
		},

		error:function(xhr, status, message){
			window.alert(error);
			
		} 
	});
};

indexGlobal.categorySearch = function() {
	
	$('#content').load('pages/bookSearch/bookSearch.html');
	
	$.ajax({
		type : 'POST',
		dataType: 'json',
		url : 'ajax/book/highCate.do',
		data:{
			typeCode : indexGlobal.searchKw
		},

		success:function(data){
			
			console.log(':::::::::::::::HighCategory data:::::::::::::::');
			console.log(data);
			
			var i = null;
			
			var tagBookSearchPageInfo = $('.bookSearchPageInfo');
			
			for (i in data.highCate) {
				
				$('<div>').addClass('bookSearchInfo').addClass('ellipsis').addClass('boxOuterShadow')
				.append( $('<a>', {
					href: '#popupPage',
					html: $( '<img>', {src: data.highCate[i].bookImgUrl}),
					'data-isbn': data.highCate[i].isbn,
					'data-regCode': data.highCate[i].regCode
					}).addClass('bookCateImg') )
				.append( $('<h2>', {
					html: data.highCate[i].title
					}) )
				.appendTo(tagBookSearchPageInfo);
			}
		},

		error:function(xhr, status, message){
			window.alert('검색 요청 실패입니다.');
			console.log(message);
		} 
	});
	
};

indexGlobal.twoLevelCategorySearch = function() {
	
	$('#content').load('pages/bookSearch/bookSearch.html');
	
	$.ajax({
		type : 'POST',
		dataType: 'json',
		url : 'ajax/book/lowCate.do',
		data:{
			category : indexGlobal.searchKw
		},

		success:function(data){
			
			console.log(':::::::::::::::LowCategory data:::::::::::::::');
			console.log(data);
			
			var i = null;
			
			var tagBookSearchPageInfo = $('.bookSearchPageInfo');
			
			for (i in data.lowCate) {
				
				$('<div>').addClass('bookSearchInfo').addClass('ellipsis').addClass('boxOuterShadow')
				.append( $('<a>', {
					href: '#popupPage',
					html: $( '<img>', {src: data.lowCate[i].bookImgUrl}),
					'data-isbn': data.lowCate[i].isbn,
					'data-regCode': data.lowCate[i].regCode
					}).addClass('bookCateImg') )
				.append( $('<h2>', {
					html: data.lowCate[i].title
					}) )
				.appendTo(tagBookSearchPageInfo);
			}
		},

		error:function(xhr, status, message){
			window.alert('검색 요청 실패입니다.');
			console.log(data.error);
		} 
	});
	
};


indexGlobal.blindCategory = function () {
	
	if ($('#categoryMenu').css('display') == 'block') {
		
		$('.subCate').remove();
		$('.cateSubMenu').css('display','none');
		$('#literature').css('display','none');
		$('#liberalArts').css('display','none');
		$('#scienceEngineer').css('display','none');
		$('#lifeStyle').css('display','none');
		$('#culture').css('display','none');
		$('#education').css('display','none');
		$('#childTeen').css('display','none');
		$('#etc').css('display','none');
		
		$('#categoryMenu').slideUp('slow');
		
		if($('#wrapper').css('margin-top') == '30px') {
			$('#wrapper').animate({"margin-top": "-=30"}, 600);
		} else if ($('#wrapper').css('margin-top') == '60px') {
			$('#wrapper').animate({"margin-top": "-=60"}, 600);
		}
	}
	
};

function circle() {
	
	$('<div>').addClass('circle').text(indexGlobal.msgCount).appendTo($('#message'));
	
};

/*indexGlobal.jqUpdateSize = function(){
    // Get the dimensions of the viewport
    var width = $(window).width();
    var height = $(window).height();

    $('#jqWidth').html(width);      // Display the width
    $('#jqHeight').html(height);    // Display the height
};

$(document).ready(indexGlobal.jqUpdateSize());    // When the page first loads
$(window).resize(indexGlobal.jqUpdateSize());     // When the browser changes size*/