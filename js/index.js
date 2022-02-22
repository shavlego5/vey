//currency dropdown button. replace current currency
function choosCurrency(event) {
  let defaultCurrency = document.getElementById("default-currency");
  let defaultFlag = defaultCurrency.children[0].getAttribute("src");
  let defaultSymbol = defaultCurrency.children[1].getAttribute("src");
  let currentFlag = event.target.children[0].getAttribute("src");
  let currentSymbol = event.target.children[1].getAttribute("src");

  defaultCurrency.children[0].removeAttribute("src");
  defaultCurrency.children[1].removeAttribute("src");
  defaultCurrency.children[0].setAttribute("src", currentFlag);
  defaultCurrency.children[1].setAttribute("src", currentSymbol);
  event.target.children[0].setAttribute("src", defaultFlag);
  event.target.children[1].setAttribute("src", defaultSymbol);
}

//make a listing button hover effect

let listing = document.querySelector(".listing");
let y = listing.offsetWidth;

//detect mouse x coordinates on hovered item
function checkMouseCoords(event) {
  let x = event.target.getBoundingClientRect();
  let xx = event.clientX - x.left;
  let yy = Math.floor((xx * 100) / y);
  //add background on hover
  listing.style.background = `linear-gradient(45deg,rgba(88,60,240,1)  0%, rgba(191,127,208,1) ${yy}%, rgba(157,80,255,1) 100%)`;
}

//change img on hover - (white)
listing.addEventListener("mouseenter", () => {
  listing.children[0].setAttribute("src", "images/pencil (1).png");
});

//return old background when mouse is out of hover
listing.addEventListener("mouseleave", () => {
  listing.style.background = "#ffffff";
  //return old image - (black)
  listing.children[0].setAttribute("src", "images/pencil.png");
});

// menu button

let menuB = document.getElementById("menu-button");
let menuContainer = document.getElementById("menu");
let menu = 2;

function toggleMenu() {
  if (menu % 2 === 0) {
    //open menu container
    menuB.children[1].style.transform = "translateX(170px)";
    menuB.children[0].style.transform = "rotate(-45deg) translate(3px, -3px)";
    menuB.children[2].style.transform = "rotate(45deg)";

    menuContainer.style.marginLeft = "0%";
  } else {
    //close menu container
    menuB.children[0].style.transform = "rotate(0deg) translate(0px, 0px)";
    menuB.children[2].style.transform = "rotate(0deg)";
    menuB.children[1].style.transform = "translateX(0px)";

    menuContainer.style.marginLeft = "-100%";
  }
  menu++;
}

//choos appartments. make clicked element active

let deals = document.querySelectorAll(".deals div");

for (let i = 0; i < deals.length; i++) {
  deals[i].addEventListener("click", (event) => {
    for (let i = 0; i < deals.length; i++) {
      deals[i].classList.remove("active");
      //replace dark icons with with icons
      deals[i].children[0].setAttribute(
        "src",
        deals[i].children[0].getAttribute("src").replace("-0.png", ".png")
      );
    }
    event.currentTarget.classList.add("active");
    //return dark icons
    event.currentTarget.children[0].setAttribute(
      "src",
      event.currentTarget.children[0]
        .getAttribute("src")
        .replace(".png", "-0.png")
    );
  });
}

let recent = document.getElementById("recent");
let locInput = document.getElementById("location-input");
let recents = document.querySelectorAll(".location-list div h4");
let locationName = document.getElementById("location-name");
let cover = document.getElementById("cover");
let locInputFull;

//open location search
function openRecent() {
  recent.style.opacity = "1";
  recent.style.pointerEvents = "inherit";
  locInput.focus();
  if (window.innerWidth <= 424) {
    openDark();
  }
}

//close location search
function closeRecent() {
  recent.style.opacity = "0";
  recent.style.pointerEvents = "none";
  locInput.blur();
  if (locationName.innerHTML === "Where to stay") clearSearch();
  if (window.innerWidth <= 424) {
    closeDark();
  }
}

