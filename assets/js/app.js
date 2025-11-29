/* ===================== Home Section =========================== */
/* Header */
const mainHeader = document.getElementById('main-header');
const navbarLinks = mainHeader.querySelectorAll('nav .navbar-collapse ul.header-main-ul li a');



//     a.addEventListener('mouseenter', (e) => {
//         e.preventDefault();
//         navbarLinks.forEach(a => a.classList.remove('mouse-leave'));
//         e.target.classList.add('mouse-enter');
//     })
// a.addEventListener('mouseleave', (e) => {
//     e.preventDefault();
//     navbarLinks.forEach(a => a.classList.remove('mouse-enter'));
//     e.target.classList.add('mouse-leave');
// })

navbarLinks.forEach(a => {
    a.addEventListener('click', (e) => {
        e.preventDefault();
        navbarLinks.forEach(a => {
            a.classList.remove('active');
            a.removeAttribute('aria-current');
        });
        e.target.classList.add('active');
        e.target.setAttribute('aria-current', 'page');
        const secId = e.target.getAttribute('href');
        document.querySelector(secId)?.scrollIntoView({behavior: 'smooth'});
    });
});

/* Using intersectionObserver to add active class to link when element is visible when scrolling */
const sections = document.querySelectorAll('main section');
const observeOptions = {
    root: null,
    // threshold when the target element is visible by 20% => 0.2 , 0.5 => 50%
    threshold: 0.2,
};

// Note IntersectionObserver is capitalize
const sectionsObserver = new IntersectionObserver (entries => {
    entries.forEach(entry => {
        // entry.isIntersecting not method === equals true
        if(entry.isIntersecting) {
            const secId = entry.target.id;
            // console.log(secId);

            // Remove active, mouse-enter, mouse-leave class from links
            // Remove aria-current='page' attribute from links
            navbarLinks.forEach(a => {
                a.classList.remove('active');
                a.removeAttribute('aria-current');
            });
            

            // Add active, mouse-enter, mouse-leave class from links - Note When using href for links or internal links in the same webpage must previous hash # then idName <a href=#idName>link</a>
            const currentLink = mainHeader.querySelector(`nav ul.header-main-ul li a[href="#${secId}"]`);
            // console.log(currentLink);
            // when using optional chaining Operator (?.) if object.property is equals null or undefined is ignoring 
            currentLink?.classList.add('active');
            currentLink?.setAttribute('aria-current', 'page');
            // Add aria-current='page' attribute from links
        }
    })
}, observeOptions);

// Fire intersectionObserver as below when section is visible by 20% according threshold
sections.forEach(section => {
    // my observer as instance from IntersectionObserver
    sectionsObserver.observe(section);
})

/* Header */


// /* Home Section */

// /* Fire Modal */
const modalBtn = document.getElementById('modalBtn');
const modal = document.getElementById('videoModal');


modalBtn.addEventListener('click', e => {
    e.preventDefault();
    const bsModal = bootstrap.Modal.getOrCreateInstance(modal);
    bsModal.show();
})


/* Home Section */


/* Home Section */
const secHome = document.querySelector('main section.home');
document.addEventListener('DOMContentLoaded', () => {
    secHome.querySelector('article').classList.add('customize-fade');
})
/* Home Section */


/* ===================== Home Section =========================== */

/* About Section */
// const animatedAboutElements = document.querySelectorAll('main section.about .animated-on-scroll');

const about = document.getElementById('about'); 
const animatedElements = about.querySelectorAll('main section.about .animated-on-scroll');
// console.log(animatedElements);

const aboutOptions = {
    rootMargin:'0px 0px -120px 0px',
    threshold: 0.10
};

