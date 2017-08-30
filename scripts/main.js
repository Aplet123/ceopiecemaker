var CUSTOM = 0;
if (window.location.search && URLSearchParams) {
    var qS = new URLSearchParams(window.location.search);
    if (qS.has("q")) $("#code").val(qS.get("q"));
    if (qS.has("c")) {
        var i;
        for (i = 17; i <= +qS.get("c"); i++) {
            MOVES.push({
                "name": "custom" + i,
                "id": "c" + i,
                "text": "Custom action " + i + " (Double Click Menu Icon to Edit)",
                "color": [108, 108, 25],
                "content": "0"
            });
            if (i == 32 && i != +qS.get("c")) {
                alert("Requested number of custom squares too large.\nYou're probably StratShotPlayer\nCutting off at 32.");
                i++;
                break;
            }
        }
        CUSTOM = i - 1;
    }
}

var SMOVE = {},
    SLEVEL = [],
    IMOVE = [];
// Reversing them helps prevent forEach f***ing up

// Allow lookup by name of #
_.forEach(MOVES, function(m, ix) {
    SMOVE[m.name] = ix;
    IMOVE[m.id] = ix;
});
// We should get one for LEVELS too, indexOf 2expensiveplznerf
_.forEach(LEVELS, function(m, ix) {
    SLEVEL[m] = ix;
});

// Create stylesheet element
var style = document.createElement("style");
$("#style").append(style);

if (!(CSS && CSS.escape)) var CSS = { escape: a => a.replace(/"/g, "\\\"") };

function createColors(m) {
   var tintColor = [];
   for (var n = 0; n < 3; n ++) {
      tintColor[n] = Math.floor((255 - (m.color || [0, 0, 0])[n]) / 2 + (m.color || [0, 0, 0])[n]);
   }
   return [m.color || [0, 0, 0], m.color2 || tintColor || [255, 255, 255], m.color3 || m.color || [0, 0, 0]];
}

//makeRule function: i think it's useful
function makeRule(m) {
    var rule = ".", usedColors = createColors(m);
    rule += m.name;
    rule += "::before{";
    rule += "border:2px solid rgb(" + usedColors[0] + ");";
    rule += "background:rgb(" + usedColors[1] + ");";
    rule += "color:rgb(" + usedColors[2] + ");";
    rule += "content:\"" + (m.content ? CSS.escape(m.content) : "") + "\";";
    rule += "}";
    return rule;
}

// Apply each move to style
//MOVES.forEach(function (m) { //tony2 you are really lazy
for (var i = 0; i < MOVES.length; i++) { //there
    style.sheet.insertRule(makeRule(MOVES[i]), i);
}
document.styleSheets[1] = style;

// Define <li> for each move
for (var i = 0; i < MOVES.length; i++) {
    var className = MOVES[i].name;
    if (className.startsWith("custom")) className += " custom";
    if (MOVES[i].hide) className += " hide";
    $(".moves").append("<li class=\"" + className + "\" data-description=\"" + MOVES[i].text + "\"></li>\n");
    //$("#moves").append("<li class=\""+className+"\">"+MOVES[i].text+"</li>\n");
}
// $(".moves .custom").prop("contenteditable", true); //let's not :v
$("#shactive").click(function() {
    if (this.innerHTML.match(/Show/ig)) { $("#action").addClass("show");
        $(this).text($(this).text().replace(/Show/ig, "Hide")); } else { $("#action").removeClass("show");
        $(this).text($(this).text().replace(/Hide/ig, "Show")); }
});

// Current tool
var ACTION;

function setAction(action) {
    $("#action ." + ACTION).removeClass("active");
    $("#action ." + action).addClass("active");
    ACTION = action;
}
$("#action li").click(function() {
    if (ACTION == this.classList[0]) return;
    setAction(this.classList[0]); // ensure we get customN not custom
});
setAction("moveattack");

//Doubleclick custom to edit
$("#action li.custom").on("dblclick taphold", function() { alert("fuck of james"); /*cusLoadEdit(this.classList[0]);*/ });

