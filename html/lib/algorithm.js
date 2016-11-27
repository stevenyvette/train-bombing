function get_id(s){
	var patrn=/^\d*$/;
	if (patrn.test(parseInt(s))){
		return parseInt(s);
	}else{
		for(var i=0;i<count;i++){
			if(promatrix[i][1]==s){
				return i;
			}
		}
		return -1;
	}
} 

function degree(v,r){
    var tmp=0;
    for(var i=0;i<count;i++){
        if(adjmatrix[v][i]==1&&i!=r)
            tmp+=1;
    }
    return tmp;
}

function efficiency(){
    for (var i=0;i<count;i++)
        eff += promatrix[i][2] * promatrix[i][4]
    //console.log("efficiency of the network is: "+eff);
}

function re_efficiency () {
    for(var i=0;i<count;i++)
        re_eff+= re_promatrix[i][2] * re_promatrix[i][4]
}

//Dijkstra算法，传入源顶点
function Dijkstra(v,r,n){        //Dijkstra算法，传入源顶点

    var parent=new Array();           //每个顶点的父亲节点，可以用于还原最短路径树
    var visited=[];         //用于判断顶点是否已经在最短路径树中，或者说是否已找到最短路径
    var d = new Array();               //源点到每个顶点估算距离，最后结果为源点到所有顶点的最短路。
    var q = new Array();

    for(var i = 0; i < n; i++)     //初始化
    {
        d.push({id:i,weight:INF});          //估算距离置INF
        parent[i] = -1;             //每个顶点都无父亲节点
        visited[i] = false;
     }

     d[v].weight = 0;                //源点到源点最短路权值为0
     q.push(d[v]);                   //压入队列中

     while(q.length!=0)               //算法的核心，队列空说明完成了操作
     {
         var cd = q.pop();
         //node cd = q.top();          //取最小估算距离顶点

         var u = cd.id;

         if(visited[u])
             continue;

         visited[u] = true;

         //松弛操作·

         for(var j = 0; j <n; j++) //找所有与他相邻的顶点，进行松弛操作，更新估算距离，压入队列。
         {
            //console.log(j);
             if(j != u && !visited[j] && d[j].weight > d[u].weight+adjmatrix[u][j]&&adjmatrix[u][j]!=0)
             {
                d[j].weight = d[u].weight+adjmatrix[u][j];
                //cout<<j<<" "<<d[j].weight<<endl;
                parent[j] = u;
                q.push(d[j]);
            }
        }
     }
     return d[r].weight;
}

function POCC(count){
    var pocc;
    var a = new Array();
	//POCC&CC chart
    pocc_chart = echarts.init(document.getElementById("pocc-bar-chart"));
    pocc_chart.showLoading();
    option_pocc = {
        tooltip: {
            trigger: 'axis'
        },
        toolbox: {
            feature: {
                dataView: {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar']},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        legend: {
            data:['POCC','CC']
        },
        xAxis: [
            {
                type: 'category',
                data: [],
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: 'POCC',
                min: 0,
                max: 1,
                interval: 0.1,
                axisLabel: {
                    formatter: '{value}'
                }
            },
            {
                type: 'value',
                name: 'CC',
                min: 0,
                max: 1,
                interval: 0.2,
                axisLabel: {
                    formatter: '{value} '
                }
            }
        ],
        dataZoom: [
            {
                type: 'slider',
                show: true,
                xAxisIndex: [0],
                start: 0,
                end: 100
            },
            
        ],
        series: [
            {
                name:'POCC',
                type:'bar',
                data:[],
                markLine: {
                    data: [
                        {type: 'average', name: '平均值'}
                    ]
                },
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ]
                },
            },
            {
                name:'CC',
                type:'bar',
                yAxisIndex: 1,
                data:[],
                markLine: {
                    data: [
                        {type: 'average', name: '平均值'}
                    ]
                },
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ]
                },
            },
        ]
    };

    for(var i = 0;i < count;i++){
        a[i] = 0;
        option_pocc.xAxis[0].data.push(i);
    }

    for(var i=0;i<count;i++){ //i为目标点
        var num1=0,num2=0;

        for(var j=0;j<count;j++){ //其余点到i的距离
            if((Dijkstra(j,i,count)<=k)&&(j!=i)){
                a[j]+=1;
                num1+=1;
            }
        }

        for(var p=0;p<count-1;p++){
            for(var m=p+1;m<count;m++){
                if((a[p]==1)&&(a[m]==1)&&(adjmatrix[p][m]==1))
                    num2+=1;
            }
        }

        if(num2<=1){
            option_pocc.series[0].data.push(0);
            //console.log("POCC of Vertix "+i+" is: 0")
        }
        else{
            pocc=2*num2/(num1*(num1-1));
            option_pocc.series[0].data.push(pocc.toFixed(3) );
            //console.log("POCC of Vertix "+i+" is: "+pocc);
        }

        option_pocc.series[1].data.push(cc(i).toFixed(3) );
        
        for(var l=0;l<count;l++)
            a[l]=0;

    }
    
    pocc_chart.hideLoading();

    pocc_chart.setOption(option_pocc);
    window.onresize = pocc_chart.resize;
    return pocc;
}