/*      animated-on-scroll
    1- data-animation-type="fade-in-article"
    2- data-animation-type="animated-progress"
    3- data-animation-type="animated-number"
    4- data-animation-type="fade-up"
*/
const aboutObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        const targetElement = entry.target;        
        // dataset is property inside entry.target to access all html attributesName that starts with
        // data-*  => asterisk * which mean get any attributeName after data-
        // To access the value of that attributeName use the value of attribute in camelCase
        // Example attribute  data-animation-type = "fade-in";
        // to access the attribute name  entry.target.dataset
        // to access the attribute value entry.target.dataset.animationType
        // which means convert attribute name in kebab case to camelCase 
        // to access value of this attribute
        const animationClass = targetElement.dataset.animationType;
        if(entry.isIntersecting) {
            if(animationClass === 'fade-in-article' || animationClass === 'fade-up') 
                targetElement.classList.add(animationClass);
            if(animationClass === 'animated-number') {
                targetElement.classList.add(animationClass);
                startCounting(targetElement);
            }
            if(animationClass === 'animated-progress') {
                targetElement.classList.add(animationClass);
                startProgressing(targetElement);
            }
            // using unobserve(entry.target) inside check entry.isIntersecting
            // Using Unobserve(entry.target) to make animation plays only once for more performance and treat flashing
            aboutObserver.unobserve(entry.target);
        } else {
            if(animationClass !== 'fade-in-article' && animationClass !== 'fade-up') {
                stopCounting(targetElement);
                stopProgressing(targetElement);
            }
            targetElement.classList.remove(animationClass);
        }
    })
},aboutOptions);


animatedElements.forEach(ele => {
    aboutObserver.observe(ele);
});


const counterMap = new Map();
const progressMap = new Map();

function startCounting(element) {
    let intervalId = null;
    let counter = 0;
    let eleNumber = parseInt(element.dataset.target);

    // Stop Interval
    stopCounting(element);

    intervalId = setInterval(() => {
        counter++;
        if(counter >= eleNumber)
                element.innerText = /%/.test(element.dataset.target) ?  `${eleNumber}%` : eleNumber;
            else 
                element.innerText = /%/.test(element.dataset.target) ?  `${counter}%` : counter;
        
        counterMap.set(element, intervalId);
        }, 20);
}


function stopCounting(element) {
    if(counterMap.has(element)) {
        clearInterval(counterMap.get(element))
        counterMap.delete(element);
    }
    element.innerText = element.innerText === "" ? "" : 0;
}   


function startProgressing(element) {
    let intervalId = null;
    let counter = 0;
    let eleNumber = parseInt(element.dataset.target);


    // Stop Progressing
    stopProgressing(element);

    intervalId = setInterval(() => {
        counter++;
        if(counter >= eleNumber)
            element.style.width = `${eleNumber}%`;
        else 
            element.style.width = `${counter}%`;

        progressMap.set(element, intervalId);
    })
}

function stopProgressing(element) {
    if(progressMap.has(element)){
        clearInterval(progressMap.get(element));
        progressMap.delete(element);
    }
    element.style.width = `${element.dataset.target}`;
}


/* About Section */


/* Start Services */
const services = document.getElementById('services');
// console.log(services);
const servicesOptions = {
    rootMargin: '0px 0px -120px 0px',
    threshold: 0.25
};

const servicesObserver = new IntersectionObserver(entries => {
    entries.forEach((entry, index) => {
        const animationClass = entry.target.getAttribute('data-animation-type');
        if(entry.isIntersecting){
            setTimeout(() => {
                entry.target.classList.add(animationClass);
            }, index * 250);
            // using unobserve(entry.target) inside check entry.isIntersecting
            // Using Unobserve(entry.target) to make animation plays only once for more performance and treat flashing
            servicesObserver.unobserve(entry.target);
        }
        else
            entry.target.classList.remove(animationClass);
    })
},servicesOptions);


services.querySelectorAll('main section.services div.row div article.card').forEach(article => {
    servicesObserver.observe(article);
})
/* End Services */

/* Start Portofolio */
const portfolio = document.getElementById('portfolio');
// console.log(portfolio);
const figures = portfolio.querySelectorAll('figure');
const allLinks = portfolio.querySelectorAll('ul li');



// mainObserver For All Sectio
const portOptions = {
    rootMargin: '0px 0px -120px 0px',
    threshold: 0.25
};
const portObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        const animationClass = entry.target.getAttribute('data-animation-type');
        if(animationClass){
            if(entry.isIntersecting){
                entry.target.classList.add(animationClass);
                // using unobserve(entry.target) inside check entry.isIntersecting
                // Using Unobserve(entry.target) to make animation plays only once for more performance and treat flashing
                portObserver.unobserve(entry.target);
            }
            else
                entry.target.classList.remove(animationClass);
        }
    })
},portOptions);