function locationI(event) {
  //choose city from dropdown list
  locInput.value = event.currentTarget.children[1].innerHTML;
  locInputFull = event.currentTarget.innerHTML;
  locationName.innerHTML = locInput.value;
  console.log(locInputFull);
  setMobileResult();
  filter(); //refilter dropdown after choose city
  closeRecent();
  if (window.innerWidth <= 424) {
    closeDark();
  }
  if (window.innerWidth <= 824) {
    openCategory();
    if (window.innerWidth <= 424) {
      openDark();
    }
  }
}

function filter() {
  // filter dropdown list by typing letters in search bar
  let searched = locInput.value.toUpperCase(); //get value from input field in upper case
  for (let i = 0; i < recents.length; i++) {
    //check if typed letters contains in dropdown list
    if (recents[i].innerHTML.toUpperCase().indexOf(searched) > -1) {
      // if contains
      recents[i].parentNode.style.display = "";
      if (locInput.value.length === 0) {
        //behind text in input
        cover.value = "";
      } else {
        cover.value = recents[i].innerHTML;
      }
    } else {
      // if not remove it
      recents[i].parentNode.style.display = "none";
    }
  }
}

function clearSearch() {
  locInput.value = "";
  filter();
}

function keyEnter(event) {
  if (event.code === "Enter") {
    //checks whether the pressed key is "Enter"

    recents.forEach((key) => {
      if (key.innerHTML.toUpperCase() === locInput.value.toUpperCase()) {
        locationName.innerHTML = locInput.value;
        locInputFull = event.currentTarget.innerHTML;
        setMobileResult();
        closeRecent();
        if (window.innerWidth <= 424) {
          closeDark();
        }
        if (window.innerWidth <= 824) {
          openCategory();
          if (window.innerWidth <= 424) {
            openDark();
          }
        }
      }
    });
  }
}

// calendar

let calendar = document.getElementById("calendar");

function showCalendar() {
  calendar.style.opacity = "1";
  calendar.style.pointerEvents = "inherit";
  if (window.innerWidth <= 424) {
    openDark();
  }
}

function hideCalendar() {
  calendar.style.opacity = "0";
  calendar.style.pointerEvents = "none";
  if (window.innerWidth <= 424) {
    closeDark();
  }
}

let count = document.getElementsByClassName("counter");

for (let i = 0; i < count.length; i++) {
  count[i].children[0].setAttribute("onclick", "reduce(event)");
  count[i].children[2].setAttribute("onclick", "increase(event)");
}

function reduce(event) {
  let x = Number(event.target.parentNode.children[1].textContent);
  if (x > 1) {
    x--;
    event.target.parentNode.children[1].innerHTML = x;
  } else {
    x--;
    event.target.parentNode.children[1].innerHTML = x;
    event.target.setAttribute("disabled", true);
  }
}

let roommNumber = 1;

function increase(event) {
  event.target.parentNode.children[0].removeAttribute("disabled");
  let x = Number(event.target.parentNode.children[1].textContent);
  x++;
  event.target.parentNode.children[1].textContent = x;
}

let guest = document.getElementById("guest");
let persons = document.getElementById("persons");
let guestContent = persons.innerHTML;
function addRoom() {
  persons.innerHTML += guestContent;
  roommNumber++;
  persons.children[4 * (roommNumber - 1)].innerHTML = "Room " + roommNumber;
}

function showGuest() {
  guest.style.opacity = "1";
  guest.style.pointerEvents = "inherit";
  if (window.innerWidth <= 424) {
    openDark();
  }
}

function hideGuest() {
  guest.style.opacity = "0";
  guest.style.pointerEvents = "none";
  if (window.innerWidth <= 424) {
    closeDark();
  }
}

//creating pink dots circle

let dotsTop = document.getElementById("dots-top");
let dotsBottom = document.getElementById("dots-bottom");

for (let i = 0; i < 12 * 18; i++) {
  let div = document.createElement("div");
  dotsTop.appendChild(div);
}

for (let i = 0; i < 12 * 18; i++) {
  let div = document.createElement("div");
  dotsBottom.appendChild(div);
}

let dotsTopM = document.getElementById("dots-top-mobile");
let dotsBottomM = document.getElementById("dots-bottom-mobile");