function cusLoadEdit(moves) {
    //declare every parameter because lolfunctions

    var elm, text, tent, c11, c12, c13, c21, c22, c23, c31, c32, c33, cid = MOVES[SMOVE[moves]].id;
    //Load every parameters
    cusLoadCustom(moves);

    function cusLoadCustom(moves) {
        elm = MOVES[SMOVE[moves]];
        text = $("#text").val(elm.text);
        tent = $("#content").val(elm.content);
        c11 = $("#color11").val(elm.color[0]);
        c12 = $("#color12").val(elm.color[1]);
        c13 = $("#color13").val(elm.color[2]);
        c21 = $("#color21").val(elm.color2 ? elm.color2[0] : Math.floor((255 - elm.color[0]) / 2 + elm.color[0]));
        c22 = $("#color22").val(elm.color2 ? elm.color2[1] : Math.floor((255 - elm.color[1]) / 2 + elm.color[1]));
        c23 = $("#color23").val(elm.color2 ? elm.color2[2] : Math.floor((255 - elm.color[2]) / 2 + elm.color[2]));
        c31 = $("#color31").val(elm.color3 ? elm.color3[0] : elm.color[0]);
        c32 = $("#color32").val(elm.color3 ? elm.color3[1] : elm.color[1]);
        c33 = $("#color33").val(elm.color3 ? elm.color3[2] : elm.color[2]);
        //Update
        $("[type=checkbox]").prop("checked", false); //uncheck boxes
        $(".cusmodal input").prop("disabled", false); //undisable inputs
        $(".giant").text(tent.val()); //update content
        $(".giant").css("border-color", "rgb(" + c11.val() + "," + c12.val() + "," + c13.val() + ")"); //update c1
        $(".giant").css("background", "rgb(" + c21.val() + "," + c22.val() + "," + c23.val() + ")"); //update c2
        $(".giant").css("color", "rgb(" + c31.val() + "," + c32.val() + "," + c33.val() + ")"); //update c3
    }

    //Load actual menu
    $(".modalwrapper").show();

    $(".cusmodal input").bind("mouseup keyup", function() {
        if ($(this)[0].id.startsWith("color") && $(this).val() === "") {
            $(this).val("0");
        }
        if ($(this)[0].id.startsWith("color1")) {
            $(".giant").css("border-color", "rgb(" + c11.val() + "," + c12.val() + "," + c13.val() + ")"); //update c1
            var cur = parseInt($(this).val(), 10);
            if ($("#colour2")[0].checked) {
                $("#color2" + $(this)[0].id.slice(-1)).val(Math.floor((255 - cur) / 2 + cur));
                $("#color2" + $(this)[0].id.slice(-1)).keyup();
            }
            if ($("#colour3")[0].checked) {
                $("#color3" + $(this)[0].id.slice(-1)).val(cur);
                $("#color3" + $(this)[0].id.slice(-1)).keyup();
            }
        }
        if ($(this)[0].id.startsWith("color2")) {
            $(".giant").css("background", "rgb(" + c21.val() + "," + c22.val() + "," + c23.val() + ")"); //update c2
        }
        if ($(this)[0].id.startsWith("color3")) {
            $(".giant").css("color", "rgb(" + c31.val() + "," + c32.val() + "," + c33.val() + ")"); //update c3
        }
        if ($(this)[0].id.startsWith("colour")) {
            $("[id^=color" + $(this)[0].id.slice(-1) + "]").prop("disabled", !this.checked);
            if (!this.checked) {
                this.checked = true;
                $("[id^=color1]").keyup();
                this.checked = false;
            }
        }
        if ($(this)[0].id == "content") {
            $(".giant").text(tent.val());
        }
        if ($(this)[0].id == "unicode") {
            var cur = $(this).val(),
                res = cur.match(/[0-9A-F]{4,5}/i); //console.log(res);
            if (res && res[0] == cur) $("#uniprev").html(String.fromCodePoint(parseInt(cur, 16)));
        }
    });
    $(".cusmodal #uniprev").click(function() {
        $("#content").val($("#content").val() + $(this).html()).keyup();
    })
    $(".cusmodal .moves li").click(function() { cusLoadCustom(this.classList[0]); });
    $(".cusmodal #menuclose").one("click", function() {
        var jsn = {
            name: moves,
            id: cid,
            text: text.val(),
            color: [parseInt(c11.val(), 10), parseInt(c12.val(), 10), parseInt(c13.val(), 10)],
            color2: [parseInt(c21.val(), 10), parseInt(c22.val(), 10), parseInt(c23.val(), 10)],
            color3: [parseInt(c31.val(), 10), parseInt(c32.val(), 10), parseInt(c33.val(), 10)],
            content: tent.val(),
        };
        $(".cusmodal input").off("click keyup");
        $(".cusmodal .moves li").off("click"); //prevent overloading
        $(".cusmodal #uniprev").off("click");
        //update everything
        DATA.custom = DATA.custom || {}; //create custom if it doesn"t exist
        DATA.custom[cid] = jsn; //DATAbase for saving
        MOVES[SMOVE[moves]] = jsn; //I dunno
        style.sheet.deleteRule(SMOVE[moves]);
        style.sheet.insertRule(makeRule(MOVES[SMOVE[moves]]), SMOVE[moves]); //Reapply css
        document.styleSheets[1] = style;
        $(".moves ." + moves).attr("data-description", MOVES[SMOVE[moves]].text);
        //Hide actual menu
        $(".modalwrapper").hide();
        setAction(moves); //to actually use it
    });
}
$("#hidebutton").click(function(e) {
    $("#controls").toggleClass("slide");
    if ($("#controls").is(".slide")) {
        $("#controls").css("right", (10 - $("#controls").width()) + "px");
    } else {
        $("#controls").css("right", 0);
    }
});

