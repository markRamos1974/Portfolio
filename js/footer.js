const footer = document.querySelector("footer")
const lastSection = document.querySelector(".lets-talk-section")



const footerObserver = new IntersectionObserver(entries => {
    
    entries.forEach(entry => {
        if(document.documentElement.clientWidth < 768)
            footer.classList.toggle("hide-footer", !entry.isIntersecting)
    })

}, {
    threshold: 0.7
})


footerObserver.observe(lastSection)