//聚类系数
function cc(i){
    var c=0;
    var tmp=0;
    for(var j =0;j<count;j++){
        if(adjmatrix[i][j]==1){
            for(var k=0;k<count;k++){
                if(adjmatrix[k][j]==1&&adjmatrix[k][i]==1){
                    tmp++;
                }
            }
        }
    }
    if(promatrix[i][4]!=1)
        c=tmp/(promatrix[i][4]*(promatrix[i][4]-1));
    else
        c=0;
    return c;
}

//计算WRP（weighted removal pagerank）
function WRP(v,r,count){
    var totalweight=0;
    var wrp=0;
    var singleweight=promatrix[v][2]; // weight of v

    if(v==r)
        return 0;

    for(var i=0;i<count;i++)
        totalweight+=promatrix[i][2];  //total weight of all vertices

    totalweight-=(promatrix[r][2]); //total weight of all vertices except r

    wrp+=(1-t)*singleweight/totalweight;

    for(var j=0;j<count;j++){
        if(j!=r&&adjmatrix[v][j]==1){
            wrp+=t/((count-1)*degree(j,r));
        }
    }
    //console.log(wrp);
    return wrp;
}

//计算replacement value
function ReplacementValue(v,r,count){
    var rv=0;
    var a=new Array(0.8,0.2);

    if(v==r)
        return 0;
    rv = a[0]*WRP(v,r,count);

    for(var i=1;i<2;i++){
        rv += a[i]*promatrix[v][2];
    }
    //console.log(rv);
    return rv;
}

function ReplaceProbability(v,r,count){
    var p=0,tmp=0;

    if(v==r){
        rp_value[v]=p;
        return 0;
    }

    for(var i=0;i<count;i++){
        if(candidate[i]==i)
            tmp+=ReplacementValue(i,r,count);
    }

    if(candidate[v]!=0){
        p=ReplacementValue(v,r,count)/tmp;
        if(p>max){
            predict=v;
            max=p;
        }
    }
    else
        p=0;

    rp_value[v]=p;

    return p;
}


function Candidate(r,k,count){
    var flag=false;
    for(var i = 0;i < count;i++)
        candidate[i] = 0;

    candidate_chart = echarts.init(document.getElementById("candidate-pie-chart"));
    candidate_chart.showLoading();
    option_candidate = {
        title : {
            text: '',
            x:'left',
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            x : 'center',
            y : 'bottom',
            data:[]
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {
                    show: true,
                    type: ['pie', 'funnel']
                },
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        series : [
            {
                name:'Candidates for node '+r,
                type:'pie',
                radius : [20, 110],
                center : ['50%', 200],
                roseType : 'radius',
                label: {
                    normal: {
                        show: true
                    },
                    emphasis: {
                        show: true
                    }
                },
                lableLine: {
                    normal: {
                        show: true
                    },
                    emphasis: {
                        show: true
                    }
                },
                data:[]
            },
        ]
    };
    candidate_chart.hideLoading();

    candidate_chart.setOption(option_candidate);
    window.onresize = candidate_chart.resize;


    for(var i=0;i<count;i++){
        if(i!=r)
            if(promatrix[i][2]<=promatrix[r][2])
                if(Dijkstra(i,r,count)<=k)
                    if(WRP(i,r,count)>=0){             
                        candidate[i]=i;
                        flag=true;
                    }
    }

    if(!flag){
        console.log("There is no candidate for the node "+r);
        //ui->result_cal->append(a);
    }
    else{
        console.log("The Candidate Set of node "+r+" is");
        //ui->result_cal->append(a);

        var b="";
        for(var i=0;i<count;i++)
            if(candidate[i]!=0)
                b = b + candidate[i] + " ";
        //ui->result_cal->append(b);
        console.log(b);
    }


    //ui->result_cal->append("");
}