class Test {
    constructor(container) {
        this.container = container;
        this.main = container.querySelector('.main');
        this.mountainPage = container.querySelector('.mountain-page');
        this.mountainPage2 = container.querySelector('.mountain-page2');
        this.mountainPage.style.display = 'none';
        this.mountainPage2.style.display = 'none';

        this.chooseMountain();
        this.chooseHouse();
        this.backToMap();
        this.changePhoto();
        this.backToMap();
        this.openFullScreen();
        this.closeFullScreen();

    }

    //Логика первой страницы

    chooseMountain() {
        for (let item of this.main.querySelectorAll('.element')) {
            item.onclick = () => {
                let text = item.querySelector('.text').textContent;
                let index = Array.from(this.main.querySelectorAll('.element')).findIndex(el => el === item);
                this.main.style.display= 'none';
                this.mountainPage.style.display = 'flex';
                this.mountainPage.querySelector('.title').textContent = text;
                Array.from(this.mountainPage.querySelectorAll('.svg-home'))[index].classList.add('svg-home-active');
                this.mountainPage.querySelector('.photo').src = 'img/index2/mount0.jpg';
                this.mountainPage.querySelector('.eclipse').classList.add('eclipse-active')
                this.mountainPage2.querySelector('.exit-eclipse').classList.add('eclipse-active')
            }
        }
    }

    //Логика второй и третьей страниц

    chooseHouse() {
        for (let item of this.mountainPage.querySelectorAll('.svg-home')) {
            item.onclick = () => {
                this.mountainPage.querySelector('.svg-home-active').classList.remove('svg-home-active')
                let index = Array.from(this.mountainPage.querySelectorAll('.svg-home')).findIndex(el => el === item);
                Array.from(this.mountainPage.querySelectorAll('.svg-home'))[index].classList.add('svg-home-active');
                this.mountainPage.querySelector('.title').textContent =
                    this.main.querySelectorAll('.text')[index].textContent;
            }
        }
    }

    changePhoto() {

        Array.from(this.mountainPage.getElementsByClassName('eclipse')).forEach(element => {
            element.addEventListener('click', () => {
                this.mountainPage.querySelector('.eclipse-active') ? this.mountainPage.querySelector('.eclipse-active').classList.remove('eclipse-active') : false;
                let index = Array.from(this.mountainPage.getElementsByClassName('eclipse')).indexOf(element);
                element.classList.add('eclipse-active');
                this.mountainPage2.getElementsByClassName('exit-eclipse')[index].classList.add('eclipse-active')
                this.mountainPage.querySelector('.photo').src = `img/index2/mount${index}.jpg`
                this.mountainPage2.querySelector('.photo').src = `img/index2/mount${index}.jpg`
            })
        })

        Array.from(this.mountainPage2.getElementsByClassName('exit-eclipse')).forEach(element => {
            element.addEventListener('click', () => {
                this.mountainPage2.querySelector('.eclipse-active') ? this.mountainPage2.querySelector('.eclipse-active').classList.remove('eclipse-active') : false;
                let index = Array.from(this.mountainPage2.getElementsByClassName('exit-eclipse')).indexOf(element);
                element.classList.add('eclipse-active');
                this.mountainPage.getElementsByClassName('eclipse')[index].classList.add('eclipse-active')
                this.mountainPage.querySelector('.photo').src = `img/index2/mount${index}.jpg`;
                this.mountainPage2.querySelector('.photo').src = `img/index2/mount${index}.jpg`
            })
        })

    }

    backToMap() {

        document.querySelectorAll('.arrow').forEach(item => item.addEventListener('click', () => {
            this.mountainPage.style.display = 'none'
            this.mountainPage2.style.display = 'none'
            this.main.style.display = 'inline'
            this.mountainPage.querySelectorAll('.svg-home-active').forEach(elem =>
                elem.classList.remove("svg-home-active")
            )
            this.mountainPage.querySelectorAll('.eclipse').forEach(item => {
                item.classList.remove('eclipse-active')
            })
            this.mountainPage2.querySelectorAll('.exit-eclipse').forEach(item => {
                item.classList.remove('eclipse-active')
            })
        }))

    }

    openFullScreen() {
        this.mountainPage.querySelector('.full-svg').addEventListener('click', () => {
            this.mountainPage.querySelectorAll('.eclipse').forEach(elem => {
                if (elem.classList.contains('eclipse-active')) {
                    let index = Array.from(this.mountainPage.querySelectorAll('.eclipse')).indexOf(elem);
                    this.mountainPage2.querySelectorAll('.exit-eclipse').forEach(element => {
                        element.classList.remove('eclipse-active');
                    })
                    this.mountainPage2.querySelectorAll('.exit-eclipse')[index].classList.add('eclipse-active')
                }
            })
            this.mountainPage.style.display = 'none'
            this.mountainPage2.style.display = 'inline'
        })
    }

    closeFullScreen() {
        this.mountainPage2.querySelector('.fullscreen-exit').addEventListener('click', () => {
            this.mountainPage2.querySelectorAll('.exit-eclipse').forEach(elem => {
                if (elem.classList.contains('eclipse-active')) {
                    let index = Array.from(this.mountainPage2.querySelectorAll('.exit-eclipse')).indexOf(elem);
                    this.mountainPage.querySelectorAll('.eclipse').forEach(element => {
                        element.classList.remove('eclipse-active');
                    })
                    this.mountainPage.querySelectorAll('.eclipse')[index].classList.add('eclipse-active')
                }
            })
            this.mountainPage2.style.display = 'none'
            this.mountainPage.style.display = 'flex'
        })
    }
}

new Test(document.body)