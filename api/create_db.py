import sqlite3

conn = sqlite3.connect('test.db')
c = conn.cursor()

def create_tables():
    print('Creating table')
    c.execute('DROP TABLE IF EXISTS Person')
    c.execute('CREATE TABLE Person(id INTEGER PRIMARY KEY, firstName VARCHAR(100), lastName VARCHAR(100), enabled BOOLEAN, authorised BOOLEAN)')
    print('Table created')


people = [(1, "Bo", "Bob", True, False),
            (2, "Brian", "Allen", True, True),
            (3, "Courtney", "Arnold", True, True),
            (4, "Gabriel", "Francis", False, False),
            (5, "George", "Edwards", True, False),
            (6, "Imogen", "Kent", False, False),
            (7, "Joel", "Daly", True, True),
            (8, "Lilly", "Hale", False, False),
            (9, "Patrick", "Kerr", True, True),
            (10, "Sharon", "Halt", False, False),
            (11,  "Willis", "Tibbs", True, False)]

def insert_data():
    print('Inserting data into tables')
    c.executemany('INSERT INTO Person(id, firstName, lastName, authorised, enabled) VALUES(?, ?, ?, ?, ?)', people)
    print('Finished inserting data into tables')
    conn.commit()
    c.close()
    conn.close()
    print('Connection closed')

create_tables()
insert_data()
