var project = {};

project.init = function() {
	this.changeButtonStatus('new');
	this.listProject();
	
	$(document).on('click', 'a.title', function(event){
		$.getJSON(
				'../ajax/project/detail.do?no=' + $(this).attr('data-no'), 
				function(data) {
					var projectData = data.project;
					var membersData = data.project.members;
					
					$('#no').val( projectData.no );
					$('#title').val( projectData.title );
					$('#description').val( projectData.description );
					$('#startDate').val( $.datepicker.formatDate('yy-mm-dd', 
											new Date(projectData.startDate)));
					$('#endDate').val( $.datepicker.formatDate('yy-mm-dd', 
											new Date(projectData.endDate)));
					
					var membersValue = '';
					for(var i in membersData) {
						if (membersData[i].level != 0) {
							if (membersValue.length > 0) {
								membersValue += ',';
							}
							membersValue += membersData[i].email;
						}
					}
					
					$('#emailList').val( membersValue );

					project.changeButtonStatus('load');
				});
	});
	
	$('#prevList').click(function(event) {
		event.preventDefault();
		if (project.pageNo > 1) {
			project.pageNo--;
			project.listProject();
		}
	});
	
	$('#nextList').click(function(event) {
		event.preventDefault();
		if (project.pageNo < project.totalPage) {
			project.pageNo++;
			project.listProject();
		}
	});
	
	$('#resetBtn').click(function(event) {
		project.changeButtonStatus('new');
	});
	
	$('#deleteBtn').click(function(event) {
		var result = window.confirm('정말 삭제하시겠습니까?');
		if(result) {
			project.deleteProject();
		}
	});
	
	$('#addBtn').click(function(event) {
		$.ajax('../ajax/project/add.do', {
			type : 'POST',
			data : {
				//no : '',
				title : $('#title').val(),
				description : $('#description').val(),
				startDate : $('#startDate').val(),
				endDate : $('#endDate').val(),
				emailList : $('#emailList').val()
			},
			dataType: 'json',
			success : function() {
				project.clearForm();
				project.listProject();
			},
			error : function(xhr, status, message) {
				window.alert('등록 실패입니다.');
				console.log(message);
			}
		});
	});
	
	$('#changeBtn').click(function(event) {
		$.ajax('../ajax/project/update.do', {
			type : 'POST',
			dataType : 'json',
			data : {
				no : $('#no').val(),
				title : $('#title').val(),
				description : $('#description').val(),
				startDate : $('#startDate').val(),
				endDate : $('#endDate').val(),
				emailList : $('#emailList').val()
			},
			success : function() {
				project.clearForm();
				project.listProject();
			},
			error : function(xhr, status, message) {
				window.alert('등록 실패입니다.');
				console.log(message);
			}
		});
	});
};

project.listProject = function() {
	if (project.pageNo == undefined) {
		project.pageNo = 1;
	}
	
	$.getJSON(
		'../ajax/project/list.do?pageNo=' + project.pageNo, 
		function(data) {
			project.pageNo = data.pageNo;
			project.recordCount = data.recordCount;
			project.pageSize = data.pageSize;
			
			var totalPage = parseInt(project.recordCount / project.pageSize);
			if ((project.recordCount % project.pageSize) > 0) {
				totalPage++;
			}
			project.totalPage = totalPage;
			
			project.clearList();
			
			var tagProjectTable = $("#projectTable");
			for(var i in data.list) {
				$("<tr>").addClass("projectRow")
					.append( $('<td>').text(data.list[i].no))
					.append( $('<td>').append( $('<a>', {
							text: data.list[i].title,
							href: '#',
							'data-no': data.list[i].no
						}).addClass('title') ))
					.append( $('<td>').text( 
						$.datepicker.formatDate('yy-mm-dd', 
							new Date(data.list[i].startDate))) )
					.append( $('<td>').text( 
						$.datepicker.formatDate('yy-mm-dd', 
							new Date(data.list[i].endDate))) )
					.appendTo(tagProjectTable);
			}
			
			$('#currPageNo').text(project.pageNo);
		});
};

project.clearList = function() {
	$('.projectRow').remove();
};

project.clearForm = function() {
	$('#resetBtn').trigger('click');
};

project.deleteProject = function() {
	$.getJSON(
		'../ajax/project/delete.do?no=' + $('#no').val(), 
		function(data) {
			project.clearForm();
			project.listProject();
		});
};

project.changeButtonStatus = function(state) {
	if (state == 'load') {
		$('#addBtn').css('display', 'none');
		$('#changeBtn').css('display', '');
		$('#deleteBtn').css('display', '');
	} else {
		$('#addBtn').css('display', '');
		$('#changeBtn').css('display', 'none');
		$('#deleteBtn').css('display', 'none');
	}
};







