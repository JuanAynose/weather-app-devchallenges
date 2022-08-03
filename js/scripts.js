import { requestuwu } from "./modules/fetch.js";
const apiKEY = "b8aa5bc08416695fb534f2e3c4245866";
const searchBttnCountry = document.getElementById("search__country");
const menuModal = document.getElementById("bg__modal");
const openModal = document.getElementById("open__modal");
const form = document.getElementById("form");
const containerControl = document.getElementById("container");
const unitConverter = document.getElementById("unit__converter");
let root = document.documentElement;
unitConverter.style.display='none';

const identify = {
    GET:'GET__LOCATION',
    SEND:'REQUEST__DATA'
}

const identifyUnite = {
    CEL:'CELSIUS',
    FAREN:'FAHRENTHEIT'
}
window.addEventListener("load",()=> requestLocation(identify.GET))

const date = new Date();
const [month, day, daynumber] = [date.getMonth(), date.getDate(),date.getDay()];
let monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
let iconNumbers = ['fewclouds','clearsky','clouds','fewclouds','mist','rain','scatteredclouds','showerrain','snow','thunderstorm'];
let weakNames= ['Sun','Mon','Tus','Wed','Thu','Fri','Sat'];
const tempMin = [];
const tempMax = [];
let tempMain=0;

const setdays= () =>{
    let dayCounter=0, count=0, dayReset=0;
    for(const daysFiller of containerControl.children[1].children[1].children){
        tempMax.push(daysFiller.children[2].children[0].children[0].textContent);
        tempMin.push(daysFiller.children[2].children[1].children[0].textContent);
        count+=1;
        dayCounter+=1;
        if(dayCounter+daynumber>6){
            daysFiller.children[0].textContent=`${weakNames[dayReset++]}, ${day+count} ${monthNames[month]}`;
        }else{
            daysFiller.children[0].textContent=`${weakNames[daynumber+count]}, ${day+count} ${monthNames[month]}`;
        }
        let iconsCards = daysFiller.children[1].children[0].src=`../assets/images/${iconNumbers[Math.floor(Math.random() * 6)]}.png`;
    }
    containerControl.children[1].children[1].children[0].children[0].textContent='Tomorrow';
}
const setValues = (data)=>{
    unitConverter.style.display='block';
    data.then(res =>{
        let temp__text__left = containerControl.children[0].children[2].children[0].textContent=res.main.temp.toString().slice(0,2);
        tempMain=res.main.temp;
        let placeName = containerControl.children[0].children[3].children[1].children[1].children[1].textContent =res.name;
        let todayDate = containerControl.children[0].children[3].children[1].children[0].children[0].textContent=`${weakNames[daynumber]}, ${day} ${monthNames[month]}`;
        let textTimeView = res.weather[0].main.replace(/\s+/g, '').toLowerCase();
        let timeView = containerControl.children[0].children[3].children[0].textContent=res.weather[0].main;
        let imageTime = containerControl.children[0].children[1].children[0].src=`../assets/images/${textTimeView}.png`;
        let windSpeed = containerControl.children[1].children[2].children[1].children[0].children[1].children[0].textContent=res.wind.speed;
        let humidityLevels = containerControl.children[1].children[2].children[1].children[1].children[1].children[0].textContent=res.main.humidity; 
        let milesConverter = Number(res.visibility)*0.00062137;
        let visibility = containerControl.children[1].children[2].children[1].children[2].children[1].children[0].textContent=milesConverter.toString().slice(0,3);      
        let airPressure = containerControl.children[1].children[2].children[1].children[3].children[1].children[0].textContent=res.main.pressure;
        root.style.setProperty('--var-lenght-humidity', res.main.humidity +'%' );
        setdays();
    })
}

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    let locationPlace=form.children[0].children[1].value;
    requestLocation({
        SEND:identify.SEND,
        place:locationPlace
    })
    menuModal.children[0].classList.remove("active");
});

searchBttnCountry.addEventListener("click",()=>{
    requestLocation(identify.GET);
});


const requestLocation = (data)=>{
    if(data===identify.GET){
        const success = (position)=>{
            setValues(requestuwu(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKEY}&units=metric`));
        }
        const error=()=> console.log('Unable to retrieve your location');
        navigator.geolocation.getCurrentPosition(success,error);
    }else if(data.SEND===identify.SEND){
        setValues(requestuwu(`https://api.openweathermap.org/data/2.5/weather?q=${data.place}&appid=${apiKEY}&units=metric`));
    }
}

openModal.addEventListener("click",()=>menuModal.children[0].classList.add("active"));
menuModal.addEventListener("click", (e)=>{if(e.target.classList=="button__close") menuModal.children[0].classList.remove("active")});

const modalCountry = document.getElementById("modal__country");
modalCountry.addEventListener("click",(e)=>{
    if(e.target.classList[0]=='country__sugges'){
        let locationPlace=e.target.children[0].textContent;
        requestLocation({
        SEND:identify.SEND,
        place:locationPlace
        });
        menuModal.children[0].classList.remove("active");
    } 
})

const uniteChanger=(guide)=>{
    let count=0;
    if(guide===identifyUnite.CEL){
        containerControl.children[0].children[2].children[0].textContent=Math.round(tempMain);
        containerControl.children[0].children[2].children[1].textContent='°C';
        for(const daysFiller of containerControl.children[1].children[1].children){
            daysFiller.children[2].children[0].children[1].textContent='°C';
            daysFiller.children[2].children[1].children[1].textContent='°C';
            daysFiller.children[2].children[0].children[0].textContent=tempMax[count];
            daysFiller.children[2].children[1].children[0].textContent=tempMin[count];
            count+=1;
        }
    }else if(guide===identifyUnite.FAREN){
        containerControl.children[0].children[2].children[0].textContent=Math.round((tempMain*9/5)+32);
        containerControl.children[0].children[2].children[1].textContent='°F';
        for(const daysFiller of containerControl.children[1].children[1].children){
            daysFiller.children[2].children[0].children[1].textContent='°F';
            daysFiller.children[2].children[1].children[1].textContent='°F';
            daysFiller.children[2].children[0].children[0].textContent=Math.round((tempMax[count]* 9/5) + 32);
            daysFiller.children[2].children[1].children[0].textContent=Math.round((tempMin[count]* 9/5) + 32);
            count+=1;
        }
    }
}

unitConverter.addEventListener("click",(e)=>{
    if(e.target.textContent==="°C"){
        e.target.classList.add("active");
        uniteChanger(identifyUnite.CEL);
        e.target.nextElementSibling.classList.remove("active")
    }else{
        e.target.classList.add("active");
        e.target.previousElementSibling.classList.remove("active")
        uniteChanger(identifyUnite.FAREN);
    }
})