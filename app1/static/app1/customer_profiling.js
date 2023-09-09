document.addEventListener('DOMContentLoaded', main);

function main(){
    console.log("js file works!");
    Chart.register(ChartDataLabels);
    create_chart01('Chart01', conv_ratio_mthly_labels, conv_ratio_mthly);
    create_chart02('Chart02', cust_weekly_labels, cust_weekly)
    create_chart03(
        'Chart03', 
        cust_weekly_mthly_labels, 
        cust_weekly_mthly_months, 
        cust_weekly_mthly_1, 
        cust_weekly_mthly_2, 
        cust_weekly_mthly_3
    )
    create_chart04('Chart04', cust_agewise)
    create_chart05('Chart05', cust_agewise_mthly_months, cust_agewise_mthly);
    create_chart06('Chart06', cust_prefwise_pref, cust_prefwise);
    create_chart07('Chart07', cust_prefwise_mthly_months, cust_prefwise_mthly_pref, cust_prefwise_mthly);
    create_chart08('Chart08', decile_genderwise_labels, decile_genderwise_female, decile_genderwise_male);

    apply_month_filters();
    
}

function create_chart01(chart_id, conv_ratio_mthly_labels, conv_ratio_mthly){
    
    var formatter = (value, ctx) => {return value + "%";};
    const data = {
    labels: conv_ratio_mthly_labels,
    datasets: [{
        label: 'Conversion Ratio',
        data: conv_ratio_mthly,
        backgroundColor: '#D3D3D3',
        datalabels: {
            color: "black",
            formatter: formatter,
        }
    }]
    };
    const config = {
        type: 'bar',
        data: data,
        options: {
            maintainAspectRatio: false,
            scales: {
                x:{
                    grid: {display: false},
                    stacked: true,  
                    
                },
                y: {
                    stacked: true,  
                    grid: {display: false},
                    ticks: {
                        beginAtZero: true,
                        userCallback: function(value, index, values) {
                            return value + "%";
                        }
                    }, 
                },
            },
            tooltips: {
                enabled: true,
                callbacks: {
                    label: function (tooltipItem, data) {
                        var tooltipValue = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                        return tooltipValue + "%";
                    }
                }
            },
        },
    };
    var myChart = new Chart(
        document.getElementById(chart_id),
        config
    );
}

function create_chart02(chart_id, cust_weekly_labels, cust_weekly) {
    
    const formatter = (value, ctx) => {return value.toLocaleString();};

    const data = {
        labels: cust_weekly_labels,
        datasets: [{
            label: 'Customer Count',
            data: cust_weekly,
            backgroundColor: '#D3D3D3',
            datalabels: {
                color: "black",
                formatter: formatter,
            }
        }]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            maintainAspectRatio: false,
            scales: {
                x:{
                    stacked: true,  
                    grid: {display: false},
                },
                y: {
                    stacked: true,  
                    grid: {display: false},
                },
            },
            tooltips: {
                enabled: true,
            },
            plugins: {
                datalabels: {
                    rotation: 90,
                }
            }
        },
    };
    var myChart = new Chart(
        document.getElementById(chart_id),
        config
    );
}

function create_chart03(chart_id, 
    cust_weekly_mthly_labels, 
    cust_weekly_mthly_months, 
    cust_weekly_mthly_1, 
    cust_weekly_mthly_2, 
    cust_weekly_mthly_3){
    
    var formatter = (value, ctx) => {return value.toLocaleString();};
    const data = {
    labels: cust_weekly_mthly_labels,
    datasets: [
        {
            label: cust_weekly_mthly_months[0],
            data: cust_weekly_mthly_1,
            backgroundColor: '#cceeff',
            datalabels: {
                display: true, 
                formatter: formatter
            }
        },
        {
            label: cust_weekly_mthly_months[1],
            data: cust_weekly_mthly_2,
            backgroundColor: '#9fdf9f',
            datalabels: {
                display: true, 
                formatter: formatter
            }
        },
        {
            label: cust_weekly_mthly_months[2],
            data: cust_weekly_mthly_3,
            backgroundColor: '#ffccb3',
            datalabels: {
                display: true, 
                formatter: formatter
            }
        }

    ]
    };
    const config = {
        type: 'bar',
        data: data,
        options: {
            maintainAspectRatio: false,
            scales: {
                x:{
                    stacked: false,  
                    grid: {display: false}, 
                },
                y: {
                    stacked: false,  
                    grid: {display: false},
                },
            },
            tooltips: {
                enabled: true,
            },
            plugins: {
                datalabels: {
                    rotation: 90,
                }
            },
        },
    };
    var myChart = new Chart(
        document.getElementById(chart_id),
        config
    );
}

