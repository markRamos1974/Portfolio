//Header parallax 
const webfolio = document.querySelector(".webfolio")
const header = document.querySelector(".header")
const footer = document.querySelector("footer")


const handleHeaderScroll = () => {
    footer.classList.toggle("hide-footer", document.documentElement.clientWidth < 768)
    if(!webfolio.classList.contains("hide-layout-section")){
        let screenWitdth = document.documentElement.clientWidth
        let webfolioHeight = webfolio.getClientRects()[0].height
        let headerHeight = header.getClientRects()[0].height
        let scrollValue = document.documentElement.scrollTop 
   
        /*
            Adding padding in px for specific screen sizes to prevent sudden clip from
            parrallax scrolling for header
        */

        // Fixing header to top when after a specific scroll value when scrolling
        if(scrollValue >= webfolioHeight){
    
            /* 
                preventing main content section from sudden clip
                when scrolled to a specific value
            */ 
            webfolio.style.marginBottom = `${headerHeight}px`
    
            //Fixing header to top of the page
            header.style.position = "fixed"
            header.style.top = "0"
           
            /*
                Setting header with for specific screen 
                sizes when fixed to the top of the page
            */
    
            // Mobile view

                
            if (screenWitdth < 768) 
                header.style.width = "calc(100% - 2rem)"
            // Tablet view
            else if (screenWitdth < 1280)  
                header.style.width = "calc(100% - 4rem)"
            // Desktop view
            else  
                header.style.width = "calc(100% - 8rem)"
        }

        else {
            //returns to default state then scrolled back to the top of the page
            webfolio.style.marginBottom = "0px"
            header.style.position = "static"
            header.style.width = "100%"
        }
    }
}


// Adapting header to screen resize when scrolling and header is fixed on top
window.addEventListener('resize', handleHeaderScroll)
window.addEventListener("scroll", handleHeaderScroll)









