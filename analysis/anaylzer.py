import codecs
import pandas as pd

filename = "../data/data-1scan.txt"
output = "../data/data.csv"

data = pd.DataFrame()

with codecs.open(filename, encoding='utf-8') as f:
	line = True
	pokeNum = 0
	scanstamp = 0
	scanNum = 0

	while(line):
		line = f.readline()

		if (pokeNum == 0):
			s = line.split()
			if(len(s) != 0):
				scanstamp = int(s[0])
				pokeNum = int(s[1]);
				scanLocationLat = float(s[2])
				scanLocationLon = float(s[3])
				scanNum += 1
		else:
			pokeNum -= 1
			s = line.split(',')
			name = s[5]
			if (name[-1:] == '\u2642'):
				name = name[:-1]+'(male)'
				# print(name)
			if (name[-1:] == '\u2640'):
				name = name[:-1]+'(female)'
				# print(name)

			d = {'scanstamp': scanstamp, 'scanLocationLat':scanLocationLat, 'scanLocationLon':scanLocationLon, 'uid': int(s[0]), 'locationLat': float(s[1]), 'locationLon': float(s[2]), 'pid': int(s[3]), 'expire_time': int(s[4]), 'name': name, 'distance': int(s[6]),'despawn': int(s[7])}
			data = data.append(d, ignore_index=True)

with open(output, 'w') as f:

	f.write(data.to_csv(index = False))