function create_chart04(chart_id, cust_agewise){
    const labels = ['Count'];
    const data = {
    labels: labels,
    datasets: [
        {
            label: '>20',
            data: [cust_agewise[0]],
            backgroundColor: '#cceeff',
            datalabels: {
                display: false
            }
        },
        {
            label: '20-30',
            data: [cust_agewise[1]],
            backgroundColor: '#3385ff',
            datalabels: {
                display: false,
                color: "white"
            }
        },
        {
            label: '30-45',
            data: [cust_agewise[2]],
            backgroundColor: '#9fdf9f',
            datalabels: {display: false}
        },
        {
            label: '45-60',
            data: [cust_agewise[3]],
            backgroundColor: '#66cc66',
            datalabels: {
                display: false,
                color: "white"
            }
        },
        {
            label: '60<',
            data: [cust_agewise[4]],
            backgroundColor: '#ffccb3',
            datalabels: {display: false}
        }
    ]
    };
    
    const config = {
        type: 'bar',
        data: data,
        options: {
            maintainAspectRatio: false,
            indexAxis: 'y',
            elements: {
                bar: {
                borderWidth: 2,
                }
            },
            responsive: true,
            scales: {
                x: 
                {
                  stacked: true,
                  grid: {display: false}
                },
                y: 
                {
                  stacked: true,
                  grid: {display: false}
                }
            },
            plugins: {
                datalabels: {
                    rotation: 90,
                    formatter: function(value, context) {
                        return value.toLocaleString();
                    },
                    // align: "right",

                }
            }
        },
    };
    var myChart = new Chart(
        document.getElementById(chart_id),
        config
    );
}

function create_chart05(chart_id, cust_agewise_mthly_months, cust_agewise_mthly){
    const data = {
    labels: cust_agewise_mthly_months,
    datasets: [
        {
            label: '>20',
            data: cust_agewise_mthly['>20'],
            backgroundColor: "#cceeff",
            datalabels: {
                display: false,
                color: "white"
            }
        },
        {
            label: '20-30',
            data: cust_agewise_mthly['20-30'],
            backgroundColor: '#3385ff',
            datalabels: {
                display: false,
                color: "white"
            }
        },
        {
            label: '30-40',
            data: cust_agewise_mthly['30-40'],
            backgroundColor: '#9fdf9f',
            datalabels: {
                display: false,
            }
        },
        {
            label: '45-60',
            data: cust_agewise_mthly['45-60'],
            backgroundColor: '#66cc66',
            datalabels: {
                display: false,
                // color: "white"
            }
        },
        {
            label: '60<',
            data: cust_agewise_mthly['60<'],
            backgroundColor: '#ffccb3',
            datalabels: {
                display: false
            }
        }
    ]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            maintainAspectRatio: false,
            indexAxis: 'y',
            elements: {
                bar: {
                borderWidth: 1,
                }
            },
            responsive: true,
            scales: {
                x: 
                {
                    stacked: true,
                    grid: {display: false}
                },
                y: 
                {
                  stacked: true,
                  grid: {display: false}
                }
            },
            plugins: {
                datalabels: {
                    rotation: 90,
                    formatter: function(value, context) {
                        return value.toLocaleString();
                    },
                    align: "right",
                }
            }
        },
    };

    var myChart = new Chart(
        document.getElementById(chart_id),
        config
    );
}

