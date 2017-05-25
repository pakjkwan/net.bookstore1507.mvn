/*****************************************************
1. $.post() 방식 :서버에 데이터를 HTTP POST 방식으로 전송한 후 서버측 응답 받을 때 사용
 ******************************************************/

// 요청 Url 만 , 리턴 결과값 무시
$.post("http://web/test/");

// 요청 Url + 추가적으로 보내는 Json Data, 리턴 결과값 무시

$.post("http://web/test/", {
	name : "John",
	time : "2pm"
});

// 요청 Url + 추가적으로 보내는 Array Data, 리턴 결과값 무시

$.post("http://web/test/", {
	'choices[]' : [ "Jon", "Susan" ]
});

// 요청 Url + 폼데이터, 리턴 결과값 무시

$.post("http://web/test/", $("#testform").serialize());

// 요청 Url, xml(또는 html)리턴 결과값

$.post("http://web/test/", function(data) {
	alert("Data Loaded: " + data);
});

// 요청 Url + 추가적으로 보내는 Json Data, 리턴결과값, 결과값 형식

$.post("http://web/test/", {
	name : "John",
	time : "2pm"
}, function(data) {
	process(data);
}, "xml");

// 요청 Url + 추가적으로 보내는 Json Data, 리턴결과값(json 다루는 형식), 결과값 형식

$.post("http://web/test/", {
	"func" : "getNameAndTime"
}, function(data) {
	console.log(data.name);

	// John console.log(data.time); // 2pm
}, "json");


/*****************************************************
2. $.get() 방식 :서버에 데이터를 HTTP GET 방식으로 전송한 후 서버측 응답 받을 때 사용
 ******************************************************/

// 요청 Url 만 , 리턴 결과값 무시 
$.get("http://web/test/"); 
// 요청 Url + 추가적으로 보내는 Json Data, 리턴 결과값 무시 

$.get("http://web/test/", {
	name : "John",
	time : "2pm"
}); 

// 요청 Url + 추가적으로 보내는 Array Data, 리턴 결과값 무시 

$.get("http://web/test/", {
	'choices[]' : [ "Jon", "Susan" ]
}); 

// 요청 Url, xml(또는 html)리턴 결과값 

$.get("http://web/test/", function(data) {
	alert("Data Loaded: " + data);
}); 

// 요청 Url + 추가적으로 보내는 Json Data, 리턴결과값, 결과값 형식

$.get("http://web/test/", {
	name : "John",
	time : "2pm"
	}, function(data) {
	process(data);
}, "xml"); 

// 요청 Url + 추가적으로 보내는 Json Data, 리턴결과값(json 다루는 형식), 결과값 형식 
$.get("http://web/test/", {
	"func" : "getNameAndTime"
	}, function(data) {
	console.log(data.name); // John
});
/*****************************************************
3.$.getJSON() 방식 :서버에 데이터를 HTTP GET 방식으로 전송한 후 서버측 응답을 JSON 형식으로 받을때 사용 
 ******************************************************/
$.getJSON(
				"http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
				{
					tags : "mount rainier",
					tagmode : "any",
					format : "json"
				}, function(data) {
					$.each(data.items, function(i, item) {
						$("<img/>").attr("src", item.media.m).appendTo(
								"#images");
						if (i == 3)
							return false;
					});
				}); // 2pm

/*****************************************************
4. $.ajax() 방식 :HTTP POST,GET,JSON 모든 방식 전송 가능한 통합적인 함수
 ******************************************************/

// 요청 Url + 추가적 데이터, 완료된 후 리턴 메시지를 받음 

$.ajax({
	type : "POST",
	url : "http://web/test/",
	data : {
		name : "John",
		location : "Boston"
	}
}).done(function(msg) {
	alert("Data Saved: " + msg);
}); 

// 최종 버전 리턴 Html 가져오기 

$.ajax({
	url : "http://web/test/",
	cache : false
}).done(function(html) {
	$("#results").append(html);
}); 

// 서버에 데이터를 보낸 후 저장처리, 그리고 사용자에게 리턴 완료 메시지 반환 

var menuId = $("ul.nav").first().attr("id"); 

var request = $.ajax({
	url : "http://web/test/",
	type : "POST",
	data : {
		id : menuId
	},
	dataType : "html"
});
request.done(function(msg) {
	$("#log").html(msg);
});
request.fail(function(jqXHR, textStatus) {
	alert("Request failed: " + textStatus);
}); 

// 자바 스크립트 로딩 및 실 

$.ajax({ type: "GET", url: "test.js", dataType: "script" });


/*****************************************************
5. $.ajaxSetup() 방식 : - 공통적인 기본 ajax 요청을 미리 설정함
 ******************************************************/
// 미리 ajaxSetup에 기본사항들을 설정한 후 ajax 로 각각 호출 



/*****************************************************
6. $.load() 방식 : - 외부 컨텐츠 가져올때 사용
 ******************************************************/


// Html Content 로딩 

$('#result').load('ajax/test.html');

// Html Content 로딩 후 메시지

$('#result').load('ajax/test.html', function() {
	alert('Load was performed.');
});

// Html Content #container Target 로딩

$('#result').load('ajax/test.html #container');

// array parameter 전달 후 Html Content 로딩

$("#objectID").load("test.asp", {
	'choices[]' : [ "Jon", "Susan" ]
});