for (let i = 0; i < 12 * 18; i++) {
  let div = document.createElement("div");
  dotsTopM.appendChild(div);
}

for (let i = 0; i < 12 * 18; i++) {
  let div = document.createElement("div");
  dotsBottomM.appendChild(div);
}

//top destination's carosel

let carousel = document.getElementById("carousel");
let items = document.getElementsByClassName("carousel-item");
let nextB = document.getElementById("next0");
let prevB = document.getElementById("prev");
let firstItem = document.getElementsByClassName("first-item");
let itemsCount = items.length;
let counter = 3;

function next() {
  let width = 445;
  if (window.innerWidth < 1000) {
    width = 300;
  }
  counter++;
  if (counter === itemsCount - 2) {
    nextB.setAttribute("disabled", true);
  }
  prevB.removeAttribute("disabled");
  for (let i = 0; i < itemsCount; i++) {
    items[i].style.transform = `translateX(${-(counter - 3) * width}px)`;
  }
  firstItem[0].nextElementSibling.classList.add("first-item");
  firstItem[1].previousElementSibling.classList.remove("first-item");
}

function prev() {
  let width = 445;
  if (window.innerWidth < 1000) {
    width = 300;
  }
  counter--;
  if (counter === 1) {
    prevB.setAttribute("disabled", true);
  }
  nextB.removeAttribute("disabled");
  for (let i = 0; i < itemsCount; i++) {
    items[i].style.transform = `translateX(${-(counter - 3) * width}px)`;
  }
  if ((firstItem.length = 1)) {
    firstItem[0].previousElementSibling.classList.add("first-item");
  }
  firstItem[0].nextElementSibling.classList.remove("first-item");
}

// customer carousel

let visibleItems = 3;
if (window.innerWidth <= 640) {
  visibleItems = 2;
} else if (window.innerWidth <= 824) {
  visibleItems = 2;
} else if (window.innerWidth <= 1024) {
  visibleItems = 2;
}
let customerItem = document.getElementsByClassName("customer-item");
let customerPrev = document.getElementById("prev-1");
let customerNext = document.getElementById("next-1");
let itemWidth = customerItem[0].offsetWidth;

customerPrev.style.opacity = ".5";
customerPrev.setAttribute("disabled", true);

let customerCounter = 0;

customerItem[visibleItems].style.opacity = ".5";

function next1() {
  customerPrev.style.opacity = "1";
  customerPrev.removeAttribute("disabled");
  if (customerCounter === customerItem.length - visibleItems - 1) {
    customerNext.style.opacity = ".5";
    customerNext.setAttribute("disabled", true);
  }
  if (customerCounter != customerItem.length - visibleItems) {
    customerCounter++;
    for (let i = 0; i < customerItem.length; i++) {
      customerItem[i].style.transform = `translateX(-${
        itemWidth * customerCounter + 40 * customerCounter
      }px)`;
    }
    customerItem[customerCounter - 1].style.opacity = ".5";
    customerItem[visibleItems + customerCounter - 1].style.opacity = "1";
    customerItem[visibleItems + customerCounter].style.opacity = ".5";
  }
}

function prev1() {
  customerNext.style.opacity = "1";
  customerNext.removeAttribute("disabled");
  if (customerCounter === 1) {
    customerPrev.style.opacity = ".5";
    customerPrev.setAttribute("disabled", true);
  }
  if (customerCounter > 0) {
    customerItem[customerCounter - 1].style.opacity = "1";
    customerItem[visibleItems + customerCounter - 1].style.opacity = ".5";
    if (customerCounter + visibleItems < customerItem.length) {
      customerItem[visibleItems + customerCounter].style.opacity = "1";
    }
    customerCounter--;
    for (let i = 0; i < customerItem.length; i++) {
      customerItem[i].style.transform = `translateX(-${
        itemWidth * customerCounter + 40 * customerCounter
      }px)`;
    }
  }
}

//touch screen carousel navigation

let roomImages = document.getElementById("room-images");
let customerCarousel = document.querySelector(".customer-carousel");

function mobileSearch() {
  openRecent();
  if (window.innerWidth <= 424) {
    openDark();
  }
}

