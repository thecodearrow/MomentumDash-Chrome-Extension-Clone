
$(function(){

    if(localStorage.getItem("image_url") !== undefined && localStorage.getItem("image_url") !== null && !checkDateChange()){
        $('body').css('background-image', 'url(\'' + localStorage.getItem("image_url") + '\')');
        $('#background-credits').html('Photo by <a href='+localStorage.getItem('photographerLink')+' target="_blank">'+localStorage.getItem('photographer')+'</a>'+'<span> / <a href="https://unsplash.com/?utm_source=WallCat&utm_medium=referral&utm_campaign=api-credit" target="_blank">Unsplash</a></span>');
    }
    else{
        // Call Unsplash Api
        fetchBackgroundImageApi();
    }

    // Fetch background image from unsplash api
    function fetchBackgroundImageApi(){
        var client_id = "83c80e092854b3f17eca50afc37066bfe3ef42b88464ed4cd6132880d3dfb301";
        var url = "https://api.unsplash.com/photos/random/?query=nature&orientation=landscape&client_id=" + client_id;

         $.get(url,function(data){
                var raw_url = data.urls.raw;
                var query_string = "?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=srgb&fit=max&h=1080&orientation=landscape";
                var image_url = raw_url + query_string;
                var newDate = new Date();
                newDate.setHours(0,0,0,0);
                localStorage.setItem('saveDate', newDate);
                localStorage.setItem('image_url', image_url);
                $('body').css('background-image', 'url(\'' + image_url + '\')');

                //fetching image credit
                var photographerUsername = data.user.username;
                var utm_parameters = "?utm_source=WallCat&utm_medium=referral&utm_campaign=api-credit";
                var photographerLink = "https://unsplash.com/@" + photographerUsername + utm_parameters;
                var photographer = data.user.name;
                localStorage.setItem('photographerLink', photographerLink);
                localStorage.setItem('photographer', photographer);
                $('#background-credits').html('Photo by <a href='+photographerLink+' target="_blank">'+photographer+'</a>'+'<span> / <a href="https://unsplash.com/?utm_source=WallCat&utm_medium=referral&utm_campaign=api-credit" target="_blank">Unsplash</a></span>');

            }).fail(function(){
                //------------fetch image from local storage if api call fails
                $('body').css('background-image', 'url(\'' + localStorage.getItem("image_url") + '\')');
                //------------fetch attribution from local storage if api call fails
                $('#background-credits').html('Photo by <a href='+localStorage.getItem('photographerLink')+' target="_blank">'+localStorage.getItem('photographer')+'</a>'+'<span> / <a href="https://unsplash.com/?utm_source=WallCat&utm_medium=referral&utm_campaign=api-credit" target="_blank">Unsplash</a></span>');
            });
    }

    // Display Time function
    setInterval(function displayTime(){
        var curTime = new Date();
        var hour = curTime.getHours();
        var min  = curTime.getMinutes();
        var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
        var month = monthNames[curTime.getMonth()];
        var curDate = curTime.getDate();
        var year = curTime.getFullYear();
        if(min<=9){
            min = "0" + min;
        }
        if(hour<=9){
            hour = "0" + hour;
        }
        if(curDate<=9){
            curDate = "0" + curDate;
        }
        $('#time').text(hour + ":" + min);
        $('#date').text(month + ","+ curDate + "," + year);
    }, 1000);


    // Date change check function
    function checkDateChange(){
        var today = new Date();
        today.setHours(0,0,0,0);

        if(localStorage.getItem('saveDate') !== undefined && localStorage.getItem('saveDate') !== null){
            if(today > Date.parse(localStorage.getItem('saveDate'))){
                return true;
            }
            else{
                return false;
            }
        }
        else{
            return true;
        }
    }

    //Fetching Quotes from  API

    if(localStorage.getItem("currentQuote") !== undefined && localStorage.getItem("currentQuote") !== null && !checkDateChange()){
        
                $('#quoteblock').text(localStorage.getItem('currentQuote'));
                $('#author').text(localStorage.getItem('currentAuthor'));
                
            }
    else{
        // Call Forismatic Api
        fetchQuotesAPI();
    }

    function fetchQuotesAPI(){
        
                var url = 'https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?';
                $.getJSON(url, function(data) {
        
        
                    var currentQuote=data.quoteText;
                    var currentAuthor=data.quoteAuthor;
                    localStorage.setItem('currentQuote',currentQuote);
                    localStorage.setItem('currentAuthor',currentAuthor);
                    $('#quoteblock').text(currentQuote);
                    $('#author').text(currentAuthor);
                        
                    });
        
            }
    
    var todoToggle = document.getElementById("todo-toggle");
    todoToggle.addEventListener('click', function(e){
            $(".todoDiv").toggle();
    });
});


//Get location coordinates and pass them to the weather api
$.ajax({
    type:"POST",
    url:"https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyC0ve5-5CTwhnC53Vr94CYh3uMobXVIZc8",
    success:getWeatherData
});

//Get weather info and display them
function getWeatherData(data){

  console.log(data.location.lat);
  console.log(data.location.lng);

  $.ajax({
    url:"http://api.openweathermap.org/data/2.5/weather?lat="+data.location.lat+"&lon="+data.location.lng+"&units=metric"+"&APPID=722ffba8410bf98859daabb4beb54f09",
    success:function(weatherData){
        var imageURL = "http://openweathermap.org/img/w/"+ weatherData.weather[0].icon + ".png";
        $('#weather-info').html("<img src=" + imageURL + " align='middle' margin-right=50px>"+weatherData.main.temp + String.fromCharCode(176));
        $('#weather-location').html(weatherData.name);
    }
  });
}




    

