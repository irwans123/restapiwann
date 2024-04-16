
// IP 
window.setTimeout("getip()", 1000);
function getip() {
    var xhr = new XMLHttpRequest();
    var url = 'https://api.ipify.org?format=json';
    xhr.onloadend = function () {
        data = JSON.parse(this.responseText);
        document.getElementById("ip").textContent = data.ip
    };
    xhr.open("GET", url, true);
    xhr.send();
}

// Visitor
function getvisitor(){
    var xhr = new XMLHttpRequest();
    var url = 'https://api.countapi.xyz/hit/restapiwann.vercel.app//visits';
    xhr.onloadend = function(){
    data = JSON.parse(this.responseText);
    document.getElementById("visits").textContent = data.value
    };
    xhr.open("GET", url, true);
    xhr.send();
    }

//ucapan Tiap Hari
Sayings = "";
var now = new Date();
var hours = now.getHours();
if (hours >= 17 || hours <= 2) {
    Sayings += "<span class='text-light'>Selamat malam 🌚</span>"
} else if (hours >= 3 && hours <= 10) {
    Sayings += "<span class='text-info'>Selamat pagi 🌝</span>"
} else if (hours >= 11 && hours <= 14) {
    Sayings += "<span class='text-warning'>Selamat Siang 🌞</span>"
} else if (hours >= 13 && hours <= 16) {
    Sayings += "<span class='text-success'>Selamat Sore 🌜</span>"
}
document.getElementById("Ucapan").innerHTML = Sayings;

// Jam Sekarang
window.setTimeout("waktu()", 1000);
function waktu() {
    var d = new Date();
    var jam = d.getHours();
    var menit = d.getMinutes();
    var detik = d.getSeconds();
    jam = (jam < 10 ? "0" : "") + jam;
    menit = (menit < 10 ? "0" : "") + menit;
    detik = (detik < 10 ? "0" : "") + detik;
    setTimeout("waktu()", 1000);
    document.getElementById("waktu").innerHTML = jam + " : " + menit + " : " + detik;
}

var batteryLevel = document.getElementById("batteryLevel");
var styleBatteryLevel = batteryLevel.style;
var percentageLevel = document.getElementById("percentageLevel");
navigator.getBattery().then(function (battery) {
    function updateAllBatteryInfo() {
        updateLevelInfo();
    }
    updateAllBatteryInfo();
    battery.addEventListener('levelchange', function () {
        setInterval(function () {
            updateLevelInfo()
        }, 1000);
    });
    function updateLevelInfo() {
        var numBattery = battery.level * 100;
        percentageLevel.textContent = Math.round(numBattery) + "%";
        styleBatteryLevel.height = numBattery + "%";
        if (numBattery <= 15) {
            styleBatteryLevel.background = "red";
        }
    };
});

// User Agent
myMonths = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
myDays = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jum at', 'Sabtu'];
var tgl = new Date();
var day = tgl.getDate()
bulan = tgl.getMonth()
var thisDay = tgl.getDay(),
    ThisDay = myDays[thisDay];
var yy = tgl.getYear()
var year = (yy < 1000) ? yy + 1900 : yy;

const tanggal = `${ThisDay}, ${day} - ${myMonths[bulan]} - ${year}`

document.getElementById("Years").innerHTML = year;
document.getElementById("tanggal").innerHTML = tanggal;



// Count Down Idul Adha
var countDownDate = new Date("July 19, 2021 00:00:00").getTime();

var x = setInterval(function () {
    var now = new Date().getTime();
    var distance = countDownDate - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("IdulAdha").innerHTML = days + " Days " + hours + " Hours "
        + minutes + " Min " + seconds + " Sec ";
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("IdulAdha").innerHTML = "Selamat Hari Raya Idul Adha ";
    }
}, 1000);