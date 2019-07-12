var dataGraphOil = [];
var listMonthOil = ["Janu", "Feb", "Mar", "Apr", "May", "Jun", "Au", "Sep", "Oct", "Nov", "Dec"];
var listMonth2Oil = [];
var dataOil = firebase.database().ref('prices/Oil');
var iOil = 0;
dataOil.on('value', function(snapshot) {
    try {
        if(dataGraphOil.length > 0){
            var price = parseInt(snapshot.val()) - parseInt(dataGraphOil[dataGraphOil.length - 1]);
            if (price > 0){
                document.getElementById('de-up-oil').innerHTML = price + "VND raise in today";
            }else {
                document.getElementById('de-up-oil').innerHTML = (-1) * price + "VND decrease in today";
            }
        }
        var month = listMonthOil[iOil++];
        listMonth2Oil.push(month);
        if(dataGraphOil.length >11) {
            dataGraphOil.shift();
        }
        dataGraphOil.push(parseInt(snapshot.val()));

        var ctx = document.getElementById("gasChart").getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: listMonth2Oil,
                datasets: [{
                    label: 'Gas-price',
                    data: dataGraphOil,
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