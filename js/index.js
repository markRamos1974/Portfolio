//Header parallax 
const webfolio = document.querySelector(".webfolio")
const header = document.querySelector(".header")

window.addEventListener("scroll", () => {
    let webfolioHeight = webfolio.getClientRects()[0].height;
    let scrollValue = document.documentElement.scrollTop 
 
    if(scrollValue >= webfolioHeight){
        header.style.position = "fixed"
        header.style.top = "0"
       
        if (document.documentElement.clientWidth < 768) header.style.width = "calc(100% - 2rem)"
        else if (document.documentElement.clientWidth < 1280)  header.style.width = "calc(100% - 4rem)"
        else  header.style.width = "calc(100% - 8rem)"

        
    }
    else {
        header.style.position = "static"
        header.style.width = "100%"
    }
  
})

window.addEventListener('resize', () => {
    let webfolioHeight = webfolio.getClientRects()[0].height;
    let scrollValue = document.documentElement.scrollTop 
 
    if(scrollValue >= webfolioHeight){
        if (document.documentElement.clientWidth < 768) header.style.width = "calc(100% - 2rem)"
        else if (document.documentElement.clientWidth < 1280)  header.style.width = "calc(100% - 4rem)"
        else  header.style.width = "calc(100% - 8rem)"
    }
})












// const path = document.querySelector('path')
// const pathLength = path.getTotalLength()

// console.log(pathLength)

// path.style['stroke-dasharray'] = pathLength;
// path.style['stroke-dashoffset']  = pathLength;
// path.style['transition'] = '5000ms ease-in-out'

// window.addEventListener('scroll', () => {
//     // console.log("Document element: " + document.documentElement.scrollTop)
//     // console.log("Document body: " + document.body.scrollTop)
//     // console.log("Scroll height: " + document.documentElement.scrollHeight)
//     // console.log("Client height: " + document.documentElement.clientHeight)

//     let scrollPercentage = (document.documentElement.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
//     let drawLength = pathLength;
//     path.style.strokeDashoffset = pathLength - drawLength
// })  