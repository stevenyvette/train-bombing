f=open("../train [Nodes].csv",'r')
out=open("../train-zhengli.txt",'w')
out.write('[')
for line in f.readlines():
    tmp=line.split(',')
    out.write('['+tmp[2]+','+tmp[4][:-1]+','+tmp[3]+'],')

out.write(']')

f.close()
out.close()