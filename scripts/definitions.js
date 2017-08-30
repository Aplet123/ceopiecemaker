/** COMPREHENSIVE GUIDE OF PRETEND CATEGORIZER NOTATION (longname)
 *** THIS PART IS WRITTEN IN CASE I AM STUPID ENOUGH TO
 *** FORGET WHAT I HAVE DONE PREVIOUSLY, THIS OBVIOUSLY
 *** HAPPENED WHEN I TOOK A BREAK FROM UPDATING TOO LONG
 *** SO JUST IN CASE.
 ***
 *** ALSO FOR THOSE WHO PLAN TO STEAL MY CODE, HERE YOU
 *** GO ;)
 **
 ** Longname structure explanation:
 * #   C  ]BN     :description;
 * Pay Cat Bracket Description 
 **
 ** Category Explanation:
 * a: Ability Target. Used for explanation of other abilities.
 * b: Basic. Involves one turn, one/two target life/death, or caster moving.
 * c: Complex. Involves one turn, one/two target attribute change.
 *
 * m: Map. Involves marking of locations.
 *
 * p: Piece. Involves creation of another piece.
 *
 * s: Status. Involves cross-turn, one/two target status effect change.
 * t: Trigger. Involves trigger actions.
 * u: Indirect. Involves an indirect target.
 * v: Passive. Involves passive actions
 *
 * z: Customs. Should not be sorted with the abilities.
 **
 ** Bracket Notation Explanation:
 * m/r: Melee / Magic (ranged)
 * n/u/z: Normal / Unblockable / Unstoppable
 */

// Description structure explanation:
/// Note: Everything assumes common sense. That is, values cannot go negative,
///       target cannot go out of bounds, one cannot attack something empty, etc.
// recognized structures:
// Descriptors (Base level)
LDE = ["move", "attack", "swap", "transform", "summon", "set", "flag", "deflag", "block"];
// These descriptors are to be used as the lowest level building blocks of descriptions.
// One can go lower, but I'll not note it here as it will make the longnames too long(?)
// move, attack, swap, transform self explanatory.
// set: Change properties
// flag: Add status for changes
//       flag@(number)(action) refers to (action) opponent for (number) turns
//       flag@(number)&(action) refers to (action) opponent after (number) turns
// Descriptors (Extra level):
LEE = ["charm", "poison", "freeze", "petrify", "push", "sorcerize"];
// These are extra ability names, but due to it being open-ended to changes (duration)
// They have to be specified every time, with the above descriptors.
// Properties:
LPE = ["minion", "type", "tier", "ally", "value", "startpos", "pos"];
// These are the "Properties" used for changing/conditioning.
// Triggers:
LTE = ["meleedeath", "death", "start", "end", "status", "targeted"];
// These are the triggers, which is guaranteed to be sent every time these events happen
// Other undescribable events will be notated in brackets.
// Especially those requiring more complex explanation.
// Current listed items:
// (RANDOM), (ENCHANT), (CAN-REVIVE), (RANGE), (AWAY), (KING), (LOSEABILITY),
// (MOVETOGETHER), (RANDOMMINION), (LOSEIMMUNE), (REFLECT), 
//
// #Away: # Square away from the caster, if unspecified, assume infinity.
// #Range: Squares of range #, if unspecified, assume 1.
//
// Piecenames should be capitalized.
// "this" refers to the caster. Prefix with \ or A to mean targets.
/* operators
|| /  or
|| ?  (if)
|| &  then
|| ?& (if )
|| #  defined as (For extra level descriptors)
|| @  extra argument
|| -  prevent (freeze)
|| +  allow (augment)
|| !  not
|| * regardless of
|| \  make (referring to target)
|| A  make (referring to ability target)
|| /@ for each
*/

// ORDER BY
MOVESORT = ["canonical"];

/**Structure Explanation:
 * Name: used for CSS classes, short name. Changes flexible.
 * Long: used for Categorization/Sorting/Filtering, code-like description. 
 *       Changes flexible (to reflect reality). See above for explanation.
 * id  : used for Indexing/Export code. Changes kept to minimum.
 * cat : Deprecated(never used). See Long.
 * text: In-game description.
 * Others self-explanatory.
 */
