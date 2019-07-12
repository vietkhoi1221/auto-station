
var contentQuestion = [];
var replyContent = []
var UidSend = [];
var listMessages = firebase.database().ref('customer_feedback/messages');
listMessages.on('value', function(snapshot) {
    var list = document.getElementById("list-feedback");
    while (list.hasChildNodes()){
        list.removeChild(list.firstChild);
    }
    var i = 0;
    snapshot.forEach(function (data) {
        var Uid = data.key.toString()
        data.forEach(function (dtSubject) {
            var dataMess = dtSubject.val();
            setContentQuestion(dataMess.content, Uid, dataMess.reply)
            var mLi = document.createElement('li');
            mLi.className = "list-mess-feedback"
            mLi.id = i.toString();
            mLi.onclick = function () {
                getID(this.id)
            };

            if (i % 2){
                mLi.style.background = "#FEF0BB"
            } else {
                mLi.style.background = "#90DCFB"
            }
            var emailListMess = document.createElement('p');
            emailListMess.className = "set-top-list emailListMess";
            emailListMess.id = "emailListMess" + i;
            emailListMess.innerText = dataMess.email;

            var mImg = document.createElement('img');
            mImg.className = "imgHelp";
            mImg.src = dataMess.avatarUrl;

            var mSpan = document.createElement('p');
            mSpan.className = "set-top-list subject";
            mSpan.id = "subject" + i;
            mSpan.innerHTML = dtSubject.key;
            mSpan.style.color = "#D44141";

            var btnAnswer = document.createElement('button');
            btnAnswer.className = "btnAnswer btnDelete formatBtn";
            btnAnswer.id = "btnAnswer" + i;
            btnAnswer.innerText = "Answer";
            btnAnswer.onclick = function () {
                getID(this.id)
            };

            mLi.appendChild(mImg);
            mLi.appendChild(emailListMess);
            mLi.appendChild(mSpan);
            mLi.appendChild(btnAnswer);

            document.getElementById("list-feedback").appendChild(mLi);
            i++;
        });
    });
});
function setContentQuestion(content, Uid, rep) {
    contentQuestion.push(content);
    UidSend.push(Uid)
    replyContent.push(rep)
}
function getID(id) {
    var getSubject = document.getElementById("subject" + id).innerText;
    var getEmail = document.getElementById("emailListMess" + id).innerText;
    showMessageContent(getSubject, getEmail, contentQuestion[parseInt(id)], UidSend[parseInt(id)], replyContent[parseInt(id)])
}

function showMessageContent(subject, email, question, Uid, repCont ) {
    var overMessContent = document.getElementById('reply-mess');
    document.getElementById('titleMess').innerText = subject;
    document.getElementById('contentMess').value = question;
    document.getElementById('replyContent').value = repCont;
    overMessContent.style.display = "none";
    if (overMessContent.style.display === "none") {
        overMessContent.style.display = "block";
    }
    document.getElementById('close-change-pr').addEventListener('click', function(){
        overMessContent.style.display = "none";
    });
    document.getElementById('btn-send-reply').addEventListener("click", function () {
        var replyContent = document.getElementById('replyContent').value;
        if (replyContent !== ""){
            firebase.database().ref('customer_feedback/messages/' + Uid + "/" + subject + "/" + "reply").set(replyContent);
            overMessContent.style.display = "none";
            document.getElementById('titleMess').innerText = null;
            document.getElementById('contentMess').value = null;
        }
        else {
            alert("Not content reply!")
        }

    })
}