function create_chart06(chart_id, cust_prefwise_pref, cust_prefwise){
    const data = {
        labels: cust_prefwise_pref,
        datasets: [
          {
            label: 'Dataset 1',
            data: cust_prefwise,
            backgroundColor: ['#cceeff', '#3385ff', '#9fdf9f', '#66cc66', '#ffccb3'],
            datalabels: {
                color: ["black", "white", "black", "white", "black"]
            }
          }
        ]
    };
    const config = {
        type: 'pie',
        data: data,
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: false,
                    text: 'Chart.js Pie Chart'
                },
                datalabels: {
                    formatter: function(value, context) {
                        return value.toLocaleString();
                    }
                }
            }
        },
    };

    var myChart = new Chart(
        document.getElementById(chart_id),
        config
    );
}

function create_chart07(chart_id, cust_prefwise_mthly_months, cust_prefwise_mthly_pref, cust_prefwise_mthly){
    const labels = cust_prefwise_mthly_months;
    const data = {
    labels: labels,
    datasets: [
        {
            label: cust_prefwise_mthly_pref[0],
            data: cust_prefwise_mthly[cust_prefwise_mthly_pref[0]],
            // borderColor: Utils.CHART_COLORS.red,
            backgroundColor: '#cceeff',
            fill: true,
            // datalabels: {display: false}
        },
        {
            label: cust_prefwise_mthly_pref[1],
            data: cust_prefwise_mthly[cust_prefwise_mthly_pref[1]],
            // borderColor: Utils.CHART_COLORS.blue,
            backgroundColor: '#3385ff',
            fill: true,
            // datalabels: {display: false}
        },
        {
            label: cust_prefwise_mthly_pref[2],
            data: cust_prefwise_mthly[cust_prefwise_mthly_pref[2]],
            // borderColor: Utils.CHART_COLORS.green,
            backgroundColor: '#9fdf9f',
            fill: true,
            // datalabels: {display: false}
        },
        {
            label: cust_prefwise_mthly_pref[3],
            data: cust_prefwise_mthly[cust_prefwise_mthly_pref[3]],
            // borderColor: Utils.CHART_COLORS.yellow,
            backgroundColor: '#66cc66',
            fill: true,
            // datalabels: {display: false}
        },
        {
            label: cust_prefwise_mthly_pref[4],
            data: cust_prefwise_mthly[cust_prefwise_mthly_pref[4]],
            // borderColor: Utils.CHART_COLORS.yellow,
            backgroundColor: '#ffccb3',
            fill: true,
            // datalabels: {display: false}
        }
    ]
    };
    

    const config = {
        type: 'line',
        data: data,
        options: {
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
                tooltip: {
                    mode: 'index'
                },
                datalabels: {
                    display: false,
                    formatter: function(value, context) {
                        return value.toLocaleString();
                    },
                    align: "right",
                }
            },
            interaction: {
                // mode: 'nearest',
                mode: 'stack',
                axis: 'x',
                intersect: false
            },
            scales: {
                x: {
                    grid: {display: false},
                    title: {
                        display: true,
                        text: 'Month'
                    }
                },
                y: {
                    grid: {display: false},
                    stacked: true,
                    title: {
                        display: true,
                        text: 'Value'
                    }
                }
            },
            
        }
    };

    var myChart = new Chart(
        document.getElementById(chart_id),
        config
    );
}

