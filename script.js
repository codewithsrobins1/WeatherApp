window.addEventListener('load', () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector('.tempDescription');
  let temperatureDegree = document.querySelector('.degree');
  let locationTimezone = document.querySelector('.locationZone');
  let temperatureSection = document.querySelector('.degreeSection');
  const temperatureSpan = document.querySelector('.degreeSection span')

  if(navigator.geolocation){  //Gets the latitude and longitude of your location
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = 'https://cors-anywhere.herokuapp.com/'; //Proxy to bypass the CORS error
      const api = `${proxy}https://api.darksky.net/forecast/c7c3f9ace27cd1824bb9b0bc06f6050b/${lat},${long}`;

      fetch(api) //Get information from the URL above
        .then(response => {  //Only run the below after info is received
          return response.json(); //Taking the Data and making into a JS Object Notation
        })
        .then(data => {
          const {temperature, summary, icon} = data.currently; //pull all the data from currently (comes from the API object)
          const timezone = data.timezone;

          //Set DOM Elements from the API
          temperatureDegree.textContent = Math.floor(temperature);
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = timezone;
              //FORMULA FOR CELSIUS
              let celsius = (temperature - 32) * (5 / 9);

            //Set Icon
            setIcons(icon, document.querySelector('.icon'))

            //Change temperature to Celsius/Farenheit
            temperatureSection.addEventListener('click', () => {
              if (temperatureSpan.textContent === "F") {
                temperatureSpan.textContent = 'C';
                temperatureDegree.textContent = Math.floor(celsius);
              }
              else{
                temperatureSpan.textContent = 'F';
                temperatureDegree.textContent = Math.floor(temperature);
              }
            })
        });
    });
  }

  function setIcons(icon, iconID){
    const skycons = new Skycons ({color: 'white'});
    const currentIcon = icon.replace(/-/g, "_").toUpperCase(); //replace every line with an underscore
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});
