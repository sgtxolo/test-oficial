import json
D=json.load(open('prompts/herramientas/_tmp/dec1.json'))
D.update({
 'a-100':{'ap':[2],'rangos':[[0,45],[118,262],[272,322]]},
 'a-115':{'ap':[1,2,3],'rangos':[[0,34],[40,426]]},
 'b-3':{'ap':[1,3,4],'rangos':[[0,34],[40,160],[225,562],[705,796],[800,852]]},
 'b-20':{'ap':[1],'rangos':[[0,40],[45,142],[365,592]]},
 'b-21':{'ap':[2],'rangos':[[0,38],[108,140],[228,298]]},
 'b-23':{'ap':[4],'rangos':[[0,38],[255,392],[452,548],[670,736]]},
 'b-66':{'ap':[1,2],'rangos':[[0,682]]},
})
json.dump(D,open('prompts/herramientas/_tmp/dec1.json','w')); print(len(D))