function create_chart08(chart_id, decile_genderwise_labels, decile_genderwise_female, decile_genderwise_male){
    var ctx51 = document.getElementById(chart_id);
    const formatter = (value, ctx) => {return value.toLocaleString();};
    var chart51 = new Chart(ctx51, {
        type: 'bar',
        data: {
            
            labels: decile_genderwise_labels,
            datasets: [
                {
                    data: decile_genderwise_female,
                    label: "Female",
                    backgroundColor: "#ffccb3",
                    datalabels: {
                        color: "black",
                        formatter: formatter,
                    }
                }, 
                {
                    data: decile_genderwise_male,
                    label: "Male",
                    backgroundColor: '#D3D3D3',
                    datalabels: {
                        color: "black",
                        formatter: formatter,
                    }
                }, 
                
            ]
        },
        options: {
            maintainAspectRatio: false,
            scales: {
                x:
                {
                    stacked: true,  
                    grid: {
                        display:false
                    } 
                },
                y: {
                    stacked: true,  
                    grid: {
                        display:false
                    },
                    ticks: {
                        beginAtZero: true,
                        max: 100,
                        userCallback: function(value, index, values) {
                            return value.toLocaleString();
                        }
                    }, 
                },
            },
            tooltips: {
                enabled: true,
                callbacks: {
                    label: function (tooltipItem, data) {
                        var tooltipValue = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                        return tooltipValue.toLocaleString();
                    }
                }
            },
        },
    });
}

function create_table_header(title, data) {
    html = `<tr><th nowrap="nowrap" style="background-color: #ff41be; color: white">${title}</th>`;
    date_with_week_list_html = '';
    for (var i = 0; i < data.length; i++){
        html += `<th nowrap="nowrap" style="background-color: #ff41be; color: white">${data[i]}</th>`
    }
    html += date_with_week_list_html + '</tr>';
    return html;
}

function create_html_row(title, data, hide_zeros, suffix=null) {
    html = `<tr><td nowrap="nowrap">${title}</td>`;
    for (var i = 0; i < data.length; i++){
        if (hide_zeros == true && data[i] == 0 ){
            html += `<td nowrap="nowrap"></td>`;
        }
        else if (suffix != null){
            html += `<td nowrap="nowrap">${data[i].toLocaleString()}${suffix}</td>`;
        }
        else {
            html += `<td nowrap="nowrap">${data[i].toLocaleString()}</td>`;
        }
    }
    html += '</tr>';
    return html
}

function create_table(data){
    html = ''
    for (var i = 0; i < data.length; i++){
        if (i==0){
            for (var j = 0; j < i.length; j ++){
                html = `<tr><th style="background-color: #D3D3D3; color: black">${data[j].toLocaleString()}</th></tr>`;
            }
        }
        else {
            for (var j = 0; j < i.length; j ++){
                html = html + `<tr><td nowrap="nowrap">${data[i].toLocaleString()}</td></tr>`
            }
        }
    }
    return html;
}

function apply_month_filters(){
    var month1_btn = document.querySelector("#month1");
    var month2_btn = document.querySelector("#month2");
    var month3_btn = document.querySelector("#month3");

    month1_btn.onclick = function(){
        month1_btn.classList.add("btn-dark"); 
        month1_btn.classList.remove("btn-outline-secondary");

        if (month2_btn.classList.contains("btn-dark")) 
        {
            month2_btn.classList.remove("btn-dark"); 
            month2_btn.classList.add("btn-outline-secondary");
        }

        if (month3_btn.classList.contains("btn-dark")) 
        {
            month3_btn.classList.remove("btn-dark"); 
            month3_btn.classList.add("btn-outline-secondary");
        }
        
        filter = {
            "selected_month": month1_btn.value
        }
        filterData(filter);
    }
    month2_btn.onclick = function(){
        month2_btn.classList.add("btn-dark"); 
        month2_btn.classList.remove("btn-outline-secondary");

        if (month3_btn.classList.contains("btn-dark")) 
        {
            month3_btn.classList.remove("btn-dark"); 
            month3_btn.classList.add("btn-outline-secondary");
        }

        if (month1_btn.classList.contains("btn-dark")) 
        {
            month1_btn.classList.remove("btn-dark"); 
            month1_btn.classList.add("btn-outline-secondary");
        }

        filter = {
            "selected_month": month2_btn.value
        }
        filterData(filter);
    }
    month3_btn.onclick = function(){
        month3_btn.classList.add("btn-dark"); 
        month3_btn.classList.remove("btn-outline-secondary");

        if (month2_btn.classList.contains("btn-dark")) 
        {
            month2_btn.classList.remove("btn-dark"); 
            month2_btn.classList.add("btn-outline-secondary");
        }

        if (month1_btn.classList.contains("btn-dark")) 
        {
            month1_btn.classList.remove("btn-dark"); 
            month1_btn.classList.add("btn-outline-secondary");
        }

        filter = {
            "selected_month": month3_btn.value
        }
        filterData(filter);
    }
}

