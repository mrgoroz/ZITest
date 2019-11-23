from flask import Flask, request
import json
import psycopg2
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['POST'])
def hello():
    #Connection to sql
    try:
        connection = psycopg2.connect(user = "postgres",
                                    password = "golan",
                                    host = "127.0.0.1",
                                    port = "5432",
                                    database = "shopping_cart")
        connection.autocommit = True
        cursor = connection.cursor()
        #preparing sql command
        DataFromUser = json.loads(request.data)
        name = DataFromUser.get("name")
        address = DataFromUser.get("address")
        products = DataFromUser.get("products")
        amount = DataFromUser.get("amount")
        cursor.execute("INSERT INTO shop_cart (name, address, amount, info) VALUES (%s, %s, %s, %s);" , (name, address, amount, json.dumps(products), ))
        # record = cursor.fetchall()
    except (Exception, psycopg2.Error) as error :
        return "Error while connecting to PostgreSQL", error
    finally:
        if(connection):
            cursor.close()
            connection.close()
            return "200"

if __name__ == '__main__':
    app.run()