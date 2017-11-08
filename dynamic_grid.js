// rAF
window.requestAnimationFrame = function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        function (f) {
            window.setTimeout(f, 1e3 / 60);
        }
}();

// cAF
window.cancelAnimationFrame = function () {
    return window.cancelAnimationFrame ||
        window.webkitCancelAnimationFrame ||
        window.mozCancelAnimationFrame ||
        window.msCancelAnimationFrame ||
        window.oCancelAnimationFrame ||
        function (f) {
            window.setTimeout(f, 1e3 / 60);
        }
}();

var depth = 80;
var n = 2;
var rowvalue = 3;
var rowcondition = 1;
var mexecute = true;
var playpause = true;
var timerid;
var timervalue;
var s = 120;
var level = 0;
var counter = 0;
var seconds = 300;
var milliSeconds = 9;
var mainElement = document.getElementById("game");
var timeValue;
var textValue;
var mHeight = innerHeight / 2;
var mWidth = innerHeight / 2;
var timerSwitch = false;



! function (a) {
    var b = /iPhone/i,
        c = /iPod/i,
        d = /iPad/i,
        e = /(?=.*\bAndroid\b)(?=.*\bMobile\b)/i,
        f = /Android/i,
        g = /(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)/i,
        h = /(?=.*\bAndroid\b)(?=.*\b(?:KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b)/i,
        i = /IEMobile/i,
        j = /(?=.*\bWindows\b)(?=.*\bARM\b)/i,
        k = /BlackBerry/i,
        l = /BB10/i,
        m = /Opera Mini/i,
        n = /(CriOS|Chrome)(?=.*\bMobile\b)/i,
        o = /(?=.*\bFirefox\b)(?=.*\bMobile\b)/i,
        p = new RegExp("(?:Nexus 7|BNTV250|Kindle Fire|Silk|GT-P1000)", "i"),
        q = function (a, b) {
            return a.test(b)
        },
        r = function (a) {
            var r = a || navigator.userAgent,
                s = r.split("[FBAN");
            return "undefined" != typeof s[1] && (r = s[0]), s = r.split("Twitter"), "undefined" != typeof s[1] && (r = s[0]), this.apple = {
                phone: q(b, r),
                ipod: q(c, r),
                tablet: !q(b, r) && q(d, r),
                device: q(b, r) || q(c, r) || q(d, r)
            }, this.amazon = {
                phone: q(g, r),
                tablet: !q(g, r) && q(h, r),
                device: q(g, r) || q(h, r)
            }, this.android = {
                phone: q(g, r) || q(e, r),
                tablet: !q(g, r) && !q(e, r) && (q(h, r) || q(f, r)),
                device: q(g, r) || q(h, r) || q(e, r) || q(f, r)
            }, this.windows = {
                phone: q(i, r),
                tablet: q(j, r),
                device: q(i, r) || q(j, r)
            }, this.other = {
                blackberry: q(k, r),
                blackberry10: q(l, r),
                opera: q(m, r),
                firefox: q(o, r),
                chrome: q(n, r),
                device: q(k, r) || q(l, r) || q(m, r) || q(o, r) || q(n, r)
            }, this.seven_inch = q(p, r), this.any = this.apple.device || this.android.device || this.windows.device || this.other.device || this.seven_inch, this.phone = this.apple.phone || this.android.phone || this.windows.phone, this.tablet = this.apple.tablet || this.android.tablet || this.windows.tablet, "undefined" == typeof window ? this : void 0
        },
        s = function () {
            var a = new r;
            return a.Class = r, a
        };
    "undefined" != typeof module && module.exports && "undefined" == typeof window ? module.exports = r : "undefined" != typeof module && module.exports && "undefined" != typeof window ? module.exports = s() : "function" == typeof define && define.amd ? define("isMobile", [], a.isMobile = s()) : a.isMobile = s()
}(this);


document.querySelector('h1').style.fontSize = 4.7 + "vw";
document.querySelector('h2').style.fontSize = 4.0 + "vw";
document.querySelector('h3').style.fontSize = 2.8 + "vw";
document.querySelector('p').style.fontSize = 2.5 + "vw";
document.getElementById("splash_image").height = innerWidth / 4;
document.getElementById("splash_image").width = innerWidth / 4;

if (isMobile.any) {
    mHeight = 3 * innerWidth / 4;
    mWidth = 3 * innerWidth / 4;
    document.querySelector('h1').style.fontSize = 5.7 + "vw";
    document.querySelector('h2').style.fontSize = 5.0 + "vw";
    document.querySelector('h3').style.fontSize = 3.8 + "vw";
    document.querySelector('p').style.fontSize = 3.5 + "vw";
    document.getElementById("splash_image").height = 3 * innerWidth / 4;
    document.getElementById("splash_image").width = 3 * innerWidth / 4;
    
}

function startGame() {
    $('.splash').hide();
    $('#viewport').show();
    $('.countdown').downCount();
}

function restartGame() {
    location.reload();
    /* $('.splash').hide();
     $('#viewport').show();
     $('.countdown').downCount();
     var menu = document.getElementById("gameOverMenu");
     menu.style.zIndex = -1;
     menu.style.display = "none";
     timerSwitch = true;
     rowcondition = 1;
     document.getElementById("scoress").innerHTML = "Level:" + rowcondition;
     document.getElementById("scoress").style.fontWeight = "bold";
     document.getElementById("game").style.display = "block";*/
}

var gameDiv = document.createElement("div");
gameDiv.className = "gameParent";
gameDiv.style.position = "absolute";
gameDiv.style.top = 0 + "px";
mainElement.appendChild(gameDiv);

var gameTableDiv = document.createElement("div");
gameTableDiv.className = "game";
document.querySelector(".gameParent").appendChild(gameTableDiv);

function grid() {

    var elemCounter = 0;
    var randomRed = Math.floor(Math.random() * 195) + 60;
    var randomGreen = Math.floor(Math.random() * 195) + 60;
    var randomBlue = Math.floor(Math.random() * 195) + 60;

    var divindex = Math.floor((Math.random() * rowvalue * rowvalue - 1) + 1);
    var container = document.createElement("div");
    container.id = "main";
    container.style.height = mHeight / 2;
    container.style.width = mWidth / 2;
    container.className = "container";

    for (i = 0; i < rowvalue; i += 1) {
        var row = document.createElement("div");
        row.className = "row";
        row.id = "row" + i;
        row.style.height = mHeight / rowvalue + "px";
        row.style.width = mWidth + rowvalue * 5 + "px";
        row.style.marginTop = "5px";
        row.style.textAlign = 'center';

        for (k = 0; k < rowvalue; k += 1) {
            var box = document.createElement("div");
            box.className = "box";
            box.style.width = mHeight / rowvalue + "px";
            box.style.height = mWidth / rowvalue + "px";
            box.style.marginRight = "5px";
            box.style.lineHeight = mWidth / rowvalue + 'px';
            box.id = "box" + ((i * rowvalue) + k);

            if (((i * rowvalue) + k) == divindex) {

                box.style.textAlign = 'center';
                box.style.backgroundColor = "rgb(" + (randomRed - depth) + "," + (randomGreen - depth) + "," + (randomBlue - depth) + ")";
                depth -= 2;
                box.onclick = function (e) {
                    gameTableDiv.removeChild(container);
                    grid(document.body);
                    rowcondition++;
                    if (rowcondition == 40) {
                        lose();
                    } else {
                        document.getElementById("scoress").innerHTML = "Level:" + rowcondition;
                        document.getElementById("scoress").style.fontWeight = "bold";
                        if (rowcondition % 5 == 0) {
                            rowvalue++;
                        }
                    }
                };
            } else {


                box.style.textAlign = "center";
                box.style.backgroundColor = "rgb(" + randomRed + "," + randomGreen + "," + randomBlue + ")";
            }
            row.appendChild(box);
        };
        container.appendChild(row);
    };
    gameTableDiv.appendChild(container);
}

function lose() {

    document.getElementById("game").style.display = "none";
    document.getElementById("viewport").style.display = "none";
    popupOpenClose($(".popup"));
    var scoreText = document.getElementById("go_score");
    scoreText.innerHTML = timervalue;
    var textValue2 = document.getElementById("textValue");
    textValue2.style.fontWeight = "bold";
    textValue2.style.color = "#D5394C";
    textValue2.innerHTML = textValue;
    var share_text = document.getElementById("share_text");
    share_text.style.fontWeight = "bold";
    share_text.style.color = "#D5394C";
    rowvalue = 3;
}

function popupOpenClose(popup) {

    /* Add div inside popup for layout if one doesn't exist */
    if ($(".wrapper").length == 0) {
        $(popup).wrapInner("<div class='wrapper'></div>");
    }
    /* Open popup */
    $(popup).show();

    /* Close popup if user clicks on background */
   /* $(popup).click(function (e) {
        if (e.target == this) {
            if ($(popup).is(':visible')) {
                $(popup).hide();
            }
        }
    });*/

}

function moreGames() {
    var redirectWindow = window.open('http://sosimplegames.com', '_blank').location;
    redirectWindow.location;
}

$.fn.downCount = function (options, callback) {
    var settings = $.extend({
        date: null,
        offset: null
    }, options);

    // Save container
    var time_container = this;

    /**
     * Change client's local date to match offset timezone
     * @return {Object} Fixed Date object.
     */
    var currentDate = function () {
        // get client's current date
        var date = new Date();

        // turn date to utc
        var utc = date.getTime() + (date.getTimezoneOffset() * 60000);

        // set new Date object
        var new_date = new Date(utc + (3600000 * settings.offset))

        return new_date;
    };

    /**
     * Main downCount function that calculates everything
     */
    var original_date = currentDate();
    var target_date = new Date('12/31/2020 12:00:00'); // Count up to this date

    function onButtonClick() {
        original_date = currentDate();
    }

    function countdown() {
        var current_date = currentDate(); // get fixed current date

        // difference of dates
        var difference = current_date - original_date;

        if (current_date >= target_date) {
            // stop timer
            clearInterval(interval);

            if (callback && typeof callback === 'function') callback();

            return;
        }

        if (timerSwitch) {
            // stop timer
            clearInterval(interval);

            if (callback && typeof callback === 'function') callback();
            timerSwitch = false;
            return;
        }

        // basic math variables
        var _second = 1000,
            _minute = _second * 60,
            _hour = _minute * 60,
            _day = _hour * 24;

        // calculate dates
        var days = Math.floor(difference / _day),
            hours = Math.floor((difference % _day) / _hour),
            minutes = Math.floor((difference % _hour) / _minute),
            seconds = Math.floor((difference % _minute) / _second);

        // fix dates so that it will show two digets
        days = (String(days).length >= 2) ? days : '0' + days;
        hours = (String(hours).length >= 2) ? hours : '0' + hours;
        minutes = (String(minutes).length >= 2) ? minutes : '0' + minutes;
        seconds = (String(seconds).length >= 2) ? seconds : '0' + seconds;

        // based on the date change the refrence wording
        var ref_days = (days === 1) ? 'day' : 'days',
            ref_hours = (hours === 1) ? 'hour' : 'hours',
            ref_minutes = (minutes === 1) ? 'minute' : 'minutes',
            ref_seconds = (seconds === 1) ? 'second' : 'seconds';

        time_container.find('.minutes').text(minutes);
        time_container.find('.seconds').text(seconds);
        timervalue = minutes + ":" + seconds;

        if (seconds > 0 && seconds < 48) {
            textValue = "Cheer..!   you did your best to become the best that you are capable of becoming. Effort to collect more & build up the points!";
        } else if (seconds => 48 && seconds < 58) {
            textValue = "Oake..!   Good Attempt Well played Try to beat as fast as possible to make a record for the highest score.";
        } else if (seconds => 58) {
            textValue = "Whoops...! Retry  Quick play is must to succeed. Now you can play your game again."
        }
    };


    // start
    var interval = setInterval(countdown, 1000);
}

grid(mainElement);