/* not vanilla jq
$("#controls").swipeleft(function(){
   if($("controls").is(".slide"))return;
   $("#hidebutton").click();
});
$("#controls").swiperight(function(){
   if(!$("controls").is(".slide"))return;
   $("#hidebutton").click();
})
//*/

// Function by PaulIrish in https://www.broken-links.com/2009/01/20/very-quick-equal-height-columns-in-jquery/#comment-23624
$.fn.syncHeight = function() {
    return this.height(Math.max.apply(this, $.map(this, function(e) { return $(e).height(); })));
};

$(".WARN").remove();
$(".cusmodal").syncHeight();
$(".modalwrapper").hide();

$(window).resize(function() { $(".cusmodal").syncHeight; });

// Define <li? for each passive
var $passives = $("#passives");
var curPASSIVE = "base";
_.forEach(PASSIVES, function(p) {
    $passives.append("<li>" + p + "</li>");
});
// set target for all passizves
$("section .passives").focus(function() {
    curPASSIVE = level(this);
});
$("#passives li:not([id])").click(function() {
    var text = this.innerText || "";
    appendPassive(text);
});
$("#ctrlclear").click(function() {
    $("div.passives").text("").keyup();
});

function appendPassive(text) {
    var oldtext = $("#" + curPASSIVE + " .passives").attr("data-description") && $("#" + curPASSIVE + " .passives").attr("data-description").concat("\n") || "";
    $("#" + curPASSIVE + " .passives").text(oldtext + text);
    setPassive(oldtext + text, curPASSIVE);
}

function setPassive(text, level) {
    var old = $("#" + level + " .passives").attr("data-raw");
    text = cleanseText(text);
    $("#" + level + " .passives").attr("data-description", parseText(text, level)).attr("data-raw", text);
    DATA[level].passives = text;
    if (level != curPASSIVE)
        $("#" + level + " .passives").text(DATA[level].passives);
    if ((level = nextLevel(level)) && old == $("#" + level + " .passives").attr("data-raw"))
        setPassive(text, level);
}
$("div.passives").keyup(function() {
    if (this.innerHTML == "<br>") this.innerHTML = "";
    setPassive(this.innerHTML, curPASSIVE);
});

