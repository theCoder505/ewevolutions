$(document).ready(function() {
    // Initialize animations and interactions
    initializeNavigation();
    initializeScrollEffects();
    initializeFormHandling();
    initializePortfolioInteractions();
    initializeMobileMenu();
    initializeScrollToTop();
    initializeThemeToggle();
    
    // Initialize Three.js animations
    if (typeof initHeroAnimation === 'function') {
        initHeroAnimation();
    }
    if (typeof initServicesAnimation === 'function') {
        initServicesAnimation();
    }
    if (typeof initAboutAnimation === 'function') {
        initAboutAnimation();
    }
});

// Navigation functionality
function initializeNavigation() {
    // Smooth scrolling for navigation links
    $('.nav-link').on('click', function(e) {
        e.preventDefault();
        const target = $(this).attr('href');
        const targetElement = $(target);
        
        if (targetElement.length) {
            const offsetTop = targetElement.offset().top - 80;
            
            $('html, body').animate({
                scrollTop: offsetTop
            }, 800, 'swing');
            
            // Close mobile menu if open
            $('#mobile-menu').addClass('hidden');
        }
    });
    
    // Update active navigation item on scroll
    $(window).on('scroll', function() {
        const scrollPos = $(window).scrollTop() + 100;
        
        $('.nav-link').each(function() {
            const target = $(this).attr('href');
            const targetElement = $(target);
            
            if (targetElement.length) {
                const targetTop = targetElement.offset().top;
                const targetBottom = targetTop + targetElement.outerHeight();
                
                if (scrollPos >= targetTop && scrollPos < targetBottom) {
                    $('.nav-link').removeClass('active');
                    $(this).addClass('active');
                }
            }
        });
        
        // Update navbar background on scroll
        if (scrollPos > 50) {
            $('#navbar').addClass('bg-dark/95').removeClass('bg-dark/90');
        } else {
            $('#navbar').addClass('bg-dark/90').removeClass('bg-dark/95');
        }
    });
}

// Scroll effects and animations
function initializeScrollEffects() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Add animation classes based on data attributes
                if (element.hasAttribute('data-animate')) {
                    const animationType = element.getAttribute('data-animate');
                    element.classList.add(`animate-${animationType}`);
                } else {
                    element.classList.add('animate-fade-in-up');
                }
                
                observer.unobserve(element);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    $('.service-card, .portfolio-item, #about > div > div').each(function() {
        observer.observe(this);
    });
    
    // Parallax effect for hero section
    $(window).on('scroll', function() {
        const scrolled = $(window).scrollTop();
        const parallaxElements = $('.parallax');
        
        parallaxElements.each(function() {
            const speed = $(this).data('speed') || 0.5;
            const yPos = -(scrolled * speed);
            $(this).css('transform', `translateY(${yPos}px)`);
        });
    });
}

// Form handling
function initializeFormHandling() {
    $('#contact-form').on('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: $('#name').val(),
            email: $('#email').val(),
            subject: $('#subject').val(),
            message: $('#message').val()
        };
        
        // Validate form
        if (!validateForm(formData)) {
            return;
        }
        
        // Show loading state
        const submitBtn = $(this).find('button[type="submit"]');
        const originalText = submitBtn.text();
        submitBtn.addClass('btn-loading').prop('disabled', true);
        
        // Simulate form submission (replace with actual API call)
        setTimeout(function() {
            // Show success message
            showMessage('Thank you for your message! We\'ll get back to you soon.', 'success');
            
            // Reset form
            $('#contact-form')[0].reset();
            
            // Reset button
            submitBtn.removeClass('btn-loading').prop('disabled', false).text(originalText);
        }, 2000);
    });
}

// Form validation
function validateForm(data) {
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Clear previous error states
    $('.border-red-500').removeClass('border-red-500');
    
    // Validate name
    if (!data.name.trim()) {
        $('#name').addClass('border-red-500');
        isValid = false;
    }
    
    // Validate email
    if (!data.email.trim() || !emailRegex.test(data.email)) {
        $('#email').addClass('border-red-500');
        isValid = false;
    }
    
    // Validate message
    if (!data.message.trim()) {
        $('#message').addClass('border-red-500');
        isValid = false;
    }
    
    if (!isValid) {
        showMessage('Please fill in all required fields correctly.', 'error');
    }
    
    return isValid;
}