MOVES = [{
    "id": "1",
    "cat": "official",
    "name": "moveattack",
    "long": "b]mn:move/attack",
    "text": "fuck off james",
    "color": [0, 0, 0]
}, {
    "id": "2",
    "cat": "official",
    "name": "move",
    "long": "b]mn:move",
    "text": "fuck off james",
    "color": [0, 0, 255]
}, {
    "id": "3",
    "cat": "official",
    "name": "attack",
    "long": "b]mn:attack",
    "text": "fuck off james",
    "color": [252, 13, 27]
}, {
    "id": "4",
    "cat": "official",
    "name": "jump",
    "long": "b]mu:move/attack",
    "text": "fuck off james",
    "color": [20, 151, 24]
}, {
    "id": "5",
    "cat": "official",
    "name": "jumpswap",
    "long": "b]mu:move/attack/swap",
    "text": "fuck off james",
    "color": [255, 210, 0]
}, {
    "id": "6",
    "cat": "official",
    "name": "teleport",
    "long": "b]mu:move",
    "text": "fuck off james",
    "color": [121, 19, 153]
}, {
    "id": "7",
    "cat": "official",
    "name": "magic",
    "long": "b]ru:attack",
    "text": "fuck off james",
    "color": [253, 117, 34]
}, {
    "id": "8",
    "cat": "official",
    "name": "plant",
    "long": "2p]ru:transform@SAPLING/summon@SAPLING",
    "text": "fuck off james",
    "color": [0, 101, 24]
}, {
    "id": "9",
    "cat": "official",
    "name": "charm",
    "long": "c]ru:minion?charm#set@ally",
    "text": "fuck off james",
    "color": [255, 0, 255]
}, {
    "id": "10",
    "cat": "official",
    "name": "skeleton",
    "long": "4p]ru:summon@SKELETON&set@value=0",
    "text": "fuck off james",
    "color": [102, 102, 102],
    "color3": [0, 0, 0],
    "content": "\u26e7"
}, {
    "id": "11",
    "cat": "official",
    "name": "movestart",
    "long": "b]mn:startpos?move",
    "text": "fuck off james",
    "color": [11, 36, 251],
    "content": "\u274b"
}, {
    "id": "12",
    "cat": "official",
    "name": "poison",
    "long": "s]ru:poison#flag@3&attack",
    "text": "fuck off james",
    "color": [0, 101, 24],
    "content": "\u00d7"
}, {
    "id": "13",
    "cat": "official",
    "name": "freeze",
    "long": "s]ru:freeze#flag@3-move",
    "text": "fuck off james",
    "color": [107, 205, 253],
    "content": "\u00d7"
}, {
    "id": "14",
    "cat": "official",
    "name": "petrify",
    "long": "s]rn:pretrify#flag@5-move",
    "text": "fuck off james",
    "color": [94, 94, 94],
    "content": "\u00d7"
}, {
    "id": "15",
    "cat": "official",
    "name": "polymorph",
    "long": "c]ru:set@type=(RANDOMMINION)",
    "text": "fuck off james",
    "color": [255, 0, 255],
    "content": "\u00d7",
    "hide": true
}, {
    "id": "16",
    "cat": "official",
    "name": "haul",
    "long": "c]ru:set@pos=(RANDOM)",
    "text": "fuck off james",
    "color": [102, 0, 102],
    "content": "\ufe56",
    "hide": true
}, {
    "id": "17",
    "cat": "official",
    "name": "teleportmasshaul",
    "long": "bc]mu:move&1(RANGE)/@set@pos=(RANDOM)",
    "text": "fuck off james",
    "color": [102, 0, 102],
    "content": "\ufe56\u2747",
    "hide": true
}, {
    "id": "18",
    "cat": "official",
    "name": "warp",
    "long": "b]mz:move/attack",
    "text": "fuck off james",
    "color": [200, 151, 24],
    "content": "",
    "hide": true
}, {
    "id": "19",
    "cat": "official",
    "name": "enchant",
    "long": "s]ru:ally?enchant#flag@2(ENCHANT)",
    "text": "fuck off james",
    "color": [0, 102, 255],
    "color2": [0, 0, 0],
    "color3": [0, 255, 255],
    "content": "\u25cb"
}, {
    "id": "20",
    "cat": "official",
    "name": "soulkeep",
    "long": "1cp]ru:transform@GHOST",
    "text": "fuck off james",
    "color": [208, 88, 161],
    "color2": [255, 255, 255],
    "color3": [0, 0, 0],
    "content": "\ue900"
}, {
    "id": "21",
    "cat": "official",
    "name": "teleportstart",
    "long": "b]mu:startpos?move",
    "text": "fuck off james",
    "color": [121, 19, 153],
    "content": "\u274b"
}, {
    "id": "22",
    "cat": "official",
    "name": "slime",
    "long": "pt]:meleedeath?this+move?summon@SLIME",
    "text": "fuck off james",
    "color": [0, 153, 0],
    "color2": [255, 255, 255],
    "color3": [0, 204, 0],
    "content": "\ue905"
}, {
    "id": "23",
    "cat": "official",
    "name": "moon",
    "long": "pt]:meleedeath?summon@this&set@value-=10",
    "text": "fuck off james",
    "color": [0, 0, 0],
    "color2": [255, 255, 255],
    "content": "\u263d"
}, {
    "id": "24",
    "cat": "official",
    "name": "jumpattackminion",
    "long": "b]mu:minion?attack",
    "text": "fuck off james",
    "color": [138, 63, 63],
    "color2": [255, 255, 255],
    "color3": [195, 63, 63],
    "content": "\u239a"
}, {
    "id": "25",
    "cat": "official",
    "name": "triggerattack",
    "long": "bt]mn:start?attack",
    "text": "fuck off james",
    "color": [0, 0, 0],
    "color2": [255, 255, 255],
    "color3": [255, 0, 0],
    "content": "\u25c7"
}, {
    "id": "26",
    "cat": "official",
    "name": "abilitytarget",
    "long": "a]",
    "text": "fuck off james",
    "color": [0, 0, 0],
    "color2": [255, 255, 255],
    "content": "\u2609"
}, {
    "id": "27",
    "cat": "official",
    "name": "portal",
    "long": "u]:Aset@pos=\\this",
    "text": "fuck off james",
    "color": [155, 20, 208],
    "color2": [255, 255, 255],
    "content": "\u2609"
}, {
    "id": "28",
    "cat": "official",
    "name": "push",
    "long": "1c]rn:push#\\(mn:move@3(AWAY))",
    "text": "fuck off james",
    "color": [87, 218, 40],
    "color2": [255, 255, 255],
    "content": "\u25cc"
}, {
    "id": "29",
    "cat": "official",
    "name": "gemini",
    "long": "6cp]rn:summon@GEMINITWIN&set@tier=this&thisset@type=GEMINITWIN",
    "text": "fuck off james",
    "color": [0, 0, 0],
    "color2": [255, 255, 255],
    "content": "\u264a"
}, {
    "id": "30",
    "cat": "official",
    "name": "teleportking",
    "long": "cu]ru:(KING)set@pos=\\this",
    "text": "fuck off james",
    "color": [0, 0, 0],
    "color2": [255, 255, 255],
    "content": "\u25c7\u25fd"
}, {
    "id": "31",
    "cat": "official",
    "name": "teleportswap",
    "long": "b]mu:move/swap",
    "text": "fuck off james",
    "color": [121, 19, 153],
    "color3": [0, 0, 0],
    "content": "\u{1f5d8}"
}, {
    "id": "32",
    "cat": "official",
    "name": "lifestone",
    "long": "cp]ru:summon@(CAN-REVIVE)&thisattack",
    "text": "fuck off james",
    "color": [0, 0, 0],
    "color2": [58, 233, 93],
    "content": "\uea41"
}, {
    "id": "33",
    "cat": "official",
    "name": "heal",
    "long": "1st]:ally?status?deflag",
    "text": "fuck off james",
    "color": [0, 0, 0],
    "color2": [58, 233, 93],
    "content": "\uea42"
}, {
    "id": "34",
    "cat": "official",
    "name": "necromance",
    "long": "2cp]ru:ally?type==SKELETON?set@tier+=1/transform@SKELETON",
    "text": "fuck off james",
    "color": [0, 0, 0],
    "color2": [227, 0, 0],
    "content": "\ue901"
}, {
    "id": "35",
    "cat": "official",
    "name": "moveattackblock",
    "long": "bv]:block@(mn:attack)&(LOSEABILTY)/(mn:move/attack)",
    "text": "fuck off james",
    "color": [0, 0, 0],
    "color3": [255, 255, 255],
    "content": "\u2219"
}, {
    "id": "36",
    "cat": "official",
    "name": "freezeexplosion",
    "long": "st]:death?minion?freeze#flag@3-move",
    "text": "fuck off james",
    "color": [107, 205, 253],
    "content": "\u25fc"
}, {
    "id": "37",
    "cat": "official",
    "name": "freezestrike",
    "long": "bs]ru:thisattack&freeze#flag@3-move",
    "text": "fuck off james",
    "color": [107, 205, 253],
    "color3": [0, 255, 255],
    "content": "\u2738"
}, {
    "id": "38",
    "cat": "official",
    "name": "bat",
    "long": "p]mz:thisset@type=BAT&move",
    "text": "fuck off james",
    "color": [0, 0, 0],
    "color2": [255, 255, 255],
    "content": "\ue902"
}, {
    "id": "39",
    "cat": "official",
    "name": "castle",
    "long": "c]:ally?!minion?swap&(MOVETOGETHER)&(LOSEABILITY)",
    "text": "fuck off james",
    "color": [0, 0, 0],
    "color2": [255, 255, 255],
    "content": "\u2656"
}, {
    "id": "40",
    "cat": "official",
    "name": "thunder",
    "long": "m]:flag@4&(ru:attack)",
    "text": "fuck off james",
    "color": [0, 0, 0],
    "color2": [255, 255, 255],
    "content": "\u26a1"
}, {
    "id": "41",
    "cat": "official",
    "name": "attract",
    "long": "ct]ru:end?!ally?\\(mn:move@-1(AWAY))",
    "text": "fuck off james",
    "color": [255, 63, 255],
    "color2": [255, 255, 255],
    "content": "\u25c7"
}, {
    "id": "42",
    "cat": "official",
    "name": "shoot",
    "long": "b]rn:attack",
    "text": "fuck off james",
    "color": [255, 0, 0],
    "color2": [255, 255, 255],
    "content": "\u2316"
}, {
    "id": "43",
    "cat": "official",
    "name": "beacon",
    "long": "cu]ru:set@pos=Athis",
    "text": "fuck off james",
    "color": [155, 20, 208],
    "color2": [255, 255, 255],
    "content": "\u25ef"
}, {
    "id": "44",
    "cat": "official",
    "name": "gravity",
    "long": "1cu]ru:\\(mn:move@A-(AWAY))",
    "text": "fuck off james",
    "color": [0, 63, 255],
    "color2": [255, 255, 255],
    "content": "\u25ef"
}, {
    "id": "45",
    "cat": "official",
    "name": "omnishield",
    "long": "bt]:ally?(CHAMPION)?targeted?+move?this+move?(mu:swap)",
    "text": "fuck off james",
    "color": [0, 0, 153],
    "color2": [153, 255, 255],
    "content": "\ue904"
}, {
    "id": "46",
    "cat": "official",
    "name": "envy",
    "long": "c]ru:thisset@type=\\this&thisset@tier=\\this",
    "text": "fuck off james",
    "color": [127, 192, 127],
    "color2": [255, 255, 255],
    "color3": [0, 0, 0],
    "content": "\u2b50"
}, {
    "id": "47",
    "cat": "official",
    "name": "splash",
    "long": "cs]ru:push#\\(mn:move@1(AWAY))?&freeze#flag@3-move",
    "text": "fuck off james",
    "color": [0, 153, 255],
    "color2": [255, 255, 255],
    "content": "\u1aa4"
}, {
    "id": "48",
    "cat": "official",
    "name": "pike",
    "long": "bt]:targeted@(m*:attack)?attack",
    "text": "fuck off james",
    "color": [0, 0, 0],
    "color2": [255, 255, 255],
    "color3": [255, 0, 0],
    "content": "\uEA5D"
}, {
    "id": "49",
    "cat": "official",
    "name": "magicpush",
    "long": "1c]ru:push#\\(mn:move@3(AWAY))",
    "text": "fuck off james",
    "color": [87, 218, 40],
    "color2": [200, 255, 200],
    "content": "\u25cb\u2742"
}, {
    "id": "0a",
    "cat": "variation",
    "name": "swap",
    "long": "b]mu:swap",
    "text": "fuck off james",
    "color": [127, 108, 0],
    "hide": true
}, {
    "id": "0b",
    "cat": "variation",
    "name": "swapenemy",
    "long": "b]mu:!ally?swap",
    "text": "fuck off james",
    "color": [208, 108, 108],
    "hide": true
}, {
    "id": "0c",
    "cat": "variation",
    "name": "swapall",
    "long": "b]mu:*ally?swap",
    "text": "fuck off james",
    "color": [127, 108, 0],
    "content": "\ufe62",
    "hide": true
}, {
    "id": "15a",
    "cat": "variation",
    "name": "charmall",
    "long": "c]ru:*minion?charm#set@ally",
    "text": "fuck off james",
    "color": [255, 0, 255],
    "content": "\ufe62",
    "hide": true
}, {
    "id": "15a",
    "cat": "variation",
    "name": "polymorphall",
    "long": "c]ru:set@type=(RANDOM)",
    "text": "fuck off james",
    "color": [255, 0, 255],
    "content": "\ufe62\u00d7",
    "hide": true
}, {
    "id": "18a",
    "cat": "variation",
    "name": "protosorcerattack",
    "long": "3cs]ru:sorcerize#flag@2(2(RANGE)/@+(mu:attack))",
    "text": "fuck off james",
    "color": [255, 0, 0],
    "color2": [0, 0, 0],
    "content": "\uffec",
    "hide": true
}, {
    "id": "18b",
    "cat": "variation",
    "name": "protosorcerdeimmune",
    "long": "2s]:sorcerize#flag@2(LOSEIMMUNE)",
    "text": "fuck off james",
    "color": [0, 178, 255],
    "color2": [0, 64, 127],
    "color3": [0, 255, 255],
    "content": "\uffec",
    "hide": true
}, {
    "id": "18c",
    "cat": "variation",
    "name": "protosorcerenchant",
    "long": "2cs]ru:sorcerize#flag@2(t]:death?enchant#flag@2(ENCHANT))",
    "text": "fuck off james",
    "color": [0, 178, 255],
    "color2": [0, 0, 0],
    "color3": [0, 255, 255],
    "content": "\uffec",
    "hide": true
}, {
    "id": "18d",
    "cat": "variation",
    "name": "protosorcerdetarget",
    "long": "s]ru:sorcerize#flag@3-target",
    "text": "fuck off james",
    "color": [0, 178, 255],
    "color2": [0, 0, 0],
    "color3": [0, 255, 255],
    "content": "\u00d7",
    "hide": true
}, {
    "id": "19a",
    "cat": "variation",
    "name": "magicenchant",
    "long": "s]ru:ally?enchant#flag@2(ENCHANT)@(r*:attack)",
    "text": "fuck off james",
    "color": [255, 102, 0],
    "color2": [0, 0, 0],
    "color3": [255, 178, 0],
    "content": "\u25cb",
    "hide": true
}, {
    "id": "19b",
    "cat": "variation",
    "name": "omnienchant",
    "long": "3s]ru:ally?enchant#flag@2(ENHCANT)@(**:attack)",
    "text": "fuck off james",
    "color": [208, 208, 127],
    "color2": [0, 0, 0],
    "color3": [255, 255, 255],
    "content": "\u25cb",
    "hide": true
}, {
    "id": "24a",
    "cat": "variation",
    "name": "jumpattack",
    "long": "b]mu:attack",
    "text": "fuck off james",
    "color": [127, 0, 0],
    "hide": true
}, {
    "id": "25a",
    "cat": "variation",
    "name": "burn",
    "long": "bt]ru:start?attack",
    "text": "fuck off james",
    "color": [253, 117, 34],
    "content": "\u25b3",
    "hide": true
}, {
    "id": "25b",
    "cat": "variation",
    "name": "frostburn",
    "long": "st]ru:start?attack#flag@1-move",
    "text": "fuck off james",
    "color": [107, 205, 253],
    "content": "\u25bd",
    "hide": true
}, {
    "id": "27a",
    "cat": "variation",
    "name": "magicportal",
    "long": "pu]ru:Aset@pos=\\this",
    "text": "fuck off james",
    "color": [155, 20, 208],
    "color2": [255, 255, 255],
    "content": "\u2609",
    "hide": true
}, {
    "id": "49a",
    "cat": "variation",
    "name": "magicpull",
    "long": "1c]ru:pull#\\(mn:move@-3(AWAY))",
    "text": "fuck off james",
    "color": [155, 20, 208],
    "color2": [220, 200, 255],
    "content": "\u25cb\u2742",
    "hide": true
}, {
    "id": "31a",
    "cat": "variation",
    "name": "moveswap",
    "long": "b]mn:move/swap",
    "text": "fuck off james",
    "color": [0, 0, 255],
    "color3": [0, 0, 0],
    "content": "\u{1f5d8}",
    "hide": true
}, {
    "id": "34a",
    "cat": "variation",
    "name": "downgradenecromance",
    "long": "1cp]ru:ally?type==SKELETON?set@tier+=1/minion?(set@tier-=1/tier==0?attack)",
    "text": "fuck off james",
    "color": [0, 0, 0],
    "color2": [227, 227, 0],
    "content": "\ue901",
    "hide": true
}, {
    "id": "34b",
    "cat": "variation",
    "name": "destroynecromance",
    "long": "2cp]ru:ally?type==SKELETON?set@tier+=1/attack",
    "text": "fuck off james",
    "color": [0, 0, 0],
    "color2": [227, 113, 0],
    "content": "\ue901",
    "hide": true
}, {
    "id": "35a",
    "cat": "variation",
    "name": "moveblock",
    "long": "bv]:block@(mn:attack)&(LOSEABILTY)/(mn:move)",
    "text": "fuck off james",
    "color": [0, 0, 255],
    "color3": [255, 255, 255],
    "content": "\u2219",
    "hide": true
}, {
    "id": "35b",
    "cat": "variation",
    "name": "rangedblock",
    "long": "bv]:block@(rn:attack)&(LOSEABILTY)/(mn:move/attack)",
    "text": "fuck off james",
    "color": [0, 0, 0],
    "color3": [127, 255, 127],
    "content": "\u2219",
    "hide": true
}, {
    "id": "37a",
    "cat": "variation",
    "name": "explosion",
    "long": "bt]:death?minion?attack",
    "text": "fuck off james",
    "color": [255, 102, 0],
    "content": "\u25fc",
    "hide": true
}, {
    "id": "41a",
    "cat": "variation",
    "name": "unattract",
    "long": "ct]ru:end?!ally?\\(mn:move@1(AWAY))",
    "text": "fuck off james",
    "color": [63, 127, 63],
    "color2": [255, 255, 255],
    "content": "\u25c7",
    "hide": true
}, {
    "id": "43a",
    "cat": "variation",
    "name": "beaconally",
    "long": "cu]ru:set@pos=Athis",
    "text": "fuck off james",
    "color": [155, 20, 208],
    "color2": [255, 255, 255],
    "content": "\u25ef\u25c7",
    "hide": true
}, {
    "id": "44a",
    "cat": "variation",
    "name": "antigravity",
    "long": "1cu]ru:\\(mn:Amove@\\this)",
    "text": "fuck off james",
    "color": [0, 63, 255],
    "color2": [255, 255, 255],
    "content": "\u25cc",
    "hide": true
}, {
    "id": "44b",
    "cat": "variation",
    "name": "gravityfreeze",
    "long": "1cu]ru:\\(mn:move@A-(AWAY))&freeze#flag@3-move",
    "text": "fuck off james",
    "color": [0, 127, 255],
    "color2": [255, 255, 255],
    "content": "\u25ef",
    "hide": true
}, {
    "id": "45a",
    "cat": "variation",
    "name": "meleeshieldall",
    "long": "bt]:ally?targeted@(mn:attack)?+move?this+move?(mu:swap)",
    "text": "fuck off james",
    "color": [153, 0, 0],
    "color2": [255, 158, 153],
    "content": "\ue904\ufe62",
    "hide": true
}, {
    "id": "45b",
    "cat": "variation",
    "name": "spellshieldall",
    "long": "bt]:ally?targeted@(r*:*)?+move?this+move?(mu:swap)",
    "text": "fuck off james",
    "color": [153, 78, 0],
    "color2": [255, 255, 153],
    "content": "\ue904\ufe62",
    "hide": true
}, {
    "id": "45c",
    "cat": "variation",
    "name": "omnishieldall",
    "long": "bt]:ally?targeted?+move?this+move?(mu:swap)",
    "text": "fuck off james",
    "color": [0, 0, 153],
    "color2": [153, 255, 255],
    "content": "\ue904\ufe62",
    "hide": true
}, {
    "id": "45d",
    "cat": "variation",
    "name": "spellshield",
    "long": "bt]:ally?(CHAMPION)?targeted@(r*:*)?+move?this+move?(mu:swap)",
    "text": "fuck off james",
    "color": [153, 78, 0],
    "color2": [255, 255, 153],
    "content": "\ue904",
    "hide": true
}, {
    "id": "48a",
    "cat": "variation",
    "name": "wisp",
    "long": "t]:targeted:(REFLECT)",
    "text": "fuck off james",
    "color": [0, 0, 0],
    "color2": [255, 255, 255],
    "color3": [255, 0, 0],
    "content": "\uEA14",
    "hide": true
}, {
    "id": "31b",
    "cat": "limbo",
    "name": "ximaera",
    "long": "b]mu:move/*ally?swap",
    "text": "fuck off james",
    "color": [19, 121, 153],
    "hide": true
}, {
    "id": "a1",
    "cat": "adoption",
    "name": "flirt",
    "long": "cs]rn:flag@3&charm#set@ally",
    "text": "fuck off james",
    "color": [255, 0, 255],
    "content": "\u2665",
    "hide": true
}, {
    "id": "a2",
    "cat": "adoption",
    "name": "mutualpoison",
    "long": "s]ru:(thispoison#flag@3&attack)&poison#flag@3&attack",
    "text": "fuck off james",
    "color": [0, 101, 24],
    "content": "\uea26",
    "hide": true
}, {
    "id": "a3",
    "cat": "adoption",
    "name": "levitate",
    "long": "s]ru:flag@2-((mn:attack)/\\mn:attack)",
    "text": "fuck off james",
    "color": [121, 19, 153],
    "color3": [255, 255, 0],
    "content": "^",
    "hide": true
}, {
    "id": "a4",
    "cat": "adoption",
    "name": "notarget",
    "long": "v]:-\\**:*",
    "text": "fuck off james",
    "color": [0, 0, 0],
    "color2": [255, 255, 255],
    "content": "\u2300",
    "hide": true
}, {
    "id": "a5",
    "cat": "adoption",
    "name": "replaceabilitytarget",
    "long": "m]:(REPLACEABILITYTARGET)",
    "text": "fuck off james",
    "color": [0, 0, 0],
    "color2": [127, 127, 255],
    "content": "\u2609",
    "hide": true
}, {
    "id": "a6",
    "cat": "adoption",
    "name": "jumpallymoveattack",
    "long": "b]m(ALLYUNBLOCKABLE)n:move/attack",
    "text": "fuck off james",
    "color": [0, 0, 0],
    "content": "\u274b",
    "hide": true
}, {
    "id": "a7",
    "cat": "adoption",
    "name": "demote",
    "long": "3c]ru:set@type=(DEMOTION)",
    "text": "fuck off james",
    "color": [255, 0, 0],
    "color2": [241, 241, 140],
    "content": "\uffec",
    "hide": true
}, {
    "id": "a8",
    "cat": "adoption",
    "name": "backtech",
    "long": "1cs]ru:flag@3(t]\\!ally?targeted?mn:move@1(AWAY))",
    "text": "fuck off james",
    "color": [127, 127, 191],
    "color3": [64, 64, 95],
    "content": "\u25cc",
    "hide": true
}, {
    "id": "a9",
    "cat": "adoption",
    "name": "destroysplash",
    "long": "1c]ru:attack&1(RANGE)\\Amove@1(AWAY))",
    "text": "fuck off james",
    "color": [0, 101, 24],
    "color2": [255, 255, 255],
    "content": "\u2747",
    "hide": true
}, {
    "id": "c1",
    "cat": "custom",
    "name": "custom1",
    "long": "z]",
    "text": "fuck off james",
    "color": [227, 25, 25],
    "content": "1"
}, {
    "id": "c2",
    "cat": "custom",
    "name": "custom2",
    "long": "z]",
    "text": "fuck off james",
    "color": [227, 126, 25],
    "content": "2"
}, {
    "id": "c3",
    "cat": "custom",
    "name": "custom3",
    "long": "z]",
    "text": "fuck off james",
    "color": [227, 227, 25],
    "content": "3"
}, {
    "id": "c4",
    "cat": "custom",
    "name": "custom4",
    "long": "z]",
    "text": "fuck off james",
    "color": [126, 227, 25],
    "content": "4"
}, {
    "id": "c5",
    "cat": "custom",
    "name": "custom5",
    "long": "z]",
    "text": "fuck off james",
    "color": [25, 227, 25],
    "content": "5"
}, {
    "id": "c6",
    "cat": "custom",
    "name": "custom6",
    "long": "z]",
    "text": "fuck off james",
    "color": [25, 227, 126],
    "content": "6"
}, {
    "id": "c7",
    "cat": "custom",
    "name": "custom7",
    "long": "z]",
    "text": "fuck off james",
    "color": [25, 227, 227],
    "content": "7"
}, {
    "id": "c8",
    "cat": "custom",
    "name": "custom8",
    "long": "z]",
    "text": "fuck off james",
    "color": [25, 126, 227],
    "content": "8"
}]; //Stop asking me im not adding more