function parseText(text, i) {
    i = SLEVEL[i];
    text = text.replace(/<(br|div)>/g, "\n").replace(/<\/div>/g, "");
    text = text.replace(/\[\+\]/g, "+".repeat(i));
    text = text.replace(/(\-?\d+)\[(\+\d+|\-\d+)\]/g, function(a, b, c) { return Number(b) + Number(c) * i; });
    text = text.replace(/&gt;/g, ">").replace(/&lt;/g, "<");
    return text;
}

function cleanseText(text) { //To remove dumb Chrome rules on linebreaking and then some
    text = text.replace(/<div><br><\/div>/g, "\n").replace(/<(br|div)>/g, "\n").replace(/<\/div>/g, "");
    //rip readability, blame chrome. if this happens again, I'm gonna use the "Switch to Firefox" card.
    return text;
}

// Piece data to be saved/restored
var DATA = {
    name: "PieceName",
    labels: { rank: "Minion", faction: "Basic", rarity: "Common" },
    base: {
        cost: 1,
        moves: {},
    },
    plus: {
        cost: 2,
        moves: {},
    },
    plusplus: {
        cost: 3,
        moves: {},
    },
    plusplusplus: {
        cost: 4,
        moves: {},
    },
    custom: {}
};

// Clear background
var sketch = $("#c").sketch().sketch();

function pos(td) {
    var tr = td.parentNode,
        c = 0,
        r = 0;
    while (td = td.previousSibling) c++;
    while (tr = tr.previousSibling) r++;
    return [r, c];
}

function td(level, pos) {
    var tr = $("#" + level + " tr")[+pos[0]];
    return tr.childNodes[+pos[1]];
}

function count(level, cell) {
    if (cell.className === "") return;
    var cid = MOVES[SMOVE[cell.className]].id;
    if (DATA[level].moves[cid]) setDisplay(level, cell.className);
    else removeDisplay(level, cell.className);
}

function setMove(level, cell, cls) {
    var old = cell.className,
        oid = old === "" ? "" : MOVES[SMOVE[old]].id,
        cid = cls === "" ? "" : MOVES[SMOVE[cls]].id;
    var p = pos(cell);
    if (old !== "") DATA[level].moves[oid] = DATA[level].moves[oid].replace(new RegExp(p[0].toString(16) + p[1].toString(16) + "(?=(..)*$)", "g"), "");
    if (DATA[level].moves[oid] === "") delete DATA[level].moves[oid];
    count(level, cell);
    cell.className = cls;
    if (cls !== "") DATA[level].moves[cid] = DATA[level].moves[cid] ? DATA[level].moves[cid] + p[0].toString(16) + p[1].toString(16) : p[0].toString(16) + p[1].toString(16);
    count(level, cell);

    // Apply move to subsequent level
    if (level = nextLevel(level)) {
        cell = td(level, p);
        if (cell.className == old) {
            setMove(level, cell, cls);
        }
    }
}

function setDisplay(level, cls) {
    DATA[level].moves[MOVES[SMOVE[cls]].id] = DATA[level].moves[MOVES[SMOVE[cls]].id] || "";
    $("#" + level + " .moves li." + cls).css("display", "block");
}

function removeDisplay(level, cls) {
    $("#" + level + " .moves li." + cls).css("display", "none");
}

function nextLevel(level) {
    return LEVELS[SLEVEL[level] + 1];
}

function level(el) {
    return $(el).closest("section").attr("id");
}

function getPos(el, level) {
    var i = $("#" + level + " td").index(el);
    return { x: i % 15 - 7, y: ~~(i / 15) - 7 };
}

function redPos(v) {
    var g = gcd(v.x, v.y);
    return { x: v.x / g, y: v.y / g };
}

function gcd(x, y) {
    return y ? gcd(y, x % y) : Math.abs(x);
}

function setPos(v, level) {
    return $("#" + level + " td")[(v.x + 7) + (v.y + 7) * 15];
}