figures.forEach(fig => {
    portObserver.observe(fig);
})


const imgList = {
    All: ['assets/img/portfolio-1.jpg', 'assets/img/portfolio-2.jpg', 'assets/img/portfolio-3.jpg', 'assets/img/portfolio-4.jpg', 'assets/img/portfolio-5.jpg', 'assets/img/portfolio-6.jpg'],
    App: ['assets/img/portfolio-1.jpg', 'assets/img/portfolio-2.jpg', 'assets/img/portfolio-3.jpg'],
    Photo: ['assets/img/portfolio-2.jpg', 'assets/img/portfolio-4.jpg', 'assets/img/portfolio-5.jpg'],
    Web: ['assets/img/portfolio-4.jpg', 'assets/img/portfolio-5.jpg', 'assets/img/portfolio-6.jpg']
}

function activateLink(linkClicked) {
    allLinks.forEach(link => {
        link.removeAttribute('aria-current');
        link.classList.remove('active');
    })
    linkClicked.setAttribute('aria-current','true');
    linkClicked.classList.add('active');
}

function sortingImages(linkClicked) {
    figures.forEach(fig => {
        const imgSource = fig.querySelector('img').getAttribute('src');
        if(linkClicked.innerText.trim() === 'All'){
            // figure.style.display = ""; as unset equals inline-block
            fig.style.display = "";
            fig.setAttribute('data-animation-type','fade-in-scale');
        } 
        else if (imgList[linkClicked.innerText].some(img => imgSource.includes(img))){
            // figure.style.display = ""; as unset equals inline-block
            fig.style.display = "";
            fig.setAttribute('data-animation-type','fade-in-scale');
        }
        else {
            fig.classList.remove('d-flex');
            fig.style.display = "none";
        } 
    })
}

allLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        activateLink(link);
        sortingImages(link);
    })
})

/* Start Open customize Modal  */
const imgLinks = portfolio.querySelectorAll('div.row figure a');
const mycarousel = document.getElementById('mycarousel');
const closeBtn = mycarousel.querySelector('header.carousel-header button:last-of-type');
const linkDownload = mycarousel.querySelector('header.carousel-header a');
const carouselIndex = mycarousel.querySelector('header.carousel-header p:first-of-type');
const carouselImgs = mycarousel.querySelectorAll('div.carousel-container figure img');
const leftBtn = mycarousel.querySelector('div.carousel-container + button');
const rightBtn = mycarousel.querySelector('div.carousel-container ~ button:last-of-type');



/* Open Slide */
let currentIndex = 0;
const imgWidth = carouselImgs[currentIndex].offsetWidth
imgLinks.forEach((link, index) => {
    link.addEventListener('click', e => {
        e.preventDefault();
        currentIndex = index;
        updateSlider(currentIndex);
        mycarousel.classList.remove('fade-out');
        mycarousel.style.display = 'flex';
        mycarousel.classList.add('fade-fill');
    });
});


closeBtn.addEventListener('click', e => {
    e.preventDefault();
    mycarousel.classList.remove('fade-fill');
    mycarousel.classList.add('fade-out');
    setTimeout( () => {
        mycarousel.style.display = 'none';
    }, 600);
});


function nextSlide() {
    currentIndex = (currentIndex + 1) % carouselImgs.length;
    updateSlider(currentIndex);
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + carouselImgs.length) % carouselImgs.length;
    updateSlider(currentIndex);
}


function updateSlider(index) {
    mycarousel.querySelector('.carousel-container figure').style.transform = `translateX(-${index * 100}%)`;
    carouselImgs.forEach((img, i) => {
        img.classList.toggle('active', index === i);
        img.setAttribute('aria-current', index === i? 'true' : 'false');
    });
    carouselIndex.innerText = `${index + 1}/${carouselImgs.length}`;
}