let category = document.getElementById("looking-for");

function openCategory() {
  category.style.opacity = "1";
  category.style.pointerEvents = "inherit";
  if (window.innerWidth <= 424) {
    openDark();
  }
}

function closeCategory() {
  category.style.opacity = "0";
  category.style.pointerEvents = "none";
  // showCalendar();
  if (window.innerWidth <= 424) {
    closeDark();
  }
}

let mobileResult = document.getElementById("mobile-result");

function setMobileResult() {
  mobileResult.innerHTML = locInputFull;
}

function butt() {
  let coma = document.getElementsByClassName("pmu-month");
  setInterval(() => {
    for (let i = 0; i < coma.length; i++) {
      coma[i].addEventListener("click", () => {
        for (let i = 0; i < coma.length; i++) {
          coma[i].textContent = coma[i].textContent.replace(",", "");
        }
      });
      coma[i].textContent = coma[i].textContent.replace(",", "");

      coma[i].innerHTML = coma[i].innerHTML + `<img src="images/dwn.png">`;
    }
  }, 200);
  setInterval(() => {
    let selected = document.getElementsByClassName("pmu-selected");
    for (let i = 0; i < selected.length; i++) {
      selected[i].classList.add("selected");
    }
  }, 200);
}

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let mont = [];
let day = [];
let year = [];

window.addEventListener("load", () => {
  butt();

  let pmuPrev = document.querySelectorAll(".pmu-prev");
  for (let i = 0; i < pmuPrev.length; i++) {
    pmuPrev[i].innerHTML = "";
    let prev = document.createElement("img");
    prev.setAttribute("src", "images/Stroke 1.png");
    pmuPrev[i].appendChild(prev);
  }

  let pmuNext = document.querySelectorAll(".pmu-next");
  for (let i = 0; i < pmuNext.length; i++) {
    pmuNext[i].innerHTML = "";
    let next = document.createElement("img");
    next.setAttribute("src", "images/Stroke 2.png");
    pmuNext[i].appendChild(next);
  }

  setInterval(() => {
    let sel = document.querySelectorAll(".pmu-days .pmu-selected");
    let x = 0;
    for (let i = 0; i < sel.length; i++) {
      if (sel[i].classList.contains("pmu-not-in-month")) {
      } else {
        sel[i].setAttribute("id", `x${x}`);
        x++;
      }
    }
    setTimeout(() => {
      let y = document.getElementById("x0");
      let z = document.getElementById(`x${x - 1}`);
      y.style.background = "#f0f1f3 url(images/Ellipse.png) no-repeat";
      y.style.backgroundSize = "70%";
      y.style.backgroundPosition = "center";
      y.style.color = "white";
      y.style.fontWeight = "bolder";
      y.style.borderTopLeftRadius = "12px";
      y.style.borderBottomLeftRadius = "12px";
      z.style.background = "red";

      z.style.background = "#f0f1f3 url(images/Ellipse.png) no-repeat";
      z.style.backgroundSize = "70%";
      z.style.backgroundPosition = "center";
      z.style.color = "white";
      z.style.fontWeight = "bolder";
      z.style.borderTopRightRadius = "12px";
      z.style.borderBottomRightRadius = "12px";
    }, 90);
    let nightsCount = document.getElementById("nights-count");
    nightsCount.innerHTML = x + " Nights";
    setTimeout(() => {
      let days = document.querySelectorAll(".pmu-days .pmu-button");

      for (let i = 0; i < days.length; i++) {
        days[i].setAttribute("onclick", "getDate(event)");
      }
    }, 100);
  }, 100);
});

function getDate(event) {
  if (mont.length === 2) {
    for (var i = mont.length; i > 0; i--) {
      mont.pop();
    }
  }
  if (day.length === 2) {
    for (var i = day.length; i > 0; i--) {
      day.pop();
    }
  }
  if (year.length === 2) {
    for (var i = year.length; i > 0; i--) {
      year.pop();
    }
  }
  let firstDate = event.target.innerHTML;
  let month;
  let k = event.target.parentNode.parentNode.children[0].children[1].innerHTML;
  for (let i = 0; i < months.length; i++) {
    if (k.startsWith(months[i])) month = i + 1;
  }

  let y = k.replace('<img src="images/dwn.png">', "").substr(-4);
  mont.push(month);
  day.push(firstDate);
  year.push(y);

  if (year.length === 2) setDate();
}

