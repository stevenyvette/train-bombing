f=open("../../simu/data/food [Nodes].csv",'r')
out=open("../food-zhengli.txt",'w')
out.write('[')
for line in f.readlines():
    tmp=line.split(',')
    out.write('['+tmp[1]+','+tmp[3]+','+tmp[2]+'],')

out.write(']')

f.close()
out.close()