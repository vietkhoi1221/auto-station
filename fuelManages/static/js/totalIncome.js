
var getMonthFromDate1 = "6/2019";
var dataBenGas = [];
var dataBenOil = [];
var listdayBene = [];
var dataBen = firebase.database().ref(station + '/income/' + getMonthFromDate1[1] + "/" +getMonthFromDate1[0]);
var i = 0;
dataBen.on('value', function(snapshot) {
    dataBenGas = [];
    listdayBene = [];
    snapshot.forEach(function(day){
        listdayBene.push(parseInt(day.key));
        // console.log("sadasdasD"+parseInt(day.key));
        dataBenGas.push(parseInt(day.child("Gasoline").val()));
        dataBenOil.push(parseInt(day.child("Oil").val()));
    });
    // console.log(snapshot.key)
    // try {
        var ctx = document.getElementById("bene-chart").getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data:
            {
                labels: listdayBene,
                datasets: [{
                    label: 'Gasoline money income',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    data: dataBenGas
                }, {
                    label: 'Oil money income',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                    data: dataBenOil
                }]

            }
            ,
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

    // }catch (e) {
    //     window.alert("Error");
    // }
// console.log(dataBenGas)

});