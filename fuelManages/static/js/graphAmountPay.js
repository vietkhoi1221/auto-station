    var getMonthFromDate = "1/2019";

    var dataAmountGas = [];
    var dataAmountOil = [];
    // var listMonth = ["Janu", "Feb", "Mar", "Apr", "May", "Jun", "Au", "Sep", "Oct", "Nov", "Dec"];
    var listdayAmount = [];
    var dataAmount = firebase.database().ref(station + '/history_amount_sell');
    var i = 0;
    var color = Chart.helpers.color;
    dataAmount.on('value', function(snapshot) {
        dataAmountGas = [];
        listdayAmount = [];
        snapshot.forEach(function(type){
            // console.log("sadasdasD"+parseInt(day.key));

            type.forEach(function(year){
                year.forEach(function(month){
                    month.forEach(function(day){
                        if(month.key === getMonthFromDate[0]){
                            listdayAmount.push(parseInt(day.key));
                            if(type.key.toString() === "Gasoline"){
                                dataAmountGas.push(parseFloat(day.val()));
                            }else if(type.key.toString() === "Oil"){
                                dataAmountOil.push(parseFloat(day.val()));
                            }
                        }

                    });

                });
            });
        });
        // console.log(snapshot.key)
        // try {
            console.log(dataAmountGas);
            console.log(listdayAmount);
            var ctx = document.getElementById("amout-pay").getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'bar',
                data:
                {
                    labels: listdayAmount,
                    datasets: [{
                        label: 'Gasoline amount bought',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255,99,132,1)',
                        borderWidth: 1,
                        data: dataAmountGas
                    }, {
                        label: 'Oil amount bought',
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1,
                        data: dataAmountOil
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
