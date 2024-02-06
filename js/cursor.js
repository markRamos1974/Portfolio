const cursor = document.querySelector(".cursor")



const cursorFollow = (e) => {
    cursor.style.top = `${e.clientY + window.scrollY}px`
    cursor.style.left = `${e.clientX + window.scrollX}px`
    
   
}
window.addEventListener('mousewheel', cursorFollow)
window.addEventListener('mousemove', cursorFollow)