let from = [];
let until = [];

function setDate() {
  from = [];
  until = [];
  if (Number(mont[0]) > Number(mont[1])) {
    from.push(day[1]);
    from.push(mont[1]);
  } else if (Number(mont[0]) < Number(mont[1])) {
    from.push(day[0]);
    from.push(mont[0]);
  } else {
    if (Number(day[0]) >= Number(day[1])) {
      from.push(day[1]);
    } else {
      from.push(day[0]);
    }
    from.push(mont[0]);
  }

  if (Number(mont[0]) > Number(mont[1])) {
    until.push(day[0]);
    until.push(mont[0]);
  } else if (Number(mont[0]) < Number(mont[1])) {
    until.push(day[1]);
    until.push(mont[1]);
  } else {
    if (Number(day[0]) >= Number(day[1])) {
      until.push(day[0]);
    } else {
      until.push(day[1]);
    }
    until.push(mont[1]);
  }

  if (Number(year[0] >= Number(year[1]))) {
    from.push(year[0]);
  } else {
    from.push(year[1]);
  }
  if (Number(year[0] >= Number(year[1]))) {
    until.push(year[1]);
  } else {
    until.push(year[0]);
  }

  console.log(from);

  document.getElementById("from").innerHTML = from.join(".");
  document.getElementById("until").innerHTML = until.join(".");
}

let result = document.querySelectorAll("#mobile-result");

function clearData() {
  document.getElementById("from").innerHTML = "Add date";
  document.getElementById("until").innerHTML = "Add date";
  clearSearch();
  result[0].innerHTML = "";
  result[1].innerHTML = "";
  hideCalendar();
  closeRecent();
  hideGuest();
  if (window.innerWidth <= 424) {
    closeDark();
  }
}

function nextSearch() {
  let tve = "";
  if (from[1] !== until[1]) {
    tve = months[until[1] - 1];
  }

  result[1].innerHTML = result[0].innerHTML;
  let container = `${months[from[1] - 1]} ${from[0]} - ${tve} ${until[0]}`;

  if (document.getElementById("from").innerHTML != "Add date") {
    result[1].children[3].innerHTML = container;
    hideCalendar();
    showGuest();
    if (window.innerWidth <= 424) {
      openDark();
    }
  } else {
    alert("Please choose date");
  }
}

function search() {
  hideCalendar();
  closeRecent();
  hideGuest();
  if (window.innerWidth <= 424) {
    closeDark();
  }
}

roomImages.addEventListener("touchstart", handleTouchStart0, false);
roomImages.addEventListener("touchmove", handleTouchMove0, false);

let xDown0 = null;
let yDown0 = null;

function getTouches0(evt) {
  return (
    evt.touches || // browser API
    evt.originalEvent.touches
  ); // jQuery
}

function handleTouchStart0(evt) {
  const firstTouch = getTouches0(evt)[0];
  xDown0 = firstTouch.clientX;
  yDown0 = firstTouch.clientY;
}

let roomCounter = 1;
let roomWidth = roomImages.children[0].offsetWidth;

