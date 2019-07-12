totalPay()
totalRecharge()
totalTransfer()


var dataGraphTotal = [];
var dataAmountGas = firebase.database().ref(station + '/customers_infor/no_pay');
dataAmountGas.on('value', function(snapshot) {
    try {
        dataGraphTotal.push(parseInt(snapshot.val()));
        var dataTrans = firebase.database().ref(station + '/customers_infor/no_transfer');
        dataTrans.on('value', function(snapshot) {
            try {

                dataGraphTotal.push(parseInt(snapshot.val()));
                var dataTotalGas = firebase.database().ref(station +'/customers_infor/no_recharge');
                dataTotalGas.on('value', function(snapshot) {
                    try {
                        dataGraphTotal.push(parseInt(snapshot.val()));

                        var ctx = document.getElementById("visit-chart").getContext('2d');
                        var myChart = new Chart(ctx, {
                            type: 'doughnut',
                            data: {
                                labels: ["Total payment", "Total recharge", "Total transfer"],
                                datasets: [{
                                    label: 'Gas-price',
                                    data: dataGraphTotal,
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


            }catch (e) {
                window.alert("Error");
            }

        });

    }catch (e) {
        window.alert("Error");
    }

});

function totalPay() {
    var listH = firebase.database().ref(station + '/history_changes/payment');
    var j = 1;
    listH.once('value', function(snapshot) {
        snapshot.forEach(function (date) {
            date.forEach(function (time) {
                time.forEach(function (data) {
                    j++;

                });
            });

        });
        firebase.database().ref(station +'/customers_infor/no_pay').set(j)

    });
}
function totalRecharge() {
    var listH = firebase.database().ref(station + '/history_changes/recharge');
    var j = 1;
    listH.once('value', function(snapshot) {
        snapshot.forEach(function (date) {
            date.forEach(function (time) {
                time.forEach(function (data) {
                    j++;

                });
            });

        });
        firebase.database().ref(station +'/customers_infor/no_recharge').set(j)

    });
}
function totalTransfer() {
    var listH = firebase.database().ref(station + '/history_changes/transfer');
    var j = 1;
    listH.once('value', function(snapshot) {
        snapshot.forEach(function (date) {
            date.forEach(function (time) {
                time.forEach(function (data) {
                    j++;

                });
            });

        });
        firebase.database().ref(station +'/customers_infor/no_transfer').set(j)

    });
}