f=open("../pro.txt",'r')
out=open("../zhengli.txt",'w')
out.write('[')
for line in f.readlines():
    tmp=line.split(',')
    out.write('['+tmp[2]+','+tmp[6]+','+tmp[5]+'],')

out.write(']')

f.close()
out.close()