function outBoard(v) {
    return Math.abs(v.x) > 7 || Math.abs(v.y) > 7;
}

function Mark(el) {
    $(el).addClass("mark");
}

var mouse = {};
var moose = { click: 0 };
var COLOR = ACTION;
$("td.piece").mousedown(function() {
    moose.click++;
    clearTimeout(moose.reset);
    moose.reset = setTimeout(function() { moose.click = 0; }, 300);
    if (moose.click == 2) return mouse.dbl = level(this);
    else if (moose.click == 1) return mouse.line = level(this);
});
$("td").mouseover(function() {
    if (this.className == "piece") return;
    //NOTE: If this somehow backfires and ends up causing heavy lag like sketch.js does, BLAME MAIN_GI.
    var s, v;
    $(".mark").removeClass("mark");
    return ;
    if (mouse.dbl == level(this)) {
        s = getPos(this, level(this));
        v = s;
        do {
            Mark(setPos(v, level(this)));
        } while (!outBoard(v = { x: v.x + s.x, y: v.y + s.y }));
    } else if (mouse.line == level(this)) {
        v = getPos(this, level(this));
        s = redPos(v);
        do {
            Mark(setPos(v, level(this)));
        } while ((v.x -= s.x) | (v.y -= s.y));
    } else if (mouse.down == level(this))
        setMove(level(this), this, COLOR);
});
$("td").mousedown(function(e) {
    COLOR = ACTION;
    e.preventDefault();
    if (this.className == "piece") return false;
    if (this.className == ACTION || e.which == 3) COLOR = "";
    dirty();
    if(Math.random()<0.2) setMove(level(this), this, COLOR);
    mouse.down = level(this); //Drag Mode
});

$("td").mouseup(function() {
    $(".mark").removeClass("mark"); //They were cancer and will remain_gi to be.
    var s, v;
    if (mouse.dbl == level(this)) {
        if (this.className == "piece") return setDisplay(level(this), ACTION);
        s = getPos(this, level(this));
        v = s;
        do {
            setMove(level(this), setPos(v, level(this)), ACTION);
        } while (!outBoard(v = { x: v.x + s.x, y: v.y + s.y }));
    } else if (mouse.line == level(this)) {
        if (this.className == "piece") return $(document).trigger("mouseup");
        v = getPos(this, level(this));
        s = redPos(v);
        do {
            setMove(level(this), setPos(v, level(this)), ACTION);
        } while ((v.x -= s.x) | (v.y -= s.y));
    }
});

$(document).mouseup(function() {
    mouse = {};
    COLOR = ACTION;
});

$("td").contextmenu(function(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
}); //suggestion by main_gi

// Set up drawing on first canvas. When the drawing pauses, draw a copy to the upgraded canvases
// with their own shadows. Updated to cope with Un/Re/Clear options
function mirrorImage() {
    $(".mirror").each(function() {
        var mi = this.getContext("2d");
        mi.clearRect(0, 0, this.width, this.height);
        mi.shadowBlur = 10;
        mi.shadowColor = $(this).attr("data-shadow");
        mi.drawImage(c, 0, 0, this.width, this.height);
    });
}

$("#c").on("draw", function() {
    view.update();
    mirrorImage();
    saveImage();
});

// Show description on mouseover of functions
$("[mode=tools] a").mouseover(function() { $("#toolinfo").text(TOOLTIPS[this.id]); });

// When the name changes, update the other names.
$("#name").keyup(function() {
    alert("NIO!");
});

function deltaCost(level, delta) {
    DATA[level].cost += delta;
    $("#" + level + " input").val(DATA[level].cost);
    // Apply move to subsequent level
    if (level = nextLevel(level)) deltaCost(level, delta);
}
$(".cost input").on("keyup mouseup", function() {
    var lv = level(this);
    deltaCost(lv, (+this.value) - DATA[lv].cost);
});
$("input[type=number]").on("wheel", function(e) { e.preventDefault(); }); //Lazy approach to support edge cases: Remove them :D

