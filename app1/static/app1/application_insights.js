document.addEventListener('DOMContentLoaded', main);

function main(){
    console.log("js file works!");

    show_trends(new_customers_change, mnp_customers_change, migrations_customers_change);
    create_chart53(month_list, new_customers_monthwise_list, mnp_customers_monthwise_list, migrations_customers_monthwise_list);
    create_chart51();
    create_chart52();
    apply_filters();
    draw_map();
    track_user();
}

function track_user(){
    console.log("tracking users")
    send_user_data_to_db("Loaded Application Insights.", "page load", 4);

    document.addEventListener("visibilitychange", function() {
        if (document.visibilityState === 'hidden') {
            send_user_data_to_db("Left Application Insights.", "page left", 5);
        }
        if (document.visibilityState === 'visible') {
            send_user_data_to_db("Came back to Application Insights.", "page visible", 6);
        }
    });

    var chart01_visible = false;
    var chart02_visible = false;
    var chart03_visible = false;
    document.addEventListener("scroll", function(){

        chart01 = document.getElementById("Chart53");
        if (isVisibleInViewport(chart01)){
            if (chart01_visible == false){
                send_user_data_to_db("Chart 01 viewed: Application types (New, MNP, Migrations)", "chart viewed", 1);
                chart01_visible = true;
            }
        }
        else {
            chart01_visible = false;
        }

        chart02 = document.getElementById("Chart51");
        if (isVisibleInViewport(chart02)){
            if (chart02_visible == false){
                send_user_data_to_db("Chart 02 viewed: Application by Gender & Age", "chart viewed", 2);
                chart02_visible = true;
            }
        }
        else {
            chart02_visible = false;
        }

        chart03 = document.getElementById("map");
        if (isVisibleInViewport(chart03)){
            if (chart03_visible == false){
                send_user_data_to_db("Chart 03 viewed: Application Prefecture Map", "chart viewed", 3);
                chart03_visible = true;
            }
        }
        else {
            chart03_visible = false;
        }
        
    });
}

