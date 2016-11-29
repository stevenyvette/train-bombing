f=open("../pro.txt",'r')
out=open("../les-zhengli.txt",'w')
out.write('[')
for line in f.readlines():
    tmp=line.split(',')
    out.write('['+tmp[3]+','+tmp[6][:-1]+','+tmp[5]+'],')

out.write(']')

f.close()
out.close()