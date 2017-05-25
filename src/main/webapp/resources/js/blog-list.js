var LISTTABLE = document.createElement('table');
 
// 작성, 수정, 삭제 버튼 생성
function createButton() {
    // 테이블1, 행1 추가
    var buttonTable = document.createElement('table');
    var row = document.createElement('tr');
 
    // 쓰기, 수정, 삭제 버튼 생성
    var writeButton = document.createElement('button');
    var modifyButton = document.createElement('button');
    var deleteButton = document.createElement('button');
 
    /////////////////test
   
    ////////////////
 
    // 버튼 값 지정
    writeButton.textContent = "Write";
    modifyButton.textContent = "Modify";
    deleteButton.textContent = "Delete";
    // 버튼 id 지정
    writeButton.id = "writeButton";
    modifyButton.id = "modifyButton";
    deleteButton.id = "deleteButton";
 
    // 테이블 스타일 너비, 정렬 설정
    buttonTable.style.width = "880px";
    buttonTable.style.marginTop = "80px";
    buttonTable.align = "center";
 
    // 글쓰기 버튼에 이벤트 설정
    writeButton.setAttribute("onclick", "insertCreate();");
    deleteButton.setAttribute("onclick", "deleteData();");
    modifyButton.setAttribute("onclick", "modify();");
    row.align = "right";
 
    // 버튼 -> Table Row
    row.appendChild(writeButton);
    row.appendChild(modifyButton);
    row.appendChild(deleteButton);
 
    buttonTable.appendChild(row); // tr -> table
 
    buttonTable.style.border = "0px";
 
    document.body.appendChild(buttonTable); // table -> body
};
 
// 글머리 행 생성
function createField() {
    LISTTABLE.appendChild(document.createElement('tr'));
 
    for (var i = 0; i < 6; i++) {
        LISTTABLE.rows[0].appendChild(document.createElement('td'));
        LISTTABLE.rows[0].cells[i].align = "center";
    }
 
    LISTTABLE.rows[0].cells[2].textContent = "제목";
    LISTTABLE.rows[0].cells[3].textContent = "작성자";
    LISTTABLE.rows[0].cells[4].textContent = "작성시간";
    LISTTABLE.rows[0].cells[5].textContent = "파일";
 
    LISTTABLE.align = "center";
    LISTTABLE.style.marginTop = "10px";
 
    LISTTABLE.rows[0].cells[0].width = "20px";
    LISTTABLE.rows[0].cells[1].width = "60px";
    LISTTABLE.rows[0].cells[2].width = "345px";
    LISTTABLE.rows[0].cells[3].width = "160px";
    LISTTABLE.rows[0].cells[4].width = "225px";
    LISTTABLE.rows[0].cells[5].width = "40px";
 
    LISTTABLE.width = "875";
 
    var checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.id = "allCheck";
    LISTTABLE.rows[0].cells[0].appendChild(checkBox);
 
    document.body.appendChild(LISTTABLE); // table -> body
 
 
    $('#allCheck').change(function () {
        checkAll();
    });
}
 
// All Check Method
function checkAll() {
    if ($(".tr_check:checked").length != $(".tr_check").length) {
        $(".tr_check").each(function (idx, row) {
            $(this).prop("checked", true);
        });
    }
    else {
        $(".tr_check").each(function (idx, row) {
            $(this).prop("checked", false);
        });
    }
}
 
// DB의 정보를 불러옴 -> createTable function으로 이어짐
function selectDB() {
    var columnData;
 
    $.ajax({
        type: "POST",
 
        url: "Board.aspx/getInformation",
 
        contentType: "application/json; charset=utf-8",
 
        dataType: "Json",
 
        success: function (response) {
            columnData = JSON.parse(response.d);
            insertTable(columnData);
        },
 
        error: function (request, status, error) {
            alert("fail:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error);
        }
    });
}
 
// 테이블을 만들어 selectDB에서 읽어온 정보를 삽입
function insertTable(columnData) {
 
    var checkBox;
    var html;
    var column;
 
    if(LISTTABLE.rows.length>1)
        deleteTable();
 
    for (var i = 0; i < columnData.length; i++) {
 
        LISTTABLE.appendChild(document.createElement('tr'));
 
        for (var j = 0; j < 6; j++)
            LISTTABLE.rows[i + 1].appendChild(document.createElement('td'));
 
 
        LISTTABLE.rows[i + 1].cells[1].align = "center";
        LISTTABLE.rows[i + 1].cells[3].align = "center";
        LISTTABLE.rows[i + 1].cells[4].align = "center";
        LISTTABLE.rows[i + 1].cells[5].align = "center";
    }
 
 
    for (var k = 0; k < columnData.length; k++) {
 
        column = columnData[columnData.length - k - 1];
 
        checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.className = 'tr_check';
        html = "<a type='javascript:' onclick='View(" + column.number + ")'>" + column.title + "</a>";
        LISTTABLE.rows[k + 1].cells[0].appendChild(checkBox);
        LISTTABLE.rows[k + 1].cells[1].textContent = column.number;
        LISTTABLE.rows[k + 1].cells[2].innerHTML = html;
        LISTTABLE.rows[k + 1].cells[3].textContent = column.writer;
        LISTTABLE.rows[k + 1].cells[4].textContent = column.writetime;  
        
        if (column.fileid.length == 0) {
            LISTTABLE.rows[k + 1].cells[5].textContent = "X";
        }
        else {
            LISTTABLE.rows[k + 1].cells[5].textContent = "O";
        }
    }
}
 
// 글머리 행을 제외한 나머지 행 삭제
function deleteTable() {
    for (i = LISTTABLE.rows.length-1; i >0 ; i--) {
        LISTTABLE.deleteRow(i);
    }
}
 
window.onload = function () {
    createButton();
 
    createField();
 
    selectDB();
}
