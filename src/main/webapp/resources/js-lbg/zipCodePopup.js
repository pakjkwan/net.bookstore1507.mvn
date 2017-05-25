var postResult = {};
var zipcodeUpload = {};

	
zipcodeUpload.searchZipcode = function () {
	
	var jsonURL = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%20%3D%20%22';

	var qRequest = $('#searchAddress').val();
	qRequest=encodeURI(qRequest);
	console.log(qRequest);
	var naverApiURL = 'http%3A%2F%2Fbiz.epost.go.kr%2FKpostPortal%2Fopenapied%3Fregkey%3D0a13e4d2d5c407fd41368243959787%26target%3Dpost%26query%3D' + qRequest + '%22&format=json&diagnostics=true&callback=';
	console.log(naverApiURL);
	var query = jsonURL + naverApiURL;
	console.log(query);
	
	$.getJSON(query, parseXML);
	
	function parseXML (data) {
		postResult.postDataInfo = data.query.results.post.itemlist.item;			
		console.log(postResult.postDataInfo);
		
		for(var i in postResult.postDataInfo) {
			
			var address2 = (postResult.postDataInfo[i].address);//.replace(/&lt;b&gt;/gi,'').replace(/&lt;\/b&gt;/gi,'');
			var postcd0 = (postResult.postDataInfo[i].postcd);
			var postcd1 = postcd0.substr(0,3) + '-' + postcd0.substr(3);
			
			console.log(address2);
			console.log(postcd1);
			
//			document.write('<a href=# class=text1 onClick="post1(address2,postcd0)">');
//			document.write(address2+'<br/>');
//			document.write(postcd1 + '-' + postcd2 + '<br />');	
//			document.write('</a>');
				
			function post1(address2,postcd0) {
				console.log(postResult.postDataInfo);
				address2 = $("#joinWrapper.joinPage.joinForm.joinMemberContents.joinMemberInputForm.addr1",opener.document).val(address2);
				postcd0 = $(opener.document).find('#joinMemberZipCode').val(postcd0);
				return address2,postcd0;
				top.window.close();   
			}
		}		
		
		$(this).fancybox({
			helpers :{
				overlay : {
					locked : false
				}
			},
			'scrolling'		: 'yes',
			'titleShow'		: false,
	        'width'			: 400,
	        'height'		: 260,
	        'autoSize'		: false,
	        'opacity'		: true,
	        'transitionIn'	:	'elastic',
			'transitionOut'	:	'elastic',
			'speedIn'		:	600, 
			'speedOut'		:	200, 
			'overlayShow'	:	false
		});
	
	
	};
};
