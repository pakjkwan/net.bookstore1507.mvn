function insertCreate() {
    var tablearea = document.getElementById('table');
    //테이블 생성
    var table = document.createElement('table');
    table.id = "insertTable";
    table.style.width = "880px";
    table.align = "center";
    table.style.border = "1px solid ";
    var table1 = document.createElement('button');
 
    //전송 버튼 생성
    var submitButton = document.createElement('button');
    submitButton.id = "submitbtn";
    submitButton.innerHTML = "작성하기";
    submitButton.setAttribute("onclick", "insert();");
    //취소 버튼 생성
    var cancelButton = document.createElement('button');
    cancelButton.id = "cancelbtn";
    cancelButton.innerHTML = "취소";
    cancelButton.setAttribute("onclick", "cancel();");
    var text = new Array(10);
    text[0] = "작 성 자";
    text[1] = "제　　목";
    text[2] = "내　　용";
    text[3] = "파일첨부";
    //파일 첨부 버튼 생성
    var fileInput = document.createElement('input');
    fileInput.id = "fileInput";
    fileInput.type = "file";
    fileInput.multiple = true;
    //입력 버튼 생성
    var writerInput = document.createElement('input');
    writerInput.id = "writerInput";
    writerInput.size = "108";
    var titleInput = document.createElement('input');
    titleInput.id = "titleInput";
    titleInput.size = "108";
    var dataInput = document.createElement('textarea');
    dataInput.id = "dataInput";
    dataInput.style.width = "782px";
    dataInput.rows = "12";
 
    //작성자 tr
    var row = document.createElement('tr');
    row.appendChild(document.createElement('td'));
    row.appendChild(document.createElement('td'));
 
    row.cells[0].appendChild(document.createTextNode(text[0]));
    row.cells[0].align = 'center';
    row.cells[1].appendChild(writerInput);
 
    table.appendChild(row); //테이블에 등록
    //글제목 tr
    var row = document.createElement('tr');
 
    row.appendChild(document.createElement('td'));
    row.appendChild(document.createElement('td'));
 
    row.cells[0].appendChild(document.createTextNode(text[1]));
    row.cells[1].appendChild(titleInput);
    row.cells[0].align = 'center';
    table.appendChild(row);
    //내용 tr
    var row = document.createElement('tr');
 
    row.appendChild(document.createElement('td'));
    row.appendChild(document.createElement('td'));
 
    row.cells[0].appendChild(document.createTextNode(text[2]));
    row.cells[1].appendChild(dataInput);
    row.cells[0].align = 'center';
    table.appendChild(row);
    //파일 첨부 tr
    var row = document.createElement('tr');
 
    row.appendChild(document.createElement('td'));
    row.appendChild(document.createElement('td'));
 
    row.cells[0].appendChild(document.createTextNode(text[3]));
    row.cells[1].appendChild(fileInput);
    row.cells[0].align = 'center';
    table.appendChild(row);
 
    var subrow = document.createElement('tr');
    var subtd = subrow.appendChild(document.createElement('td'));
    subtd.setAttribute('colspan', 2);
    subtd.align = 'center';
    subrow.cells[0].appendChild(submitButton);
    subrow.cells[0].appendChild(cancelButton);
 
    table.rows[0].cells[0].width = "100px";
 
    table.appendChild(subrow);
    //div에 테이블 추가
    tablearea.appendChild(table);
    //글쓰기 버튼 숨김
    
    var writeButton = document.getElementById('writeButton');
    var modifyButton = document.getElementById('modifyButton');
    writeButton.style.visibility = "hidden";
    modifyButton.style.visibility = "hidden";
}
function insert() {
 
 
    var titleInput = document.getElementById("titleInput").value;
    var writerInput = document.getElementById("writerInput").value;
    var dataInput = document.getElementById("dataInput").value;
    //input값 공백인지 확인
    if ((titleInput.trim() == "") || (titleInput.isnull)) {
        alert("제목을 입력하세요");
        return;
    } else if ((writerInput.trim() == "") || (writerInput.isnull)) {
        alert("작성자를 입력하세요");
        return;
    } else if ((dataInput.trim() == "") || (dataInput.isnull)) {
        alert("내용을 입력하세요");
        return;
    }
    var createTime = time();
 
    var data = new FormData();
 
    var files = $("#fileInput").get(0).files;
 
    var fileSize = 0;
    // 업로드한 파일 저장 및 파일 사이즈 확인
    for (var i = 0; i < files.length; i++) {
        data.append("", files[i]);
        fileSize += files[i].size;
        if (fileSize > 1024 * 1024 * 5) {
            alert("파일크기를 5mb 미만으로 해주세요")
            return;
        }
    }
    //작성한 정보 저장
    data.append("title", titleInput);
    data.append("writer", writerInput);
    data.append("data", dataInput);
    data.append("createTime", createTime);
 
    
    var ajaxRequest = $.ajax({
        type: "POST",
        url: "/api/fileupload/uploadfile",
        async: false,
        contentType: false,
        processData: false,
        data: data
 
    });
 
    ajaxRequest.done(function (responseData, textStatus) {
        if (textStatus == 'success') {
            selectDB();
            if (responseData != null) {
                if (responseData.Key) {
                    alert(responseData.Value);
                    $("#fileInput").val('');
                } else {
                    selectDB();
                    alert(responseData.Value);
                }
            }
        } else {
            alert(responseData.Value);
        }
    });
 
 
    //글쓰기 버튼 활성화
    var writeButton = document.getElementById('writeButton');    
    var modifyButton = document.getElementById('modifyButton');
    modifyButton.style.visibility = "visible";
    writeButton.style.visibility = "visible";
    //작성완료한 TABLE 삭제
    var element = document.getElementById("insertTable");
    element.parentNode.removeChild(element);
 
};
 
 
function deleteData() {
    var record;
    var writenumber;
    var sendData;
    var count = $(".tr_check:checked").length;
    //체크된 행을 가져오는 함수
    if (count >= 1) {
        $(".tr_check:checked").each(function (idx, row) {
            record = $(row).parents("tr");
            writenumber = record[0].cells[1].innerText;
            sendData = "{\"seq\" : \"" + writenumber + "\"}";
 
            $.ajax({
                type: "POST",
 
                url: "Board.aspx/DeleteData",
 
                async: false,
                contentType: "application/json; charset=utf-8",
                datatype: "json",
                processData: false,
                data: sendData,
                success: function (msg) {
 
                    selectDB();
                },
                error: function (msg) {
                    alert("삭제가 완료되지 않았습니다.");
                    selectDB();
                }
            });
        });
    }
    else {
        alert("게시글이 선택되어 있지 않습니다.");
    }
}
 
function time() {
    var time = new Date();
    var timeFormat =
      standardTime(time.getFullYear(), 4) + '/' +
      standardTime(time.getMonth() + 1, 2) + '/' +
      standardTime(time.getDate(), 2) + ' ' +
      standardTime(time.getHours(), 2) + ':' +
      standardTime(time.getMinutes(), 2) + ':' +
      standardTime(time.getSeconds(), 2);
 
    return timeFormat;
}
 
function cancel() {
    var element = document.getElementById("insertTable");
    element.parentNode.removeChild(element);
    //글쓰기, 수정 버튼 활성화
    var writeButton = document.getElementById('writeButton');
    var modifyButton = document.getElementById('modifyButton');
    modifyButton.style.visibility = "visible";
    writeButton.style.visibility = "visible";
}
function standardTime(time, digits) {
    var zero = '';
    time = time.toString();
 
    if (time.length < digits) {
        for (i = 0; i < digits - time.length; i++)
            zero += '0';
    }
    return zero + time;
}
