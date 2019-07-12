
var contentQuestion = [];
var replyContent = []
var UidSend = [];
var listMessages = firebase.database().ref('Card lost');
listMessages.on('value', function(snapshot) {
    var list = document.getElementById("list-card-lost");
    while (list.hasChildNodes()){
        list.removeChild(list.firstChild);
    }
    var i = 0;
    snapshot.forEach(function (data) {
            var Uid = data.key.toString()

            var mLi = document.createElement('li');
            mLi.className = "list-card-lost"
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
            emailListMess.className = "emailListMess";
            emailListMess.id = "emailListMess" + i;
            emailListMess.innerText = Uid;

            var mImg = document.createElement('img');
            mImg.className = "imgHelp";

            var mSpan = document.createElement('p');
            mSpan.className = "subject";
            mSpan.id = "subject" + i;
            mSpan.innerHTML = data.val();
            mSpan.style.color = "#D44141"
            mLi.appendChild(mImg);
            mLi.appendChild(emailListMess);
            mLi.appendChild(mSpan);

            document.getElementById("list-card-lost").appendChild(mLi);

            i++;
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