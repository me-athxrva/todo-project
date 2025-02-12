var color_click = document.querySelectorAll('#choose_color li');
var reset_btn = document.getElementById('resetBtn');
var notes = document.getElementsByClassName('note');

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
}

color_click.forEach(ele => {
    ele.addEventListener('click',()=>{
        notes[0].style.background = (ele.style.background);
    })
});

reset_btn.addEventListener('click',()=>{
    color_set()
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
})

