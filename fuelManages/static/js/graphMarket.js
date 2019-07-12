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
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: listMonth2,
                datasets: [{
                    label: 'Gas-price',
                    data: dataGraphGas,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });
    }catch (e) {
        window.alert("Error");
    }

});