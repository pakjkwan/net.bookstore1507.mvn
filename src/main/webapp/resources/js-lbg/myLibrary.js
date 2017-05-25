var fla = 0;
var myLibraryBookInfo = '';
var myLibrary = {};
var myLibraryUserInfo = '';
var myLibraryUserInfoes= [];
var myLibraryUserInfos= [];
var myLibraryLatLng = {};
var myLibraryAddrs = [];
var mapCheck = 0;
var markers = [];

myLibrary.init = function () {
	
	console.log('myLibrary.js enter');
//	this.myLibraryKeeping();
	this.initPage();
	this.pageLoad();

	this.clickEvent();
	
	$('#content').on('mousedown', 'a.myLibrarybookImg', function(event) {
		
		event.preventDefault();
		
		indexGlobal.isbn = $(this).attr('data-isbn');
		indexGlobal.pbn = $(this).attr('data-pbn');
		
		indexGlobal.regCode = $(this).attr('data-regCode');
		
		console.log(indexGlobal.isbn);
		console.log(indexGlobal.pbn);
		console.log(indexGlobal.regCode);
		
		
		console.log('내 서재에서 책 클릭시 글로벌 변수 indexGlobal에 넣어서 보관 : ' + indexGlobal.isbn );
		console.log('내 서재에서 책 클릭시 글로벌 변수 indexGlobal에 넣어서 보관 : ' + indexGlobal.pbn );
		
		$('.tmpDiv').empty();
		
		applyPagePopup.applyBookInfo();
		
		if (indexGlobal.regCode=='2') {
			
			$('.tmpDiv').load('pages/myLibrary/myLibDPopup.html');
			
			myLibrary.memberDonationlatlng();
			
		} else {
			
			$('.tmpDiv').load('pages/myLibrary/myLibKPopup.html');
			
			myLibrary.popupRightSide();
			
		}
		
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
};

myLibrary.initPage = function () {
	
	$('#myLibraryContents1').empty();
	if (myLibrary.pageNo == undefined) {
		myLibrary.pageNo = 1;
	}
	$.ajax('ajax/personalLibrary/myLibraryAll.do', {
		dataType : 'json',
		type : 'POST',
		data : {
			pageNo : myLibrary.pageNo
		},
		success : function (data) {	
			
			console.log('allLibrary');
			console.log(data);
			
			myLibraryBookInfo = data;
			myLibrary.pageNo = data.pageNo;
			myLibrary.recordCount = data.recordCount;
			myLibrary.pageSize = data.pageSize;
			myLibraryUserInfo = data.member.addr1;
			
			var totalPage = parseInt(myLibrary.recordCount / myLibrary.pageSize);
			if ((myLibrary.recordCount % myLibrary.pageSize) > 0) {
				totalPage++;
			}
			myLibrary.totalPage = totalPage;
			
			for(var i = 0; i < data.myLibraryAll.length; i++) {
				
				if(data.myLibraryAll[i].rentalStatus == '1') {
					if((data.myLibraryAll[i].bookImgUrl == '') || (data.myLibraryAll[i].bookImgUrl == null)){
//						$('#myLibraryContents1').append($('<div>').addClass('myLibraryBookDiv').append($('<div>').addClass('myLibraryBookInfo')
//						.append($('<a>').addClass('myLibrarybookImg' + i).attr('href','#').append($('<img>',{src : 'img/bookImgNoneR.jpeg'}))))
//						.append($('<div>').addClass('myLibrarylendText')));
//						myLibrary.bookDetailPopup(i);
						
						$('#myLibraryContents1')
							.append($('<div>').addClass('myLibraryBookDiv')
									.append($('<div>').addClass('myLibraryBookInfo')
											.append($('<a>', {
												href : '#libPopupPage', 
												'data-pbn' : data.myLibraryAll[i].persBookNo,
												'data-isbn' : data.myLibraryAll[i].isbn,
												'data-regCode' : data.myLibraryAll[i].regCode
												}).addClass('myLibrarybookImg')
													.append($('<img>',{src : 'img/bookImgNoneR.jpeg'}))))
								.append($('<div>').addClass('myLibrarylendText')));
								
					} else{
						
//						$('#myLibraryContents1').append($('<div>').addClass('myLibraryBookDiv').append($('<div>').addClass('myLibraryBookInfo')
//						.append($('<a>').addClass('myLibrarybookImg' + i).attr('href','#').append($('<img>',{src : data.myLibraryAll[i].bookImgUrl}))))
//						.append($('<div>').addClass('myLibrarylendText')));
//						myLibrary.bookDetailPopup(i);
						
						$('#myLibraryContents1')
							.append($('<div>').addClass('myLibraryBookDiv')
									.append($('<div>').addClass('myLibraryBookInfo')
											.append($('<a>', {
												href : '#libPopupPage',
												'data-pbn' : data.myLibraryAll[i].persBookNo,
												'data-isbn' : data.myLibraryAll[i].isbn,
												'data-regCode' : data.myLibraryAll[i].regCode
												}).addClass('myLibrarybookImg')
													.append($('<img>',{src : data.myLibraryAll[i].bookImgUrl}))))
								.append($('<div>').addClass('myLibrarylendText')));
								
					}
				}
				
				if(data.myLibraryAll[i].rentalStatus == '2') {
					if((data.myLibraryAll[i].bookImgUrl == '') || (data.myLibraryAll[i].bookImgUrl == null)){
						
//						 || (data.myLibrary[i].bookImgUrl.length() == 0)
						
//						$('#myLibraryContents1').append($('<div>').addClass('myLibraryBookDiv').append($('<div>').addClass('myLibraryBookInfo')
//						.append($('<a>').addClass('myLibrarybookImg' + i).attr('href','#').append($('<img>',{src : 'img/bookImgNoneR.jpeg'}))))
//						.append($('<div>').addClass('myLibrarylendText').append('대여중')));
//						myLibrary.bookDetailPopup(i);
						
						$('#myLibraryContents1')
							.append($('<div>').addClass('myLibraryBookDiv')
									.append($('<div>').addClass('myLibraryBookInfo')
											.append($('<a>',{
												href : '#libPopupPage',
												'data-pbn' : data.myLibraryAll[i].persBookNo,
												'data-isbn' : data.myLibraryAll[i].isbn,
												'data-regCode' : data.myLibraryAll[i].regCode
												}).addClass('myLibrarybookImg')
													.append($('<img>',{src : 'img/bookImgNoneR.jpeg'}))))
								.append($('<div>').addClass('myLibrarylendText').append('대여중')));
						
					} else{
						
//						$('#myLibraryContents1').append($('<div>').addClass('myLibraryBookDiv').append($('<div>').addClass('myLibraryBookInfo')
//						.append($('<a>').addClass('myLibrarybookImg' + i).attr('href','#').append($('<img>',{src : data.myLibraryAll[i].bookImgUrl}))))
//						.append($('<div>').addClass('myLibrarylendText').append('대여중')));
//						myLibrary.bookDetailPopup(i);
						
						$('#myLibraryContents1')
							.append($('<div>').addClass('myLibraryBookDiv')
									.append($('<div>').addClass('myLibraryBookInfo')
											.append($('<a>', {
												href : '#libPopupPage',
												'data-pbn' : data.myLibraryAll[i].persBookNo,
												'data-isbn' : data.myLibraryAll[i].isbn,
												'data-regCode' : data.myLibraryAll[i].regCode
												}).addClass('myLibrarybookImg')
													.append($('<img>',{src : data.myLibraryAll[i].bookImgUrl}))))
								.append($('<div>').addClass('myLibrarylendText').append('대여중')));
								
					}
				}
				
				if(data.myLibraryAll[i].doNo==null) {
					
					if(data.myLibraryAll[i].rentalStatus == '4') {
					$('#myLibraryContents1')
					.append($('<div>').addClass('myLibraryBookDiv')
							.append($('<div>').addClass('myLibraryBookInfo')
									.append($('<a>', {
										href : '#libPopupPage',
										'data-pbn' : data.myLibraryAll[i].persBookNo,
										'data-isbn' : data.myLibraryAll[i].isbn,
										'data-regCode' : data.myLibraryAll[i].regCode
										}).addClass('myLibrarybookImg')
											.append($('<img>',{src : data.myLibraryAll[i].bookImgUrl}))))
						.append($('<div>').addClass('myLibrarylendText').append('나눔 완료')));
					
					}
					
				}
				
			}
		},
		error : function (xhr, status, message) {
			alert('초기페이지실패');
		}
	});
};


myLibrary.clickEvent = function () {
	$('#myLibraryKeeping').on('click', function (e) {
		fla = 1;
		myLibrary.pageNo = 1;
		myLibrary.myLibraryKeeping();
		e.stopImmediatePropagation();
	});
	$('#myLibraryDonation').on('click', function (e) {
		fla = 2;
		myLibrary.pageNo = 1;
		myLibrary.myLibraryDonation();
		e.stopImmediatePropagation();
	});
};

myLibrary.myLibraryKeeping = function () {
	$('#myLibraryContents1').empty();
	if (myLibrary.pageNo == undefined) {
		myLibrary.pageNo = 1;
	}
	$.ajax('ajax/personalLibrary/myLibrary.do', {
		dataType : 'json',
		type : 'POST',
		data : {
			regCode : '1',
			pageNo : myLibrary.pageNo
		},
		success : function (data) {
			
			console.log('keeping info :::::');
			console.log(data);
			
			myLibraryBookInfo = data;
			myLibrary.pageNo = data.pageNo;
			myLibrary.recordCount = data.recordCount;
			myLibrary.pageSize = data.pageSize;
			myLibraryUserInfo = data.myAddr;
			mapCheck = 0;
			
			var totalPage = parseInt(myLibrary.recordCount / myLibrary.pageSize);
			if ((myLibrary.recordCount % myLibrary.pageSize) > 0) {
				totalPage++;
			}
			myLibrary.totalPage = totalPage;
//			for(var i = 0; i < data.myLibrary.length; i++) {
			for(var i in data.myLibrary) {
				if(data.myLibrary[i].regCode == '1') {
					if(data.myLibrary[i].rentalStatus == '1') {
						if((data.myLibrary[i].bookImgUrl == '') || (data.myLibrary[i].bookImgUrl == null) || (data.myLibrary[i].bookImgUrl.length == 0)){
							$('#myLibraryContents1').append($('<div>').addClass('myLibraryBookDiv').append($('<div>').addClass('myLibraryBookInfo')
							.append($('<a>').addClass('myLibrarybookImg' + i).attr('href','#').append($('<img>',{src : 'img/bookImgNoneR.jpeg'}))))
							.append($('<div>').addClass('myLibrarylendText')));
							myLibrary.bookDetailPopup(i);
						} else{
							$('#myLibraryContents1').append($('<div>').addClass('myLibraryBookDiv').append($('<div>').addClass('myLibraryBookInfo')
							.append($('<a>').addClass('myLibrarybookImg' + i).attr('href','#').append($('<img>',{src : data.myLibrary[i].bookImgUrl}))))
							.append($('<div>').addClass('myLibrarylendText')));
							myLibrary.bookDetailPopup(i);
						}
					}
					if(data.myLibrary[i].rentalStatus == '2') {
						if((data.myLibrary[i].bookImgUrl == '') || (data.myLibrary[i].bookImgUrl == null) || (data.myLibrary[i].bookImgUrl.length == 0)){
							$('#myLibraryContents1').append($('<div>').addClass('myLibraryBookDiv').append($('<div>').addClass('myLibraryBookInfo')
							.append($('<a>').addClass('myLibrarybookImg' + i).attr('href','#').append($('<img>',{src : 'img/bookImgNoneR.jpeg'}))))
							.append($('<div>').addClass('myLibrarylendText').append('대출중')));
							myLibrary.bookDetailPopup(i);
						} else{
							$('#myLibraryContents1').append($('<div>').addClass('myLibraryBookDiv').append($('<div>').addClass('myLibraryBookInfo')
							.append($('<a>').addClass('myLibrarybookImg' + i).attr('href','#').append($('<img>',{src : data.myLibrary[i].bookImgUrl}))))
							.append($('<div>').addClass('myLibrarylendText').append('대출중')));
							myLibrary.bookDetailPopup(i);
						}
					}
				}
			}
		},
		error : function (xhr, status, message) {
			alert('대여페이지실패');
		}
	});
};

myLibrary.myLibraryDonation = function () {
	$('#myLibraryContents1').empty();
	if (myLibrary.pageNo == undefined) {
		myLibrary.pageNo = 1;
	}
	$.ajax('ajax/personalLibrary/myLibrary.do', {
		dataType : 'json',
		type : 'POST',
		data : {
			regCode : '2',
			pageNo : myLibrary.pageNo
		},
		success : function (data) {
			
			console.log('donation info :::::');
			console.log(data);
			
			myLibraryBookInfo = data;
			myLibrary.pageNo = data.pageNo;
			myLibrary.recordCount = data.recordCount;
			myLibrary.pageSize = data.pageSize;
			mapCheck = 1;
			
			var totalPage = parseInt(myLibrary.recordCount / myLibrary.pageSize);
			if ((myLibrary.recordCount % myLibrary.pageSize) > 0) {
				totalPage++;
			}
			myLibrary.totalPage = totalPage;
//			for(var i = 0; i < data.myLibrary.length; i++) {
			for(var i in data.myLibrary) {
				if(data.myLibrary[i].regCode == '2') {
					if(data.myLibrary[i].rentalStatus == '1') {
						if((data.myLibrary[i].bookImgUrl == '') || (data.myLibrary[i].bookImgUrl == null) || (data.myLibrary[i].bookImgUrl.length == 0)){
							$('#myLibraryContents1').append($('<div>').addClass('myLibraryBookDiv').append($('<div>').addClass('myLibraryBookInfo')
							.append($('<a>').addClass('myLibrarybookImg' + i).attr('href','#').append($('<img>',{src : 'img/bookImgNoneR.jpeg'}))))
							.append($('<div>').addClass('myLibrarylendText')));
							myLibrary.bookDetailPopup(i);
						} else{
							$('#myLibraryContents1').append($('<div>').addClass('myLibraryBookDiv').append($('<div>').addClass('myLibraryBookInfo')
							.append($('<a>').addClass('myLibrarybookImg' + i).attr('href','#').append($('<img>',{src : data.myLibrary[i].bookImgUrl}))))
							.append($('<div>').addClass('myLibrarylendText')));
							myLibrary.bookDetailPopup(i);
						}
					}
					if(data.myLibrary[i].rentalStatus == '2') {
						if((data.myLibrary[i].bookImgUrl == '') || (data.myLibrary[i].bookImgUrl == null) || (data.myLibrary[i].bookImgUrl.length == 0)){
							$('#myLibraryContents1').append($('<div>').addClass('myLibraryBookDiv').append($('<div>').addClass('myLibraryBookInfo')
							.append($('<a>').addClass('myLibrarybookImg' + i).attr('href','#').append($('<img>',{src : 'img/bookImgNoneR.jpeg'}))))
							.append($('<div>').addClass('myLibrarylendText').append('나눔')));
							myLibrary.bookDetailPopup(i);
						} else{
							$('#myLibraryContents1').append($('<div>').addClass('myLibraryBookDiv').append($('<div>').addClass('myLibraryBookInfo')
							.append($('<a>').addClass('myLibrarybookImg' + i).attr('href','#').append($('<img>',{src : data.myLibrary[i].bookImgUrl}))))
							.append($('<div>').addClass('myLibrarylendText').append('나눔')));
							myLibrary.bookDetailPopup(i);
						}
					}
				} 
			}
		},
		error : function (xhr, status, message) {
			alert('기부페이지실패');
		}
	});
};

myLibrary.pageLoad = function () {
	$('#libPrevList').click(function(event) {
		alert('이전');
		event.preventDefault();
		if (myLibrary.pageNo > 1) {
			myLibrary.pageNo--;
			if(fla == 0) {
				myLibrary.initPage();
			}
			if(fla == 1){
				myLibrary.myLibraryKeeping();
			}
			if(fla == 2){
				myLibrary.myLibraryDonation();
			}
		}
	});
	
	$('#libNextList').click(function(event) {
		alert('다음');
		event.preventDefault();
		if (myLibrary.pageNo < myLibrary.totalPage) {
			myLibrary.pageNo++;
			if(fla == 0) {
				myLibrary.initPage();
			}
			if(fla == 1){
				myLibrary.myLibraryKeeping();
			}
			if(fla == 2){
				myLibrary.myLibraryDonation();
			}
		}
	});
};

myLibrary.bookDetailPopup = function (i) {
$('.myLibrarybookImg' + i).on('click', function (e) {
	myLibraryUserInfos =[];
	myLibraryLatLng = {};
	myLibraryAddrs = [];
	markers = [];
	$('#myLibraryKeepingPopup').empty();
	if(mapCheck == 1){
		$('#myLibraryKeepingPopup').attr('title','Libridge').append($('<div>').append($('<img>',{src:myLibraryBookInfo.myLibrary[i].bookImgUrl})).addClass('myLibraryDetailBookInfo'))
		.append($('<div>').append($('<div>').addClass('bookDetailTitle').append(myLibraryBookInfo.myLibrary[i].title))
				.append($('<div>').addClass('bookDetailContents').append(myLibraryBookInfo.myLibrary[i].author))
				.append($('<div>').addClass('bookDetailContents').append(myLibraryBookInfo.myLibrary[i].trans))
				.append($('<div>').addClass('bookDetailContents').append(myLibraryBookInfo.myLibrary[i].price))
				.append($('<div>').attr('id','map')));
		
		
		$('#myLibraryKeepingPopup').dialog({
				resizable: false,
				width : 500,
			    height : 400,
			    modal: true
		});
		myLibrary.memberDonationlatlng();	
		
		} else {
			$('#myLibraryKeepingPopup').attr('title','Libridge').append($('<div>').append($('<img>',{src:myLibraryBookInfo.myLibrary[i].bookImgUrl})).addClass('myLibraryDetailBookInfo'))
			.append($('<div>').append($('<div>').addClass('bookDetailTitle').append(myLibraryBookInfo.myLibrary[i].title))
					.append($('<div>').addClass('bookDetailContents').append(myLibraryBookInfo.myLibrary[i].author))
					.append($('<div>').addClass('bookDetailContents').append(myLibraryBookInfo.myLibrary[i].trans))
					.append($('<div>').addClass('bookDetailContents').append(myLibraryBookInfo.myLibrary[i].price)));
			$('#myLibraryKeepingPopup').dialog({
				resizable: false,
				width : 500,
			    height : 400,
			    modal: true
			});
		}
		
		e.stopImmediatePropagation();
	});
};

myLibrary.popupRightSide = function() {
	
	if (myLibrary.pageNo == undefined) {
		myLibrary.pageNo = 1;
	}
	
	console.log(myLibrary.pageNo);
	
	$.ajax({
		url : 'ajax/personalLibrary/lenderInfo.do',
		type : 'POST',
		dataType : 'json',
		data : {
			persBookNo : indexGlobal.pbn,
			pageNo : myLibrary.pageNo
		},
		success : function (data) {
			
			console.log(':::::lenderInfo:::::::');
			console.log(data);
			
			myLibrary.pageNo = data.pageNo;
			myLibrary.recordCount = data.recordCount;
			myLibrary.pageSize = data.pageSize;
			
			var totalPage = parseInt(myLibrary.recordCount / myLibrary.pageSize);
			
			if ( (myLibrary.recordCount % myLibrary.pageSize) > 0 ) {
				totalPage++;
			}
			myLibrary.totalPage = totalPage;
			
			applyPagePopup.clearList();
			
			var ownerInfoAdd = $( '#ownerInfoAll' );
			
			var k = null;
			
			for (k in data.lender) {
				
				$('<div>').addClass('applyPagePopupLocInfoDiv')
					.append( $('<div>').addClass('lenderInfo')
						.append( $('<span>').text(data.lender[k].id).addClass('lenderInfoDetail').addClass('lenderLeft') ) )
						.append( $('<span>').text(data.lender[k].addr1).addClass('lenderInfoDetail').addClass('lenderRight') )
					.appendTo(ownerInfoAdd);
			}
			
			$('#currPageNo').text(applyPagePopup.pageNo);
		},
		error : function (xhr, status, message) {
			alert('보관 도서대출 정보 가져오기 실패');
			console.log(message);
		}
	});
};



myLibrary.memberDonationlatlng = function () {
	
	console.log(indexGlobal.pbn);
	
	$.ajax('ajax/personalLibrary/donationMap.do', {
		type : 'POST',
		datatype : 'json',
		async: false,
		data : {
			persBookNo : indexGlobal.pbn,
			pageNo : 1
		},
		success : function (data) {
			console.log('::::::::::::::::::::::::::');
			console.log(data);
			var kount = 1;
			myLibraryUserInfoes = myLibraryUserInfo.split(" ");
			console.log(myLibraryUserInfoes);
			myLibraryUserInfos[0] = myLibraryUserInfoes[0] + myLibraryUserInfoes[1];
			if(!(data.donation.length == 0)){
				for(var j = 0; j < data.donation.length; j++){
					myLibraryUserInfoes = data.donation[j].addr1.split(" ");
					myLibraryUserInfos[j+1] = myLibraryUserInfoes[0] + myLibraryUserInfoes[1];
					if(j == data.donation.length - 1){
						for(var k=0; k < myLibraryUserInfos.length; k++){
							console.log(myLibraryUserInfos);
							kount = myLibraryUserInfos.length;
							myLibrary.daumLatLng(myLibraryUserInfos[k], kount);
						}
					}
				}
			} else {
				console.log('일루 넘어감');
				myLibrary.daumLatLng(myLibraryUserInfos[0], kount);
			}
		},
		error : function (xhr, status, message) {
			alert('member주소정보 가져오기 실패');
		}
	});
};

myLibrary.daumLatLng = function (myLibraryUserInfos, kount) {
	myLibrary.mapFilter();
	
	$.ajax('http://apis.daum.net/local/geo/addr2coord?apikey=489ce4b369d961a41dd2feafe4c91faaaa5cad41&output=json&q='+myLibraryUserInfos, {
		dataType : 'json',
		type : 'GET',
		success : function (data) {
			var xjapyo = data.channel.item[0].point_x;
			var yjapyo = data.channel.item[0].point_y;
				myLibraryLatLng = {y : yjapyo, x : xjapyo};
				myLibraryAddrs.push(myLibraryLatLng);
				
				if(myLibraryAddrs.length == kount){
					myLibrary.googleMap(myLibraryAddrs);
				}
				
		},
		error : function (xhr, status, message) {
			console.log(message);
			alert('좌표실패');
		}
	});
};

myLibrary.googleMap = function (myLibraryAddrs) {
		var map;
		var inde = myLibraryAddrs.length;
		console.log('이거는 랭값이다');
		console.log(inde);
		console.log('이거는 주소 좌표 모음이다');
		console.log(myLibraryAddrs);
		var mapOptions = {
		        center: new google.maps.LatLng(myLibraryAddrs[inde-1].y, myLibraryAddrs[inde-1].x),
		        zoom: 6,
		        mapTypeId: google.maps.MapTypeId.ROADMAP
		      }; 
		map = new google.maps.Map($('#map')[0],
		        mapOptions);
		for(var count=0; count < myLibraryAddrs.length; count++){
			markersopser = 
				{
					position : new google.maps.LatLng(myLibraryAddrs[count].y, myLibraryAddrs[count].x),
					map : map,
					icon : 'img/PingIcon'+count+'.png'
				};
			markers.push(markersopser);
			new google.maps.Marker(markers[count]);
		}
};

myLibrary.mapFilter = function (myLibraryUserInfo) {
	$.ajaxPrefilter( "json", function( options, originalOptions, jqXHR ) {
		if( options.crossDomain ) {
			return 'jsonp';
		} else {
		return 'json';
		}
	});
};