// window.onload = function() {
//     setTimeout(function() {
//         window.scrollTo(0, 1);
//     }, 100);
// };

function downloadPDF(){
    const pdfURL = 'files/akshatha-hebbar-resume.pdf';
    const link = document.createElement('a');
    link.href = pdfURL;
    link.target = '_blank';
    link.download = 'Akshatha Hebbar resume.pdf';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
const downloadResume = document.getElementById('resume');
downloadResume.addEventListener('click',downloadPDF)

function showProjectVideoModal(name, videoURL) {
    return (event) => {
        const modalElement = document.createElement('modal-dialog')
        modalElement.setAttribute('title', name);
        modalElement.setAttribute('id', `modal-${name}`);
        modalElement.setAttribute('visible', true);
        modalElement.setAttribute('videoURL', videoURL);
        modalElement.addEventListener('close', () => {
            modalElement.remove();
        })
        document.body.appendChild(modalElement);
        console.log('name',name, event);
    }
}

const feedbackLoggerProjectContainer = document.getElementById('feedback-logger-project');
feedbackLoggerProjectContainer.addEventListener('click',
    showProjectVideoModal('Feedback logger', 'https://www.youtube.com/embed/1diltUKm9s8')
)

const workoutTrackerProjectContainer = document.getElementById('workout-tracker-project');
workoutTrackerProjectContainer.addEventListener('click',
    showProjectVideoModal('Workout Tracker', 'https://www.youtube.com/embed/3NQR7v8vilg')
)

const digitalBookProjectContainer = document.getElementById('digital-book-project');
digitalBookProjectContainer.addEventListener('click',
    showProjectVideoModal('Buy Digital Book', 'https://www.youtube.com/embed/tgmpAsn14AE')
)

const repeatedBuyersProjectContainer = document.getElementById('repeated-buyers-project');
repeatedBuyersProjectContainer.addEventListener('click',
    showProjectVideoModal('Predict Repeated Buyers', 'https://www.youtube.com/embed/RKJ5-4E2nJw')
)


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
const seeMore = document.getElementById('scrollNext')
seeMore.addEventListener('click',reveal)
function reveal(){
    const reveals = document.querySelectorAll('.section-container')
    const scrollHide = document.getElementById('scrollNext');
    scrollHide.classList.add('tab-contents')
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
