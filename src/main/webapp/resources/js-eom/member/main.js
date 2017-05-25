var member = {};

member.init = function() {
	this.changeButtonStatus('new');
	this.listMember();
	
	$(document).on('click', 'a.title', function(event){
		$.getJSON(
			'../ajax/member/detail.do?email=' + $(this).attr('data-email'), 
			function(data) {
				var memberData = data.member;
				var projectsData = data.projects;
				
				$('#email').val( memberData.email);
				$('#name').val( memberData.name);
				$('#tel').val( memberData.tel);
				$('#regDate').val( $.datepicker.formatDate('yy-mm-dd', 
									new Date(memberData.regDate)));
				
				$('#projects li').remove();
				var projectUL = $('#projects');
				for(var i in projectsData) {
					projectUL.append(
							$('<li>').text(projectsData[i].title));
				}

				member.changeButtonStatus('load');
			});
	});
	
	$('#prevList').click(function(event) {
		event.preventDefault();
		if (member.pageNo > 1) {
			member.pageNo--;
			member.listMember();
		}
	});
	
	$('#nextList').click(function(event) {
		event.preventDefault();
		if (member.pageNo < member.totalPage) {
			member.pageNo++;
			member.listMember();
		}
	});
	
	$('#resetBtn').click(function(event) {
		member.changeButtonStatus('new');
	});
	
	$('#deleteBtn').click(function(event) {
		var result = window.confirm('정말 삭제하시겠습니까?');
		if(result) {
			member.deleteMember();
		}
	});
	
	$('#addBtn').click(function(event) {
		$.ajax('../ajax/member/add.do', {
			type : 'POST',
			data : {
				email : $('#email').val(),
				name : $('#name').val(),
				tel : $('#tel').val(),
				password : $('#password').val()
			},
			dataType: 'json',
			success : function() {
				member.clearForm();
				member.listMember();
			},
			error : function(xhr, status, message) {
				window.alert('등록 실패입니다.');
				console.log(message);
			}
		});
	});
	
	$('#changeBtn').click(function(event) {
		$.ajax('../ajax/member/update.do', {
			type : 'POST',
			data : {
				email : $('#email').val(),
				name : $('#name').val(),
				tel : $('#tel').val(),
				password : $('#password').val()
			},
			dataType: 'json',
			success : function() {
				member.clearForm();
				member.listMember();
			},
			error : function(xhr, status, message) {
				window.alert('등록 실패입니다.');
				console.log(message);
			}
		});
	});
};

member.listMember = function() {
	if (member.pageNo == undefined) {
		member.pageNo = 1;
	}
	
	$.getJSON(
		'../ajax/member/list.do?pageNo=' + member.pageNo,	
		function(data) {
			member.pageNo = data.pageNo;
			member.recordCount = data.recordCount;
			member.pageSize = data.pageSize;
			
			var totalPage = parseInt(member.recordCount / member.pageSize);
			if ((member.recordCount % member.pageSize) > 0) {
				totalPage++;
			}
			member.totalPage = totalPage;
			
			member.clearList();
			
			var tagTable = $("#memberTable");
			for(var i in data.list) {
				$("<tr>").addClass('memberRow')
					.append($('<td>').append( $('<a>', {
							text: data.list[i].name,
							href: '#',
							'data-email': data.list[i].email
						}).addClass('title') ))
					.append( $('<td>').text(data.list[i].email))
					.append( $('<td>').text(data.list[i].tel))
					.appendTo(tagTable);
			}
			
			$('#currPageNo').text(member.pageNo);
		});
};

member.clearList = function() {
	$('.memberRow').remove();
};

member.deleteMember = function() {
	$.getJSON(
		'../ajax/member/delete.do?email=' + $('#email').val(), 
		function(data) {
			member.clearForm();
			member.listMember();
		});
	$('#projects li').remove();
};

member.clearForm = function() {
	$('#resetBtn').trigger('click');
};

member.changeButtonStatus = function(state) {
	if (state == 'load') {
		$('#addBtn').css('display', 'none');
		$('#changeBtn').css('display', '');
		$('#deleteBtn').css('display', '');
		$('#email').attr('readonly', true);
	} else {
		$('#addBtn').css('display', '');
		$('#changeBtn').css('display', 'none');
		$('#deleteBtn').css('display', 'none');
		$('#email').attr('readonly', false);
	}
};