function filterData(filters) {
    var token = document.getElementsByName('csrfmiddlewaretoken')[0].value;

    console.log("sending post request with filters: ", filters);

    $.ajax({
        method: 'POST',
        headers: {
            "X-CSRFToken": token
        },
        credentials: 'include',
        url: "/filter_customer_profiling",
        data: filters,
        success: function (data, textStatus, jqXHR) {
            console.log("Filtered data: ", data);

            document.getElementById('chart01_div').innerHTML = '<canvas id="Chart01_filtered"></canvas>';
            chart_id = "Chart01_filtered";
            create_chart01(
                chart_id, 
                data["conv_ratio_mthly_labels"], 
                data["conv_ratio_mthly"]
            );

            document.getElementById('chart02_div').innerHTML = '<canvas id="Chart02_filtered"></canvas>';
            chart_id = "Chart02_filtered";
            create_chart02(chart_id, data["cust_weekly_labels"], data["cust_weekly"]);

            document.getElementById('chart03_div').innerHTML = '<canvas id="Chart03_filtered"></canvas>';
            chart_id = "Chart03_filtered";
            create_chart03(chart_id, 
                data["cust_weekly_mthly_labels"], 
                data["cust_weekly_mthly_months"], 
                data["cust_weekly_mthly_1"], 
                data["cust_weekly_mthly_2"], 
                data["cust_weekly_mthly_3"]
            );

            document.getElementById('chart04_div').innerHTML = '<canvas id="Chart04_filtered"></canvas>';
            chart_id = "Chart04_filtered";
            create_chart04(chart_id, data["cust_agewise"]);

            document.getElementById('chart05_div').innerHTML = '<canvas id="Chart05_filtered"></canvas>';
            chart_id = "Chart05_filtered";
            create_chart05(chart_id, data["cust_agewise_mthly_months"], data["cust_agewise_mthly"]);

            document.getElementById('chart06_div').innerHTML = '<canvas id="Chart06_filtered"></canvas>';
            chart_id = "Chart06_filtered";
            create_chart06(chart_id, data["cust_prefwise_pref"], data["cust_prefwise"]);

            document.getElementById('chart07_div').innerHTML = '<canvas id="Chart07_filtered"></canvas>';
            chart_id = "Chart07_filtered";
            create_chart07(chart_id, data["cust_prefwise_mthly_months"], data["cust_prefwise_mthly_pref"], data["cust_prefwise_mthly"]);

            document.getElementById('chart08_div').innerHTML = '<canvas id="Chart08_filtered"></canvas>';
            chart_id = "Chart08_filtered";
            create_chart08(chart_id, data["decile_genderwise_labels"], data["decile_genderwise_female"], data["decile_genderwise_male"]);
            
            decile_table = data['decile_table']
            html = ''
            for (var i = 0; i < decile_table.length; i++){
                row = decile_table[i]
                html = html + '<tr>'
                if (i==0){
                    for (var j = 0; j < row.length; j++){
                        html = html + `<th style="background-color: #D3D3D3; color: black">${row[j].toLocaleString()}</th>`;
                    }
                }
                else {
                    for (var j = 0; j < row.length; j++){
                        html = html + `<td nowrap="nowrap">${row[j].toLocaleString()}</td>`
                    }
                }
                html = html + '</tr>'
            }
            document.getElementById('decile_table').innerHTML = html;
        }
    });
}