//Toggle labels
$(".info span").click(function() {
    var labels = LABELS[this.className],
        ix = labels.indexOf(this.innerText);
    ix += 1;
    ix %= labels.length;
    $(".info span." + this.className).text(labels[ix]);
    DATA.labels[this.className] = labels[ix];
});

// Tabs
$("#controls > nav > a").click(function() {
    document.body.setAttribute("mode", this.getAttribute("mode"));
});

// local preview -- hack for offline versions (forgive meh)
function screensave() {
    $("#saveimage").prop("disabled", true).text("Saving");

    var ugh = setTimeout(function() { $("#saveimage").text("Something's not quite right..."); }, 20000); //For lulz

    var $b = $("#boards").clone();
    // Insert all available color codes
    _.forEach(Array.prototype.slice.call(style.sheet.cssRules), function(item) { $b.find("#style style")[0].innerHTML += item.cssText; });
    // remove controls
    $b.find("#controls").remove();

    // replace canvas with image; put correct number in for cost (using input not working)
    _.forEach(LEVELS, function(level) {
        var c = $("#" + level + " canvas")[0];
        $b.find("#" + level + " canvas").replaceWith("<img class=\"c\" width=\"" + $(c).width() + "\" height=\"" + $(c).height() + "\" src=\"" + c.toDataURL("image/png") + "\"/>");
        $b.find("#" + level + " .cost input").replaceWith("" + DATA[level].cost);
        //replace passives::after with passives. Used to circumvent whitespace bugs.
        $b.find(".passives").each(function(a, b) { b.innerText = $(b).attr("data-description") || "";
            $(b).addClass("screen"); });
    });

    $b.css("width", "auto");
    $b.appendTo($("#bgproc"));
    if ($("#savenoimage")[0].checked) {
        $b.find("img").remove();
    }
    if ($("#savenoinfo")[0].checked) {
        $b.find(".info").remove();
    }
    if ($("#savefirst")[0].checked) {
        $b.find("section:not(#base)").remove();
        $b.find("#contents").css({ "min-width": "auto" });
    }
    if ($("#savecompact")[0].checked) {
        $b.find("#contents").css("flex-direction", "column");
        $b.find("section").css({ height: "280px", "flex-wrap": "wrap" });
        $b.find(".cost+div").css({ height: "258px", "min-width": "258px", "width": "auto", "margin-bottom": "0px" });
        $b.find("img").css("margin", "90px 0");
        $b.find(".cost+div").each(function() {
            $(this).find(".passives").each(function() { if (this.innerHTML !== "") this.innerHTML += "\n"; });
            $(this).css("width", (((this.scrollWidth / 260) * 274 - 12) >>> 0) + "px");
        });
        $b.find("#contents").css({ "min-width": "auto" });
    }

    setTimeout(function() {
        var $cv = $("<canvas id=\"cv\" width=\"" + ($b[0].scrollWidth + 10) + "\" height=\"" + ($b[0].scrollHeight + 10) + "\"></canvas>");
        rasterizeHTML.drawHTML(
            $b.parent().html(),
            $cv[0]
        ).then(function() {
            $("head").append($("<a href=\"" + $cv[0].toDataURL("image/png") + "\" download=\"PieceMaker-" + DATA.name + ".png\"/>")[0]);
            $("head a")[0].click();
            $("head a")[0].remove();
            clearInterval(ugh); //For unlulzing
            $("#saveimage").prop("disabled", false).text("Save Image to Computer");
            $("#saveuri").prop("disabled", false);
            $b.remove();
        });
    }, 0);
}
/** Note: There used to be a "Copy to Clipboard" function here, but seemingly no browser supports it, so I'll just leave the unique part for reference.
 *
 *function(){$("head").append($("<img src=\""+$cv[0].toDataURL("image/png")+"\"/>")[0]);var $ra = document.createRange(); $ra.selectNode($("head img")[0]); window.getSelection().addRange($ra); document.execCommand("copy"); $("head img")[0].remove();}); //*/

