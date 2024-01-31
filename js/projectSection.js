const setCarouselToMobileView = (amount) => {
    const carousel = document.querySelector(".project-carousel")
    const carouselContainer = document.querySelector(".project-showcase")
    const carouselSize = carousel.getClientRects()[0].height

    carouselContainer.style.height = `calc(${carouselSize + amount}px + 6rem)`
}

if(document.documentElement.clientWidth < 768){
    setCarouselToMobileView(117);
}
else if (document.documentElement.clientWidth < 1280){
    setCarouselToMobileView(530);
}
else {
    setCarouselToMobileView(670);
}

window.addEventListener('resize', () => {
    if(document.documentElement.clientWidth < 768){
        setCarouselToMobileView(117);
    }
    else if (document.documentElement.clientWidth < 1280){
        setCarouselToMobileView(570);
    }
    else {
        setCarouselToMobileView(670);
    }
})


//Carousel Section
const slider = document.querySelector(".project-carousel > ul")
const projectTracker = document.querySelector('.project-tracker')
const arrowLeft = document.querySelector('.arrow-left')
const arrowRight = document.querySelector('.arrow-right')

let startX;
let velX;
let scrollLeft;
let projectNumber = 1;
let momentumID;

let isMouseDown = false

slider.addEventListener("mousedown", (e)=> {
    cancelMomentumTracking()
    beginSliding(e)
}) 

slider.addEventListener("mouseleave", (e) => {
    beginMomentumTracking()
    if(!isMouseDown) return
})

slider.addEventListener("mouseup", (e) => {
    stopSliding(e)
    beginMomentumTracking()
})

slider.addEventListener("mousemove", (e) => {
    
    slide(e)
})


const beginSliding = (e) => {
    isMouseDown = true
    startX = e.pageX - slider.offsetLeft
    scrollLeft = slider.scrollLeft
}

const stopSliding = (e) => {
    
    isMouseDown = false
    return
}

const slide = (e) => {
    if(!isMouseDown) return
    e.preventDefault()
    
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX); //scroll-fast
    var prevScrollLeft = slider.scrollLeft
    slider.scrollLeft = (scrollLeft - walk)
    velX = slider.scrollLeft - prevScrollLeft; 
   
    
}


function beginMomentumTracking(){
    cancelMomentumTracking();
    momentumID = requestAnimationFrame(momentumLoop);
}
function cancelMomentumTracking(){
    cancelAnimationFrame(momentumID);
}
function momentumLoop(){
    slider.scrollLeft += velX;
    velX *= 0.95; 
    if (Math.abs(velX) > 0.5){
        momentumID = requestAnimationFrame(momentumLoop);
    }

    projectNumber =  Math.round(slider.scrollLeft / document.documentElement.clientWidth) + 1
    projectTracker.innerHTML = `0${projectNumber} / 04`
}
