var new_addon_domains = ['localhost', 'icelink.fm', '*.icelink.fm', 'frozenmountain.com', '*.frozenmountain.com'];

var addon_domains = [];
var allowed_domains_pref = 'media.getusermedia.screensharing.allowed_domains';
var enable_screensharing_pref = 'media.getusermedia.screensharing.enabled';

function startup(data, reason) {
    if (reason === APP_STARTUP) {
        return;
    }
    
    var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
    var values = prefs.getCharPref(allowed_domains_pref).split(',');
    
    for (var i = 0; i < new_addon_domains.length; i++) {
        var domain = new_addon_domains[i];
        if (values.indexOf(domain) === -1) {
            values.push(domain);
            addon_domains.push(domain);
        }
    }
    
    if (prefs.getBoolPref(enable_screensharing_pref) == false) {
        prefs.setBoolPref(enable_screensharing_pref, 1);
    }
    prefs.setCharPref(allowed_domains_pref, values.join(','));
}

function shutdown(data, reason) {
    if (reason === APP_SHUTDOWN) {
        return;
    }
    
    var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
    var values = prefs.getCharPref(allowed_domains_pref).split(',');
    
    values = values.filter(function(value)
    {
        return addon_domains.indexOf(value) === -1;
    });
    
    prefs.setCharPref(allowed_domains_pref, values.join(','));
}

function install(data, reason) { }

function uninstall(data, reason) { }
