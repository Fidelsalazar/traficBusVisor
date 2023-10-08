#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Tue Dec 27 10:54:55 2022

@author: fidel
"""

class insert_in_db:
    
    def load_excel(self):
        import csv
        self.archivo = open(r"/home/fidel/Documentos/Tesis/Dataset/bus_stops.csv")
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
        self.cursor.executemany("insert into bus_stops(stop_name, stop_id, stop_lat, stop_lon) values(%s,%s,%s,%s)", self.tupla)
        self.connection.commit()
        self.cursor.close()
        self.connection.close()        
    
    def select(self):
        import psycopg2
        self.connection = psycopg2.connect("host=192.168.1.101 dbname=busystem user=postgres password=990923*Facs")
        self.cursor = self.connection.cursor()
        self.query = "SELECT * FROM bus_stops"
        self.cursor.execute(self.query)
        self.items= self.cursor.fetchall()
        self.cursor.close()
        self.connection.close()
        print(self.items)
    
ins_db = insert_in_db()
ins_db.load_excel()
ins_db.insert_dates()
ins_db.select()