/* Self reminder
\\ when creating an ability of slightly different ability, prefer these changes:
\\ "\ufe62" Targets all
\\ "\u22c6" Magic
\\ "\u2295" Ranged
*/

PASSIVES = ["Block.",
    "NoBlock.",
    "Block. NoBlock.",
    "SSP is dumb.",
    "James is dumb.",
    "Forced MoonWolf meme is dumb.",
    "Forced Undine meme is dumb.",
    "Forced piecemaker delete meme is dumb.",
    "fuck off strat",
    "fuck off james"
];
LABELS = {
    rank: ["fuck off james", "fuck off strat"],
    faction: ["fuck", "you", "all", "idiots"],
    rarity: ["lolol", "loloololol", "lololololololo", "lolololololololol"]
}
LEVELS = ["base", "plus", "plusplus", "plusplusplus"];

TOOLTIPS = {
    ts0: "fuck off james",
    ts1: "fuck off james",
    ts2: "fuck off james",
    ts3: "fuck off james",
    tf0: "fuck off james",
    tf1: "fuck off james",
    tf2: "fuck off james",
    tf3: "fuck off james",
    tt0: "fuck off james",
    tt1: "fuck off james",
    tt2: "fuck off james",
    tt3: "fuck off james",
    tt4: "fuck off james",
    tt5: "fuck off james",
    do0: "fuck off james",
    do1: "fuck off james",
    do2: "fuck off james",
    do3: "fuck off james",
};