function handleTouchMove0(evt) {
  if (!xDown0 || !yDown0) {
    return;
  }

  let xUp = evt.touches[0].clientX;
  let yUp = evt.touches[0].clientY;

  let xDiff = xDown0 - xUp;
  let yDiff = yDown0 - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    /*most significant*/
    if (xDiff > 0) {
      /* right swipe */

      if (window.innerWidth < 424) {
        if (roomCounter != 4) {
          roomImages.style.transform = `translateX(-${
            roomWidth * roomCounter + 50
          }px)`;
          roomCounter++;
        }
      } else if (window.innerWidth < 645) {
        if (roomCounter != 4) {
          roomImages.style.transform = `translateX(-${
            roomWidth * roomCounter
          }px)`;
          roomCounter++;
        }
      } else if (window.innerWidth < 824) {
        if (roomCounter != 3) {
          roomImages.style.transform = `translateX(-${
            roomWidth * roomCounter
          }px)`;
          roomCounter++;
        }
      } else if (window.innerWidth < 1030) {
        if (roomCounter != 2) {
          roomImages.style.transform = `translateX(-${
            roomWidth * roomCounter
          }px)`;
          roomCounter++;
        }
      }
    } else {
      /* left swipe */

      if (roomCounter != 1 && window.innerWidth <= 1024) {
        roomCounter--;
        roomImages.style.transform = `translateX(-${
          roomWidth * (roomCounter - 1)
        }px)`;
      }
    }
  } else {
    if (yDiff > 0) {
      /* down swipe */
    } else {
      /* up swipe */
    }
  }
  /* reset values */
  xDown0 = null;
  yDown0 = null;
}

customerCarousel.addEventListener("touchstart", handleTouchStart, false);
customerCarousel.addEventListener("touchmove", handleTouchMove, false);

let xDown = null;
let yDown = null;

function getTouches(evt) {
  return (
    evt.touches || // browser API
    evt.originalEvent.touches
  ); // jQuery
}

function handleTouchStart(evt) {
  const firstTouch = getTouches(evt)[0];
  xDown = firstTouch.clientX;
  yDown = firstTouch.clientY;
}

function handleTouchMove(evt) {
  if (!xDown || !yDown) {
    return;
  }

  let xUp = evt.touches[0].clientX;
  let yUp = evt.touches[0].clientY;

  let xDiff = xDown - xUp;
  let yDiff = yDown - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    /*most significant*/
    if (xDiff > 0) {
      /* right swipe */
      customerNext.click();
    } else {
      /* left swipe */
      customerPrev.click();
    }
  } else {
    if (yDiff > 0) {
      /* down swipe */
    } else {
      /* up swipe */
    }
  }
  /* reset values */
  xDown = null;
  yDown = null;
}

carousel.addEventListener("touchstart", handleTouchStart1, false);
carousel.addEventListener("touchmove", handleTouchMove1, false);

let xDown1 = null;
let yDown1 = null;

function getTouches1(evt) {
  return (
    evt.touches || // browser API
    evt.originalEvent.touches
  ); // jQuery
}

function handleTouchStart1(evt) {
  const firstTouch = getTouches1(evt)[0];
  xDown1 = firstTouch.clientX;
  yDown1 = firstTouch.clientY;
}

function handleTouchMove1(evt) {
  if (!xDown1 || !yDown1) {
    return;
  }

  let xUp = evt.touches[0].clientX;
  let yUp = evt.touches[0].clientY;

  let xDiff = xDown1 - xUp;
  let yDiff = yDown1 - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    /*most significant*/
    if (xDiff > 0) {
      /* right swipe */
      nextB.click();
    } else {
      /* left swipe */
      prevB.click();
    }
  } else {
    if (yDiff > 0) {
      /* down swipe */
    } else {
      /* up swipe */
    }
  }
  /* reset values */
  xDown1 = null;
  yDown1 = null;
}

let mobButton = document.getElementsByClassName("mobile-button");

mobButton[1].addEventListener("touchstart", handleTouchStart3, false);
mobButton[1].addEventListener("touchmove", handleTouchMove3, false);

let xDown3 = null;
let yDown3 = null;

function getTouches3(evt) {
  return (
    evt.touches || // browser API
    evt.originalEvent.touches
  ); // jQuery
}

function handleTouchStart3(evt) {
  const firstTouch = getTouches3(evt)[0];
  xDown3 = firstTouch.clientX;
  yDown3 = firstTouch.clientY;
}

function handleTouchMove3(evt) {
  if (!xDown3 || !yDown3) {
    return;
  }

  let xUp = evt.touches[0].clientX;
  let yUp = evt.touches[0].clientY;

  let xDiff = xDown3 - xUp;
  let yDiff = yDown3 - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    /*most significant*/
    if (xDiff > 0) {
      /* right swipe */
    } else {
      /* left swipe */
    }
  } else {
    if (yDiff > 0) {
      /* down swipe */
    } else {
      /* up swipe */
      closeRecent();
      if (window.innerWidth <= 424) {
        closeDark();
      }
    }
  }
  /* reset values */
  xDown3 = null;
  yDown3 = null;
}

