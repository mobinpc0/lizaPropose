const noBtn = document.getElementById('no-btn');
const wannaTryBtn = document.getElementById('wanna-try-btn');
const question = document.querySelector('.question');
const photoFrame = document.querySelector('.photo-frame');
const coupleContainer = document.querySelector('.couple-container');

let clickCount = 0;

// "No" button evasion logic
noBtn.addEventListener('mouseover', moveButton);
noBtn.addEventListener('touchstart', moveButton);

function moveButton() {
    const btnRect = noBtn.getBoundingClientRect();
    const maxX = window.innerWidth - btnRect.width;
    const maxY = window.innerHeight - btnRect.height;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    noBtn.style.zIndex = '100'; // Ensure it's above other elements
    noBtn.style.transform = `rotate(${Math.floor(Math.random() * 40 - 20)}deg)`;
}

// "Wanna try" interaction flow
wannaTryBtn.addEventListener('click', () => {
    clickCount++;

    if (clickCount === 1) {
        // First click: Change image and text
        question.innerHTML = "Are you sure?";
        wannaTryBtn.innerHTML = "I am sure!";

        // Replace content with motivated image
        coupleContainer.innerHTML = '<img src="assets/motivated.svg" alt="Motivated" class="character motivated">';

        // Resize frame to square for motivated image
        photoFrame.style.width = '175px';
        photoFrame.style.height = '175px';

        // Add specific style for motivated image
        const motivatedImg = document.querySelector('.motivated');
        motivatedImg.style.width = '100%';
        motivatedImg.style.height = '100%';
        motivatedImg.style.position = 'static';

        moveWannaTryBtn();

    } else if (clickCount === 2) {
        // Second click
        question.innerHTML = "Are you really sure?";
        moveWannaTryBtn();

    } else if (clickCount === 3) {
        // Third click
        question.innerHTML = "Really really sure?";
        moveWannaTryBtn();

    } else {
        // Final click - Celebration
        question.innerHTML = "I knew it! I love you sooooo much LIZUUU ❤️";
        wannaTryBtn.style.display = 'none';
        noBtn.style.display = 'none';

        // Show the final photo
        coupleContainer.innerHTML = '<img src="assets/final_photo.jpg" alt="Us" class="final-photo">';

        // Resize frame to 9:16 aspect ratio
        photoFrame.style.width = '175px';
        photoFrame.style.height = '312px';

        const finalPhoto = document.querySelector('.final-photo');
        finalPhoto.style.width = '100%';
        finalPhoto.style.height = '100%';
        finalPhoto.style.objectFit = 'cover';
        finalPhoto.style.borderRadius = '10px'; // Optional: matches frame radius roughly

        photoFrame.style.transform = "scale(1.2) rotate(0deg)";
        createHearts();
    }
});

function moveWannaTryBtn() {
    wannaTryBtn.style.position = 'fixed';
    // Random position within safe bounds
    const maxX = window.innerWidth - 150;
    const maxY = window.innerHeight - 50;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    wannaTryBtn.style.left = randomX + 'px';
    wannaTryBtn.style.top = randomY + 'px';
    wannaTryBtn.style.zIndex = '1000';
}

function createHearts() {
    const interval = setInterval(() => {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = '-50px';
        heart.style.fontSize = Math.random() * 30 + 20 + 'px';
        heart.style.animation = `fall ${Math.random() * 3 + 2}s linear`;
        heart.style.zIndex = '1000';

        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 5000);
    }, 100);

    setTimeout(() => {
        clearInterval(interval);
    }, 5000);
}

// Add CSS for heart animation dynamically
const styleDate = document.createElement('style');
styleDate.innerHTML = `
@keyframes fall {
    to {
        transform: translateY(100vh) rotate(360deg);
    }
}`;
document.head.appendChild(styleDate);
