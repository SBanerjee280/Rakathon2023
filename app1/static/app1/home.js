document.addEventListener('DOMContentLoaded', main);

function main(){
    console.log("js working!", email);
    create_chart7("Chart7", labelvalues_pm, barvaluesl3_pm_comp, barvaluesl3_py_comp, barvaluesl3_pm_comp_ln, barvaluesl_pm_base);
    create_chart9("Chart9", labelvalues_pw, barvaluesl_pw_base, barvaluesl3_pw_comp);
    create_chart10("Chart10", labelvalues_sw, barvaluesl_sw_base, barvaluesl3_sw_comp);
    create_chart11("Chart11", labelvalues_psw, barvaluesl_psw_base, barvaluesl3_psw_comp);
    filter_chart_7_9_10_11();
    track_user();
}

function track_user(){
    send_user_data_to_db("Loaded Home page.", "page load", 7);

    document.addEventListener("visibilitychange", function() {
        if (document.visibilityState === 'hidden') {
            send_user_data_to_db("Left Home page.", "page left", 8);
        }
        if (document.visibilityState === 'visible') {
            send_user_data_to_db("Came back to Home page.", "page visible", 9);
        }
    });

    var chart01_visible = false;
    var chart02_visible = false;
    var chart03_visible = false;
    var chart04_visible = false;
    var chart05_visible = false;
    var chart06_visible = false;
    var chart07_visible = false;
    var chart08_visible = false;
    var chart09_visible = false;
    document.addEventListener("scroll", function(){

        chart01 = document.getElementById("Chart1");
        if (isVisibleInViewport(chart01)){
            if (chart01_visible == false){
                send_user_data_to_db("Chart 01 viewed: Hourly Trends and Application Calendar", "chart viewed", 10);
                chart01_visible = true;
            }
        }
        else {
            chart01_visible = false;
        }

        chart02 = document.getElementById("Chart7");
        if (isVisibleInViewport(chart02)){
            if (chart02_visible == false){
                send_user_data_to_db("Chart 02 viewed: Daily Comparisons", "chart viewed", 11);
                chart02_visible = true;
            }
        }
        else {
            chart02_visible = false;
        }

        chart03 = document.getElementById("Chart9");
        if (isVisibleInViewport(chart03)){
            if (chart03_visible == false){
                send_user_data_to_db("Chart 03 viewed: Weekend vs Weekdays, Salary vs Non Salary Week...", "chart viewed", 12);
                chart03_visible = true;
            }
        }
        else {
            chart03_visible = false;
        }

        chart04 = document.getElementById("Chart2");
        if (isVisibleInViewport(chart04)){
            if (chart04_visible == false){
                send_user_data_to_db("Chart 04 viewed: Daily applications (PIOP based forecast)", "chart viewed", 13);
                chart04_visible = true;
            }
        }
        else {
            chart04_visible = false;
        }

        chart05 = document.getElementById("Chart3");
        if (isVisibleInViewport(chart05)){
            if (chart05_visible == false){
                send_user_data_to_db("Chart 05 viewed: Historical Application Trends & Forecasted Applications Volumes", "chart viewed", 14);
                chart05_visible = true;
            }
        }
        else {
            chart05_visible = false;
        }

        chart06 = document.getElementById("dough-chart1");
        if (isVisibleInViewport(chart06)){
            if (chart06_visible == false){
                send_user_data_to_db("Chart 06 viewed: Doughnut charts: Shop, online and migrations (customer acquisition)", "chart viewed", 15);
                chart06_visible = true;
            }
        }
        else {
            chart06_visible = false;
        }

        chart07 = document.getElementById("container");
        if (isVisibleInViewport(chart07)){
            if (chart07_visible == false){
                send_user_data_to_db("Chart 07 viewed: Application channel volumes by month in current year", "chart viewed", 16);
                chart07_visible = true;
            }
        }
        else {
            chart07_visible = false;
        }

        chart08 = document.getElementById("chart_div2");
        if (isVisibleInViewport(chart08)){
            if (chart08_visible == false){
                send_user_data_to_db("Chart 08 viewed: Campaign scheduling this quarter", "chart viewed", 17);
                chart08_visible = true;
            }
        }
        else {
            chart08_visible = false;
        }

        chart09 = document.getElementById("current_campaigns_table");
        if (isVisibleInViewport(chart09)){
            if (chart09_visible == false){
                send_user_data_to_db("Chart 09 viewed: Current campaigns (excl. undefined end date)", "chart viewed", 18);
                chart09_visible = true;
            }
        }
        else {
            chart09_visible = false;
        }

    });
}

