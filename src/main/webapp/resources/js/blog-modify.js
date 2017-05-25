document.write('<script src="JS/ckeditor/ckeditor.js"></script>');
function modifyInit(seq) {
    $(document).ready(function () {
        userInterfaceLoad();
        buttonClickEvent(seq);
        loadData(seq);
        
        
    })
}
 
 
function modify() {
    var writenumber;
    var count = $(".tr_check:checked").length;
    if (count == 1) {
        $(".tr_check:checked").each(function (idx, row) {
            record = $(row).parents("tr");
 
            writenumber = record[0].cells[1].innerText;
            modifyInit(writenumber);
            var modifyButton = document.getElementById('modifyButton');
            var writeButton = document.getElementById('writeButton');
            modifyButton.style.visibility = "hidden";
            writeButton.style.visibility = "hidden";
        });
 
    }
    else if (count == 0) {
        alert("게시글이 선택되어 있지 않습니다.");
    }
    else {
        alert("2개 이상의 게시글이 선택되었습니다.");
    }
}
 
 
 
function userInterfaceLoad() {
    var tablearea = document.getElementById('table');
 
    var table = document.createElement("table");
    table.id = "modifyTable";
    table.setAttribute("border", 1);
 
    var titleRow = document.createElement("tr");
    titleRow.setAttribute("align", "center");
    var titleLabel = document.createElement("td");
    titleLabel.innerText = "제목";
    var titleData = document.createElement("td");
 
    var writerRow = document.createElement("tr");
    writerRow.setAttribute("align", "center");
    var writerLabel = document.createElement("td");
    writerLabel.innerText = "작성자";
    var writerData = document.createElement("td");
 
    var contentRow = document.createElement("tr");
    contentRow.setAttribute("align", "center");
    var contentLabel = document.createElement("td");
    contentLabel.innerText = "내용";
    var contentData = document.createElement("td");
 
 
 
    var btnModify = document.createElement("input");
    btnModify.setAttribute("type", "button");
    btnModify.setAttribute("id", "btn_modify");
    btnModify.setAttribute("value", "수정");
 
    var btnCancel = document.createElement("input");
    btnCancel.setAttribute("type", "button");
    btnCancel.setAttribute("id", "btn_cancel");
    btnCancel.setAttribute("value", "취소");
 
    var titleText = document.createElement("input");
    titleText.setAttribute("type", "text");
    titleText.setAttribute("id", "tb_title");
    titleText.style.width = "760px";
    //titleText.setAttribute("size", width);
 
    var writerText = document.createElement("input");
    writerText.setAttribute("type", "text");
    writerText.setAttribute("id", "tb_writer");
    writerText.style.width = "760px";
    //writerText.setAttribute("size", width);
    writerText.setAttribute("readonly", true);
 
    var contentText = document.createElement("textarea");
    contentText.setAttribute("id", "tb_content");
    //contentText.setAttribute("rows", 10);
    //contentText.setAttribute("cols", width);
    contentText.style.width = "750px";
    contentText.rows = "14";
 
 
    titleData.appendChild(titleText);
    writerData.appendChild(writerText);
    contentData.appendChild(contentText);
 
    titleRow.appendChild(titleLabel);
    titleRow.appendChild(titleData);
    writerRow.appendChild(writerLabel);
    writerRow.appendChild(writerText);
    contentRow.appendChild(contentLabel);
    contentRow.appendChild(contentData);
    table.appendChild(titleRow);
    table.appendChild(writerRow);
    table.appendChild(contentRow);
    document.body.appendChild(table);
    document.body.appendChild(btnModify);
    document.body.appendChild(btnCancel);
    tablearea.appendChild(table);
    table.appendChild(btnModify);
    table.appendChild(btnCancel);
 
    table.align = "center";
    table.width = "900px";
}
 
function buttonClickEvent(seq) {
    $("#btn_modify").click(function () {
        modifyData(seq);
    })
    $("#btn_cancel").click(function () {
        var element = document.getElementById("modifyTable");
        var modifyButton = document.getElementById('modifyButton');
        var writeButton = document.getElementById('writeButton');
        modifyButton.style.visibility = "visible";
        writeButton.style.visibility = "visible";
        element.parentNode.removeChild(element);
    })
}
 
function modifyData(seq) {
    var url = "Board.aspx/ModifyData";
    var title = $('input[id=tb_title]').val();
    var contents = CKEDITOR.instances.tb_content.getData();
    var json = convertJson(seq, title, contents);
    
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: url,
        data: json,
        success: function () {
            var element = document.getElementById("modifyTable");
 
            element.parentNode.removeChild(element);
 
            selectDB();
            var modifyButton = document.getElementById('modifyButton');
            var writeButton = document.getElementById('writeButton');
            modifyButton.style.visibility = "visible";
            writeButton.style.visibility = "visible";
          
        },
        error: function () {
            alert("수정 실패");
        }
    })
}
 
function loadData(seq) {
    var url = "Board.aspx/LoadData";
    var json = convertJson(seq);
 
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: url,
        data: json,
        success: function (receiveData) {
            var data = JSON.parse(receiveData.d);
            $('input[id=tb_title]').val(data.title);
            $('input[id=tb_writer]').val(data.writer);
            $('textarea[id=tb_content]').val(data.contents);
            CKEDITOR.replace('tb_content');
        },
        error: function () {
            alert("데이터로드실패");
        }
    })
}
 
function convertJson(seq) {
    var json = { seq: seq };
    var jsonFormat = JSON.stringify(json);
    return jsonFormat;
}
 
function convertJson(seq, title, contents) {
    var json = { seq: seq, title: title, contents: contents };
    var jsonFormat = JSON.stringify(json);
    return jsonFormat;
}
