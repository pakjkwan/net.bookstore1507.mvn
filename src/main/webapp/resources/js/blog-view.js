document.write('<script src="JS/ckeditor/ckeditor.js"></script>');
 
var VIEWSTATE = true;
var VIEWTABLE; 
 
// Create View Table
function View(seq) {
    if (VIEWSTATE == true) {
        VIEWSTATE = false;
        VIEWTABLE = document.createElement('table');
        var bodyTable = document.getElementById('table');
        VIEWTABLE.setAttribute("id", "VIEWTABLE");
 
        for (i = VIEWTABLE.rows.length - 1; i >= 0 ; i--) {
            modify.deleteRow(i);
        }
 
        VIEWTABLE.style.width = "880px";
        VIEWTABLE.align = 'center';
 
        // view 1번째 행
        VIEWTABLE.appendChild(document.createElement('tr'));
        VIEWTABLE.rows[0].appendChild(document.createElement('td'));
        VIEWTABLE.rows[0].appendChild(document.createElement('td'));
        VIEWTABLE.rows[0].appendChild(document.createElement('td'));
        VIEWTABLE.rows[0].appendChild(document.createElement('td'));
 
        VIEWTABLE.rows[0].cells[0].textContent = "글쓴이";
        VIEWTABLE.rows[0].cells[2].textContent = "작성시간";
 
 
        // view 2번째 행
        VIEWTABLE.appendChild(document.createElement('tr'));
        VIEWTABLE.rows[1].appendChild(document.createElement('td'));
        VIEWTABLE.rows[1].appendChild(document.createElement('td'));
        VIEWTABLE.rows[1].cells[1].setAttribute('colspan', 3);
 
        VIEWTABLE.rows[1].cells[0].textContent = "제　목";
 
 
        // view 3번째 행
        VIEWTABLE.appendChild(document.createElement('tr'));
        VIEWTABLE.rows[2].appendChild(document.createElement('td'));
        VIEWTABLE.rows[2].appendChild(document.createElement('td'));
        VIEWTABLE.rows[2].cells[1].setAttribute('colspan', 3);
 
        VIEWTABLE.rows[2].cells[0].textContent = "내　용";
 
        // view 4번째 행
        VIEWTABLE.appendChild(document.createElement('tr'));
        VIEWTABLE.rows[3].appendChild(document.createElement('td'));
        VIEWTABLE.rows[3].cells[0].setAttribute('colspan', 4);
        var closeButton = document.createElement('button');
        closeButton.textContent = "닫　　기";
        VIEWTABLE.rows[3].cells[0].appendChild(closeButton);
        VIEWTABLE.rows[3].cells[0].align = "Right";
        closeButton.setAttribute("onclick", "closeView();");
 
        // 셀 사이즈 & 정렬
        VIEWTABLE.rows[0].cells[0].width = "130px";
        VIEWTABLE.rows[0].cells[1].width = "280px";
        VIEWTABLE.rows[0].cells[2].width = "130px";
        VIEWTABLE.rows[0].cells[3].width = "300px";
 
        VIEWTABLE.rows[0].cells[0].align = 'center';
        VIEWTABLE.rows[0].cells[1].align = 'center';
        VIEWTABLE.rows[0].cells[2].align = 'center';
        VIEWTABLE.rows[0].cells[3].align = 'center';
        VIEWTABLE.rows[1].cells[0].align = 'center';
        VIEWTABLE.rows[2].cells[0].align = 'center';
 
        createTextarea(seq);
    } 
}
 
// Create TextArea
function createTextarea(seq) {
    var bodyTable = document.getElementById('table');
    // Create writetime Textarea
    var timeText = document.createElement("text");
    timeText.setAttribute("id", "timetext");
    timeText.rows = "1";
    timeText.style.width = "300px";
    timeText.setAttribute("readonly", true);
 
    // Create writer Textarea
    var writerText = document.createElement("text");
    writerText.setAttribute("id", "writertext");
    writerText.rows = "1";
    writerText.style.width = "300px";
    writerText.setAttribute("readonly", true);
 
 
    // Create title Textarea
    var titleText = document.createElement("textarea");
    titleText.setAttribute("id", "titletext");
    titleText.rows = "1";
    titleText.style.width = "760px";
    titleText.setAttribute("readonly", true);
 
 
    // Create contents Textarea
    var contentsText = document.createElement("textarea");
    contentsText.setAttribute("id", "contentstext");
    contentsText.style.width = "750px";
    contentsText.rows = "14";
    contentsText.setAttribute("readonly", true);
 
 
 
    // Add to the Table
    VIEWTABLE.rows[0].cells[1].appendChild(writerText);
    VIEWTABLE.rows[0].cells[3].appendChild(timeText);
    VIEWTABLE.rows[1].cells[1].appendChild(titleText);
    VIEWTABLE.rows[2].cells[1].appendChild(contentsText);
 
 
    //////
 
    bodyTable.appendChild(VIEWTABLE);
 
    getColumn(seq);
}
 
// Close View
function closeView() {
    VIEWSTATE = true;
    var element = document.getElementById("VIEWTABLE");
    element.parentNode.removeChild(element);
    
}
 
// GET selected Column information
function getColumn(seq) {
    var columnData;
    var sendData;
 
    sendData = "{\"seq\" : \"" + seq + "\"}";
 
    $.ajax({
        type: "POST",
 
        url: "Board.aspx/getColumnData",
 
        data: sendData,
 
        contentType: "application/Json; charset=utf-8",
 
        dataType: "Json",
 
        success: function (msg) {
            columnData = JSON.parse(msg.d);
            insertView(columnData);
        },
 
        error: function (msg) {
            alert("View load fail");
        }
    });
}
 
// Insert Information
function insertView(columnData) {
    document.getElementById("writertext").textContent = columnData.writer;
    document.getElementById("timetext").textContent = columnData.writetime;
    document.getElementById("titletext").value = columnData.title;
    document.getElementById("contentstext").value = columnData.contents;
    //CKEDITOR.replace('contentstext', { removePlugins: 'toolbar,elementspath', readOnly: true,resize_enabled:false });
    //CKEDITOR.replace('contentstext', { toolbar: 'View', readOnly: true, removePlugins: 'elementspath', resize_enabled: false, toolbarCanCollapse: true, toolbarStartupExpanded: false });
    CKEDITOR.inline('contentstext', {readOnly: true});
}