$("#saveuri").click(function() {
    if ($("#saveuri")[0].checked) {
        $("#saveimage").text("Save Image as URI");
    } else {
        $("#saveimage").text("Save Image to Computer");
    }
});
$("#saveimage").click(function() { screensave(); });
$("#exj").click(function() { $("#code").val(toCSV(DATA)); });
$("#exjh").click(function() { var uri = { q: toCSV(DATA) }; if (CUSTOM) uri.c = CUSTOM;
    history.replaceState("", "", "index.html?" + $.param(uri)); });
$("#imj").click(function() { var code = $("#code").val();
    validate(code); });
$("input, button").prop("disabled", false);

// All of these shit is created thanks to main_gi, the ultimate destroyer of the whole script of PM.

function toCSV() {
    function ep(a) { //The EverythingParser: I'M SO FUCKING TIRED OF THINKING SOLUTIONS
        switch (typeof a) {
            case "number":
                return a + "";
            case "string":
                return a.replace(/\\/g, "\\b").replace(/\n/g, "\\n").replace(/,/g, "\\a").replace(/:/g, "\\o");
            case "object":
                if (a.constructor == Array)
                    return a.map((t) => ep(t)) + "";
                else
                    return Object.keys(a).map((t) => ep(t) + ":" + ep(a[t])) + "";
            case "undefined":
                return "";
        }
    }
    var csv = "";
    csv += [ep(DATA.name), ep(DATA.labels.rank), ep(DATA.labels.faction), ep(DATA.labels.rarity)] + "\n";
    csv += ep(DATA.sketch) + "\n";
    _.forEach(LEVELS, function(level) {
        var SDATA = DATA[level];
        csv += [ep(SDATA.cost), ep(SDATA.passives), ep(SDATA.moves)] + "\n";
    });
    _.forEach(Object.keys(DATA.custom), function(id) {
        var SDATA = DATA.custom[id];
        csv += [ep(SDATA.id), ep(SDATA.text), ep(SDATA.content), ep(SDATA.color), ep(SDATA.color2), ep(SDATA.color3)] + "\n";
    });
    return csv;
}

function toJSON(a) {
    function pe(foepyt) { //The PatternExtractor: IDK WHAT IM DOING HLEP
        var b;
        switch (foepyt) {
            case "number":
                a.replace(/^(.*?)(,|\n|$)([\S\s]*)/, function (s1, s2, s3, s4) { b = s2;
                    a = s4; });
                return Number(b);
            case "string":
                a.replace(/^(.*?)(,|\n|$)([\S\s]*)/, function (s1, s2, s3, s4) { b = s2;
                    a = s4; });
                return up(b);
            case "array":
                a.replace(/^(.*?)(\n|$)([\S\s]*)/, function (s1, s2, s3, s4) { b = s2;
                    a = s4; });
                return b.split(",").map(function (t) { return up(t); }).filter(function (t) { return t !== ""; });
            case "color":
                a.replace(/^(.*?),(.*?),(.*?)(,|\n|$)([\S\s]*)/, function (s1, s21, s22, s23, s3, s4) { b = [s21, s22, s23];
                    a = s4; });
                return _.map(b, function (t) { return +t; });
            case "object":
                a.replace(/^(.*?)(\n|$)([\S\s]*)/, (s1, s2, s3, s4) => { b = s2;
                    a = s4; });
                return b.split(",").reduce((p1, p2) => { p2.replace(/^(.*?):(.*)/, (s1, s2, s3) => { p1[up(s2)] = up(s3); }); return p1; }, {});
        }
    }

    function up(t) {
        return t.replace(/\\n/g, "\n").replace(/\\a/g, ",").replace(/\\o/g, ":").replace(/\\b/g, "\\");
    }
    var data = { name: pe("string"), labels: { rank: pe("string"), faction: pe("string"), rarity: pe("string") }, sketch: pe("array"), custom: {} };
    _.forEach(LEVELS, function(level) {
        data[level] = { cost: pe("number"), passives: pe("string"), moves: pe("object") };
    });
    var tmp = a,
        tmz = a.match(/^.*?,.*?,.*?,.*?,.*?,.*?,.*?,.*?,.*?,.*?,.*?,.*?$/mg);
    if (tmz) _.forEach(tmz, function(t) {
        a = t;
        var id = pe("string");
        if (!MOVES[IMOVE[id]]) throw ({ message: "Invalid moveSquare ID detected" });
        data.custom[id] = { id: id, name: MOVES[IMOVE[id]].name, text: pe("string"), content: pe("string"), color: pe("color"), color2: pe("color"), color3: pe("color") };
    });
    a = tmp;
    return data;
}

