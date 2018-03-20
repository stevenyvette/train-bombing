# -*- coding:utf-8 -*-

f_node = open("../../simu/data/food [Nodes].csv", 'r')
f_edge = open("../../simu/data/food [Edges].csv", 'r')

node = []

for line in f_node.readlines():
    line = line.strip().split(',')
    node.append(line[0])

# print(node)

edge = open('../data/food.txt', 'w')

for line in f_edge.readlines():
    line = line.strip().split(',')

    i = -1
    j = -1

    for e in range(len(node)):
        if node[e] == line[0]:
            i = e
        if node[e] == line[1]:
            j = e
        if i > -1 and j > -1:
            break
    edge.write(str(i) + ' ' + str(j) + '\n')
