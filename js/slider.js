const gallery = document.querySelector(".gallery-wrapper");
let isDown = false;
let startX;
let scrollLeft;

gallery.addEventListener('mousedown', (e) => {
    isDown = true;
    gallery.classList.add('active');
    startX = e.pageX - gallery.offsetLeft;
    scrollLeft = gallery.scrollLeft;
});
gallery.addEventListener('mouseleave', () => {
    isDown = false;
    gallery.classList.remove('active');
});
gallery.addEventListener('mouseup', () => {
    isDown = false;
    gallery.classList.remove('active');
});
gallery.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - gallery.offsetLeft;
    const walk = (x - startX) * 1.5;
    gallery.scrollLeft = scrollLeft - walk;
});


//--------------------------------------//

//в дальнейшем при клике на сам товар, перед отрисовкой карточки, мы будем получать всю инфу через запрос, либо как нибудь локально по id
//на данный момент сделаю такую структуру для реализации слайдера: 
const pink = [
        "13324066-1424900313757978.jpg",
        "13324066-1644896638050059.jpg",
        "13324066-6054896988516740.jpg",
        "13324066-6614900844416464.jpg",
        //"https://static.thcdn.com/images/small/original//productimg/130/130/13324066-1644896638050059.jpg",
        //"https://static.thcdn.com/images/small/original//productimg/130/130/13324066-6054896988516740.jpg",
        //"https://static.thcdn.com/images/small/original//productimg/130/130/13324066-1424900313757978.jpg",
        //"https://static.thcdn.com/images/large/original//productimg/1600/1600/13324066-6614900844416464.jpg",
    ]
    //Здесь также можно использовать и изображения из интернета
const brown = [
    "13324067-1224896638086557.jpg",
    "13324067-1324900313824209.jpg",
    "13324067-1614900844456988.jpg",
    "13324067-1034896988595853.jpg"
    //"https://static.thcdn.com/images/large/original//productimg/1600/1600/13324067-1224896638086557.jpg",
    //"https://static.thcdn.com/images/large/original//productimg/1600/1600/13324067-1034896988595853.jpg",
    //"https://static.thcdn.com/images/large/original//productimg/1600/1600/13324067-1324900313824209.jpg",
]

const Product = {
    colors: { pink, brown },
    colorReference: []
}

//При изменении цвета, нужно будет сменять блок(папку) фотографий, на данный момент я буду обращаться просто к массиву с фотографиями конкретного цвета,
//В дальнейшем это может быть директорией



//Создаем кнопки с цветами под наш продукт:
const colorChangeBlock = document.querySelector(".color-change-var")

const colorButtons = [];
let selectedClr = null
let selectedImg = null
let galleryImages = []

const imageWrapper = document.querySelector(".image-wrapper")

const fillColorButtons = (colors) => {

    for (let el in colors) {
        const btn = document.createElement('div');
        btn.className = "color-var"
        btn.id = el
        btn.style.backgroundColor = el + ""

        colorChangeBlock.appendChild(btn)
        colorButtons.push(btn)
    }
    colorButtons[0].classList.add("selected")
    selectedClr = colorButtons[0].id
}

fillColorButtons(Product.colors)

//Добавим возможность выбирать цвет

for (let btn of colorButtons) {
    btn.onclick = () => {
        const old = document.getElementById(selectedClr)
        if (old === btn) return
        old.classList.remove("selected")
        btn.classList.add("selected")
        selectedClr = btn.id
        fillGallery(selectedClr)
    }
}

//Далее по выбранному цвету получим нужные фотографии и передадим их в галлерею

const fillGallery = (color) => {

    while (gallery.firstChild) {
        gallery.removeChild(gallery.firstChild)
    }
    galleryImages = []
    for (let img of Product.colors[color]) {
        const slideImg = document.createElement('div')
        slideImg.className = "slide"
        slideImg.style.backgroundImage = `url(static/img/${img})`
        slideImg.style.backgroundRepeat = "no-repeat"
        slideImg.style.backgroundSize = "100%"
        gallery.appendChild(slideImg)
        galleryImages.push(slideImg)
    }

    selectedImg = galleryImages[0]
    galleryImages[0].classList.add("selected")
    imageWrapper.style.backgroundImage = selectedImg.style.backgroundImage
    imageWrapper.style.backgroundRepeat = "no-repeat"
    imageWrapper.style.backgroundSize = "contain"
    for (let img of galleryImages) {
        img.onclick = () => {
            if (img === selectedImg) return
            selectImage(img)
        }
    }
}
fillGallery(selectedClr)

//Выбрать фото из галлереи

function selectImage(img) {
    selectedImg.classList.remove("selected")
    selectedImg = img
    selectedImg.classList.add("selected")
    imageWrapper.style.backgroundImage = selectedImg.style.backgroundImage
}




//Наконец кнопки слайдера

const prevBtn = document.getElementById("prev")
const nextBtn = document.getElementById("next")
prevBtn.onclick = () => {
    if (galleryImages.indexOf(selectedImg) === 0) {
        selectImage(galleryImages[galleryImages.length - 1])
    } else {
        selectImage(galleryImages[galleryImages.indexOf(selectedImg) - 1])
    }
}


nextBtn.onclick = () => {
    if (galleryImages.indexOf(selectedImg) === galleryImages.length - 1) {
        selectImage(galleryImages[0])
    } else {
        selectImage(galleryImages[galleryImages.indexOf(selectedImg) + 1])
    }
}