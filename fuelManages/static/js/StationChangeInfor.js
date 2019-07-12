var overChange = document.getElementById('change-prGas');
document.getElementById('btn-change').addEventListener("click", function () {
    var newGasPrice = document.getElementById('gas-change').value;
    var newOilPrice = document.getElementById('oil-change').value;
    var newttGas = document.getElementById('ttgas-change').value;
    var newttOil = document.getElementById('ttoil-change').value;
    if(newGasPrice.toString() === "" && newOilPrice.toString() === ""
        && newttGas.toString() === "" && newttOil.toString() === "" ){
        alert("Please fill full!")
    }else{
        var now = new Date();
        var month = parseInt(now.getUTCMonth()) + 1
        var date = now.getFullYear() + "_" + month + "_" + now.getDate()
        var time = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds()
        if(newGasPrice.toString() !== ""){
            firebase.database().ref('prices/Gasoline').set(parseFloat(newGasPrice));
        }
        if(newOilPrice.toString() !== ""){
            firebase.database().ref('prices/Oil').set(parseFloat(newOilPrice));
        }
        if(newttGas.toString() !== ""){
            getCurrentAmout("Gasoline", parseFloat(newttGas), date, time);
        }
        if(newttOil.toString() !== ""){
            getCurrentAmout("Oil", parseFloat(newttOil), date, time);
        }
        overChange.style.display = "none";
    }

})

function getCurrentAmout(type, newAmount, date, time) {
    var amount = firebase.database().ref(station + '/fuel_amount/' + type);
    amount.once('value', function(snapshot) {
        var newAmountAdd = snapshot.val() + newAmount
        firebase.database().ref(station + '/history_amount_add/' + type + "/" + date + "/" + time + "/" +
            "amount_add").set(parseFloat(newAmount));
        firebase.database().ref(station + '/fuel_amount/' + type).set(newAmountAdd)
        firebase.database().ref(station + '/history_amount_add/' + type + "/" + date + "/" + time + "/" +
            "amount_now").set(parseFloat(snapshot.val()));
        firebase.database().ref(station + '/history_amount_add/' + type + "/" + date + "/" + time + "/" +
            "email").set(emailAdmin.toString())
    });
}