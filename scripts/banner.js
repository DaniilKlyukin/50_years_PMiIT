 // Скрипт для перелистывания баннера
    document.addEventListener('DOMContentLoaded', function() {
        const banner = document.getElementById('banner');
        const slides = banner.querySelectorAll('.banner-slide');
        const prevBtn = banner.querySelector('.banner-prev');
        const nextBtn = banner.querySelector('.banner-next');
        let currentSlide = 0;
        
        // Функция показа слайда
        function showSlide(index) {
            // Скрываем все слайды
            slides.forEach(slide => {
                slide.classList.remove('active');
                slide.style.backgroundImage = 'none';
            });
            
            // Показываем текущий слайд
            slides[index].classList.add('active');
            const bgImage = slides[index].getAttribute('data-bg');
            if (bgImage) {
                slides[index].style.backgroundImage = `url(${bgImage})`;
                slides[index].style.backgroundSize = 'cover';
                slides[index].style.backgroundPosition = 'center';
            }
        }
        
        // Переход к следующему слайду
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }
        
        // Переход к предыдущему слайду
        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        }
        
        // Обработчики кнопок
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
        
        // Автоперелистывание (опционально)
        let slideInterval = setInterval(nextSlide, 5000);
        
        // Остановка автоперелистывания при наведении
        banner.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        // Возобновление автоперелистывания
        banner.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, 5000);
        });
        
        // Показываем первый слайд
        showSlide(0);
    });