from pyspark import SparkConf, SparkContext
import pandas
import numpy as np
from math import sqrt
import csv
import json
from collections import OrderedDict

conf = SparkConf().setMaster("local[*]").setAppName("PopularMovie")
sc = SparkContext(conf = conf)
   
li = []
with open('/home/fidel/Escritorio/BigData/Datasets/tesis/bus_stops.csv', 'r') as csvfile:
    reader = csv.reader(csvfile, delimiter=',')
    for stop_name,stop_id,stop_lat,stop_lon in reader:
        d = OrderedDict()
        d['type'] = 'Feature'
        d['geometry'] = {
            'type': 'Point',
            'coordinates': [stop_lat, stop_lon]
        }
        d['properties'] = {
            'stopname': stop_name,
            'stopid': stop_id,
        }
        li.append(d)

d = OrderedDict()
d['type'] = 'FeatureCollection'
d['features'] = li

with open('/home/fidel/angular-leaflet-example/src/assets/data/archivo_final.geojson', 'w') as f:
    f.write(json.dumps(d, sort_keys=False, indent=4))