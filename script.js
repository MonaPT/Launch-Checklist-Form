// Write your JavaScript code here!

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/

window.addEventListener("load", function () {
   document.getElementById("faultyItems").style.display = "none";
 });
 
 document.addEventListener('DOMContentLoaded', function () {
   const astronautsLaunchCheckList = {
     initForm: function (frm) {
       frm.addEventListener('submit', function (event) {
         event.preventDefault();
         event.stopPropagation();
         
         let letters = /^[a-zA-Z]+$/;
         let pilotName = frm.elements.pilotName.value;
         let copilotName = frm.elements.copilotName.value;
         let fuelLevel = frm.elements.fuelLevel.value;
         let cargoMass = frm.elements.cargoMass.value;
         let pilotStatus = document.getElementById('pilotStatus');
         let copilotStatus = document.getElementById('copilotStatus');
         let fuelStatus = document.getElementById('fuelStatus');
         let cargoStatus = document.getElementById('cargoStatus');
         let launchStatus = document.getElementById('launchStatus');
 
 
         if (pilotName === "" || copilotName === "" || fuelLevel === "" || cargoMass === "") {
           alert("All fields are required!");
           // stop the form submission
           event.preventDefault();
         }
         else if (!pilotName.match(letters)) {
           alert("Pilot Name value should be a string");
           event.preventDefault();
         }
         else if (!copilotName.match(letters)) {
           alert("CoPilot Name value should be a string");
           event.preventDefault();
         }
         else if (isNaN(fuelLevel)) {
           alert("Fuel Level value should be a number");
           event.preventDefault();
         }
         else if (isNaN(cargoMass)) {
           alert("Cargo Mass value should be a number");
           event.preventDefault();
         }
         pilotStatus.innerHTML = `<div id="pilotStatus">Pilot, ${pilotName} is ready for launch </div> `;
         
         copilotStatus.innerHTML = `<div id="copilotStatus">Co-Pilot, ${copilotName} is ready for launch </div> `;
 
         if (fuelLevel > 10000 && cargoMass < 10000) {
           fuelStatus.innerHTML = `<div id="fuelStatus">Fuel level high enough for launch </div> `;
           cargoStatus.innerHTML = `<div id="cargoStatus">Cargo mass low enough for launch</div> `;
           launchStatus.innerHTML = `<div id="launchStatus" style="color:green" >Shuttle is ready for launch</div>`;
           document.getElementById("faultyItems").style.display = "block";
         }
         else if (fuelLevel !="" && fuelLevel < 10000) {
           fuelStatus.innerHTML = `<div id="fuelStatus">Fuel Level, ${fuelLevel} too low for launch </div> `;
           launchStatus.innerHTML = `<div id="launchStatus" style="color:red" >Shuttle not ready for launch </div>`;
           document.getElementById("faultyItems").style.display = "block";
         }
         else if (cargoMass!="" && cargoMass > 10000) {
           cargoStatus.innerHTML = `<div id="cargoStatus">Cargo Mass, ${cargoMass} too high for launch </div> `;
           launchStatus.innerHTML = `<div id="launchStatus" style="color:red" >Shuttle not ready for launch </div>`;
           document.getElementById("faultyItems").style.display = "block";
         }
 
       });
     },
   };
 
   astronautsLaunchCheckList.initForm(document.querySelector('form'));
 });
 
 
 fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
   response.json().then(function (json) {
     const div = document.getElementById("missionTarget");
     div.innerHTML = `
     <h2>Mission Destination</h2>
 <ol>
    <li>Name: ${json[4].name}</li>
    <li>Diameter: ${json[4].diameter}</li>
    <li>Star: ${json[4].star}</li>
    <li>Distance from Earth: ${json[4].distance}</li>
    <li>Number of Moons: ${json[4].moons}</li>
 </ol>
 <img  style="width:200px;height:100px;" src=${json[4].image}> `;
   });
 });
 
 