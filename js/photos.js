let editImg = document.querySelector("#img-container img");
let main = document.querySelector("#main");

let contrastP = document.getElementById("contrastN");
let brightnessP = document.getElementById("brightnessN");
let zoomP = document.getElementById("zoomN");
let cancel = document.getElementById("cancel");
let contrast = document.getElementById("contrast");
let zoom = document.getElementById("zoom");
let brightness = document.getElementById("brightness");
let close0 = document.getElementById("close");

let cont = "";
let bright = "";

function contrastF() {
  contrastP.innerHTML = contrast.value;
  contrastP.style.marginLeft = contrast.value * 38.8 + "px";
  cont = `contrast(${50 + contrast.value * 10}%)`;
  let filt = cont + bright;
  editImg.style.filter = filt;
  cancel.setAttribute("onclick", "cancelEdit()");
  cancel.style.opacity = "1";
  close0.removeAttribute("onclick");
  close0.setAttribute("onclick", "cancelEdit()");
}
contrastP.innerHTML = contrast.value;
contrastP.style.marginLeft = contrast.value * 38.5 + "px";

function brightnessF() {
  brightnessP.innerHTML = brightness.value;
  brightnessP.style.marginLeft = brightness.value * 38.8 + "px";
  bright = `brightness(${50 + brightness.value * 10}%)`;
  let filt = cont + bright;
  editImg.style.filter = filt;
  cancel.setAttribute("onclick", "cancelEdit()");
  cancel.style.opacity = "1";
  close0.removeAttribute("onclick");
  close0.setAttribute("onclick", "cancelEdit()");
}
brightnessP.innerHTML = brightness.value;
brightnessP.style.marginLeft = brightness.value * 38.5 + "px";

let rot = 0;
let sca = 1;

function zoomF() {
  zoomP.innerHTML = zoom.value;
  zoomP.style.marginLeft = zoom.value * 38.8 + "px";
  let x = 1;
  if (zoom.value === 5) {
    x = 1;
  } else if (zoom.value > 5) {
    x += (zoom.value - 5) / 10;
  } else {
    x -= (5 - zoom.value) / 10;
  }
  editImg.style.transform = `scale(${x}) rotate(${rot}deg)`;
  sca = x;

  cancel.setAttribute("onclick", "cancelEdit()");
  cancel.style.opacity = "1";
  close0.removeAttribute("onclick");
  close0.setAttribute("onclick", "cancelEdit()");
}
zoomP.innerHTML = zoom.value;
zoomP.style.marginLeft = zoom.value * 38.5 + "px";

let rotateC = 0;

function rotateF() {
  rotateC++;
  editImg.style.transform = `scale(${sca}) rotate(${rotateC * 90}deg)`;
  rot = rotateC * 90;

  cancel.setAttribute("onclick", "cancelEdit()");
  cancel.style.opacity = "1";
}

let modal = document.getElementById("modal");

function closeModal() {
  modal.style.transform = "scale(0)";
}

close0.removeAttribute("onclick");
close0.setAttribute("onclick", "cancelEdit()");

function openModal(event) {
  // if (event.target.classList.contains("add-tag")) {
  //}
  modal.style.transform = "scale(1)";
}

let sure = document.getElementById("sure");

function cancelEdit() {
  sure.style.opacity = "1";
  sure.style.transform = "scale(1)";
}

function closeSure() {
  sure.style.opacity = "0";
  sure.style.transform = "scale(0)";
}

function makeDraggable() {
  let draggable = document.getElementsByClassName("draggable");
  let addPhotoButton = document.getElementsByClassName("add-photo-override");
  for (let i = 0; i < draggable.length; i++) {
    for (let j = 0; j < draggable[i].children.length - 1; j++) {
      draggable[i].children[j].addEventListener("dragstart", dragStart);
      draggable[i].children[j].addEventListener("dragenter", dragEnter);
      draggable[i].children[j].addEventListener("drop", drop);
      draggable[i].children[j].addEventListener("dragover", dragOver);
      draggable[i].children[j].addEventListener("dragend", dragEnd);
      //draggable[i].children[j].addEventListener("drag", drag);
      draggable[i].children[j].addEventListener("dragleave", dragLeave);
    }
    addPhotoButton[i].addEventListener("drop", drop);
    addPhotoButton[i].addEventListener("dragstart", dragStart);
    addPhotoButton[i].addEventListener("dragenter", dragEnter);
    addPhotoButton[i].addEventListener("dragover", dragOver);
    addPhotoButton[i].addEventListener("dragend", dragEnd);
    addPhotoButton[i].addEventListener("dragleave", dragLeave);
  }
}

makeDraggable();

let dragSrcEl;
let draged;
let hovered;

function dragStart(event) {
  this.style.opacity = "0.4";

  dragSrcEl = this.children[0].children[0].src;

  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/html", this.children[0].children[0].src);
  draged = event.target;
}

