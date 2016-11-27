var filename="train.gexf";

function get_filepath(){
	//filename = document.getElementById("filename").files[0];
	show(filename);
	document.getElementById("introduction").style.display="none";
	document.getElementById("network-id").style.display="block";
}

function set_block_1(){
	//document.getElementById("tmp").style.display="none";
	document.getElementById("1-1").style.display="block";
	document.getElementById("1-2").style.display="block";
	//document.getElementById("1-3").style.display="block";
	document.getElementById("1-4").style.display="block";
	document.getElementById("1-5").style.display="block";
	document.getElementById("1-6").style.display="block";
	document.getElementById("page-inner").style.display="block";
}

function set_block_2 () {
	document.getElementById("nav-example").style.display="block";
	document.getElementById("2-1").style.display="block";
	document.getElementById("2-2").style.display="block";
    document.getElementById("graph-1").style.display="block";
    document.getElementById("graph-ori").style.display="block";
}

function graph(){
	document.getElementById("graph").style.display="block";
    document.getElementById("graph-1").style.display="none";
    document.getElementById("graph-ori").style.display="none";    
}

function graph_1(){
	document.getElementById("graph").style.display="none";
    document.getElementById("graph-1").style.display="block";
    document.getElementById("graph-ori").style.display="none";
}

function graph_ori(){
	document.getElementById("graph").style.display="none";
    document.getElementById("graph-1").style.display="none";
    document.getElementById("graph-ori").style.display="block"; 
}

function graph_remove () {
	document.getElementById("graph-remove").style.display="block";
    document.getElementById("graph-reshape").style.display="none";
    document.getElementById("relationship-remove").style.display="none";
    document.getElementById("relationship-reshape").style.display="none";
}

function graph_reshape () {
	document.getElementById("graph-remove").style.display="none";
    document.getElementById("graph-reshape").style.display="block";
    document.getElementById("relationship-remove").style.display="none";
    document.getElementById("relationship-reshape").style.display="none";
}

function relationship_remove () {
	document.getElementById("graph-remove").style.display="none";
    document.getElementById("graph-reshape").style.display="none";
    document.getElementById("relationship-remove").style.display="block";
    document.getElementById("relationship-reshape").style.display="none";
}

function relationship_reshape () {
	document.getElementById("graph-remove").style.display="none";
    document.getElementById("graph-reshape").style.display="none";
    document.getElementById("relationship-remove").style.display="none";
    document.getElementById("relationship-reshape").style.display="block";
}

function set_init () {
	document.getElementById("1-1").style.visibility="visible";
	document.getElementById("1-2").style.visibility="visible";
	//document.getElementById("1-3").style.visibility="visible";


	document.getElementById("easypiechart-blue").style.visibility="visible";
	document.getElementById("node-count").innerHTML = count;

	document.getElementById("easypiechart-red").style.visibility="visible";
	document.getElementById("lethality").innerHTML = eff;

	document.getElementById("easypiechart-teal").style.visibility="visible";
	document.getElementById("node-link-number").innerHTML = link_number;

	document.getElementById("easypiechart-orange").style.visibility="visible";
	document.getElementById("connectivity").innerHTML = "100%";
}

function table_start(){
	$(document).ready(function () {
        $('#dataTables-example').dataTable();
    });
}

function node_action(id){
	var se=confirm("Make sure to remove this node: \n\t\t"+promatrix[id][1]);
	if (se==true){
		node_delete(id);
		//window.location.hash="#node-delete-confirm"; 
		window.location.hash="#open-graph-confirm";
		var rp_value2 = rp_value.concat();
	    rp_value.sort(function(a,b){
	            return b-a;});
		for (var i=0;i<3;i++){
	        if(rp_value[i]>0){
	            var dex=rp_value2.indexOf(rp_value[i]);
	            titlesN3[3-i] = titlesN3[3-i]+': '+ promatrix[dex][1];
	            contentsN3[3-i] = 'PR: '+rp_value[i].toFixed(8)+''; 
	        }

	    }

		setTimeout("show_jbox()",1500);
		setTimeout("show_jbox()",2000);
		setTimeout("show_jbox()",2500);
		setTimeout("show_jbox()",3000);
		console.log(contentsN3);
	}
};

function link_action(source,target){
	var se=confirm("Make sure to remove this link:\n "+promatrix[source][1]+"--"+promatrix[target][1]);
	if (se==true){
		link_delete(source,target);
	}
}

function right_click_delete(){
	var id = parseInt(trans.data.id);
	node_action(id);
	$(".circle").removeClass("open");
	$("#overlay").hide();
	$("#option").hide();
	trans={};
}

function left_click_delete(){
	var id = parseInt(click_node.data.id);
	node_action(id);
	$('.user').hide();
	click_node=undefined;
}

function cancel(){
	$(".circle").removeClass("open");
	$("#overlay").hide();
	$("#option").hide();
	$(".user").hide();
	trans=undefined;
	click_node=undefined;
	click_link=undefined;
}

function tbd(){
	alert("To Be Determined");
	$(".circle").removeClass("open");
	$("#overlay").hide();
	$("#option").hide();
}

function help(){
	window.open("help.html");
	$(".circle").removeClass("open");
	$("#overlay").hide();
	$("#option").hide();
}

function name_card() {
	/*$(".active-menu").fsrTip({
		Event: 'click',             //事件
						 //箭头指向上(t)、箭头指向下(b)、箭头指向左(l)、箭头指向右(r)
		photo: "images/avtar.png", //图片路径
		name: 'fsr',                 //姓名
		sex: '男',                //性别
		love: '女',               //爱好
		remark: "模仿中"
	});*/
}