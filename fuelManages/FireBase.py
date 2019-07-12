import pyrebase

config = {
    'apiKey': "AIzaSyB6HP8cPu07lHPqTXDcUPENEBsosa5g0Yc",
    'authDomain': "fuelapp-c00b1.firebaseapp.com",
    'databaseURL': "https://fuelapp-c00b1.firebaseio.com",
    'projectId': "fuelapp-c00b1",
    'storageBucket': "fuelapp-c00b1.appspot.com",
    'messagingSenderId': "448961224175"
}

firebase = pyrebase.initialize_app(config)
auth = firebase.auth()
db = firebase.database()
def get_data_history():
    lst = ["email", "date", "amount", "total cost", "type"]
    data = []
    data_h = []
    for i in range(0,5):
        dt = db.child("trụ 1").child("buying").child(lst[i]).get().val()
        data.append(dt)
    print(data)
    data_h.append(data)
    print(data_h)
    return data_h