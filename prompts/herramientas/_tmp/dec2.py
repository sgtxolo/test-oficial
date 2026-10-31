import json
D=json.load(open('prompts/herramientas/_tmp/dec1.json'))
D.update({
 'a-4':{'ap':[2,3],'rangos':[[0,55],[190,262],[288,335],[352,400]]},
 'a-9':{'ap':[1],'rangos':[[0,52],[68,165],[425,652]]},
 'a-12':{'ap':[2],'rangos':[[0,52],[185,522]]},
 'a-14':{'ap':[1],'rangos':[[0,192]]},
 'a-24':{'ap':[1,4],'rangos':[[0,55],[70,362],[555,770],[790,1032],[1292,1342],[1352,1430],[1455,1688]]},
 'a-40':{'ap':[2],'rangos':[[0,40],[130,360]]},
 'a-90':{'ap':[2],'rangos':[[0,58],[210,330]]},
})
json.dump(D,open('prompts/herramientas/_tmp/dec1.json','w'))
print(len(D))
