var myInform = {};

myInform.init = function() {

//   	this.initializing();
	
	this.myInfo();
	
	this.myBookNum();
	
//	myInform.myInfoDetail();
	this.pointGrant();
	
	
	var myInformHeight = $('.myPageBox').height();
	console.log(myInformHeight);
	
	/*개인 이미지 등록 수정*/
	$('#content').on('click','#myImg_AddBtn',function(event){
		 
		 $.ajax('ajax/member/imgUpload.do',{
			 type : 'POST',
			 dataType : 'json',
			 data : {
				 imgSrc : $('#prev_myProfileImg').attr('src')
			 },
			 success : function(data){
				 console.log('imgUpload.do 의 ');
				 console.log(data);
				 indexGlobal.userInfo();  //indexGlobal은 index.js 에서 전역변수로 선언 
				 alert('개인 이미지 등록 수정 성공입니다.');
			 },
			 error : function(xhr, status, message){
				 alert('개인 이미지 등록 수정 실패입니다.');
			 }
		 });
		 
		 event.stopImmediatePropagation();
	});
	
	/*개인 이미지 취소 버튼 클릭*/
	$('#content').on('click','#myImg_ResetBtn',function(event){
		// 취소버튼을 클릭하면 reset 됨
		event.stopImmediatePropagation();
	});
	

	/*이미지 등록버튼*/
	$('#content').on('click','#selectImgBtn',function(event){  // 이미지 선택버튼을 클릭하면 이전 이미지를 가려라
		$('#myInfoProfileImg').attr('style','display:none');
		event.stopImmediatePropagation();
	});
	
	/*개인정보수정 버튼-----------------------------------------------------------*/
	
	$('#content').on('click', '#myInfoUpdateBtn', function(event) {
		
		$('#content').load('pages/myPage/myInfoUpdate.html');
		
		event.stopImmediatePropagation();
	});
	
	$('#content').on('mouseenter','#handOver', function(){
		$('#handOver').addClass('reverse');
	});
	
	$('#content').on('mouseleave','#handOver', function(){
		$('#handOver').removeClass('reverse');
	});
	
	$('#myInfoUpdateBtn').hover(function(){
		$('#myInfoUpdateBtn').addClass('reverse');
	}, function() {
		$('#myInfoUpdateBtn').removeClass('reverse');
	});
	
	$('#pointGrant').hover(function(){
		$('#pointGrant').addClass('reverse');
	}, function() {
		$('#pointGrant').removeClass('reverse');
	});
	
	
	$('#pointGrant').click(function() {
		
		console.log($('#toUser').val());
		var toPoint = parseInt($('#toPoint').val());
		
		console.log(toPoint);
		
		$.ajax({
			url : 'ajax/member/grantPoint.do',
			type : 'POST',
			dataType : 'json',
			data : {
				toUser : $('#toUser').val(),
				toPoint : toPoint
			},
			success : function (data) {
				$('.myInfoUnderLine').remove();
				$('.simpleMyInfo').remove();
				$('#handOver').remove();
				myInform.myInfo();
				$.fancybox.close();
				
			},
			error : function(xhr,status,message){
				window.alert('요청실패');
				console.log(message);
			}
		});
		
		window.alert('양도되었습니다');
	});

};


/*나의 정보-----------------------------------------------------------*/

myInform.myInfo = function () {
	
	$.getJSON(
		'ajax/member/detail.do',
		
		function(data){
			
			$( '#myInfoProfileImg' ).attr('src','img/profileImg/'+data.member.photoUrl);
			
			var phoneNum11,
				phoneNum12,
				phoneNum13,
				phoneNum = null;
			
			if(data.member.phoNo.length == 11) {
				phoneNum1 = (data.member.phoNo).slice(0,3);
				phoneNum2 = (data.member.phoNo).slice(3,7);
				phoneNum3 = (data.member.phoNo).slice(7);
			} else {
				phoneNum1 = (data.member.phoNo).slice(0,3);
				phoneNum2 = (data.member.phoNo).slice(3,6);
				phoneNum3 = (data.member.phoNo).slice(6);
			}
			
			phoneNum = phoneNum1 + ' - ' + phoneNum2 + ' - ' + phoneNum3;
			
			$( '#infoList' ).append( $( '<div>' ).addClass('myInfoUnderLine')
							.append( $( '<span>' ).addClass( 'simpleMyInfo' ).text( data.member.email ) ) )
							.append( $( '<div>' ).addClass('myInfoUnderLine')
							.append( $( '<span>' ).addClass( 'simpleMyInfo' ).text( phoneNum ) ) )
							.append( $( '<div>' ).addClass('myInfoUnderLine')
							.append( $( '<span>' ).addClass( 'simpleMyInfo' ).text( data.member.addr1 ) ) )
							.append( $( '<div>' ).addClass('myInfoUnderLine')
							.append( $( '<span>' ).addClass( 'simpleMyInfo' ).text( data.member.point ) )
							.append( $( '<span>' ).append( $('<a>', 
									{text :'양도',
									 href : '#myInfoPoint'})
								.attr( 'id','handOver' ) ) ) );

			console.log(data);
				
		}
	);
};

