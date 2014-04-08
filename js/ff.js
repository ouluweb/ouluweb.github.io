function addEvent(evnt, elem, func) {
    if (elem.addEventListener)  // W3C DOM
        elem.addEventListener(evnt,func,false);
    else if (elem.attachEvent) { // IE DOM
        elem.attachEvent("on"+evnt, func);
    }
    else { // No much to do
        elem[evnt] = func;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var d = document,
    parse_datetime = function(str) {
        var tmp = str.split(" ",2);
        if(tmp.length === 2)
            {
                var date_str = tmp[0].split("."),
                    time_str = tmp[1].split(":");
                return new Date( date_str[2], date_str[1]-1, date_str[0], time_str[0], time_str[1]);
            }
            return new Date();
    },
    calculate_distance = function(to_date) {
        var now = new Date(),
            dist = next_event - now;

        return {
            days: Math.floor((dist) / (1000*60*60*24)),
            hours: Math.floor((dist) / (1000*60*60)) % 24,
            minutes: Math.floor((dist) / (1000*60)) % 60
        };
    },
    set_text_for_node = function(text, node) {
        if(node.innerText) {
            node.innerText = text;
        } else {
            node.textContent = text;
        }
    },
    set_countdown_label = function(val, node) {
        var label = "";
        if(val.days > 0)
            label += val.days+"d ";
        if(val.hours > 0)
            label += val.hours+"h ";
        label += val.minutes+"m";
        set_text_for_node(label, node);
    },
    human_time = d.getElementById('meetup-time').getAttribute('data-time'),
    next_event = parse_datetime(human_time),
    countdown_node = d.getElementById('meetup-countdown');
    //next_event = parse_datetime( $('.next-event time').text() ),
    //countdown_node = $('.next-event .countdown');

    if( calculate_distance(next_event).days >= 0 ) {
        set_countdown_label(calculate_distance( next_event ), countdown_node);
        setInterval( function() {
            set_countdown_label(calculate_distance( next_event ), countdown_node);
        }, 1000*30);
    }

    addEvent('mouseover', countdown_node, function() {
      set_text_for_node(human_time, countdown_node);
    }, false);

});


var player = document.getElementById('player');
new MediaElement(player, { success : function (media) {
    //media.play();
}});
