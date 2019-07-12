from django.shortcuts import render
import pyrebase
import datetime
import time
from . import FireBase
import threading
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
loginstatus = 0
data_oil = [18000, 17500, 18500, 16000, 22000, 21000]
data_gas = [17000, 19000, 18500, 20000, 20100, 21000]
data_banner1 = []
check = 0
data_employ = [["Tuan Khanh", "Nguyen", "Tuankhanhld@gmail.com", "Supervisor"],
               ["Tuan Khanh", "Nguyen", "Tuankhanhld@gmail.com", "Supervisor"],
               ["Tuan Khanh", "Nguyen", "Tuankhanhld@gmail.com", "Supervisor"],
               ["Tuan Khanh", "Nguyen", "Tuankhanhld@gmail.com", "Supervisor"]]
data_history = [["Tuan Khanh", "21/10/2018", "Oil", 1.2, 28000],
                ["Tuan Khanh", "21/10/2018", "Oil", 1.2, 28000],
                ["Tuan Khanh", "21/10/2018", "Oil", 1.2, 28000]]
data_customer = [["ID", "name", "email", "phone", "adress"]]
data_locations = []
list_price_total = ["Oil", "gasoline","gia dau", "gia xang"]
total = [1000000, 2100000]
check = 0
emailCurrent = ""
stationSelect = ""

def fun1():
    while(True):
        db.child('trụ 1').child('status').set(1)
        time.sleep(1)
        status = db.child('trụ 1').child('status').get().val()
        if status == 1:
            db.child('trụ 1').child('networking').set(0)
        else:
            db.child('trụ 1').child('networking').set(1)
            db.child('trụ 1').child('status').set(1)
thread1 = threading.Thread(target = fun1)

thread1.start()

def signIn(request):
    try:
        auth.signOut()
    except:
        print("failed")

    return render(request, 'fuel_app_home/login.html')
def manage_home(request):
    global check
    global emailCurrent
    global stationSelect
    email = request.POST.get('email')
    passw = request.POST.get('password')
    st = request.POST.get('selectStation')
    try:
        auth.sign_in_with_email_and_password(email, passw)
        emailCurrent = email
        stationSelect = st
    except:
        message = "invalid cerediantials"
        if check == 0:
            return render(request, "fuel_app_home/login.html", {"msg": message})

    data_banner = []
    for i in range(0,4):
        if(i<2):
            dt = db.child('trụ 1').child('luong hang').child(list_price_total[i]).get().val()
            if(i == 0 and dt != data_oil[len(data_oil)-1]):
                data_oil.append(dt)
                if(len(data_oil) == 9):
                    del data_oil[0]
            elif(i == 0 and dt != data_gas[len(data_gas)-1]):
                data_gas.append(dt)
                if(len(data_gas) == 9):
                    del data_gas[0]
        else:
            dt = db.child('gia').child(list_price_total[i]).get().val()
        data_banner.append(dt)
    data_banner1.append(data_banner)
    if(len(data_banner1) == 2):
        del data_banner1[0]
    print(data_banner1)
    timeUp = str(datetime.datetime.now().hour) + ":" +  str(datetime.datetime.now().minute)
    print(timeUp)
    check = 1
    print(emailCurrent + "eeeeeeeeeeeeeeeee")
    return render(request, 'fuel_app_home/manageHome.html', {"dataOil": data_oil, "dataGas": data_gas,
                                                             "email":str(emailCurrent), "data_banner": data_banner1,
                                                             "time": timeUp,"name": emailCurrent.split('@')[0],
                                                             "total": total,"station": stationSelect})
def employee(request):
    oil_price = db.child('gia').child('gia dau').get().val()
    print(oil_price)
    return render(request, "fuel_app_home/employee.html",{"email": emailCurrent, "data_employee": data_employ ,"name": emailCurrent.split('@')[0],"station": stationSelect})
def locations(request):
    return render(request, "fuel_app_home/locations_map.html", {"email": emailCurrent,"name": emailCurrent.split('@')[0],"station": stationSelect})
def history(request):
    print(stationSelect)
    return render(request, "fuel_app_home/history.html", {"email": emailCurrent,"name": emailCurrent.split('@')[0],"station": stationSelect})
def response_help(request):
    print(stationSelect)
    return render(request, "fuel_app_home/response_help.html", {"email": emailCurrent,"name": emailCurrent.split('@')[0],"station": stationSelect})

def home(request):
    return render(request, "fuel_app_home/home.html")