function send_user_data_to_db(event, event_type, event_id){
    data = {
        "datetime": new Date().toLocaleString(),
        "datetime_int": Date.now(),
        "email": email,
        "page": "/",
        "event": event,
        "event_type": event_type,
        "event_id": event_id
    }
    console.log(event_id)
    
    var token = document.getElementsByName('csrfmiddlewaretoken')[0].value;
    $.ajax({
        method: 'POST',
        headers: {
            "X-CSRFToken": token
        },
        credentials: 'include',
        url: "/send_user_data_to_db",
        data: data,
        success: function (data, textStatus, jqXHR) {
            console.log("");
        }
    })
}

function isVisibleInViewport(elem)
{
    var y = elem.offsetTop;
    var height = elem.offsetHeight;

    while ( elem = elem.offsetParent )
        y += elem.offsetTop;

    var maxHeight = y + height;
    var isVisible = ( y < ( window.pageYOffset + window.innerHeight ) ) && ( maxHeight >= window.pageYOffset );
    return isVisible; 

}

function create_chart7(id, labelvalues_pm, barvaluesl3_pm_comp, barvaluesl3_py_comp, barvaluesl3_pm_comp_ln, barvaluesl_pm_base, update=false) {
    var ctx7 = document.getElementById(id).getContext('2d');
    var chart7 = new Chart(ctx7, {
        type: 'bar',

        data: {
            labels: labelvalues_pm,
            datasets: [{
                type: 'line',
                label: 'vs Previous Month (%)',
                yAxisID: "y-axis-1",
                backgroundColor: 'rgba(0, 0, 0, 0)',
                borderColor: 'rgb(0, 0, 0)',
                borderWidth: 1,
                pointHitRadius: 10,
                data: barvaluesl3_pm_comp,
            },{
                type: 'line',
                label: 'vs Previous Year-Month (%)',
                yAxisID: "y-axis-1",
                backgroundColor: 'rgba(255, 140, 0, 0)',
                borderColor: 'rgb(255, 140, 0)',
                borderWidth: 1,
                pointHitRadius: 10,
                data: barvaluesl3_py_comp,
            },{
                type: 'line',
                label: 'Threshold (%)',
                yAxisID: "y-axis-1",
                backgroundColor: 'rgba(34,139,34, 0)',
                borderColor: 'rgb(34,139,34)',
                borderWidth: 1,
                pointHitRadius: 0,
                data: barvaluesl3_pm_comp_ln,
            },{
                label: 'Current/Selected Month',
                yAxisID: "y-axis-0",
                // backgroundColor: 'rgba(255, 99, 132, 1)',
                data: barvaluesl_pm_base,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                    gridLines: {
                        display:false
                    }   
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    position: "left",
                    "id": "y-axis-0",
                    gridLines: {
                        display:false
                    }   
                }, {
                    ticks: {
                        beginAtZero: true
                    },
                    position: "right",
                    "id": "y-axis-1",
                    gridLines: {
                        display:false
                    }   
                }]
            }
        }

    });
    if (update == true){
        chart7.update();
    }
}

function create_chart9(id, labelvalues_pw, barvaluesl_pw_base, barvaluesl3_pw_comp) {
    var ctx9 = document.getElementById(id).getContext('2d');
    var chart9 = new Chart(ctx9, {
        type: 'bar',

        data: {
            labels: labelvalues_pw,
            datasets: [{
                label: 'Weekdays',
                backgroundColor: 'rgba(143, 188, 143, 1)',
                data: barvaluesl_pw_base,
            },{
                label: 'Weekends',
                backgroundColor: 'rgba(165, 42, 42, 1)',
                data: barvaluesl3_pw_comp,
            }]
        },
        options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            },
                            gridLines: {
                                display:false
                            }   
                        }],
                        xAxes: [{
                            gridLines: {
                                display:false
                            }   
                        }]
                    }
                }
    });
}