function dragEnd(event) {
  // dragis dasasruli
  this.children[0].children[0].src = dragSrcEl;
  this.style.opacity = "1";
  this.style.transform = "scale(0)";
  setTimeout(() => {
    this.style.transform = "scale(1)";
  }, 250);
  coverText();
  numeration();
}

let x = 0;
let y = 0;
let array = [];

function dragEnter(event) {
  event.preventDefault();
  event.stopPropagation();
}
function dragLeave(event) {
  //leave hover
  event.preventDefault();
  event.stopPropagation();
}

function drop(event) {
  //xelis gashveba targetze
  event.stopPropagation();

  if (event.currentTarget.parentNode.classList.contains("add-photo")) {
    event.preventDefault();
    let input = event.target.parentNode.previousElementSibling;
    event.target.parentNode.parentNode.insertBefore(draged, input);
    //draged.remove();
    //draged.children[0].children[0].src = event.dataTransfer.getData("text/html");
  } else {
    if (dragSrcEl !== this) {
      dragSrcEl = this.children[0].children[0].src;
      this.children[0].children[0].src =
        event.dataTransfer.getData("text/html");
    }
    this.style.transform = "scale(0)";
    setTimeout(() => {
      this.style.transform = "scale(1)";
    }, 250);
  }
  coverText();
  rewriteTag();
  numeration();
  return false;
}

function dragOver(event) {
  // hoveri
  event.preventDefault();
}

let count = 0;
let template;
let tag;
let tagName;
let current;
let tagName0;
let imgSrc;
let temp;
let boxIndex;
let newTag;
let draggableTemplate;

function createTemplates() {
  template = `
  <div class="img">
              <img src="${imgSrc}" alt="" draggable="false" class="images" />
              <div class="set-cover" onclick="makeCoverPhoto(event)">
                <img src="../images/cov.png" alt="" draggable="false" />
                Set as cover
              </div>
              <div class="delete" onclick="delleteBox(event)">
                <img src="../images/close.png" alt="" draggable="false" />
              </div>
              <div class="edit" onclick="openModal(event)">
                <img src="../images/edit.png" alt="" draggable="false" />
                Edit
              </div>
            </div>
            <div class="set-tag">
              <div class="position"></div>
              <div class="add-tag" onclick="addTag(event)">
               <img src="../images/plus.png" alt="" draggable="false" />
                Add Tag
              </div>
            </div>
  `;
  temp = `
<div class="img">
              <img src="${imgSrc}" alt="" draggable="false" class="images" />
              <div class="set-cover" onclick="makeCoverPhoto(event)">
                <img src="../images/cov.png" alt="" draggable="false" />
                Set as cover
              </div>
              <div class="delete" onclick="delleteBox(event)">
                <img src="../images/close.png" alt="" draggable="false" />
              </div>
              <div class="edit" onclick="openModal(event)">
                <img src="../images/edit.png" alt="" draggable="false" />
                Edit
              </div>
            </div>
            <div class="set-tag">
              <div class="position"></div>
              <div class="add-tag" onclick="addTag(event)">
                ${newTag}
              </div>
            </div>
`;

  draggableTemplate = `
<h1>${newTag}</h1>
<div class="draggable ${newTag}">
<input
            type="file"
            id="main-add"
            name="main-add"
            accept="image/*"
            style="display: none"
            onchange="addPhoto(event)"
            multiple
          />

          <div
            class="add-photo"
            onclick="accsesToInput(event)"
            draggable="false"
          >
            <img src="../images/add.png" alt="" draggable="false" />
            <p draggable="false">Add Photo</p>
            <div class="add-photo-override"></div>
          </div>
</div>
`;
}

function addPhoto(event) {
  let parent = event.target.parentNode;
  let inputPosition = parent.children.length - 2;
  for (let i = 0; i < event.target.files.length; i++) {
    let box = document.createElement("div");
    box.classList.add("box");
    box.setAttribute("draggable", true);
    createTemplates();
    if (parent.classList.contains("Tag")) {
      box.innerHTML = template;
      parent.insertBefore(box, parent.children[inputPosition]);
    } else {
      box.innerHTML = temp;
      parent.insertBefore(box, parent.children[inputPosition]);
    }
    setTimeout(() => {
      let src = URL.createObjectURL(event.target.files[i]);

      let preview =
        event.target.parentNode.children[
          event.target.parentNode.children.length - 3 - i
        ].children[0].children[0];
      console.log(src);
      preview.src = src;
    }, 100);
  }

  setCoverPhoto();
  makeDraggable();
  numeration();
  // coverText();
}

function setCoverPhoto() {
  let draggable = document.getElementsByClassName("draggable");
  for (let i = 0; i < draggable.length; i++) {
    let draggableChildren = draggable[i].children;
    for (let j = 0; j < draggableChildren.length - 2; j++) {
      draggableChildren[j].classList.remove("cover");
    }
    draggableChildren[0].classList.add("cover");
  }
  coverText();
  numeration();
}