myInform.myBookNum = function() {
	
	$.ajax({
		url : 'ajax/book/numMyBook.do',
		type : 'POST',
		dataType : 'json',
		success : function (data) {
			
//			내가 올린 키핑과 기부 도서 권수
			
			$('#myKeepingBookNum').text(data.numMyBK + '권');
			$('#myDonationBookNum').text(data.numMyBD + '권');
		},
		error : function (jqXHR,  textStatus, errorThrown) {
			console.log('내가 올린 도서 권수 수량 정보 가져오기 실패');
		}
	});
	
};

// 포인트 양도 팝업
myInform.pointGrant = function() {
	
	$('#handOver').fancybox({
		helpers :{
			overlay : {
				locked : false
			}
		},
		'scrolling'		: 'no',
		'titleShow'		: false,
		'width'			: 400,
		'height'		: 200,
		afterShow: function(){
		    $('#toUser').focus();
		}
	});

};


function previewImage(targetObj, previewId) {
	// 	크로스브라우징 처리 
	var preview = document.getElementById(previewId); //div id   
	var ua = window.navigator.userAgent;

	if (ua.indexOf("MSIE") > -1) {//ie일때

		targetObj.select();

		try {
			var src = document.selection.createRange().text; // get file full path 
			var ie_preview_error = document
			.getElementById("ie_preview_error_" + previewId);

			if (ie_preview_error) {
				preview.removeChild(ie_preview_error); //error가 있으면 delete
			}

			var img = document.getElementById(previewId); //이미지가 뿌려질 곳 

			img.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"
				+ src + "', sizingMethod='scale')"; 
			// 이미지 로딩, sizingMethod는 div에 맞춰서 사이즈를 자동조절 하는 역할
		} catch (e) {
			if (!document.getElementById("ie_preview_error_" + previewId)) {
				var info = document.createElement("<p>");
				info.id = "ie_preview_error_" + previewId;
				info.innerHTML = "a";             
				preview.insertBefore(info, null);            
			}
		}
		//크로스브라우징 처리 끝
	} else { //ie가 아닐때      ...크롬 사파리 일 경우 
		var files = targetObj.files;                    
		for ( var i = 0; i < files.length; i++) {             

			var file = files[i];

			var imageType = /image.*/; //이미지 파일일경우만.. 뿌려준다.
			if (!file.type.match(imageType))
				continue;

			var prevImg = document.getElementById("prev_" + previewId); //이전에 미리보기가 있다면 삭제
			if (prevImg) {
				preview.removeChild(prevImg);
			}

			var img = document.createElement("img"); //크롬은 div에 이미지가 뿌려지지 않는다. 그래서 자식Element를 만든다.
			img.id = "prev_" + previewId;
			img.classList.add("obj");
			img.file = file;
			img.style.width = '150px'; //기본설정된 div의 안에 뿌려지는 효과를 주기 위해서 div크기와 같은 크기를 지정해준다.
			img.style.height = '150px';
			img.style.border = '1px #D3D4D5 solid';

			preview.appendChild(img);

			if (window.FileReader) { // FireFox, Chrome , Opera 확인.
				var reader = new FileReader();
				reader.onloadend = (function(aImg) {
					return function(e) {
						aImg.src = e.target.result;
					};
				})(img);
				reader.readAsDataURL(file);
			} else { // safari is not supported FileReader
				//alert('not supported FileReader');
				if (!document.getElementById("sfr_preview_error_"
						+ previewId)) {
					var info = document.createElement("p");
					info.id = "sfr_preview_error_" + previewId;
					info.innerHTML = "not supported FileReader";
					preview.insertBefore(info, null);
				}
			}
		}
	}
}


/*테이블 초기화 -----------------------------------------------------------------------------------------------*/

/*테이블이 중복되서 append되지 않도록 로딩될 때마다 table 초기화*/

myInform.initializing = function() {
	$( '.myPageTableTr' ).remove();
};