// Show form messages
function showMessage(message, type) {
    const messageDiv = $('#form-message');
    messageDiv.removeClass('hidden success-message error-message');
    
    if (type === 'success') {
        messageDiv.addClass('success-message');
    } else {
        messageDiv.addClass('error-message');
    }
    
    messageDiv.text(message).removeClass('hidden');
    
    // Hide message after 5 seconds
    setTimeout(function() {
        messageDiv.addClass('hidden');
    }, 5000);
}

// Portfolio interactions
function initializePortfolioInteractions() {
    $('.portfolio-item').on('click', function() {
        const title = $(this).find('h3').text();
        
        // Create modal or redirect to project details
        // For now, just show an alert (replace with actual functionality)
        alert(`View details for: ${title}`);
    });
    
    // Add hover effects
    $('.portfolio-item').on('mouseenter', function() {
        $(this).find('.group').addClass('scale-105');
    }).on('mouseleave', function() {
        $(this).find('.group').removeClass('scale-105');
    });
}

// Mobile menu
function initializeMobileMenu() {
    $('#mobile-menu-btn').on('click', function() {
        const mobileMenu = $('#mobile-menu');
        const icon = $(this).find('i');
        
        mobileMenu.toggleClass('hidden');
        
        if (mobileMenu.hasClass('hidden')) {
            icon.removeClass('fa-times').addClass('fa-bars');
        } else {
            icon.removeClass('fa-bars').addClass('fa-times');
        }
    });
    
    // Close mobile menu when clicking on links
    $('#mobile-menu .nav-link').on('click', function() {
        $('#mobile-menu').addClass('hidden');
        $('#mobile-menu-btn i').removeClass('fa-times').addClass('fa-bars');
    });
}

// Scroll to top functionality
function initializeScrollToTop() {
    // Create scroll to top button
    const scrollToTopBtn = $('<button>')
        .addClass('fixed bottom-8 right-8 w-12 h-12 bg-primary rounded-full text-white shadow-lg opacity-0 transition-opacity duration-300 z-50')
        .html('<i class="fas fa-chevron-up"></i>')
        .attr('id', 'scroll-to-top');
    
    $('body').append(scrollToTopBtn);
    
    // Show/hide scroll to top button
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 300) {
            $('#scroll-to-top').addClass('opacity-100').removeClass('opacity-0');
        } else {
            $('#scroll-to-top').addClass('opacity-0').removeClass('opacity-100');
        }
    });
    
    // Scroll to top on click
    $('#scroll-to-top').on('click', function() {
        $('html, body').animate({
            scrollTop: 0
        }, 800, 'swing');
    });
}

// CTA button interactions
$(document).on('click', '.cta-button', function() {
    // Scroll to contact section
    const contactSection = $('#contact');
    if (contactSection.length) {
        const offsetTop = contactSection.offset().top - 80;
        
        $('html, body').animate({
            scrollTop: offsetTop
        }, 800, 'swing');
    }
});

$(document).on('click', '.outline-button', function() {
    // Scroll to portfolio section
    const portfolioSection = $('#portfolio');
    if (portfolioSection.length) {
        const offsetTop = portfolioSection.offset().top - 80;
        
        $('html, body').animate({
            scrollTop: offsetTop
        }, 800, 'swing');
    }
});

// Service card interactions
$('.service-card').on('mouseenter', function() {
    $(this).find('i').addClass('animate-pulse');
}).on('mouseleave', function() {
    $(this).find('i').removeClass('animate-pulse');
});

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounced scroll handler for better performance
const debouncedScrollHandler = debounce(function() {
    // Any expensive scroll operations can go here
}, 10);

$(window).on('scroll', debouncedScrollHandler);

// Lazy loading for images (if any are added later)
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
initializeLazyLoading();

