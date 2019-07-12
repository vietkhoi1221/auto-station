var dataUsersName = "";
var dataMoney = "";
var number = "";
var i = 1;
var k = 0;
var idUser = []
var emailUser = []
var listAcc = firebase.database().ref('Account');
listAcc.on('value', function(snapshot) {

    var list1 = document.getElementById("list-card-lost");
    while (list1.hasChildNodes()){
        list1.removeChild(list1.firstChild);
    }
    var i = 0;
    snapshot.forEach(function (data) {
        var child = data.val();
        setListviewDashboard(child.money, child.Name, child.avatar_url, child.location);
        setEmail(data.key, child.email)
        checkLostCard(data.key, child.avatar_url, child.RFID)
    });

});
function setListviewDashboard(money, dataUsersName, avt, location) {
    var mLi = document.createElement('li');
    mLi.className = "list-user-dashboard list-mess-feedback"
    mLi.id = i.toString();

    if (i % 2){
        mLi.style.background = "#FEF0BB"
    } else {
        mLi.style.background = "#90DCFB"
    }
    var emailListMess = document.createElement('p');
    emailListMess.className = "set-top-list name-dashboard emailListMess";
    emailListMess.id = "name-dashboard" + i;
    emailListMess.innerText = dataUsersName;

    var mImg = document.createElement('img');
    mImg.className = "imgAvt-dashboard imgHelp";
    mImg.src = avt;

    var mSpan = document.createElement('p');
    mSpan.className = "set-top-list money-dashboard subject";
    mSpan.id = "money-dashboard" + i;
    mSpan.innerHTML = formatMoney(money);
    mSpan.style.color = "#7F2AEF"


    var mSpanC = document.createElement('p');
    mSpanC.className = "set-top-list cu-dashboard";
    mSpanC.id = "cu-dashboard" + i;
    mSpanC.innerHTML = "VND";

    var addressUser = document.createElement('p');
    addressUser.className = "set-top-list addressUser";
    addressUser.id = "addressUser" + i;
    addressUser.innerHTML = location;

    var btnSendMess = document.createElement('button');
    btnSendMess.className = "btnSendMess btnDelete formatBtn";
    btnSendMess.id = "btnSendMess" + i;
    btnSendMess.innerText = "Send message"
    btnSendMess.onclick = function () {
        getSendMess(this.id)
    };
    var btnView = document.createElement('button');
    btnView.className = "btnView formatBtn";
    btnView.id = "btnView" + i;
    btnView.innerText = "Remove";
    btnView.onclick = function () {
        getIdRemove(this.id)
    };

    mLi.appendChild(mImg);
    mLi.appendChild(emailListMess);
    mLi.appendChild(mSpan);
    mLi.appendChild(mSpanC);
    mLi.appendChild(btnSendMess);
    mLi.appendChild(btnView);
    mLi.appendChild(addressUser);
    document.getElementById("list-card-lost").appendChild(mLi);
    i++;
}

function formatMoney(n, c, d, t) {
  var c = isNaN(c = Math.abs(c)) ? 2 : c,
    d = d == undefined ? "" : d,
    t = t == undefined ? "," : t,
    s = n < 0 ? "-" : "",
    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
    j = (j = i.length) > 3 ? j % 3 : 0;

  return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(0).slice(2) : "");
};

function setEmail(id, email) {
    emailUser.push(email)
    idUser.push(id)
}

function checkLostCard(id, avtUrl, rfidCode) {
    var listMessages = firebase.database().ref('Card lost');
    listMessages.on('value', function(snapshot) {
        detect()
        snapshot.forEach(function (data) {
            if (data.key === id) {
                var Uid = data.key.toString()

                var mLi = document.createElement('li');
                mLi.className = "list-mess-feedback"
                mLi.id = i.toString();


                if (i % 2){
                    mLi.style.background = "#FEF0BB"
                } else {
                    mLi.style.background = "#90DCFB"
                }
                var emailListMess = document.createElement('p');
                emailListMess.className = "set-top-list emailListMess";
                emailListMess.id = "emailListMess" + i;
                emailListMess.innerText = "RFID: " + rfidCode;

                var mImg = document.createElement('img');
                mImg.className = "imgHelp";
                mImg.src = avtUrl;


                var btnDelete = document.createElement('button');
                btnDelete.className = "btnDelete formatBtn";
                btnDelete.id = "btnDelete" + i;
                btnDelete.innerText = "Delete"
                btnDelete.onclick = function () {
                    removeCardLost(this.id, id, rfidCode)
                };

                mLi.appendChild(mImg);
                mLi.appendChild(emailListMess);
                mLi.appendChild(btnDelete);

                document.getElementById("list-user-dash").appendChild(mLi);
                i++;
            }
        });
    });
}

function detect() {
        var listMessages = firebase.database().ref('Card lost');
    listMessages.on('value', function(snapshot) {
        var list = document.getElementById("list-user-dash");
        while (list.hasChildNodes()){
            list.removeChild(list.firstChild);
        }
    });
}
function getIdRemove(id) {
    alert("Remove id: " + idUser[id.substr(id.length - 1) - 1])
}
function getSendMess(id) {
    alert("Send message to id: " + idUser[id.substr(id.length - 1) - 1])
    firebase.database().ref('Account/' + idUser[id.substr(id.length - 1) - 1] + "/message").set("hello")
}

function removeCardLost(id, UId, rfid) {
    firebase.database().ref('Card lost/' + UId).remove()
}