function create_chart10(id, labelvalues_sw, barvaluesl_sw_base, barvaluesl3_sw_comp) {
    var ctx10 = document.getElementById(id).getContext('2d');
    var chart10 = new Chart(ctx10, {
        type: 'bar',

        data: {
            labels: labelvalues_sw,
            datasets: [{
                label: 'Salary Week',
                backgroundColor: 'rgba(176, 196, 222, 1)',
                data: barvaluesl_sw_base,
            },{
                label: 'Non-Salary Week',
                backgroundColor: 'rgba(0, 0, 132, 1)',
                data: barvaluesl3_sw_comp,
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    },
                    gridLines: {
                        display:false
                    }   
                }],
                xAxes: [{
                    gridLines: {
                        display:false
                    }   
                }]
            }
        }
    });
}

function create_chart11(id, labelvalues_psw, barvaluesl_psw_base, barvaluesl3_psw_comp){
    var ctx11 = document.getElementById(id).getContext('2d');
    var chart11 = new Chart(ctx11, {
        type: 'bar',

        data: {
            labels: labelvalues_psw,
            datasets: [{
                label: 'Current/Selected Month',
                backgroundColor: 'rgba(176, 196, 222, 1)',
                data: barvaluesl_psw_base
            },{
                label: 'Previous Month',
                backgroundColor: 'rgba(75, 0, 130, 1)',
                data: barvaluesl3_psw_comp,
            }]
        },
        options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            },
                            gridLines: {
                                display:false
                            }   
                        }],
                        xAxes: [{
                            gridLines: {
                                display:false
                            }   
                        }]

                    }
                }
    });
}

function filter_chart_7_9_10_11(){

    $('#submitbtn_cmp').click(function (e) {
        var range_selected1 = $('#cmp_years option:selected').text()
        var range_selected2 = $('#cmp_months option:selected').text()

        console.log(range_selected1, range_selected2);

        var lis_cmp = { "date_range_yr": range_selected1, "date_range_mt": range_selected2 }

        console.log(lis_cmp)
        $.ajax({
            method: 'POST',
            headers: {
                "X-CSRFToken": getCookie("csrftoken")
            },
            url: "/posti_cmp",
            data: lis_cmp,
            success: function (resultData_cmp, textStatus, jqXHR) {
                console.log("Save Complete", resultData_cmp);

                document.getElementById('chart7_div').innerHTML = '<br><canvas id="Chart7_filtered" class="h-55"></canvas>';
                create_chart7(
                    "Chart7_filtered",
                    resultData_cmp["labelvalues_pm"],
                    resultData_cmp["barvaluesl3_pm_comp"],
                    resultData_cmp["barvaluesl3_py_comp"],
                    resultData_cmp["barvaluesl3_pm_comp_ln"], 
                    resultData_cmp["barvaluesl_pm_base"],
                    update=true
                )
                
                document.getElementById('chart9_div').innerHTML = '<br><canvas id="Chart9_filtered"></canvas>';
                create_chart9(
                    "Chart9_filtered",
                    resultData_cmp["labelvalues_pw"],
                    resultData_cmp["barvaluesl_pw_base"],
                    resultData_cmp["barvaluesl3_pw_comp"],
                )

                document.getElementById('chart10_div').innerHTML = '<br><canvas id="Chart10_filtered"></canvas>';
                create_chart10(
                    "Chart10_filtered",
                    resultData_cmp["labelvalues_sw"],
                    resultData_cmp["barvaluesl_sw_base"],
                    resultData_cmp["barvaluesl3_sw_comp"]
                )

                document.getElementById('chart11_div').innerHTML = '<br><canvas id="Chart11_filtered"></canvas>';
                create_chart11(
                    "Chart11_filtered",
                    resultData_cmp["labelvalues_psw"],
                    resultData_cmp["barvaluesl_psw_base"],
                    resultData_cmp["barvaluesl3_psw_comp"]
                )

            }
        });
    })
}

