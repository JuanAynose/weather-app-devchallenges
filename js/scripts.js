const apiKEY = "c64e9f5ab42d3150162d746b4d7ac4b2";
const searchBttnCountry = document.getElementById("search__country");
const menuModal = document.getElementById("bg__modal");
const openModal = document.getElementById("open__modal");
const form = document.getElementById("form");
const containerControl = document.getElementById("container");

const identify = {
    GET:'GET__LOCATION',
    SEND:'REQUEST__DATA'
}

const date = new Date();
const [month, day]       = [date.getMonth(), date.getDate()];
console.log(date)
let monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
let weakNames= ['Mon','Tus','Wed','Thu','Fri','Sat','Sun'];

const setValues = (res)=>{
    console.log(containerControl.children[0].children[3].children[0])
    //let temp__text__left = containerControl.children[0].children[2].children[0];
    //let temp__unite__left = containerControl.children[0].children[2].children[1];
    let placeName = containerControl.children[0].children[3].children[1].children[1].children[1].textContent =res.name;
    let todayDate = containerControl.children[0].children[3].children[1].children[0].children[0].textContent=`${weakNames[day+1]}, ${day} ${monthNames[month]}`;
    //let image
    let textTimeView = res.weather[0].main.replace(/\s+/g, '').toLowerCase();
    let timeView = containerControl.children[0].children[3].children[0].textContent=res.weather[0].main;
    let imageTime = containerControl.children[0].children[1].children[0].src=`../assets/images/${textTimeView}.png`;
    console.log(textTimeView);
    console.log(res);
}

const catchError = (err)=> console.log(err);

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    let locationPlace=form.children[0].children[1].value;
    requestLocation({
        SEND:identify.SEND,
        place:locationPlace
    })
});


searchBttnCountry.addEventListener("click",()=>{
    requestLocation(identify.GET);
});

const request =(url)=>{
    fetch(url)
        .then(res => res.ok ? Promise.resolve(res) : Promise.reject(res))
        .then(res => res.json())
        .then(setValues)
        .catch(catchError)
}

const requestLocation = (data)=>{
    if(data===identify.GET){
        const success = (position)=>{
            request(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKEY}`);
        }
        const error=()=> console.log('Unable to retrieve your location');
        navigator.geolocation.getCurrentPosition(success,error)
    }else if(data.SEND===identify.SEND){
        request(`https://api.openweathermap.org/data/2.5/weather?q=${data.place}&appid=${apiKEY}`);
    }
}

openModal.addEventListener("click",()=>menuModal.children[0].classList.add("active"));
menuModal.addEventListener("click", (e)=>{if(e.target.classList=="button__close") menuModal.children[0].classList.remove("active")});