function validate(source) {
    try { //Tests:
        console.log(source);
        DATA = toJSON(source); //Syntax test
        restore();
    } catch (e) {
        document.body.setAttribute("mode", "share");
        $("#code").val("Error! " + e.message);
    }
}
//Save and Restore Functions

function saveImage() {
    DATA.sketch = sketch.actions;
}

function dirty() { return DATA; }

var timeout;
function restore() {
    clearTimeout(timeout);
    timeout = setTimeout(restore,3000);
    restoreName();
    restoreMoves();
    restoreDisplay();
    restoreCost();
    restoreLabels();
    restorePassives();
    restoreCustom();
    restoreImage();
}

function restoreName() {
    if (DATA.name === undefined) DATA.name = "PieceName";
    $("#name").text(DATA.name);
    $("#plus .name").text(DATA.name + "+");
    $("#plusplus .name").text(DATA.name + "++");
    $("#plusplusplus .name").text(DATA.name + "+++");
}

function restoreImage() {
    if (!DATA.sketch) return;
    sketch.actions = DATA.sketch;
    sketch.redraw();
}

function restoreDisplay() {
    $("section .moves li").css("display", "none");
    $("section").each(function() {
        var level = this.id;
        _.forEach(Object.keys(DATA[level].moves), function (cls) {
            setDisplay(level, MOVES[IMOVE[cls]].name);
        });
    });
}

function restoreMoves() {
    $("td").each(function() { this.className = this.className == "piece" ? "piece" : ""; });
    $("section").each(function() {
        var level = this.id;
        var self = this;
        Object.keys(DATA[level].moves).forEach(function (id) {
            var cname = MOVES[IMOVE[id]].name,
                poses = _.map((DATA[level].moves[id].match(/../g) || []), function (poss) { return parseInt(poss[0], 16) * 15 + parseInt(poss[1], 16); });
            for (var n = 0; n < poses.length; n ++) {
                poss = poses[n];
                $(self).find("td")[poss].className = cname;
            }
        });
    });
}

function restoreCost() {
    _.forEach(LEVELS, function(level) {
        $("#" + level + " .cost input").val(DATA[level].cost);
    });
}

function restoreLabels() {
    if (!DATA.labels) DATA.labels = {};
    for (var label in LABELS) {
        $(".info span." + label).text(DATA.labels[label] || LABELS[label][0]);
    }
}

function restorePassives() {
    for (var level in LEVELS) {
        curPASSIVE = LEVELS[LEVELS.length - level - 1];
        var p = DATA[curPASSIVE].passives || "";
        setPassive(p, curPASSIVE);
        var $d = $("#" + curPASSIVE + " .passives");
        $d.text($d.attr("data-raw"));
    }
    curPASSIVE = "base";
}

function restoreCustom() {
    if (!DATA.custom) return;
    for (var moves in DATA.custom) {
        var movename = DATA.custom[moves].name;
        MOVES[SMOVE[movename]] = DATA.custom[moves];
        style.sheet.deleteRule(SMOVE[movename]);
        style.sheet.insertRule(makeRule(MOVES[SMOVE[movename]]), SMOVE[movename]); //Reapply css
        document.styleSheets[1] = style;
        $(".moves ." + movename).attr("data-description", MOVES[SMOVE[movename]].text);
    }
}

if ($("#code").val()) validate($("#code").val());
//Placed at the final so that everything loads properly before stuffs are loaded.;
