//Setup project carousel size
const setupCarouselSize = () => {
    const carousel = document.querySelector(".project-carousel")
    const carouselContainer = document.querySelector(".project-showcase")

    const carouselSize = carousel.getBoundingClientRect().height
    const carouselOffset = Number(window.getComputedStyle(carousel).top.split("").filter(char => !isNaN(Number(char)) || char == ".").join("")) * 2
    carouselContainer.style.height = `calc(${carouselSize}px + ${carouselOffset}px)`
}
setupCarouselSize()




//Contents
const webfolio = document.querySelector(".webfolio")
const landing = document.querySelector(".landing-section")
const aboutMe = document.querySelector(".about-me")
const service = document.querySelector(".services-offered")
const toolbox = document.querySelector(".virtual-toolbox-section")
const listOfProjects = document.querySelectorAll(".project-item")

//Carousel Section
const sliderContainer = document.querySelector(".project-container")
const header = document.querySelector(".header")
const slider = document.querySelector(".project-carousel > ul")
const projectTracker = document.querySelector('.project-tracker')
const layoutSection = document.querySelector('.layout-section')



const showContent = () => {
    landing.classList.remove("remove-container")
    
    webfolio.classList.remove("hide-layout-section")
    aboutMe.classList.remove("hide-layout-section")
    service.classList.remove("hide-layout-section")
    toolbox.classList.remove("hide-layout-section")
}

const hideContent = () => {
    landing.classList.add("remove-container")
    
    webfolio.classList.add("hide-layout-section")
    aboutMe.classList.add("hide-layout-section")
    service.classList.add("hide-layout-section")
    toolbox.classList.add("hide-layout-section")
}

window.addEventListener('resize', () => {
    if (document.documentElement.clientWidth < 1280){
        layoutSection.classList.remove("hide-layout-section") 
        showContent()
    }

    setupCarouselSize()
})


const updateTracker = () => {
    let projectNumber = 1;
    projectNumber =  Math.round(slider.scrollLeft / document.documentElement.clientWidth) + 1
    projectTracker.innerHTML = `0${projectNumber} / 0${listOfProjects.length}`
}

updateTracker()


let startX;
let velX;
let scrollLeft;
let momentumID;
let isMouseDown = false


const beginSliding = (e) => {

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

    updateTracker()
}


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
slider.addEventListener("touchstart", (e) => {
    cancelMomentumTracking()
    beginSliding(e)
   
})
slider.addEventListener("touchcancel", (e) => {
    stopSliding(e)
    beginMomentumTracking()
})
slider.addEventListener("touchend", (e) => {
    if(document.documentElement.clientWidth >= 1280){
        stopSliding(e)
        beginMomentumTracking()

        if(slider.scrollLeft == slider.scrollWidth - document.documentElement.clientWidth){
    
            layoutSection.classList.remove("hide-layout-section") 
            slider.removeEventListener('wheel', scrollH, false);
            slider.removeEventListener('DOMMouseScroll', scrollH, false);
        } 
        

        else if(slider.scrollLeft  == 0){
        
            slider.removeEventListener('wheel', scrollH, false);
            slider.removeEventListener('DOMMouseScroll', scrollH, false);
            showContent()
            const projectPosition = sliderContainer.getBoundingClientRect().top + window.scrollY 
            window.scrollTo(0, projectPosition)
            
        } 
    }
    
})
slider.addEventListener("touchmove", (e) => {
    if(document.documentElement.clientWidth >= 1280){
        cancelMomentumTracking()
        slide(e)
    } 

})




const scrollH = (e) => {
    // Prevent scroll default
    e.preventDefault()
    let delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    slider.scrollLeft -= (delta * 150);
    
    if (document.documentElement.clientWidth >= 1280){
        if(slider.scrollLeft == slider.scrollWidth - document.documentElement.clientWidth && delta == -1){
            layoutSection.classList.remove("hide-layout-section") 
            slider.removeEventListener('wheel', scrollH, false);
            slider.removeEventListener('DOMMouseScroll', scrollH, false);
        } 
        
        else if(slider.scrollLeft == 0 && delta == 1){
           
            slider.removeEventListener('wheel', scrollH, false);
            slider.removeEventListener('DOMMouseScroll', scrollH, false);
            showContent()
            const projectPosition = sliderContainer.getBoundingClientRect().top + window.scrollY 
            window.scrollTo(0, projectPosition)
            
        } 
    }

    
    updateTracker()

}
const observer = new IntersectionObserver (entries => {
    entries.forEach(entry => {  
        if(

            entry.target.classList.contains("project-container") && 
            entry.isIntersecting && 
            document.documentElement.clientWidth >= 1280 
        
        ){
  
            slider.addEventListener('wheel', scrollH, false);
            slider.addEventListener('DOMMouseScroll', scrollH, false);
            layoutSection.classList.add("hide-layout-section") 
            hideContent()
          
        }     

        else if (
            
            entry.target.classList.contains("layout-section") && 
            !entry.isIntersecting && 
            document.documentElement.clientWidth >= 1280

        ) {

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