function addTag(event) {
  let box = document.getElementsByClassName("box");
  boxIndex = Array.from(box).indexOf(event.currentTarget.parentNode.parentNode);
  openModal();
  suggested.focus();
  coverText();
  makeDraggable();
  numeration();
}

function accsesToInput(event) {
  event.currentTarget.previousElementSibling.click();
  // coverText();
}

function save() {
  if (suggested.value.length > 0) {
    newTag = suggested.value;
    let box = document.getElementsByClassName("box");
    box[boxIndex].children[1].children[1].innerHTML = newTag;
    box[boxIndex].children[1].children[1].style.background = "none";
    createNewDraggable();
  } else {
  }
  coverText();
  makeDraggable();
  numeration();
}

let first = 0;
let draggableIndex = 0;

function createNewDraggable() {
  let addNewRoom = 0;
  let draggable = document.getElementsByClassName("draggable");
  for (let i = first; i < draggable.length; i++) {
    first = 1;
    if (draggable[i].classList.contains(newTag)) {
      addNewRoom = 1;
      draggableIndex = i;
      createTemplates();
      translateBox();
      coverText();
    }
  }
  if (addNewRoom === 0) {
    addNewRoom = 0;
    createTemplates();
    main.innerHTML += draggableTemplate;
    draggableIndex += 1;
    translateBox();
    coverText();
  }
  coverText();
  makeDraggable();
  numeration();
}

function translateBox() {
  let box = document.getElementsByClassName("box");
  let translatedBox = box[boxIndex];
  box[boxIndex].remove();
  let draggable = document.getElementsByClassName("draggable");
  draggable[draggableIndex].insertBefore(
    translatedBox,
    draggable[draggableIndex].children[
      draggable[draggableIndex].children.length - 2
    ]
  );
  coverText();
  makeDraggable();
  numeration();
}

function delleteBox(event) {
  let draggable = document.getElementsByClassName("draggable");
  event.target.parentNode.parentNode.remove();
  for (let i = 1; i < draggable.length; i++) {
    if (draggable[i].children.length < 3) {
      draggable[i].previousElementSibling.remove();
      draggable[i].remove();
    }
  }
  if (draggable.length < 2) {
    draggableIndex = draggable.length - 1;
  }
  coverText();
  makeDraggable();
  numeration();
}

function makeCoverPhoto(event) {
  let imgSrc = event.target.previousElementSibling.getAttribute("src");
  let coverSrc =
    event.target.parentNode.parentNode.parentNode.children[0].children[0].children[0].getAttribute(
      "src"
    );
  event.target.previousElementSibling.setAttribute("src", coverSrc);
  event.target.parentNode.parentNode.parentNode.children[0].children[0].children[0].setAttribute(
    "src",
    imgSrc
  );

  coverText();
  makeDraggable();
  numeration();
}

function coverText() {
  setTimeout(() => {
    let draggable = document.getElementsByClassName("draggable");
    let box = document.getElementsByClassName("box");

    for (let i = 0; i < box.length; i++) {
      box[i].children[0].children[1].innerHTML = `
      <img src="../images/cov.png" alt="" draggable="false" />
              Set as cover
      `;
    }

    for (let i = 0; i < draggable.length; i++) {
      for (let j = 0; j < draggable[i].children.length; j++) {
        draggable[i].children[j].classList.remove("cover");
      }
      draggable[i].children[0].classList.add("cover");
    }
  }, 500);
  setTimeout(() => {
    let cover = document.getElementsByClassName("cover");
    let draggable = document.getElementsByClassName("draggable");

    draggable[0].children[0].children[0].children[1].innerHTML = `
    <img src="../images/cov.png" alt="" draggable="false" />
              Cover Photo
    `;
    for (let i = 1; i < cover.length; i++) {
      cover[i].children[0].children[1].innerHTML = `
    <img src="../images/cov.png" alt="" draggable="false" />
              Room Cover
    `;
    }
  }, 700);
  makeDraggable();
  numeration();
}

//coverText();

function rewriteTag() {
  let draggable = document.getElementsByClassName("draggable");
  for (let i = 0; i < draggable.length; i++) {
    if (i === 0) {
      for (let j = 0; j < draggable[i].children.length - 2; j++) {
        draggable[i].children[j].children[1].children[1].innerHTML = `
        <img src="../images/plus.png" alt="" draggable="false" />
                Add Tag
        `;
      }
    } else {
      for (let j = 0; j < draggable[i].children.length - 2; j++) {
        draggable[i].children[j].children[1].children[1].innerHTML = newTag;
        draggable[i].children[j].children[1].children[1].style.background =
          "none";
      }
    }
  }
  numeration();
}

function numeration() {
  let draggable = document.getElementsByClassName("draggable");
  for (let i = 0; i < draggable.length; i++) {
    for (let j = 0; j < draggable[i].children.length - 2; j++) {
      draggable[i].children[j].children[1].children[0].innerHTML = j + 1;
    }
  }
}
