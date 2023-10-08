#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sat Nov 26 20:44:43 2022

@author: fidel
"""
from pyspark import SparkConf, SparkContext

conf = SparkConf().setMaster("local[*]").setAppName("")
sc = SparkContext(conf = conf)

class insert_in_db:
    
    def load_excel(self):
        import csv
        self.archivo = open(r"/home/fidel/Documentos/Tesis/Dataset/50k.csv")
        self.filas = csv.reader(self.archivo, delimiter = ",")
        self.lista = list(self.filas)
        del(self.lista[0])
        self.tupla =  tuple(self.lista)
        #for rw in self.tupla:
           # print(rw)
    
    def insert_dates(self):
        import psycopg2
        self.connection = psycopg2.connect("host=192.168.1.101 dbname=busystem user=postgres password=990923*Facs")
        self.cursor = self.connection.cursor()
        self.cursor.executemany("insert into positionbus(datetime, bus_id, bus_line, lat, lon, velocity) values(%s,%s,%s,%s,%s,%s)", self.tupla)
        self.connection.commit()
        self.cursor.close()
        self.connection.close()        
    
    def select(self):
        import psycopg2
        self.connection = psycopg2.connect("host=192.168.1.101 dbname=busystem user=postgres password=990923*Facs")
        self.cursor = self.connection.cursor()
        self.query = "SELECT * FROM position"
        self.cursor.execute(self.query)
        self.items= self.cursor.fetchall()
        self.cursor.close()
        self.connection.close()
        print(self.items)
    
ins_db = insert_in_db()
ins_db.load_excel()
ins_db.insert_dates()
ins_db.select()