var account = {};
var Img_No = 1;
var cl_No = 1;

account.into = function(){
	this.accountImg();
	$('#prevList').click(function(event){
		Img_No--;
		cl_No++;
		if(Img_No < 1){
			Img_No = 4;
		}
		account.accountImg();
	});
	$('#nextList').click(function(event){
		Img_No++;
		cl_No++;
		if(Img_No > 4){
			Img_No = 1;
		}
		account.accountImg();
	});
};

account.accountImg = function(){
	
	
	var Img_value = 'account/img/' + Img_No + '.jpg';
	var tagaccountImg = $('#account_Img');
	var classNo = 'divImg' + cl_No;
	
	account.clearImg();
	
	$('<div>', {
		style: 'display:none;',
	}).append($('<img>', {
		src: Img_value,
	}).addClass('Img')).addClass(classNo).appendTo(tagaccountImg);
	
	$('#currPageNo').text(Img_No);
	
	account.Div();

};
	
account.clearImg = function(){
	var classNo2 = '.divImg' + (cl_No-2);
	
	/*$('.Img').remove();*/
	$(classNo2).remove();
};
account.Div = function(){
	var classNo3 = '.divImg' + cl_No;
	$(classNo3).fadeIn(600,function(){
	
	});
};
