//Header parallax 
const webfolio = document.querySelector(".webfolio")
const header = document.querySelector(".header")


window.addEventListener("scroll", () => {
    let screenWitdth = document.documentElement.clientWidth
    let webfolioHeight = webfolio.getClientRects()[0].height
    let scrollValue = document.documentElement.scrollTop 

    /*
        Adding padding in px for specific screen sizes to prevent sudden clip from
        parrallax scrolling for header
    */
    if(screenWitdth < 768) webfolioHeight += 16             //Mobile
    else if (screenWitdth < 1280) webfolioHeight += 32      //Tablet
    else webfolioHeight += 64                               //Desktop from 1280px to 1920px and up
    

    // Fixing header to top when after a specific scroll value when scrolling
    if(scrollValue >= webfolioHeight){

        /* 

            preventing main content section from sudden clip
            when scrolled to a specific value

        */ 
        webfolio.style.marginBottom = "calc(24px + 12px)" 

        //Fixing header to top of the page
        header.style.position = "fixed"
        header.style.top = "0"
       
        /*
            Setting header with for specific screen 
            sizes when fixed to the top of the page
        */

        // Mobile view
        if (document.documentElement.clientWidth < 768) 
            header.style.width = "calc(100% - 2rem)"
        // Tablet view
        else if (document.documentElement.clientWidth < 1280)  
            header.style.width = "calc(100% - 4rem)"
        // Desktop view
        else  
            header.style.width = "calc(100% - 4rem)"

        
    }
    else {
        //returns to default state then scrolled back to the top of the page
        webfolio.style.marginBottom = "0px"
        header.style.position = "static"
        header.style.width = "100%"
    }
  
})

// Adapting header to screen resize when scrolling and header is fixed on top
window.addEventListener('resize', () => {
    let webfolioHeight = webfolio.getClientRects()[0].height;
    let scrollValue = document.documentElement.scrollTop 
    

    if(scrollValue >= webfolioHeight){

        // Mobile view
        if (document.documentElement.clientWidth < 768) 
            header.style.width = "calc(100% - 2rem)"
        // Tablet view
        else if (document.documentElement.clientWidth < 1280)  
            header.style.width = "calc(100% - 4rem)"
        // Desktop
        else  
            header.style.width = "calc(100% - 4rem)"
    }
})











