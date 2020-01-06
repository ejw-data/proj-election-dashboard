#!/usr/bin/env python
# coding: utf-8

import json


with open("static/data/112Congress/test114simple.json") as json_file:
    json_decoded = json.load(json_file)


number_districts = len(json_decoded['features'])

for i in range(number_districts):
    path = json_decoded['features'][i]['properties']
    member_dict = json_decoded['features'][i]['properties']['member']
    unique_district_key1 = list(member_dict)[0]
    member_dict_subkey = member_dict[unique_district_key1]
    unique_district_key2=list(member_dict_subkey)[0]
    district_info = member_dict[unique_district_key1][unique_district_key2]

    for key in district_info:
        path[key] = district_info[key]

    if 'member' in path:
        del path['member']

with open("testgeo_update.json", 'w') as outfile:
    json.dump(json_decoded, outfile)

