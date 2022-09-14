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
        tr += '<tr>';
        tr += '<td>' + route.name + '</td>';
        tr += '<td>' + route.description + '</td>';
        tr += '<td>' + (Math.round(route.max_a_percentage * 100.00) / 100.00) + '</td>';
        tr += '<td>' + (Math.round(route.max_b_percentage * 100.00) / 100.00) + '</td>';
        tr += '</tr>';
        tr += '<tr>';
        tr += '<div id="route' + route._id + '" class="placeholder"><table>';
        for (let j = 0; j < route.route_overlap.length; j++) {
            var route_overlap = route.route_overlap[j];
            tr += '<tr>';
            tr += '<td>' + route_overlap.name + '</td>';
            tr += '<td>' + route_overlap.description + '</td>';
            tr += '<td>' + route_overlap.a_percentage + '</td>';
            tr += '<td>' + route_overlap.b_percentage + '</td>';
            tr += '</tr>';
            tr += '<tr>';
            tr += '<div id="route_overlap' + route._id + '' + route_overlap._id + '" class="placeholder"><table>';
            for (let k = 0; false && k < route_overlap.a.length; k++) {
                var a = route_overlap.a[k];
                tr += '<tr>' + a.percentage + '</tr>';
                tr += '<tr>';
                tr += '<div id="a' + route._id + '' + route_overlap._id + '' + k + '" class="placeholder"><table>';
                for (let l = 0; l < a.stops.length; l++) {
                    tr += '<tr>' + a.stops[l].name + '</tr>';
                }
                tr += '</table></div>';
                tr += '</tr>';
            }
            tr += '</table></div>';
            tr += '</tr>';
        }
        tr += '</table></div>';
        tr += '</tr>';
    }
    console.log(tr);
    routes_table.querySelector('tbody').innerHTML = tr;
    });
}

function hide_callback(evt) {
    var tablewrap = document.getElementById(evt.currentTarget.param);
    tablewrap.classList.toggle('placeholder')
};