leftBtn.addEventListener('click', prevSlide);
rightBtn.addEventListener('click', nextSlide);


linkDownload.addEventListener('click', e => {
    e.preventDefault();
    // Download Image by Using URL
    const imgSrc = carouselImgs[currentIndex].src;
    fetch(imgSrc).then(response => response.blob())
    .then(blob => {
        const blobURL = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobURL;
        link.download = imgSrc.split('/').pop();
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(blobURL);
    })
    .catch(error => {
        console.log("Download Failed", error);
    })
});
/* End Portofolio */


/* Start Contact */
// A- Animation On Scrolling using IntersectionObserver
const secContact = document.getElementById('contact');
// console.log(secContact);

// mainObserver For All
const observerOptions = {
    root: null,
    threshold: 0.1
};
const mainObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        const animationClass = entry.target.getAttribute('data-animation-type');
        if(animationClass){
            if(entry.isIntersecting) {
                entry.target.classList.add(animationClass);
                // using unobserve(entry.target) inside check entry.isIntersecting
                // Using Unobserve(entry.target) to make animation plays only once for more performance and treat flashing
                mainObserver.unobserve(entry.target);
            }
            else
                entry.target.classList.remove(animationClass);
        }
    })
},observerOptions);


// Fire mainObserver
secContact.querySelectorAll('.row article, .row .left, .row form.right').forEach(element => {
    mainObserver.observe(element);
})

// B- Show Fallback Image instead of iframe when network offline
const iframe = secContact.querySelector('div.left iframe');
const img = secContact.querySelector('div.left img');


/* Check Internet Connection by using Promise */
function checkConnection( ) {
    return new Promise((resolve) => {
        // create new instance from image class
        const imgTest = new Image();

        // Load Resource Image return true => internet Connection Works
        imgTest.addEventListener('load', () => {
            resolve(true);
        })

        // If happens error when load Image resource return false => internet Connection Not Works 
        imgTest.addEventListener('error', () => {
            resolve(false);
        })

        // Add Source of Image is download favicon.ico (google icon) 
        // Add Date.now() to google icon to ensure browser check this in each time
        // Which browser can save icon in browser caches 
        // So Date.now() to generate timestamp in each time when download google icon
        imgTest.src = 'https://google.com/favicon.ico?' + Date.now();
    })
}

// Function showIframe is accept destructuring literal object
function showIframe({isConnect}) {
    // if isConnect is true internet connection works
    if(isConnect) {
        iframe.src = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55259.075683505995!2d31.2282952!3d30.045686299999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145840ac90c2ed63%3A0x2fdb96e4e9f72e6f!2sSaladin%20Citadel!5e0!3m2!1sen!2seg!4v1763659466453!5m2!1sen!2seg';
    }
    // if isConnect true will add class ele-visible, if false remove class
    // if isConnect is true will add class ele-visible
    // if isConnect is false will remove class ele-visible
    img.classList.toggle('ele-visible', !isConnect);
    img.classList.toggle('ele-in-visible', isConnect);
    iframe.classList.toggle('ele-in-visible', !isConnect);
    iframe.classList.toggle('ele-visible', isConnect);
}

// Asyncrohonising Function wait respone from Promise Function and then passing result of connection
// True or false to showIframe function which is accept liter object so called object by the same name isConnect
// Then destructuring the object to get result true or false
async function connectionResult() {
    const result = await checkConnection();

    // Calling showIframe() Function
    showIframe({isConnect: result});
}

// Call immediately Asynchronising function at first to wait syncrohonising function Promise to get result of connection
// this is check connection of network when load web page immediately
connectionResult();


// passing asyncrohonising function to window event online in this case connectionResult as true Networks Works online (Done)
window.addEventListener('online', checkConnection);
//  passing asyncrohonising function to window event offline in this case connectionResult as false Networks Not Works offline (Not Done)
window.addEventListener('offline', checkConnection);

// C- Validation Form
const form = secContact.querySelector('div form.right');
// console.log(form);
form.addEventListener('submit', (e) => {
    if(!form.checkValidity()){
        e.preventDefault();
        form.classList.add('was-validated');
    }
})
/* End Contact */