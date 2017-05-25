var postResult = {};
var ZipcodeUpload = {};

	
ZipcodeUpload.searchZipcode = function () {
	
	var jsonURL = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20xml%20where%20url%20%3D%20%22';

	var qRequest = $('#address').val();
	qRequest=encodeURI(qRequest);
	console.log(qRequest);
	var naverApiURL = 'http%3A%2F%2Fbiz.epost.go.kr%2FKpostPortal%2Fopenapied%3Fregkey%3D0a13e4d2d5c407fd41368243959787%26target%3Dpost%26query%3D' + qRequest + '%22&format=json&diagnostics=true&callback=';
	console.log(naverApiURL);
	var query = jsonURL + naverApiURL;
	console.log(query);
	
	$(document).on('click', 'a.text1', function(event){
		
		var k=$(this).attr('data-no');
		
		console.log(k);
		console.log(postResult.postDataInfo);

		
		var postcd0 = (postResult.postDataInfo[k].postcd);
		var postcd1=postcd0.substr(0,3);				
		var postcd2=postcd0.substr(3);
		
		$("#addr1",opener.document).val(postResult.postDataInfo[k].address);
		$("#joinMemberZipCode1",opener.document).val(postcd1 + '-' + postcd2);
		
		$("#updateFormAddr1",opener.document).val(postResult.postDataInfo[k].address);
		$("#updateZipCode1",opener.document).val(postcd1 + ' - ' + postcd2);
		
		close();
		
		
		event.stopImmediatePropagation();
	});
	
	
	$.getJSON(query, parseXML);
	
	function parseXML (data) {
		console.log(data);
		postResult.postDataInfo = data.query.results.post.itemlist.item;			
		console.log(postResult.postDataInfo);
		
		$('#postBox').remove();
		
		$('<table>').attr('id','postResultTable').appendTo($('#postWrapper'));
		
		var tagPostResultTable = $('#postResultTable');
		
		$('<tr>')
			.append($('<th>').text('주            소'))
			.append($('<th>').text('우편번호'))
		.appendTo(tagPostResultTable);
		
		for(var i in postResult.postDataInfo) {
			
			
			var address2 = (postResult.postDataInfo[i].address);//.replace(/&lt;b&gt;/gi,'').replace(/&lt;\/b&gt;/gi,'');
			var postcd0 = (postResult.postDataInfo[i].postcd);
			var postcd1=postcd0.substr(0,3);				
			var postcd2=postcd0.substr(3);
			
			$('<tr>')
				.append($('<td>').addClass('postAddr')
						.append($('<a>', {text : address2, href : '#', 'data-no' : i})
								.addClass('text1')))
				.append($('<td>').addClass('postZip')
						.append($('<a>', {text : postcd1 + ' - ' + postcd2, href : '#', 'data-no' : i})
								.addClass('text1')))
			.appendTo(tagPostResultTable);
		}
			
			
			//자식창에서 부모창으로 값 전달
	
//			function post1(address2,postcd0) {
//			console.log(postResult.postDataInfo);
//			address2 = $("#joinWrapper.joinPage.joinForm.joinMemberContents.joinMemberInputForm.addr1",opener.document).val(address2);
//			postcd0 = $(opener.document).find('#joinMemberZipCode').val(postcd0);
//			postcd0 = $("#joinMemberZipCode", opener.document).val(postcd0);
//				
//				console.log(postResult.postDataInfo);
//					
//		};			
	};
	
};

