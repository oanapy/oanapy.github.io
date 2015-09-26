//geolocation and coordinates processing

    var someData;
    var someURL = '//api.openweathermap.org/data/2.5/weather?';
    var someURL2 = '//api.forecast.io/forecast/';
    var latitude;
    var longitude;
    var latlon;
    var myPosition;
    var APIKEY = 'be2684fca3f5fe4d839a33af3e767e7b';
    var x = document.getElementById("demo");


    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(showPosition, showError);
        } else {
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    }
    getLocation();

    function showPosition(position) {
        myPosition = position;
        latitude = myPosition.coords.latitude;
        longitude = myPosition.coords.longitude;
        latlon = latitude + "," + longitude;
        var skycons = new Skycons({"color": "black"});
        $.ajax({
            type: "GET",
            crossDomain: true,
            dataType: 'jsonp',
            url: someURL2  + APIKEY + "/" + latitude + "," + longitude + "?units=si",
            data: someData,
            success: function (data) {
                //show the current temp based on your current location
                document.getElementById("demo").innerHTML = data.currently.temperature + " " + data.timezone;
                skycons.add(document.getElementById("icon1"), data.currently.icon);
            }
        });
        skycons.play();
    }

    function showError(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                x.innerHTML = "User denied the request for Geolocation.";
                $("#askw").show();
                break;
            case error.POSITION_UNAVAILABLE:
                x.innerHTML = "Location information is unavailable.";
                $("#askw").show();
                break;
            case error.TIMEOUT:
                x.innerHTML = "The request to get user location timed out.";
                $("#askw").show();
                break;
            case error.UNKNOWN_ERROR:
                x.innerHTML = "An unknown error occurred.";
                $("#askw").show();
                break;
        }
    }

//for submitting your own location
    function weatherize() {
        someData = {
            "city": $('#cty').val()
        };
        $.ajax({
            type: "GET",
            crossDomain: true,
            dataType: 'jsonp',
            url: someURL + "q=" + someData.city + "&units=metric",
            data: someData,
            success: function (data) {
                //show the current temp if a location is entered
                document.getElementById("demo").innerText = data.main.temp;
                //show an icon
                document.getElementById("icons").src = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
            }
        });
    }


/*
it works with
 http://openweathermap.org/current and http://forecast.io

    */

