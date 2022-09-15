function round(num) {
    return Math.round(num * 100.0) / 100.0;
}

function load(){
    $.getJSON('https://raw.githubusercontent.com/f7a9q/nadeyus_last_versia/main/routes_output.json', function(routes) {
    let table_text = '';
    table_text += '<tr>';
    table_text += '<td class="lbl">Номер маршрута</td>';
    table_text += '<td class="lbl">Маршрут</td>';
    table_text += '<td class="lbl">Макс % сходства прямого маршрута</td>';
    table_text += '<td class="lbl">Макс % сходства обратного маршрута</td>';
    table_text += '</tr>';
    for (let i = 0; i < routes.length; i++) {
        var route = routes[i];
        var has_a = route.max_a_percentage > 0.0;
        var has_b = route.max_b_percentage > 0.0;
        table_text += '<tr id="route' + route._id + '" onclick=hide_callback(this)>';
        table_text += '<td>' + route.name + '</td>';
        table_text += '<td>' + route.description + '</td>';
        if (!has_a && !has_b) {
            table_text += '<td colspan="2">Совпадений нет</td>';
        }
        else {
            if (has_a)
                table_text += '<td>' + round(route.max_a_percentage) + '</td>'
            else
                table_text += '<td>Совпадений нет</td>';

            if (has_b)
                table_text += '<td>' + round(route.max_b_percentage) + '</td>'
            else
                table_text += '<td>Совпадений нет</td>';
        }
        table_text += '</tr>';
        table_text += '<tr id="route' + route._id + 'hideable" class="hideable">';
        table_text += '<td colspan="4">';
        table_text += '<table class="table-wrapper" cellspacing="0" border="1" cellpadding="5">';
        table_text += '<tr>';
        table_text += '<td class="lbl">Номер маршрута</td>';
        table_text += '<td class="lbl">Маршрут</td>';
        table_text += '<td class="lbl">% сходства прямого маршрута</td>';
        table_text += '<td class="lbl">% сходства обратного маршрута</td>';
        table_text += '</tr>';
        for (let j = 0; j < route.route_overlap.length; j++) {
            var route_overlap = route.route_overlap[j];
            table_text += '<tr id="route_overlap' + route._id + '' + route_overlap._id + '" onclick=hide_callback(this)>';
            table_text += '<td>' + route_overlap.name + '</td>';
            table_text += '<td>' + route_overlap.description + '</td>';
            table_text += '<td>' + round(route_overlap.a_percentage) + '</td>'
            table_text += '<td>' + round( route_overlap.b_percentage) + '</td>'
            table_text += '</tr>';

            if (!has_a && !has_b)
                continue;

            table_text += '<tr id="route_overlap' + route._id + '' + route_overlap._id + 'hideable" class="hideable">';
            table_text += '<td colspan="4">';
            for (let k = 0; k < route_overlap.a.length; k++) {
                var a = route_overlap.a[k];
                table_text += '<table class="table-wrapper" cellspacing="0" border="1" cellpadding="5">';
                table_text += '<tr id="a' + route._id + '' + route_overlap._id + 'overlap' + k + '/' + a.stops.length + '" onclick=hide_callback_count(this)><td colspan="4">';
                table_text += 'Прямой маршрут. Участок ' + (k + 1) + '. Процент совпадения: ';
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
                table_text += 'Обратный маршрут. Участок ' + (k + 1) + '. Процент совпадения: ';
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
    });
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
    var phrase = document.getElementById('search-text');
    var table = document.getElementById("routes_table");
    var regPhrase = new RegExp(phrase.value, 'i');
    var flag = false;
    for (var i = 1; i < table.rows.length; i++) {
        flag = false;
        for (var j = table.rows[i].cells.length - 1; j >= 0; j--) {
            flag = regPhrase.test(table.rows[i].cells[j].innerHTML);
            if (flag) break;
        }
        if (flag) {
            table.rows[i].style.display = "";

        } else {
            table.rows[i].style.display = "none";
        }

    }
}
