# -*- coding:gb2312 -*-

import networkx as nx
from numpy import *

adj=zeros([65,65],int)

#中心性指标集合,格式:[度中心性,介数中心性,接近中心性]
X=[[29,392.3521719,0.583333333],[2,0,0.372781065],[27,320.8381859,0.572727273],[10,0,0.45],[10,0,0.45],[7,61.26998557,0.434482759],[22,267.6658761,0.5],[6,12.62912088,0.398734177],[4,0,0.388888889],[18,91.66329166,0.473684211],[10,0,0.409090909],[10,0,0.409090909],[10,0,0.409090909],[11,13.16245421,0.411764706],[11,51.52142857,0.411764706],[16,58.64576752,0.466666667],[15,175.8186508,0.473684211],[16,232.2502077,0.480916031],[8,147.2830891,0.401273885],[11,14.1952381,0.463235294],[12,25.67899878,0.473684211],[14,246.3920752,0.496062992],[12,52.74100067,0.459854015],[11,268.98479,0.488372093],[17,63.41078089,0.508064516],[10,6.029437229,0.446808511],[4,0,0.396226415],[8,0,0.428571429],[10,0,0.409090909],[13,164.2050783,0.45323741],[6,17.20880231,0.368421053],[2,1.125,0.333333333],[2,0.392857143,0.340540541],[2,0,0.340540541],[1,0,0.335106383],[6,46.49126984,0.355932203],[2,0,0.336898396],[1,0,0.323076923],[2,1.25,0.305825243],[5,1.75,0.355932203],[5,1.75,0.355932203],[1,0,0.323076923],[1,0,0.323076923],[5,27.88412698,0.375],[3,39.44869255,0.36627907],[8,91.54371594,0.32642487],[5,0,0.297169811],[1,0,0.297169811],[11,448.5200998,0.297169811],[6,9.914071014,0.431506849],[6,9.914071014,0.338709677],[6,9.914071014,0.362068966],[6,9.914071014,0.333333333],[1,0,0.315],[4,0,0.315],[4,0,0.323076923],[4,0,0.249011858],[3,0,0.245136187],[5,25.24152237,0.315],[1,0,0.315],[2,0,0.315],[1,0,0.315],[2,0,0.307317073],[2,0,0.302884615]]

std_dc=6.21  #度中心性标准差
std_bc=101.98	 #介数中心性标准差

a=0.1  #影响因子(自行设定)
r=0.51

#构建邻接矩阵
def init_adj():
	f=open("../data/train-data.txt",'r')
	error=0
	for line in f.readlines():
		tmp=line.split(' ')
		try:
			adj[int(tmp[0])][int(tmp[1])]=int(tmp[2][:-1])
			adj[int(tmp[1])][int(tmp[0])]=int(tmp[2][:-1])
		except:
			error+=1
	print 'failed lines count: ' + str(error)

#写入度数以及邻接矩阵
def write():
	out_degree=open("../degree.txt",'w')
	out_adj=open("../adjmatrix.txt",'w')
	count=0
	for i in adj:
		degree=0
		for j in i:
			out_adj.write(str(j)+' ')
			if j!=0:
				degree+=1
		out_adj.write('\n')
		out_degree.write(str(count)+' '+str(degree)+'\n')
		count+=1

#写入加权度
def weighted_degree():
	out_weighted_degree=open("../weighted_degree.txt",'w')
	count=0
	for i in adj:
		degree=0
		for j in i:
			if j!=0:
				degree+=j
		out_weighted_degree.write(str(count)+' '+str(degree)+'\n')
		count+=1

#隐蔽中心性计算
def covertness_centrality():
	out=open("../covertness_centrality.txt",'w')
	for i in range(0,64):
		cc=r*commonness(i)+(1-r)*communication_potential(i)
		out.write(str(commonness(i))+','+str(communication_potential(i))+','+str(cc)+'\n')
	return 0

#CM计算
def commonness(v):
	count=0
	for i in X:
		if abs(i[0]-X[v][0])<=std_dc*a and abs(i[1]-X[v][1])<=std_bc*a:
			count+=1
	cm=round((count-1)/63.000,3)
	return cm

#CP计算
def communication_potential(v):
	cp=X[v][2]
	return round(cp,3)

if __name__=="__main__":
	init_adj()
	covertness_centrality()
	#write()
	#weighted_degree()