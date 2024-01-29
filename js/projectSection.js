const setCarouselToMobileView = () => {
    const carousel = document.querySelector(".project-carousel")
    const carouselContainer = document.querySelector(".project-showcase")
    const carouselSize = carousel.getClientRects()[0].height

    carouselContainer.style.height = `calc(${carouselSize + 117}px + 6rem)`
}

if(document.documentElement.clientWidth < 768){
    setCarouselToMobileView();
}

window.addEventListener('resize', () => {
    if(document.documentElement.clientWidth < 768){
        setCarouselToMobileView();
    }
})




 
