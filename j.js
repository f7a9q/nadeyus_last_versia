function round(num) {
    return Math.round(num * 100.0) / 100.0;
}

var routes;
var routes_sort;
var state;

function load(){
    $.getJSON('https://raw.githubusercontent.com/f7a9q/nadeyus_last_versia/main/routes_output.json', function(routes_loaded) {
        routes = routes_loaded;
        state = 0;
        build_table(routes);
    });
}

function sort_table(sort_method_str) {
    var sort_method = Number(sort_method_str);
    switch (sort_method) {
        case 0:
            if (state == 0){
                console.log("0");
                return;
            }
            state = 0;
            break;
        case 1:
            if (state == 0){
                console.log("1");
                return;
            }
            state = 0;
            break;
        case 2:
            switch (state) {
            case 5:
                state = 6;
                break;
            default:
                state = 5;
                break;
            }
            break;
        case 3:
            switch (state) {
            case 7:
                state = 8;
                break;
            default:
                state = 7;
                break;
            }
            break;
    }
    routes_sort = structuredClone(routes);
    build_table(routes_sort);
}

function sort_max_a_percentage_asc(a, b) {
    if (a.max_a_percentage < b.max_a_percentage)
        return -1;
    if (a.max_a_percentage > b.max_a_percentage)
        return 1;
    return 0;
}

function sort_max_a_percentage_desc(a, b) {
    if (a.max_a_percentage < b.max_a_percentage)
        return 1;
    if (a.max_a_percentage > b.max_a_percentage)
        return -1;
    return 0;
}

function sort_max_b_percentage_asc(a, b) {
    if (a.max_b_percentage < b.max_b_percentage)
        return -1;
    if (a.max_b_percentage > b.max_b_percentage)
        return 1;
    return 0;
}

function sort_max_b_percentage_desc(a, b) {
    if (a.max_b_percentage < b.max_b_percentage)
        return 1;
    if (a.max_b_percentage > b.max_b_percentage)
        return -1;
    return 0;
}

