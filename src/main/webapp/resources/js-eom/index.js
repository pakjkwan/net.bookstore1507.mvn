$(document).ready(function() {
	requestUserInfo();
	
	$('#project').click(function(){
		$('#content').load('project/main.html');
	});
	
	$('#member').click(function(){
		$('#content').load('member/main.html');
	});
});

function requestMyProjects() {
	$.ajax('../ajax/project/mylist.do',	{
		type: 'GET',
		dataType: 'json',
		success: function(data) {
			var tagMyProjects = $("#myProjects");
			for(var i in data.list) {
				tagMyProjects.append(
					$("<li></li>").text(data.list[i].title));
			}
		},
		error: function(xhr, status, message) {
			window.alert(message);
		}
	});
}

function requestUserInfo() {
	$.ajax('../ajax/user/userInfo.do',	{
		type: 'GET',
		dataType: 'json',
		success: function(data) {
			if (data.status == 'fail') {
				location.href = 'auth/main.html';
				return;
			} else {
				var userName = $('#userName');
				var userEmail = $('#userEmail');
			
				userName.html(data.member.name);
				userEmail.html(data.member.email);
				
				requestMyProjects();
			}
		},
		error: function(xhr, status, message) {
			window.alert(message);
		}
	});
}