function send_user_data_to_db(event, event_type, event_id){
    data = {
        "datetime": new Date().toLocaleString(),
        "datetime_int": Date.now(),
        "email": email,
        "page": "/application_insights",
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

function show_trends(new_customers_change, mnp_customers_change, migrations_customers_change){
    var tr = document.getElementById("trend1");
    var lift = document.getElementById("lift1");
    var a = new_customers_change;
    var b=0;
    if(a > b){
        tr. innerHTML = `<i class="bi bi-arrow-up" style="font-size: 1rem; color: green;"></i>`;
        console.log(tr);
        lift.style["color"] = "green";
        console.log("positive", a);
    }
    else if(a < b){
        tr.innerHTML = `<i class="bi bi-arrow-down" style="font-size: 1rem; color: red;"></i>`;
        lift.style["color"] = "red";
        console.log("negative", a)
    }
    else{
    console.log("neutral", a)
    }

    var tr = document.getElementById("trend2");
    var lift = document.getElementById("lift2");
    var a = mnp_customers_change;
    var b=0;
    if(a > b){
        tr. innerHTML = `<i class="bi bi-arrow-up" style="font-size: 1rem; color: green;"></i>`;
        console.log(tr);
        lift.style["color"] = "green";
        console.log("positive", a);
    }
    else if(a < b){
        tr.innerHTML = `<i class="bi bi-arrow-down" style="font-size: 1rem; color: red;"></i>`;
        lift.style["color"] = "red";
        console.log("negative", a)
    }
    else{
    console.log("neutral", a)
    }

    var tr = document.getElementById("trend3");
    var lift = document.getElementById("lift3");
    var a = migrations_customers_change;
    var b=0;
    if(a > b){
        tr. innerHTML = `<i class="bi bi-arrow-up" style="font-size: 1rem; color: green;"></i>`;
        console.log(tr);
        lift.style["color"] = "green";
        console.log("positive", a);
    }
    else if(a < b){
        tr.innerHTML = `<i class="bi bi-arrow-down" style="font-size: 1rem; color: red;"></i>`;
        lift.style["color"] = "red";
        console.log("negative", a)
    }
    else{
    console.log("neutral", a)
    }
}

function create_chart53(month_list, new_customers_monthwise_list, mnp_customers_monthwise_list, migrations_customers_monthwise_list){
    var ctx53 = document.getElementById('Chart53');
        var chart53 = new Chart(ctx53, {
            type: 'bar',
            data: {
                labels: month_list,
                datasets: [
                    {
                        data: new_customers_monthwise_list,
                        label: "New",
                        backgroundColor: '#cceeff',
                        datalabels: {
                            color: "black",
                        }
                    }, 
                    {
                        data: mnp_customers_monthwise_list,
                        label: "MNP",
                        backgroundColor: '#9fdf9f',
                        datalabels: {
                            color: "black",
                        }
                    
                    }, 
                    {
                        data: migrations_customers_monthwise_list,
                        label: "Migration",
                        backgroundColor: '#ffccb3',
                        datalabels: {
                            color: "black",
                        }
                    },
                    
                ]
            },
            options: {
                maintainAspectRatio: false,
                scales: {
                    xAxes:
                    [{
                        stacked: true,  
                        gridLines: {
                            display:false
                        }  
                    }],
                    yAxes: [{
                        stacked: true,  
                        gridLines: {
                            display:false
                        },
                        ticks: {
                            beginAtZero: true,
                            userCallback: function(value, index, values) {
                                return value.toLocaleString();
                            }
                        },
                    }],
                },
                plugins: {
                    datalabels: {
                        formatter: function(value, context) {
                            return value.toLocaleString();
                        }
                    }
                },
            },
        });
}

function create_chart51(){
    var ctx51 = document.getElementById('Chart51');
    const formatter = (value, ctx) => {return value + "%";};
    var chart51 = new Chart(ctx51, {
        type: 'bar',
        data: {
            
            labels: eleven_month_list,
            datasets: [
                {
                    data: females_percentage_list,
                    label: "Female",
                    backgroundColor: "#ff41be",
                    // hoverBackgroundColor: "rgba(199,85,100,1)",
                    datalabels: {
                        color: "white",
                        formatter: formatter,
                    }
                }, 
                {
                    data: males_percentage_list,
                    label: "Male",
                    backgroundColor: '#D3D3D3',
                    // hoverBackgroundColor: "rgba(50,90,100,1)",
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
                xAxes:
                [{
                    stacked: true,  
                    gridLines: {
                        display:false
                    } 
                }],
                yAxes: [{
                    stacked: true,  
                    gridLines: {
                        display:false
                    },
                    ticks: {
                        beginAtZero: true,
                        max: 100,
                        userCallback: function(value, index, values) {
                            return value + "%";
                        }
                    }, 
                }],
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
    });
}

function create_chart52(){
    var ctx52 = document.getElementById('Chart52');
    const formatter = (value, ctx) => {return value + "%";};

    var chart52 = new Chart(ctx52, {
        type: 'bar',
        data: {
            
            labels: eleven_month_list,
            datasets: [
                {
                    data: plus_10_percetage_list,
                    label: "10+",
                    backgroundColor: "#cceeff",
                    // hoverBackgroundColor: "rgba(199,85,100,1)",
                    datalabels: {
                        color: "black",
                        formatter: formatter,
                    }
                }, 
                {
                    data: plus_20_percetage_list,
                    label: "20+",
                    backgroundColor: '#3385ff',
                    // hoverBackgroundColor: "rgba(50,90,100,1)",
                    datalabels: {
                        color: "black",
                        formatter: formatter,
                    }
                }, 
                {
                    data: plus_30_percetage_list,
                    label: "30+",
                    backgroundColor: '#9fdf9f',
                    // hoverBackgroundColor: "rgba(50,90,100,1)",
                    datalabels: {
                        color: "black",
                        formatter: formatter,
                    }
                },
                {
                    data: plus_40_percetage_list,
                    label: "40+",
                    backgroundColor: '#66cc66',
                    // hoverBackgroundColor: "rgba(50,90,100,1)",
                    datalabels: {
                        color: "black",
                        formatter: formatter,
                    }
                },
                {
                    data: plus_50_percetage_list,
                    label: "50+",
                    backgroundColor: '#ffccb3',
                    datalabels: {
                        color: "black",
                        formatter: formatter,
                    }
                },
                {
                    data: plus_60_percetage_list,
                    label: "60+",
                    backgroundColor: '#ff4d4d',
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
                xAxes:
                [{
                    stacked: true,  
                    gridLines: {
                        display:false
                    } 
                }],
                yAxes: [{
                    stacked: true,  
                    gridLines: {
                        display:false
                    },
                    ticks: {
                        beginAtZero: true,
                        max: 100,
                        userCallback: function(value, index, values) {
                            return value + "%";
                        }
                    }, 
                }],
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
    });
}

function get_filters(){
    // var web_filter_btn = document.querySelector("#web_filter");
    // var shop_filter_btn = document.querySelector("#shop_filter");

    if (shop_filter_btn.classList.contains("btn-dark")) 
    {
        filter = "Shop"
    }
    else if (web_filter_btn.classList.contains("btn-dark")){
        filter = "Web"
    }
    else {
        filter = ""
    }
    return filter
}

function apply_filters(){
    var web_filter_btn = document.querySelector("#web_filter");
    var shop_filter_btn = document.querySelector("#shop_filter");
    var clear_filter_btn = document.querySelector("#clear_filter");

    web_filter_btn.onclick = function(){
        console.log("web filter clicked");
        web_filter_btn.classList.add("btn-dark"); 
        web_filter_btn.classList.remove("btn-outline-secondary");

        if (shop_filter_btn.classList.contains("btn-dark")) 
        {
            shop_filter_btn.classList.remove("btn-dark"); 
            shop_filter_btn.classList.add("btn-outline-secondary");
        }

        filter = get_filters();
        console.log(filter);
        filter = {
            "application_channel_filter": filter
        }
        filterData(filter);
    };

    shop_filter_btn.onclick = function(){
        console.log("shop filter clicked");
        shop_filter_btn.classList.add("btn-dark"); 
        shop_filter_btn.classList.remove("btn-outline-secondary");

        if (web_filter_btn.classList.contains("btn-dark")) 
        {
            web_filter_btn.classList.remove("btn-dark"); 
            web_filter_btn.classList.add("btn-outline-secondary");
        }

        filter = get_filters();
        console.log(filter);
        filter = {
            "application_channel_filter": filter
        }
        filterData(filter);
    };

    clear_filter_btn.onclick = function(){
        console.log("clear filter clicked");

        if (web_filter_btn.classList.contains("btn-dark")) 
        {
            web_filter_btn.classList.remove("btn-dark"); 
            web_filter_btn.classList.add("btn-outline-secondary");
        }

        if (shop_filter_btn.classList.contains("btn-dark")) 
        {
            shop_filter_btn.classList.remove("btn-dark"); 
            shop_filter_btn.classList.add("btn-outline-secondary");
        }

        filter = get_filters();
        console.log(filter);
        filter = {
            "application_channel_filter": filter
        }
        filterData(filter);
        
    };
}

function filterData(filters){
    var token = document.getElementsByName('csrfmiddlewaretoken')[0].value;

    console.log("sending post request with filters: ", filters);
    $.ajax({
        method: 'POST',
        headers: {
            "X-CSRFToken": token
        },
        credentials: 'include',
        url: "/filter_application_insights",
        data: filters,
        success: function (filtered_data, textStatus, jqXHR) {
            console.log("Filtered data: ", filtered_data);

            document.getElementById('mnp_customers_current_day').innerText = filtered_data["mnp_customers_current_day"];
            document.getElementById('mnp_customers_last_day').innerText = filtered_data["mnp_customers_last_day"];
            document.getElementById('mnp_customers_change').innerText = filtered_data["mnp_customers_change"] + "%";

            document.getElementById('new_customers_current_day').innerText = filtered_data["new_customers_current_day"];
            document.getElementById('new_customers_last_day').innerText = filtered_data["new_customers_last_day"];
            document.getElementById('new_customers_change').innerText = filtered_data["new_customers_change"] + "%";

            document.getElementById('migrations_customers_current_day').innerText = filtered_data["migrations_customers_current_day"];
            document.getElementById('migrations_customers_last_day').innerText = filtered_data["migrations_customers_last_day"];
            document.getElementById('migrations_customers_change').innerText = filtered_data["migrations_customers_change"] + "%";

            show_trends(filtered_data["new_customers_change"] , filtered_data["mnp_customers_change"], filtered_data["migrations_customers_change"]);

            document.getElementById('chart53_div').innerHTML = '<canvas id="Chart53_filtered"></canvas>';
            month_list = filtered_data["month_list"];
            new_customers_monthwise_list = filtered_data["new_customers_monthwise_list"];
            mnp_customers_monthwise_list = filtered_data["mnp_customers_monthwise_list"];
            migrations_customers_monthwise_list = filtered_data["migrations_customers_monthwise_list"];

            var ctx53 = document.getElementById('Chart53_filtered');
            var chart53 = new Chart(ctx53, {
                type: 'bar',
                data: {
                    labels: month_list,
                    datasets: [
                        {
                            data: new_customers_monthwise_list,
                            label: "New",
                            backgroundColor: '#cceeff',
                            datalabels: {
                                color: "black",
                            }
                        }, 
                        {
                            data: mnp_customers_monthwise_list,
                            label: "MNP",
                            backgroundColor: '#9fdf9f',
                            datalabels: {
                                color: "black",
                            }
                        
                        }, 
                        {
                            data: migrations_customers_monthwise_list,
                            label: "Migration",
                            backgroundColor: '#ffccb3',
                            datalabels: {
                                color: "black",
                            }
                        },
                        
                    ]
                },
                options: {
                    maintainAspectRatio: false,
                    scales: {
                        xAxes:
                        [{
                            stacked: true,  
                            gridLines: {
                                display:false
                            }  
                        }],
                        yAxes: [{
                            stacked: true,  
                            gridLines: {
                                display:false
                            },
                            ticks: {
                                beginAtZero: true,
                                userCallback: function(value, index, values) {
                                    return value.toLocaleString();
                                }
                            },
                        }],
                    },
                    plugins: {
                        datalabels: {
                            formatter: function(value, context) {
                                return value.toLocaleString();
                            }
                        }
                    },
                },
            });
        }
    })
}

function draw_map(){
    var map = L.map('map');
        map.setView([36.4601, 138.8871], 5);

        // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        //     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        // }).addTo(map);

        // L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
        //         attribution : '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        //         noWrap      : true 
        // }).addTo(map);

        // var cartodbAttribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attribution">CARTO</a>';

        // var positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
        //     attribution: cartodbAttribution
        // }).addTo(map);

        var CartoDB_Voyager = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
        }).addTo(map);

        // map.removeLayer(positron);

        var bounds = L.latLngBounds([[25.5, 127], [46, 148]]);
        map.setMaxBounds(bounds);
        map.on('drag', function() {
            map.panInsideBounds(bounds, { animate: true });
        });

        // L.mask([[25.5, 127], [46, 148]]).addTo(map);

        // var japan_json = {{json_data|safe}};
        console.log(japan_json);
        var geojson = L.geoJson(japan_json).addTo(map);

        // get color depending on population density value
        // var map_labels = {{map_labels}}
        function getColor(d) {
            return d > map_labels[6] ? '#b30074' :
                    d > map_labels[5]  ? '#e60095' :
                    d > map_labels[4] ? '#ff1aaf' :
                    d > map_labels[3] ? '#ff41be' :
                    d > map_labels[2]  ? '#ff80d2' :
                    d > map_labels[1]  ? '#ffb3e4' :
                    d > map_labels[0]  ? '#ffe6f6' :
                                'white';
        }

        function style(feature) {
            return {
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '',
                fillOpacity: 0.7,
                fillColor: getColor(feature.properties.act_cust_cnt)
            };
        }

        function highlightFeature(e) {
            var layer = e.target;

            layer.setStyle({
                weight: 1,
                color: '#666',
                dashArray: '',
                fillOpacity: 0.7
            });

            if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                layer.bringToFront();
            }

            info.update(layer.feature.properties);
        }

        var geojson;

        function resetHighlight(e) {
            geojson.resetStyle(e.target);
            info.update();
        }

        function zoomToFeature(e) {
            map.fitBounds(e.target.getBounds());
        }

        function onEachFeature(feature, layer) {
            layer.on({
                mouseover: highlightFeature,
                mouseout: resetHighlight,
                click: zoomToFeature
            });
        }

        geojson = L.geoJson(japan_json, {
            style: style,
            onEachFeature: onEachFeature
        }).addTo(map);

        var info = L.control();

        info.onAdd = function (map) {
            this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
            this.update();
            return this._div;
        };

        // method that we will use to update the control based on feature properties passed
        info.update = function (props) {
            this._div.innerHTML = '<h6>Number of customers</h6>' +  (props ?
                '<b>' + props.NAME +"("+ props.NAME_JP+")" + '</b><br />' + props.act_cust_cnt.toLocaleString() + ' customers'
                : 'Hover over a state');
        };

        info.addTo(map);

        var legend = L.control({position: 'bottomright'});
        legend.onAdd = function (map) {

            var div = L.DomUtil.create('div', 'info legend'),
                grades = [0, map_labels[0], map_labels[1], map_labels[2], map_labels[3], map_labels[4], map_labels[5], map_labels[6]],
                labels = [];

            // loop through our density intervals and generate a label with a colored square for each interval
            for (var i = 0; i < grades.length; i++) {
                if (i==(grades.length - 1)){
                    if (grades[i] > 1000){
                        start_number_string = Math.round(grades[i]/1000) + "K"
                    }
                    else{
                        start_number_string = grades[i];
                    }
                    end_number_string = '+'
                }
                else {
                    if (grades[i] > 1000){
                        start_number_string = Math.round(grades[i]/1000) + "K"
                    }
                    else{
                        start_number_string = grades[i];
                    }

                    if (grades[i+1] > 1000){
                        end_number_string = '&ndash;' + Math.round(grades[i+1]/1000) + "K" + '<br>';
                    }
                    else{
                        end_number_string = '&ndash;' + grades[i + 1] + '<br>';
                    }
                }
                console.log(start_number_string, end_number_string)
                div.innerHTML +=
                    '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
                    start_number_string + end_number_string;
            }

            return div;
        };

        legend.addTo(map);
}