function build_table(routes) {
    switch (state) {
        case 5:
            routes.sort(sort_max_a_percentage_asc);
            break;
        case 6:
            routes.sort(sort_max_a_percentage_desc);
            break;
        case 7:
            routes.sort(sort_max_b_percentage_asc);
            break;
        case 8:
            routes.sort(sort_max_b_percentage_desc);
            break;
    }
    
    var search_phrase = document.getElementById('search-text').value.toLowerCase();
    var ignore_search = $.isEmptyObject(search_phrase);

    let table_text = '';
    table_text += '<tr>';
    table_text += '<td onclick=sort_table("0")>Номер маршрута</td>';
    table_text += '<td onclick=sort_table("1")>Маршрут</td>';
    table_text += '<td onclick=sort_table("2")>Макс % сходства прямого маршрута</td>';
    table_text += '<td onclick=sort_table("3")>Макс % сходства обратного маршрута</td>';
    table_text += '</tr>';
    for (let i = 0; i < routes.length; i++) {
        var route = routes[i];
        if (!ignore_search){
            if (!route.name.toLowerCase().includes(search_phrase)
                && !route.description.toLowerCase().includes(search_phrase)
                && !String(round(route.max_a_percentage)).toLowerCase().includes(search_phrase)
                && !String(round(route.max_b_percentage)).toLowerCase().includes(search_phrase))
                continue;
        }
        
        var has_a = route.max_a_percentage > 0.0;
        var has_b = route.max_b_percentage > 0.0;
        table_text += '<tr id="route' + route._id + '" onclick=hide_callback(this)>';
        table_text += '<td>' + route.name + '</td>';
        table_text += '<td>' + route.description + '</td>';
        if (!has_a && !has_b) {
            table_text += '<td colspan="2">Совпадений нет</td>';
            continue;
        }
        else {
            if (has_a)
                table_text += '<td class="sort_a">' + round(route.max_a_percentage) + '</td>'
            else
                table_text += '<td>Совпадений нет</td>';

            if (has_b)
                table_text += '<td class="sort_b">' + round(route.max_b_percentage) + '</td>'
            else
                table_text += '<td>Совпадений нет</td>';
        }
        table_text += '</tr>';
        table_text += '<tr id="route' + route._id + 'hideable" class="hideable">';
        table_text += '<td colspan="4">';
        table_text += '<table class="table-wrapper" cellspacing="0" border="1" cellpadding="5">';
        table_text += '<tr>';
        table_text += '<td>Номер маршрута</td>';
        table_text += '<td>Маршрут</td>';
        if (has_b) {
            table_text += '<td>% сходства прямого маршрута</td>';
            table_text += '<td>% сходства обратного маршрута</td>';
        }
        else
            table_text += '<td>% сходства маршрута</td>';
        table_text += '</tr>';
        for (let j = 0; j < route.route_overlap.length; j++) {
            var route_overlap = route.route_overlap[j];
            var has_a_overlap = route_overlap.a_percentage > 0.0;
            var has_b_overlap = route_overlap.b_percentage > 0.0;
            table_text += '<tr id="route_overlap' + route._id + '' + route_overlap._id + '" onclick=hide_callback(this)>';
            table_text += '<td>' + route_overlap.name + '</td>';
            table_text += '<td>' + route_overlap.description + '</td>';
            table_text += '<td>' + round(route_overlap.a_percentage) + '</td>'
            if (has_b)
                if (has_b_overlap)
                    table_text += '<td>' + round(route_overlap.b_percentage) + '</td>'
                else
                    table_text += '<td>Совпадений нет</td>';
            table_text += '</tr>';

            if (!has_a && !has_b)
                continue;

            table_text += '<tr id="route_overlap' + route._id + '' + route_overlap._id + 'hideable" class="hideable">';
            table_text += '<td colspan="4">';
            for (let k = 0; k < route_overlap.a.length; k++) {
                var a = route_overlap.a[k];
                table_text += '<table class="table-wrapper" cellspacing="0" border="1" cellpadding="5">';
                table_text += '<tr id="a' + route._id + '' + route_overlap._id + 'overlap' + k + '/' + a.stops.length + '" onclick=hide_callback_count(this)><td colspan="4">';
                if (has_b_overlap)
                    table_text += 'Прямой маршрут. Участок ' + (k + 1) + '. Процент совпадения участка: ';
                else
                    table_text += 'Участок ' + (k + 1) + '. Процент совпадения участка: ';
                table_text += round(a.percentage);
                table_text += '</td></tr>';
                for (let l = 0; l < a.stops.length; l++) {
                    table_text += '<tr id="a' + route._id + '' + route_overlap._id + 'overlap' + k + 'hideable' + l + '" class="hideable"><td colspan="4">';
                    table_text += a.stops[l].name;
                    table_text += '</td></tr>';
                }
                table_text += '</table>';
            }

            for (let k = 0; k < route_overlap.b.length; k++) {
                var b = route_overlap.b[k];
                table_text += '<table class="table-wrapper" cellspacing="0" border="1" cellpadding="5">';
                table_text += '<tr id="b' + route._id + '' + route_overlap._id + 'overlap' + k + '/' + b.stops.length + '" onclick=hide_callback_count(this)><td colspan="4">';
                table_text += 'Обратный маршрут. Участок ' + (k + 1) + '. Процент совпадения участка: ';
                table_text += round(b.percentage);
                table_text += '</td></tr>';
                for (let l = 0; l < b.stops.length; l++) {
                    table_text += '<tr id="b' + route._id + '' + route_overlap._id + 'overlap' + k + 'hideable' + l + '" class="hideable"><td colspan="4">';
                    table_text += b.stops[l].name;
                    table_text += '</td></tr>';
                }
                table_text += '</table>';
            }
            table_text += '</td>';
            table_text += '</tr>';
        }
        table_text += '</table>';
        table_text += '</td>';
        table_text += '</tr>';
    }
    document.getElementById('routes_table').innerHTML = table_text;
}

function hide_callback(evt) {
    var tablewrap = document.getElementById(evt.id + 'hideable');
    tablewrap.classList.toggle('hideable')
};

function hide_callback_count(evt) {
    var id = evt.id.split('/')[0];
    var count = Number(evt.id.split('/')[1]);
    for (let i = 0; i < count; i++){
        var tablewrap = document.getElementById(id + 'hideable' + i);
        tablewrap.classList.toggle('hideable')
    }
};

function searchTable() {
    routes_sort = structuredClone(routes);
    build_table(routes_sort);
}
