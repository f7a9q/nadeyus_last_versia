function round(num) {
    return Math.round(num * 100.0) / 100.0;
}

function load(){
    //var mb = document.getElementById("clickme");
    //mb.addEventListener("click", hide_callback);
    //mb.param = 'displaytable';

    $.getJSON('https://raw.githubusercontent.com/f7a9q/nadeyus_last_versia/main/routes_output.json', function(routes) {

    var hide_callback_var = document.getElementById("clickme");
    hide_callback_var.addEventListener("click", hide_callback);
    hide_callback_var.param = 'route' + routes[0]._id;
    console.log('route' + routes[0]._id);

    let tr = '';
    for (let i = 0; i < routes.length; i++) {
        var route = routes[i];
        tr += '<div class="table-row">';
            tr += '<div id="route' + route._id + 'class="table">';
                tr += '<div class="table-body">';
                    tr += '<div class="table-row">';
                        tr += '<div class="table-cell">' + route.name + '</div>'
                        tr += '<div class="table-cell">' + route.description + '</div>';
                        tr += '<div class="table-cell">' + round(route.max_a_percentage) + '</div>';
                        tr += '<div class="table-cell">' + round(route.max_b_percentage) + '</div>';
                    tr += '</div>';
                    tr += '<div class="table-row">';
                        tr += '<div id="route_overlap' + route._id + '" class="table">';
                            tr += '<div class="table-body">';
                            for (let j = 0; j < route.route_overlap.length; j++) {
                                var route_overlap = route.route_overlap[j];
                                tr += '<div class="table">';
                                    tr += '<div class="table-body">';
                                        tr += '<div class="table-row">';
                                            tr += '<div class="table-cell">' + route_overlap.name + '</div>';
                                            tr += '<div class="table-cell">' + route_overlap.description + '</div>';
                                            tr += '<div class="table-cell">' + round(route_overlap.a_percentage) + '</div>';
                                            tr += '<div class="table-cell">' + round(route_overlap.b_percentage) + '</div>';
                                        tr += '</div>';
                                        tr += '<div class="table-row">';
                                            tr += '<div id="stops_overlaps' + route._id + '' + route_overlap._id + '" class="placeholder table">';
                                                tr += '<div class="table-body">';
                                                for (let k = 0; false && k < route_overlap.a.length; k++) {
                                                    var a = route_overlap.a[k];
                                                    tr += '<div class="table-row">' + a.percentage + '</div>';
                                                    tr += '<div class="table-row">';
                                                        tr += '<div id="a' + route._id + '' + route_overlap._id + '' + k + '" class="placeholder table">';
                                                            tr += '<div class="table-body">';
                                                            for (let l = 0; l < a.stops.length; l++) {
                                                                tr += '<div class="table-row">' + a.stops[l].name + '</div>';
                                                            }
                                                            tr += '</div>';
                                                        tr += '</div>';
                                                    tr += '</div>';
                                                }
                                                tr += '</div>';
                                            tr += '</div>';
                                        tr += '</div>';
                                    tr += '</div>';
                                tr += '</div>';
                            }
                            tr += '</div>';
                        tr += '</div>';
                    tr += '</div>';
                tr += '</div>';
            tr += '</div>';
        tr += '</div>';
    }
    console.log(tr);
    document.getElementById('routes_table').innerHTML += tr;
    });
}

function hide_callback(evt) {
    var tablewrap = document.getElementById(evt.currentTarget.param);
    tablewrap.classList.toggle('placeholder')
};
