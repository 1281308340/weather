$('#btn').click(function(){
	var obj = $(this);
	//click防止多次点击
	var click = obj.attr('click');
	if(click == '1'){
		return;
	}
	obj.attr('click','1');
	var url;
	var content;
	$ajax({
		type:'post',
		url:'https://www.tianqiapi.com/api/',
		dataType:'json',
		data:{
		"version":'v1',
		"cityid": 'https://cdn.huyahaha.com/tianqiapi/city.json',
		},
		beforeSend:function(){
			obj.html('正在更新天气情况');
		},
		success:function(json){
			if(json.code == '1'){
				//成功
			}else{
				//出错
				obj.html('操作按钮').attr('click','0');
			}
		}
	});			
});
//setInterval("main()",5000);
function main(){
	$.ajax({
		type:'GET',
		url:'https://www.tianqiapi.com/api/',
		dataType:"jsonp",//指定返回数据格式
		data:{
			"version":'v1',
			"city":'成都',
			"cityid": 'https://cdn.huyahaha.com/tianqiapi/city.json',
			"ip":'val',
			"callback":'jQuery.Callbacks',
		},
		error:function(){
			alert('网络错误');
		},
		success:function(res){
			console.log(res);
			var data= res.data;
			setHeader(res.city,data[0].wea,data[0].tem,data[0].tem1,data[0].tem2);
			setList(data);
		}
	});
}
/*替换头部显示数据
city string城市
wea string 当前天气情况
tem string当前温度*/
//setInterval("setHeader",5000);
function setHeader(city,wea,tem,tem1,tem2)
{
	var h3 = $('header>h3');
	console.log(h3);
	h3[0].innerText = city;
	h3[1].childNodes[1].innerText = tem1+'/'+tem2;
		$('header>h4').text(wea);
		$('header>h2').text(tem);
	setInterval("setHeader",5000);

}

function setList(data)
{
	for(var i = 0;i<data.length;i++){
		$('#wrap>ul').append(
			'<li>'+
			'	<span>'+data[i].day+'</span>'+
			'	<span class="wea">'+
			'		<span>'+data[i].wea+'</span>'+
			'		<img src = "img/banana/'+data[i].wea_img+'.png" alt ="天气">'+
			'		<span>'+data[i].win_speed+'</span>'+
			'	</span>'+
			'	<span>'+data[i].tem1+'/'+data[i].tem2+'</span>'+
			'</li>'	
		)
	}		
}
main();