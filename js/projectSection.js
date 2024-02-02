const setCarouselToMobileView = (amount) => {
    const carousel = document.querySelector(".project-carousel")
    const carouselContainer = document.querySelector(".project-showcase")
    const carouselSize = carousel.getClientRects()[0].height

    carouselContainer.style.height = `calc(${carouselSize + amount}px + 8rem)`
}

if(document.documentElement.clientWidth < 768){
    setCarouselToMobileView(-20);
}
else if (document.documentElement.clientWidth < 1280){
    setCarouselToMobileView(70);
}
else {
    setCarouselToMobileView(100);
}


const webfolio = document.querySelector(".webfolio")
const landing = document.querySelector(".landing-section")
const aboutMe = document.querySelector(".about-me")
const service = document.querySelector(".services-offered")
const toolbox = document.querySelector(".virtual-toolbox-section")

window.addEventListener('resize', () => {
    if(document.documentElement.clientWidth < 768){
        setCarouselToMobileView(-20);
    }
    else if (document.documentElement.clientWidth < 1280){
        landing.classList.remove("remove-container")
        layoutSection.classList.remove("hide-layout-section") 
        webfolio.classList.remove("hide-layout-section")
        aboutMe.classList.remove("hide-layout-section")
        service.classList.remove("hide-layout-section")
        toolbox.classList.remove("hide-layout-section")
        setCarouselToMobileView(70);
    }
    else {
        setCarouselToMobileView(100);
    }
})


//Carousel Section
const sliderContainer = document.querySelector(".project-container")
const header = document.querySelector(".header")
const slider = document.querySelector(".project-carousel > ul")
const projectTracker = document.querySelector('.project-tracker')
const layoutSection = document.querySelector('.layout-section')



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
    if(isMouseDown) {
        stopSliding(e)
        beginMomentumTracking()
    }  
})

slider.addEventListener("mouseup", (e) => {
    stopSliding(e)
    beginMomentumTracking()
})

slider.addEventListener("mousemove", (e) => {
    if(!isMouseDown) return
    cancelMomentumTracking()
    slide(e)
})

//Mobile touch
// slider.onpointerdown = beginSliding;
// slider.onpointerup = stopSliding;
// slider.onpointmove = slide;
slider.addEventListener("touchstart", (e) => {
    cancelMomentumTracking()
    beginSliding(e)
   
})
slider.addEventListener("touchcancel", (e) => {
    stopSliding(e)
    beginMomentumTracking()
})

slider.addEventListener("touchend", (e) => {
    stopSliding(e)
    beginMomentumTracking()

    if(slider.scrollLeft == slider.scrollWidth - document.documentElement.clientWidth){
        console.log("visible")
        layoutSection.classList.remove("hide-layout-section") 
        slider.removeEventListener('wheel', scrollH, false);
        slider.removeEventListener('DOMMouseScroll', scrollH, false);
    } 
    

    else if(slider.scrollLeft  == 0){
       
        slider.removeEventListener('wheel', scrollH, false);
        slider.removeEventListener('DOMMouseScroll', scrollH, false);
        landing.classList.remove("remove-container")
        webfolio.classList.remove("hide-layout-section")
        aboutMe.classList.remove("hide-layout-section")
        service.classList.remove("hide-layout-section")
        toolbox.classList.remove("hide-layout-section")
        const projectPosition = sliderContainer.getBoundingClientRect().top + window.scrollY 
        window.scrollTo(0, projectPosition)
        
    } 
})

slider.addEventListener("touchmove", (e) => {

    cancelMomentumTracking()
    slide(e)
})






const scrollH = (e) => {
    // Prevent scroll default
    e.preventDefault()
    let delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    slider.scrollLeft -= (delta * 150);
    

    if(slider.scrollLeft == slider.scrollWidth - document.documentElement.clientWidth && delta == -1){
        layoutSection.classList.remove("hide-layout-section") 
        slider.removeEventListener('wheel', scrollH, false);
        slider.removeEventListener('DOMMouseScroll', scrollH, false);
    } 
    

    else if(slider.scrollLeft == 0 && delta == 1){
       
        slider.removeEventListener('wheel', scrollH, false);
        slider.removeEventListener('DOMMouseScroll', scrollH, false);
        landing.classList.remove("remove-container")
        webfolio.classList.remove("hide-layout-section")
        aboutMe.classList.remove("hide-layout-section")
        service.classList.remove("hide-layout-section")
        toolbox.classList.remove("hide-layout-section")
        const projectPosition = sliderContainer.getBoundingClientRect().top + window.scrollY 
        window.scrollTo(0, projectPosition)
        
    } 
    
    projectNumber =  Math.round(slider.scrollLeft / document.documentElement.clientWidth) + 1
    projectTracker.innerHTML = `0${projectNumber} / 04`

}
const getElementPaddingSize = (element) => {
    const elementStyle = window.getComputedStyle(element)
    const arr = elementStyle.paddingTop.split("").filter(char => char == "." || Number(char))
    const value = Number(arr.join(""))
    return value
}
const observer = new IntersectionObserver (entries => {
    entries.forEach(entry => {  
        if(entry.target.classList.contains("project-container") && entry.isIntersecting && document.documentElement.clientWidth >= 1280){
          
            slider.addEventListener('wheel', scrollH, false);
            slider.addEventListener('DOMMouseScroll', scrollH, false);

            layoutSection.classList.add("hide-layout-section")
            landing.classList.add("remove-container")
            webfolio.classList.add("hide-layout-section")
            aboutMe.classList.add("hide-layout-section")
            service.classList.add("hide-layout-section")
            toolbox.classList.add("hide-layout-section")
          
        }     

        if (entry.target.classList.contains("layout-section") && !entry.isIntersecting && document.documentElement.clientWidth >= 1280) {

            layoutSection.classList.add("hide-layout-section")
            slider.addEventListener('wheel', scrollH, false);
            slider.addEventListener('DOMMouseScroll', scrollH, false);
           
        }
    })
},{
    threshold: 0.99
})
observer.observe(sliderContainer)
observer.observe(layoutSection)


const beginSliding = (e) => {
    console.log("touch start")
    isMouseDown = true
    startX = (e.clientX || e.touches[0].clientX) - slider.offsetLeft
    scrollLeft = slider.scrollLeft
}
const stopSliding = (e) => {
    
    isMouseDown = false
    return
}
const slide = (e) => {
    if(!isMouseDown) return
    e.preventDefault()
    const x = (e.clientX || e.touches[0].clientX) - slider.offsetLeft;
    const walk = (x - startX); //scroll-fast

    console.log(e.touches[0].clientX)
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