mobButton[2].addEventListener("touchstart", handleTouchStart4, false);
mobButton[2].addEventListener("touchmove", handleTouchMove4, false);

let xDown4 = null;
let yDown4 = null;

function getTouches4(evt) {
  return (
    evt.touches || // browser API
    evt.originalEvent.touches
  ); // jQuery
}

function handleTouchStart4(evt) {
  const firstTouch = getTouches4(evt)[0];
  xDown4 = firstTouch.clientX;
  yDown4 = firstTouch.clientY;
}

function handleTouchMove4(evt) {
  if (!xDown4 || !yDown4) {
    return;
  }

  let xUp = evt.touches[0].clientX;
  let yUp = evt.touches[0].clientY;

  let xDiff = xDown4 - xUp;
  let yDiff = yDown4 - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    /*most significant*/
    if (xDiff > 0) {
      /* right swipe */
    } else {
      /* left swipe */
    }
  } else {
    if (yDiff > 0) {
      /* down swipe */
    } else {
      /* up swipe */
      hideCalendar();
      if (window.innerWidth <= 424) {
        closeDark();
      }
    }
  }
  /* reset values */
  xDown4 = null;
  yDown4 = null;
}

mobButton[3].addEventListener("touchstart", handleTouchStart5, false);
mobButton[3].addEventListener("touchmove", handleTouchMove5, false);

let xDown5 = null;
let yDown5 = null;

function getTouches5(evt) {
  return (
    evt.touches || // browser API
    evt.originalEvent.touches
  ); // jQuery
}

function handleTouchStart5(evt) {
  const firstTouch = getTouches5(evt)[0];
  xDown5 = firstTouch.clientX;
  yDown5 = firstTouch.clientY;
}

function handleTouchMove5(evt) {
  if (!xDown5 || !yDown5) {
    return;
  }

  let xUp = evt.touches[0].clientX;
  let yUp = evt.touches[0].clientY;

  let xDiff = xDown5 - xUp;
  let yDiff = yDown5 - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    /*most significant*/
    if (xDiff > 0) {
      /* right swipe */
    } else {
      /* left swipe */
    }
  } else {
    if (yDiff > 0) {
      /* down swipe */
    } else {
      /* up swipe */
      hideGuest();
      if (window.innerWidth <= 424) {
        closeDark();
      }
    }
  }
  /* reset values */
  xDown5 = null;
  yDown5 = null;
}

mobButton[0].addEventListener("touchstart", handleTouchStart6, false);
mobButton[0].addEventListener("touchmove", handleTouchMove6, false);

let xDown6 = null;
let yDown6 = null;

function getTouches6(evt) {
  return (
    evt.touches || // browser API
    evt.originalEvent.touches
  ); // jQuery
}

function handleTouchStart6(evt) {
  const firstTouch = getTouches6(evt)[0];
  xDown6 = firstTouch.clientX;
  yDown6 = firstTouch.clientY;
}

function handleTouchMove6(evt) {
  if (!xDown6 || !yDown6) {
    return;
  }

  let xUp = evt.touches[0].clientX;
  let yUp = evt.touches[0].clientY;

  let xDiff = xDown6 - xUp;
  let yDiff = yDown6 - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    /*most significant*/
    if (xDiff > 0) {
      /* right swipe */
    } else {
      /* left swipe */
    }
  } else {
    if (yDiff > 0) {
      /* down swipe */
    } else {
      /* up swipe */
      closeCategory();
      if (window.innerWidth <= 424) {
        closeDark();
      }
    }
  }
  /* reset values */
  xDown6 = null;
  yDown6 = null;
}

let dark = document.getElementById("dark");

function openDark() {
  dark.style.opacity = "1";
  dark.style.pointerEvents = "inherit";
}

function closeDark() {
  dark.style.opacity = "0";
  dark.style.pointerEvents = "none";
}