// Error handling for Three.js
window.addEventListener('error', function(e) {
    if (e.message.includes('WebGL') || e.message.includes('Three')) {
        console.warn('Three.js not available or WebGL not supported, continuing without 3D animations');
        // Hide canvas elements if Three.js fails
        $('canvas[id$="-canvas"]').hide();
    }
});

// Keyboard navigation support
$(document).on('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        $('#mobile-menu').addClass('hidden');
        $('#mobile-menu-btn i').removeClass('fa-times').addClass('fa-bars');
    }
});

// Theme Toggle Functionality
function initializeThemeToggle() {
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    
    // Desktop theme toggle
    $('#theme-toggle').on('click', function() {
        const currentTheme = $('body').hasClass('light-theme') ? 'light' : 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });
    
    // Mobile theme toggle
    $('#mobile-theme-toggle').on('click', function() {
        const currentTheme = $('body').hasClass('light-theme') ? 'light' : 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

function setTheme(theme) {
    const body = $('body');
    const themeIcon = $('#theme-icon');
    const mobileToggleIcon = $('#mobile-theme-toggle i');
    
    if (theme === 'light') {
        body.addClass('light-theme');
        themeIcon.removeClass('fa-moon').addClass('fa-sun');
        mobileToggleIcon.removeClass('fa-moon').addClass('fa-sun');
    } else {
        body.removeClass('light-theme');
        themeIcon.removeClass('fa-sun').addClass('fa-moon');
        mobileToggleIcon.removeClass('fa-sun').addClass('fa-moon');
    }
}

// Technology category hover effects
$('.tech-category').on('mouseenter', function() {
    $(this).find('.tech-tag').each(function(index) {
        setTimeout(() => {
            $(this).addClass('animate-pulse');
        }, index * 100);
    });
}).on('mouseleave', function() {
    $(this).find('.tech-tag').removeClass('animate-pulse');
});

// Work item interactions
$('.work-item').on('click', function(e) {
    e.preventDefault();
    const title = $(this).find('h3').text();
    
    // Show project details modal or redirect
    showMessage(`Opening project details for: ${title}`, 'success');
});

// Client logo hover animations
$('.client-logo').on('mouseenter', function() {
    $(this).addClass('scale-105');
}).on('mouseleave', function() {
    $(this).removeClass('scale-105');
});

// Review card interactions
$('.review-card').on('mouseenter', function() {
    $(this).find('.w-12').addClass('animate-pulse');
}).on('mouseleave', function() {
    $(this).find('.w-12').removeClass('animate-pulse');
});

// Enhanced portfolio interactions for new categories
function initializeEnhancedPortfolio() {
    $('.portfolio-item').each(function() {
        const category = $(this).find('h3').text().toLowerCase();
        
        $(this).on('click', function() {
            showMessage(`Exploring ${category} solutions...`, 'success');
            
            // Simulate category-specific actions
            setTimeout(() => {
                showMessage(`View our ${category} portfolio and case studies`, 'success');
            }, 1500);
        });
    });
}

// Initialize enhanced portfolio
initializeEnhancedPortfolio();

// Smooth scroll enhancements for new sections
function enhanceNavigation() {
    // Add active state management for new navigation items
    const sections = ['#home', '#services', '#technologies', '#portfolio', '#works', '#clients', '#reviews', '#contact'];
    
    $(window).on('scroll', function() {
        const scrollPos = $(window).scrollTop() + 100;
        
        sections.forEach(section => {
            const element = $(section);
            if (element.length) {
                const elementTop = element.offset().top;
                const elementBottom = elementTop + element.outerHeight();
                
                if (scrollPos >= elementTop && scrollPos < elementBottom) {
                    $('.nav-link').removeClass('active');
                    $(`.nav-link[href="${section}"]`).addClass('active');
                }
            }
        });
    });
}

// Initialize enhanced navigation
enhanceNavigation();

// Focus management for accessibility
$('.nav-link').on('focus', function() {
    $(this).addClass('ring-primary');
}).on('blur', function() {
    $(this).removeClass('ring-primary');
});
