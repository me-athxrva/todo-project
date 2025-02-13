let color_click = document.querySelectorAll('#choose_color li');
let reset_btn = document.getElementById('resetBtn');
let notes = document.getElementsByClassName('note');
let addBtn = document.getElementById('addNote');
let deleteBtn = document.querySelectorAll('#note_container span div button');
let note_text = document.getElementById('text');
let color;

function getContrastTextColor(color) {
    let r, g, b, a = 1;

    if (color.startsWith("#")) {
        if (color.length === 4) {
            color = "#" + color[1] + color[1] + color[2] + color[2] + color[3] + color[3];
        }
        r = parseInt(color.substring(1, 3), 16);
        g = parseInt(color.substring(3, 5), 16);
        b = parseInt(color.substring(5, 7), 16);
    } else if (color.startsWith("rgb")) {
        let values = color.match(/\d+(\.\d+)?/g);
        r = parseInt(values[0]);
        g = parseInt(values[1]);
        b = parseInt(values[2]);
        if (values.length === 4) {
            a = parseFloat(values[3]); 
        }
    } else {
        console.warn("Unsupported color format:", color);
        return "#000000"; 
    }

    if (a < 0.5) return "#000000"; 

    let luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    return luminance > 0.5 ? "#000000" : "#FFFFFF";
}

function random_color(){
    const hexElements = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
    var color = '#';
    for (var i=0; i<6; i++){
        color += hexElements[Math.floor(Math.random()*16)];
    }
    return color;
}

function color_set(){
    color_click.forEach(ele => {
        ele.style.background = random_color()
    });
    notes[0].style.background = (color_click[0].style.background);
    notes[0].firstElementChild.style.color = getContrastTextColor(notes[0].style.background);
    color = notes[0].style.background;
}

function add_note(note){
    const originalElement = document.getElementById("note_container");
    const clonedElement = originalElement.cloneNode(true);
    clonedElement.firstElementChild.innerText = note;
    clonedElement.style.background = color;
    clonedElement.style.color = getContrastTextColor(color);
    originalElement.parentNode.appendChild(clonedElement);
    note_text.value = '';
    addDelete(clonedElement.childNodes[3].childNodes[3])
}

function addDelete(button) {
    button.addEventListener("click", function () {
        this.parentElement.parentElement.remove(); 
    });
}

addBtn.addEventListener('click',()=>{
    if (note_text.value == ""){
        console.warn("empty note")
    } else {
        add_note(note_text.value)
    }
})


color_click.forEach(ele => {
    ele.addEventListener('click',()=>{
        notes[0].style.background = (ele.style.background);
        notes[0].firstElementChild.style.color = getContrastTextColor(notes[0].style.background);
        color = notes[0].style.background;
    })
});

reset_btn.addEventListener('click',()=>{
    color_set()
    console.log("clicked")
    gsap.fromTo('#resetBtn svg',{
        rotation: 0
    },{
        rotation: -360,
        duration: 0.75,
        ease: 'power2.inOut'
    })
})

window.addEventListener('DOMContentLoaded',()=>{
    color_set()
    deleteBtn.forEach(addDelete);
})

