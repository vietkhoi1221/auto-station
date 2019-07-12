var dataGraphGas = [];
var listMonth = ["Janu", "Feb", "Mar", "Apr", "May", "Jun", "Au", "Sep", "Oct", "Nov", "Dec"];
var listMonth2 = [];
var dataGas = firebase.database().ref('prices/Gasoline');
var i = 0, t = 0;
dataGas.on('value', function(snapshot) {
    try {
        if(dataGraphGas.length > 0){
            var price = parseInt(snapshot.val()) - parseInt(dataGraphGas[dataGraphGas.length - 1]);
            if (price > 0){
                document.getElementById('details-up').innerHTML = price + "VND raise in today";
            }else {
                document.getElementById('details-up').innerHTML = (-1) * price + "VND decrease in today";
            }
        }
        var month = listMonth[i++];
        listMonth2.push(month);
        if(dataGraphGas.length >11) {
            dataGraphGas.shift();
        }
        dataGraphGas.push(parseInt(snapshot.val()));

        firebase.database().ref('gia').child("gasMonth").child(listMonth[t++]).set(snapshot.val());
        var ctx = document.getElementById("oilChart").getContext('2d');
        var g = new JustGage({
            id: "chart-oil",
            value: 100,
            min: 0,
            max: 500,
            label: "Visitors On Site"
        });
    }catch (e) {
        window.alert("Error");
    }

});