/**
 * Created by  Naveed-ul-Hassan Malik on 8/26/2015.
 * This file extends basic javascript objects
 */
String.prototype.capitalize = function () {
    return this.replace(
        /\w\S*/g,
        function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}
    );
};

Number.prototype.isBetween = function (min, max, notInclusive) {
    if( notInclusive ){
        return this > min && this < max;
    }
    return this >= min && this <= max;
};

if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(searchElement, fromIndex) {
        var k;

        if (this == null) {
            throw new TypeError('"this" is null or not defined');
        }

        var O = Object(this);

        var len = O.length >>> 0;

        if (len === 0) {
            return -1;
        }

        var n = +fromIndex || 0;

        if (Math.abs(n) === Infinity) {
            n = 0;
        }

        if (n >= len) {
            return -1;
        }

        k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

        while (k < len) {
            if (k in O && O[k] === searchElement) {
                return k;
            }
            k++;
        }
        return -1;
    };
}

Array.prototype.remove = function (value){
    var index = this.indexOf(value);
    if(index != -1) this.splice(index,1);
};

if (!Array.prototype.filter) {
    Array.prototype.filter = function(fun/*, thisArg*/) {
        'use strict';

        if (this === void 0 || this === null) {
            throw new TypeError();
        }

        var t = Object(this);
        var len = t.length >>> 0;
        if (typeof fun !== 'function') {
            throw new TypeError();
        }

        var res = [];
        var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
        for (var i = 0; i < len; i++) {
            if (i in t) {
                var val = t[i];

                // NOTE: Technically this should Object.defineProperty at
                //       the next index, as push can be affected by
                //       properties on Object.prototype and Array.prototype.
                //       But that method's new, and collisions should be
                //       rare, so use the more-compatible alternative.
                if (fun.call(thisArg, val, i, t)) {
                    res.push(val);
                }
            }
        }

        return res;
    };
}

Array.prototype.findOne = function (callback) {
    var result = this.filter(callback);
    if( result.length > 0 ) return result[0];
    return null;
};

Array.prototype.hasItem = function (item) {
    return this.indexOf(item) !== -1;
};

Date.getUniformDate = function (dateStr) {
    var dateTime = dateStr.split(" ");
    var datePart = dateTime[0];
    var timePart = dateTime[1];
    var dateArr = datePart.split("-");
    var timeArr = timePart.split(":");
    var y = parseInt(dateArr[0]);
    var m = parseInt(dateArr[1]) - 1;
    var d = parseInt(dateArr[2]);
    var h = parseInt(timeArr[0]);
    var min = parseInt(timeArr[1]);
    var s = parseInt(timeArr[2]);
    return new Date(y, m, d, h, min, s);
};

Date.prototype.mySqlFormat = function () {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) dd='0'+dd;
    if(mm<10) mm='0'+mm;

    return yyyy+'-'+mm+'-'+dd;
};

Date.prototype.isFutureDate = function () {
    var diff = this - new Date( Date.now() + 5*60*60*1000 );
    return diff > 0;
};

Date.monthsList = function () {
    return ['January','February','March','April','May','June',
        'July','August','September','October','November','December'];
};