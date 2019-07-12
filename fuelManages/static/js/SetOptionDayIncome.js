const selectElement1 = document.querySelector('.ch-day-income');
selectElement1.addEventListener('change', (event1) => {
    var dd = event1.target.value
    ShowIncome(dd)
});
function ShowIncome(day) {

    var getMonthFromDate = day.split("/");
    var dataBenGas = [];
    var dataBenOil = [];
    var listdayBene = [];
    var dataBen = firebase.database().ref(station + '/income/' + getMonthFromDate[1] + "/" + getMonthFromDate[0]);
    var i = 0;
    var color = Chart.helpers.color;
    dataBen.on('value', function(snapshot) {
        dataBenGas = [];
        listdayBene = [];
        $('#bene-chart').remove(); // this is my <canvas> element
        $('.bene').append('<canvas id="bene-chart" width="700" height="300"><canvas>');
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
                type: 'line',
                data:
                {
                    labels: listdayBene,
                    datasets: [{
                        label: 'Gasoline money income',
                        backgroundColor: '#D74177',
                        borderColor: '#7E7AF6',
                        borderWidth: 3,
                        data: dataBenGas
                    }, {
                        label: 'Oil money income',
                        backgroundColor: 'rgb(54, 162, 235)',
                        borderColor: '#54D8FF',
                        borderWidth: 3,
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

    });
}
