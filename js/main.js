document.addEventListener('DOMContentLoaded', () => {

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('toggle');
    });

    // Close mobile menu when a link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('toggle');
        });
    });

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select elements to animate
    const animateElements = document.querySelectorAll('.about-text, .about-img, .section-header, .portfolio-item, .service-card, .contact-form, .contact-info');

    animateElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
        observer.observe(el);
    });
    // Load Instagram Feed from Local JSON
    const instaFeedContainer = document.getElementById('insta-feed');

    if (instaFeedContainer) {
        fetch('instagram_data.json')
            .then(response => response.json())
            .then(data => {
                // Check if data is the object with posts array or just the array (handling both just in case)
                const posts = data.posts ? data.posts : (Array.isArray(data) ? data : []);

                posts.forEach(post => {
                    const postElement = document.createElement('div');
                    postElement.classList.add('portfolio-item');

                    // Use prunedCaption if available, otherwise caption, otherwise empty
                    // Use logic to get the first line of caption for alt text
                    const captionText = post.prunedCaption || post.caption || '';
                    const altText = captionText.split('\n')[0] || 'Instagram Post';

                    postElement.innerHTML = `
                        <img src="${post.mediaUrl}" alt="${altText}">
                        <div class="overlay">
                            <h3><a href="${post.permalink}" target="_blank" style="color:white; text-decoration:none;">
                                ${captionText ? (captionText.length > 50 ? captionText.substring(0, 50) + '...' : captionText) : 'View on Instagram'}
                            </a></h3>
                        </div>
                    `;

                    // Add animation styles to new elements
                    postElement.style.opacity = "0";
                    postElement.style.transform = "translateY(30px)";
                    postElement.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";

                    instaFeedContainer.appendChild(postElement);
                    observer.observe(postElement);
                });
            })
            .catch(error => console.error('Error loading Instagram data:', error));
    }

    // Contact Form to WhatsApp
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;
            const date = document.getElementById('date').value;
            // Note: Date is present in form but not in requested format. 
            // If user wants date, we can add it, but adhering strictly to requested model for now.

            // Format:
            // New Enquiry from Website
            // Name: ...
            // Email: ...
            // Phone: ...
            // Date: ...
            // Message: ...

            const whatsappMessage = `New Enquiry from Wedroot Films Website%0A%0AName: ${name}%0AEmail: ${email}%0APhone: ${phone}%0ADate: ${date}%0AMessage: ${message}`;

            const phoneNumber = '918606531933'; // Target phone number
            const whatsappURL = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;

            window.open(whatsappURL, '_blank');
        });
    }
});
