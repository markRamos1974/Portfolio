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






//Carousel Section
const projectList = document.querySelector('.project-carousel > ul')
const projectItems = projectList.querySelectorAll("li")
const projectTracker = document.querySelector('.project-tracker')
const arrowLeft = document.querySelector(".arrow-left")
const arrowRight = document.querySelector(".arrow-right") 
console.log(arrowLeft)
console.log(arrowRight)
projectList.style.transition = "400ms ease-in-out"
arrowLeft.style.stroke = "var(--dark-blue)";
arrowRight.style.stroke = "var(--white)";
let currentPosition = 0;
let projectNumber = 1
let mousePostionStart = 0;
let mousePostionEnd  = 0;
let pressed = false

const moveListBy = amount => {
   
    if (currentPosition == 0 && amount > 0 || currentPosition == -(document.documentElement.clientWidth * 3) && amount < 0) return
    else {
        currentPosition += amount
        projectList.style.transform = `translateX(${currentPosition}px)` 
    }
    projectTracker.innerHTML = `0${projectNumber} / 04`
    
}
projectList.addEventListener("mousedown", (e) => {
    pressed = true
    mousePostionStart = e.clientX; 
  
})
projectList.addEventListener("mouseup", (e) => {
    let currentMousePosition = e.clientX;
    if(!pressed){
        return
    }
    else {
        let direction = currentMousePosition - mousePostionStart; 
        
        if (direction < 0 ){
            projectNumber += 1
            moveListBy(-document.documentElement.clientWidth)
            
            
        }
        else{
            projectNumber--
            moveListBy(document.documentElement.clientWidth)
            
           
        }   
    }
    pressed = false
})



arrowLeft.addEventListener("click", () => {
    arrowRight.style.stroke = "var(--white)"
    
    if(projectNumber == 1){
        arrowLeft.style.stroke = "var(--dark-blue)";
        return
    }
    else if(projectNumber == 2){
        projectNumber--
        arrowLeft.style.stroke = "var(--dark-blue)";
        moveListBy(document.documentElement.clientWidth)
    }
    else {
        projectNumber--
        console.log(projectNumber)
        arrowLeft.style.stroke = "var(--white)";
        moveListBy(document.documentElement.clientWidth)
    }
    
})
arrowRight.addEventListener("click", () => {

        if(projectNumber >= 4) {
            arrowRight.style.stroke = "var(--dark-blue)"
            return
        }else {
            projectNumber++
            if(projectNumber == 4) arrowRight.style.stroke = "var(--dark-blue)"
            arrowLeft.style.stroke = "var(--white)";
            moveListBy(-document.documentElement.clientWidth)
        }
        
    
    
})




const resetProjectList = () => {
    currentPosition = 0
    projectNumber = 1
    projectList.style.transform = `translateX(0px)`
    projectTracker.innerHTML =  `0${projectNumber} / 04`

}


window.addEventListener('resize', () => {
    if(document.documentElement.clientWidth < 768){
        setCarouselToMobileView(117);
        resetProjectList()
    }
    else if (document.documentElement.clientWidth < 1280){
        setCarouselToMobileView(570);
    }
    else {
        setCarouselToMobileView(670);
    }

    if(document.documentElement.clientWidth >= 768){
        resetProjectList()
    }

    

})






 
