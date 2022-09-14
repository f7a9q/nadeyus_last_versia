async function load_data() {
    let url = 'https://raw.githubusercontent.com/f7a9q/nadeyus_last_versia/main/routes_output.json';
    return await (await fetch(url)).json();
}
function load(){
    var mb = document.getElementById("clickme");
    mb.addEventListener("click", myfunction);

    load_data().then(routes => {
    console.log('sckdck '+routes.length);
    for (let i = 0; i < routes.length; i++) {
        let route = routes[i];
        let tr = '<tr>';
        tr += '<td>' + route.name + '</td>';
        tr += '<td>' + route.description + '</td>';
        tr += '<td>' + route.max_a_percentage + '</td>';
        tr += '<td>' + route.max_b_percentage + '</td>';
        tr += '</tr>';
        tr += '<tr>';
        tr += '<div id="route' + route._id + '" class="placeholder"><table>';
        for (let j = 0; j < route.route_overlap.length; j++) {
            let route_overlap = route.route_overlap[j];
            tr += '<tr>';
            tr += '<td>' + route.name + '</td>';
            tr += '<td>' + route.description + '</td>';
            tr += '<td>' + route.a_percentage + '</td>';
            tr += '<td>' + route.b_percentage + '</td>';
            tr += '</tr>';
            tr += '<tr>';
            tr += '<div id="route_overlap' + route._id + '' + route_overlap._id + '" class="placeholder"><table>';
            for (let k = 0; k < route_overlap.a.length; k++) {
                let a = route_overlap.a[k];
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
        painting.querySelector('tbody').innerHTML = tr;
        //('#painting > tbody tr:last-child').append(tr);
    }
    });
}

function myfunction() {
    var tablewrap = document.getElementById('displaytable');
    tablewrap.classList.toggle('placeholder')
};
