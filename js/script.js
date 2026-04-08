document.addEventListener('DOMContentLoaded', () => {

    /* --- DOM ELEMENTS (Declared once to avoid redeclaration errors) --- */
    const mainImg = document.getElementById('main-image');
    const zoomResult = document.getElementById('zoom-result');
    const lens = document.getElementById('lens');
    const container = document.querySelector('.main-image-wrapper');
    const thumbs = document.querySelectorAll('.thumb');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    /* --- CAROUSEL LOGIC --- */
    // Note: If you have different images, put their paths in this array
    const images = [
        "assets/images/workers-net.jpg",
        "assets/images/workers-net.jpg",
        "assets/images/workers-net.jpg",
        "assets/images/workers-net.jpg",
        "assets/images/workers-net.jpg"
    ];
    let currentIndex = 0;

    function updateCarousel(index) {
        currentIndex = index;
        mainImg.src = images[currentIndex];

        // Update the zoom high-res background to match the current image
        zoomResult.style.backgroundImage = `url('${images[currentIndex]}')`;

        // Update active thumbnail border
        thumbs.forEach((t, i) => {
            t.classList.toggle('active', i === currentIndex);
        });
    }

    prevBtn.addEventListener('click', () => {
        let idx = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
        updateCarousel(idx);
    });

    nextBtn.addEventListener('click', () => {
        let idx = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
        updateCarousel(idx);
    });

    thumbs.forEach((thumb) => {
        thumb.addEventListener('click', (e) => {
            let idx = parseInt(e.target.getAttribute('data-index'));
            updateCarousel(idx);
        });
    });


    /* --- E-COMMERCE LENS ZOOM LOGIC --- */

    // Flag to disable zoom when hovering over arrows
    let isOverArrow = false;

    function disableZoomInteraction() {
        isOverArrow = true;
        lens.style.display = 'none';
        zoomResult.style.display = 'none';
    }

    function enableZoomInteraction() {
        isOverArrow = false;
    }

    // Attach event listeners to arrows
    prevBtn.addEventListener('mouseover', disableZoomInteraction);
    nextBtn.addEventListener('mouseover', disableZoomInteraction);
    prevBtn.addEventListener('mouseout', enableZoomInteraction);
    nextBtn.addEventListener('mouseout', enableZoomInteraction);

    // Initialize the zoom background with the current main image
    zoomResult.style.backgroundImage = `url('${mainImg.src}')`;

    container.addEventListener('mouseenter', () => {
        // Only execute zoom trigger logic if mouse is NOT over an arrow
        if (!isOverArrow) {
            lens.style.display = 'block';
            zoomResult.style.display = 'block';

            // Calculate the ratio between result box and lens
            let cx = zoomResult.offsetWidth / lens.offsetWidth;
            let cy = zoomResult.offsetHeight / lens.offsetHeight;

            // Set the background size of the result box
            zoomResult.style.backgroundSize = (mainImg.width * cx) + "px " + (mainImg.height * cy) + "px";
        }
    });

    container.addEventListener('mouseleave', () => {
        lens.style.display = 'none';
        zoomResult.style.display = 'none';
    });

    container.addEventListener('mousemove', moveLens);

    function moveLens(e) {
        // If cursor is over an arrow, exit zoom logic entirely
        if (isOverArrow) {
            lens.style.display = 'none';
            zoomResult.style.display = 'none';
            return;
        }

        let pos, x, y;

        e.preventDefault();

        // Ensure shown
        lens.style.display = 'block';
        zoomResult.style.display = 'block';

        // Get cursor position relative to the image
        pos = getCursorPos(e);

        // Center the lens on the cursor
        x = pos.x - (lens.offsetWidth / 2);
        y = pos.y - (lens.offsetHeight / 2);

        // Prevent the lens from being positioned outside the image boundaries
        if (x > mainImg.width - lens.offsetWidth) { x = mainImg.width - lens.offsetWidth; }
        if (x < 0) { x = 0; }
        if (y > mainImg.height - lens.offsetHeight) { y = mainImg.height - lens.offsetHeight; }
        if (y < 0) { y = 0; }

        // Set lens position
        lens.style.left = x + "px";
        lens.style.top = y + "px";

        // Move the high-res background image in the result box
        let cx = zoomResult.offsetWidth / lens.offsetWidth;
        let cy = zoomResult.offsetHeight / lens.offsetHeight;
        zoomResult.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
    }

    function getCursorPos(e) {
        let a, x = 0, y = 0;
        a = mainImg.getBoundingClientRect();

        x = e.pageX - a.left;
        y = e.pageY - a.top;

        x = x - window.pageXOffset;
        y = y - window.pageYOffset;

        return { x: x, y: y };
    }

    /* --- DYNAMIC TECHNICAL SPECIFICATIONS TABLE --- */
    const specsData = [
        { parameter: "Pipe Diameter Range", specification: "20mm to 1600mm (3/4” to 63”)" },
        { parameter: "Pressure Ratings", specification: "PN 2.5, PN 4, PN 6, PN 8, PN 10, PN 12.5, PN 16" },
        { parameter: "Standard Dimension Ratio", specification: "SDR 33, SDR 26, SDR 21, SDR 17, SDR 13.6, SDR 11" },
        { parameter: "Operating Temperature", specification: "-40C to +80C (-40F to +176F)" },
        { parameter: "Service Life", specification: "50+ Years (at 20 degrees C, PN 10)" },
        { parameter: "Material Density", specification: "0.95 - 0.96 g/cm3" },
        { parameter: "Certification Standards", specification: "IS 5984, ISO 4427, ASTM D3035" },
        { parameter: "Joint Type", specification: "Butt Fusion, Electrofusion, Mechanical" },
        { parameter: "Coil Lengths", specification: "Up to 500mm (for smaller diameters)" },
        { parameter: "Country of Origin", specification: "🇮🇳 India" }
    ];

    const tableBody = document.getElementById('specs-body');

    // Loop through the data and create rows dynamically
    specsData.forEach(spec => {
        const row = document.createElement('tr');

        const paramCell = document.createElement('td');
        paramCell.textContent = spec.parameter;

        const specCell = document.createElement('td');
        specCell.textContent = spec.specification;

        row.appendChild(paramCell);
        row.appendChild(specCell);

        tableBody.appendChild(row);
    });

    /* --- FAQ ACCORDION LOGIC --- */
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');

        questionBtn.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Optional: Close all other items when one is opened
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            // Toggle the clicked item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    /* --- INFINITE LOOP CAROUSEL LOGIC --- */
    const appTrack = document.getElementById('app-track');
    const prevAppBtn = document.getElementById('prev-app-btn');
    const nextAppBtn = document.getElementById('next-app-btn');

    if (appTrack && prevAppBtn && nextAppBtn) {
        let isAnimating = false;

        const handleNext = () => {
            if (isAnimating) return;
            isAnimating = true;

            const cardWidth = appTrack.children[0].offsetWidth;
            const gap = 16; // From Figma

            appTrack.style.transition = 'transform 0.4s ease-in-out';
            appTrack.style.transform = `translateX(-${cardWidth + gap}px)`;

            setTimeout(() => {
                appTrack.style.transition = 'none';
                appTrack.appendChild(appTrack.children[0]);
                appTrack.style.transform = 'translateX(0)';
                isAnimating = false;
            }, 400);
        };

        const handlePrev = () => {
            if (isAnimating) return;
            isAnimating = true;

            const cardWidth = appTrack.children[0].offsetWidth;
            const gap = 16; // From Figma

            appTrack.insertBefore(appTrack.lastElementChild, appTrack.children[0]);

            appTrack.style.transition = 'none';
            appTrack.style.transform = `translateX(-${cardWidth + gap}px)`;

            void appTrack.offsetWidth;

            appTrack.style.transition = 'transform 0.4s ease-in-out';
            appTrack.style.transform = 'translateX(0)';

            setTimeout(() => {
                isAnimating = false;
            }, 400);
        };

        nextAppBtn.addEventListener('click', handleNext);
        prevAppBtn.addEventListener('click', handlePrev);
    }

    /* --- PROCESS TAB & CAROUSEL LOGIC --- */
    const processData = [
        {
            title: "High-Grade Raw Material Selection",
            desc: "Vacuum sizing tanks ensure precise outer diameter while internal pressure maintains perfect roundness and wall thickness uniformity.",
            bullets: ["PE100 grade material", "Optimal molecular weight distribution"],
            image: "assets/images/workers-net.jpg"
        },
        {
            title: "Precision Extrusion Technology",
            desc: "State-of-the-art extruders melt and form the HDPE compound with perfect consistency and temperature control.",
            bullets: ["Advanced temperature control", "Continuous flow monitoring"],
            image: "assets/images/workers-net.jpg" // Swap with real image path
        },
        {
            title: "Controlled Cooling Process",
            desc: "Gradual cooling baths ensure the pipe solidifies without internal stresses or dimensional warping.",
            bullets: ["Multi-stage water baths", "Zero-stress solidification"],
            image: "assets/images/workers-net.jpg"
        },
        {
            title: "Accurate Vacuum Sizing",
            desc: "Strict calibration guarantees that every pipe meets exact diameter and thickness specifications.",
            bullets: ["Laser-measured calibration", "Automated adjustments"],
            image: "assets/images/workers-net.jpg"
        },
        {
            title: "Rigorous Quality Control",
            desc: "Every batch undergoes intense pressure, impact, and tensile testing to ensure field reliability.",
            bullets: ["Hydrostatic pressure tests", "Impact resistance verified"],
            image: "assets/images/workers-net.jpg"
        },
        {
            title: "Indelible Laser Marking",
            desc: "Critical specifications, manufacturing dates, and certifications are permanently etched into the pipe surface.",
            bullets: ["Permanent laser etching", "Traceability guaranteed"],
            image: "assets/images/workers-net.jpg"
        },
        {
            title: "Automated Precision Cutting",
            desc: "Pipes are cleanly cut to custom or standard lengths with zero rough edges or burrs.",
            bullets: ["Dust-free cutting technology", "Exact length tolerances"],
            image: "assets/images/workers-net.jpg"
        },
        {
            title: "Secure Coiling & Packaging",
            desc: "Pipes are carefully coiled, strapped, and prepared for safe transit to any infrastructure project site.",
            bullets: ["UV-protected wrapping", "Efficient transport profile"],
            image: "assets/images/workers-net.jpg"
        }
    ];

    let currentProcessStep = 0;

    const tabBtns = document.querySelectorAll('.tab-btn');
    const processTitle = document.getElementById('process-title');
    const processDesc = document.getElementById('process-desc');
    const processBullets = document.getElementById('process-bullets');
    const processImg = document.getElementById('process-image');

    // Desktop Buttons
    const prevStepBtn = document.getElementById('prev-step-btn');
    const nextStepBtn = document.getElementById('next-step-btn');

    // Mobile Buttons & Indicator
    const mobileStepIndicator = document.getElementById('mobile-step-indicator');
    const mobilePrevBtn = document.getElementById('mobile-prev-step-btn');
    const mobileNextBtn = document.getElementById('mobile-next-step-btn');

    function updateProcessView(index) {
        currentProcessStep = index;
        const data = processData[index];

        // 1. Update Text Content
        processTitle.textContent = data.title;
        processDesc.textContent = data.desc;
        processImg.src = data.image;

        // 2. Update Bullets dynamically
        processBullets.innerHTML = '';
        data.bullets.forEach(bullet => {
            const li = document.createElement('li');
            li.innerHTML = `<span class="check-circle">&#10003;</span> ${bullet}`;
            processBullets.appendChild(li);
        });

        // 3. Update Active Tab styling (Desktop)
        tabBtns.forEach((btn, i) => {
            btn.classList.toggle('active', i === currentProcessStep);
        });

        // 4. Update Mobile Step Indicator Text
        if (mobileStepIndicator) {
            // Adds +1 because arrays start at 0, but humans start at 1
            mobileStepIndicator.textContent = `Step ${currentProcessStep + 1}/8: ${data.title}`;
        }
    }

    // Helper function to handle looping logic
    function goPrevStep() {
        let newIndex = currentProcessStep === 0 ? processData.length - 1 : currentProcessStep - 1;
        updateProcessView(newIndex);
    }

    function goNextStep() {
        let newIndex = currentProcessStep === processData.length - 1 ? 0 : currentProcessStep + 1;
        updateProcessView(newIndex);
    }

    // Tab Clicks
    tabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const stepIndex = parseInt(e.target.getAttribute('data-step'));
            updateProcessView(stepIndex);
        });
    });

    // Desktop Arrow Clicks 
    if (prevStepBtn) prevStepBtn.addEventListener('click', goPrevStep);
    if (nextStepBtn) nextStepBtn.addEventListener('click', goNextStep);

    // Mobile Arrow Clicks
    if (mobilePrevBtn) mobilePrevBtn.addEventListener('click', goPrevStep);
    if (mobileNextBtn) mobileNextBtn.addEventListener('click', goNextStep);

    /* --- MODAL LOGIC --- */
    const overlay = document.getElementById('modal-overlay');
    const downloadModal = document.getElementById('download-modal');
    const quoteModal = document.getElementById('quote-modal');
    const closeBtns = document.querySelectorAll('.close-modal-btn');

    // Function to open a specific modal
    function openModal(modal) {
        overlay.classList.add('active');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevents background scrolling
    }

    // Function to close all modals
    function closeModals() {
        overlay.classList.remove('active');
        downloadModal.classList.remove('active');
        quoteModal.classList.remove('active');
        document.body.style.overflow = ''; // Restores background scrolling
    }

    // --- WIRING UP THE TRIGGERS ---
    // Note: You need to add these IDs to the respective buttons in your HTML!

    const downloadTriggerBtn = document.getElementById('trigger-download');
    if (downloadTriggerBtn) {
        downloadTriggerBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(downloadModal);
        });
    }

    const quoteTriggerBtn = document.getElementById('trigger-quote');
    if (quoteTriggerBtn) {
        quoteTriggerBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(quoteModal);
        });
    }

    // Close on 'X' click
    closeBtns.forEach(btn => {
        btn.addEventListener('click', closeModals);
    });

    // Close on clicking the dark overlay background
    overlay.addEventListener('click', closeModals);

    // Close on pressing the 'Escape' key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModals();
    });

    /* --- FORM VALIDATION FOR DISABLED BUTTONS --- */

    // A reusable function to check form inputs
    const setupFormValidation = (modalId) => {
        const modal = document.getElementById(modalId);
        if (!modal) return;

        const form = modal.querySelector('form');
        const submitBtn = form.querySelector('button[type="submit"]');
        // Find all inputs in this specific form that have the "required" attribute
        const requiredInputs = form.querySelectorAll('input[required]');

        if (!submitBtn || requiredInputs.length === 0) return;

        // Function that runs every time the user types
        const checkFormValidity = () => {
            let isValid = true;

            requiredInputs.forEach(input => {
                // If the input is empty OR fails browser validation (like a bad email format)
                if (!input.value.trim() || !input.checkValidity()) {
                    isValid = false;
                }
            });

            // If everything is valid, remove the disabled state. Otherwise, keep it disabled.
            submitBtn.disabled = !isValid;
        };

        // Attach the listener to every required input
        requiredInputs.forEach(input => {
            input.addEventListener('input', checkFormValidity);
        });
    };

    // Activate the logic for your modals
    setupFormValidation('download-modal');
    setupFormValidation('quote-modal');

   /* --- SMART STICKY PRODUCT BAR & HEADER LOGIC --- */
    const stickyActionBar = document.getElementById('sticky-action-bar');
    const mainHeader = document.getElementById('header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        // 1. Show/Hide the Product Bar when scrolling past 400px
        if (currentScrollY > 400) {
            stickyActionBar.classList.add('visible');
        } else {
            stickyActionBar.classList.remove('visible');
        }

        // 2. Smart Header Scroll Detection (Up vs Down)
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Scrolling DOWN: Hide Main Nav, push Product Bar to absolute top
            mainHeader.classList.add('nav-hidden');
            stickyActionBar.classList.add('bar-top');
        } else {
            // Scrolling UP: Show Main Nav, dock Product Bar below it
            mainHeader.classList.remove('nav-hidden');
            stickyActionBar.classList.remove('bar-top');
        }
        
        lastScrollY = currentScrollY;
    });

    // Wire up the sticky button to open the existing Quote Modal
    const stickyQuoteBtn = document.getElementById('sticky-trigger-quote');
    if (stickyQuoteBtn && typeof openModal === 'function' && quoteModal) {
        stickyQuoteBtn.addEventListener('click', () => {
            openModal(quoteModal);
        });
    }
});