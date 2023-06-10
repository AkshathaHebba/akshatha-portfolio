window.onload = function() {
    setTimeout(function() {
        window.scrollTo(0, 1);
    }, 100);
};

const aboutMeTabLink = document.querySelectorAll('.tab-links');
const aboutMeTabContents = document.querySelectorAll('.tab-contents')

for(let i=0 ; i<aboutMeTabLink.length ; i++){
    aboutMeTabLink[i].addEventListener('click', () => {
        aboutMeTabLink.forEach((title) => {
            title.classList.remove('active');
        });
        aboutMeTabContents.forEach((content) =>{
            content.classList.remove('active-tab')
        })
        aboutMeTabLink[i].classList.add('active');
        aboutMeTabContents[i].classList.add('active-tab')
    })
}


window.addEventListener('scroll',reveal)
function reveal(){
    const reveals = document.querySelectorAll('.section-container')
    for(let i=0; i < reveals.length; i++){
        let windowHeight = window.innerHeight;
        let revealTop = reveals[i].getBoundingClientRect().top;
        let revealPoint = 10;
        if(revealTop < windowHeight - revealPoint){
            reveals[i].classList.add('active-section-container')
        }else{
            reveals[i].classList.remove('active-section-container')
        }
    }
}
