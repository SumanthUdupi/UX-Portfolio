// --- UTILITIES ---
function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

// --- 3D INTERACTIVE BACKGROUND ---
let scene, camera, renderer, particleLayers = [], mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

function init3D() {
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x010103, 0.0007);
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 3000);
    camera.position.z = 1000;

    const canvas = document.getElementById('bg-canvas');
    renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const layers = [
        { count: 1500, color: 0x550088, size: 2, speed: 0.05, depth: 1500 },
        { count: 2500, color: 0x8400ff, size: 3, speed: 0.1, depth: 1000 },
        { count: 1000, color: 0xffaaff, size: 4, speed: 0.2, depth: 500 }
    ];

    layers.forEach(layerInfo => {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(layerInfo.count * 3);
        for (let i = 0; i < positions.length; i += 3) {
            positions[i] = (Math.random() - 0.5) * 2500;
            positions[i+1] = (Math.random() - 0.5) * 2500;
            positions[i+2] = (Math.random() - 0.5) * layerInfo.depth - 500;
        }
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const material = new THREE.PointsMaterial({ color: layerInfo.color, size: layerInfo.size, transparent: true, blending: THREE.AdditiveBlending, sizeAttenuation: true });
        const particles = new THREE.Points(geometry, material);
        particles.userData.speed = layerInfo.speed;
        scene.add(particles);
        particleLayers.push(particles);
    });

    document.addEventListener('mousemove', e => {
        mouseX = e.clientX - windowHalfX;
        mouseY = e.clientY - windowHalfY;
    });

    const onWindowResize = debounce(() => {
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        ScrollTrigger.refresh();
    }, 250);

    window.addEventListener('resize', onWindowResize);
}

function animate3D() {
    requestAnimationFrame(animate3D);
    const time = Date.now() * 0.00005;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (-mouseY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);
    particleLayers.forEach(layer => {
        layer.position.y = scrollTop * layer.userData.speed;
        layer.rotation.x = time * (layer.userData.speed * 0.5);
        layer.rotation.y = time * (layer.userData.speed * 1.2);
    });
    renderer.render(scene, camera);
}

// --- PROJECTS DATA & SETUP ---
const projects = [
    { number: '01', title: 'Project Title One', category: 'Web Design', description: 'A futuristic web experience for a cutting-edge tech company, focusing on fluid animations and a dark, immersive UI.', imageUrl: 'https://placehold.co/800x600/8E2DE2/ffffff?text=Project+One', color: '#8E2DE2' },
    { number: '02', title: 'Project Title Two', category: '3D Visualization', description: 'An interactive 3D product customizer built with Three.js, allowing users to explore and configure products in real-time.', imageUrl: 'https://placehold.co/800x600/4A00E0/ffffff?text=Project+Two', color: '#4A00E0' },
    { number: '03', title: 'Project Title Three', category: 'Interactive Art', description: 'A generative art installation that reacts to user movement, creating a dynamic and ever-changing visual landscape.', imageUrl: 'https://placehold.co/800x600/009FFF/ffffff?text=Project+Three', color: '#009FFF' },
    { number: '04', title: 'Project Title Four', category: 'Mobile App', description: 'A sleek and intuitive mobile application designed to streamline daily tasks and improve productivity through a minimalist interface.', imageUrl: 'https://placehold.co/800x600/EC2F4B/ffffff?text=Project+Four', color: '#EC2F4B' },
];

function setupProjects() {
    const track = document.getElementById('projects-track');
    const detailsContainer = document.getElementById('project-details');
    if (!track || !detailsContainer) return;

    detailsContainer.innerHTML = `
        <div class="text-5xl font-black text-white/20 mb-4" id="project-number">${projects[0].number}</div>
        <h3 class="text-4xl font-bold text-white mb-4" id="project-title">${projects[0].title}</h3>
        <p class="text-gray-300" id="project-description">${projects[0].description}</p>
    `;

    projects.forEach((project) => {
        const card = document.createElement('a');
        card.href = '#';
        card.className = 'project-card-horizontal group project-card glass-card rounded-2xl overflow-hidden';
        card.dataset.color = project.color;
        card.dataset.title = project.title;
        card.dataset.description = project.description;
        card.dataset.number = project.number;
        card.innerHTML = `
            <div class="project-image-wrapper">
                <div class="project-image-mask"></div>
                <img src="${project.imageUrl}" alt="${project.title}" class="w-full h-full object-cover project-image">
            </div>
        `;
        track.appendChild(card);
    });
}

// --- MAIN INITIALIZATION & ANIMATIONS ---
function main() {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    init3D();
    setupProjects();

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
        animate3D();

        // Hero headline reveal
        const split = new SplitText("#hero-headline", { type: "words,chars" });
        gsap.from(split.chars, {
            duration: 0.8, opacity: 0, y: 60, rotationX: -90,
            transformOrigin: "0% 50% -50", ease: "power3.out", stagger: 0.05,
        });

        // Header scroll transform
        ScrollTrigger.create({
            start: "top -80", end: 99999,
            toggleClass: { className: "scrolled", targets: "#main-header" }
        });

        // Scroll-down affordance fade
        gsap.to(".scroll-down", {
            scrollTrigger: { trigger: "#home", start: "top top", end: "bottom center", scrub: true },
            opacity: 0, y: 100,
        });

        // Horizontal scroll for projects
        const track = document.getElementById('projects-track');
        if (track) {
            const projectsArray = gsap.utils.toArray('.project-card-horizontal');
            if (projectsArray.length > 0) {
                const amountToScroll = track.scrollWidth - window.innerWidth;
                const horizontalScrollAnimation = gsap.to(track, {
                    x: -amountToScroll,
                    ease: "none",
                    scrollTrigger: {
                        trigger: "#projects-container",
                        start: "top top",
                        end: `+=${amountToScroll}`,
                        pin: "#projects-sticky-wrapper",
                        scrub: 1,
                        snap: {
                            snapTo: 1 / (projectsArray.length - 1),
                            duration: 0.4,
                            ease: "power1.inOut"
                        },
                        invalidateOnRefresh: true,
                    }
                });

                // Image Mask Reveal & Parallax on project cards
                gsap.utils.toArray('.project-card-horizontal').forEach(card => {
                    const mask = card.querySelector('.project-image-mask');
                    const image = card.querySelector('.project-image');
                    gsap.set(image, { scale: 1.2 });
                    const revealTimeline = gsap.timeline({
                        scrollTrigger: {
                            trigger: card,
                            containerAnimation: horizontalScrollAnimation,
                            start: 'left 85%',
                            toggleActions: 'play none none reverse'
                        }
                    });
                    revealTimeline.to(mask, { scaleX: 0, duration: 1, ease: 'power3.inOut' })
                                  .to(image, { scale: 1, duration: 1.2, ease: 'power3.out' }, '-=1');
                    gsap.to(image, {
                        xPercent: -15,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: card,
                            containerAnimation: horizontalScrollAnimation,
                            start: 'left right',
                            end: 'right left',
                            scrub: true
                        }
                    });
                });

                // Background color change & Sticky details update
                const projectNumber = document.getElementById('project-number');
                const projectTitle = document.getElementById('project-title');
                const projectDescription = document.getElementById('project-description');

                gsap.utils.toArray('.project-card-horizontal').forEach(card => {
                    ScrollTrigger.create({
                        trigger: card,
                        containerAnimation: horizontalScrollAnimation,
                        start: 'left center',
                        end: 'right center',
                        onToggle: self => {
                            if (self.isActive) {
                                gsap.to('body', { backgroundColor: card.dataset.color, duration: 0.8 });
                                const tl = gsap.timeline();
                                tl.to([projectNumber, projectTitle, projectDescription], {
                                    opacity: 0, y: -20, duration: 0.4, ease: 'power2.in',
                                    onComplete: () => {
                                        projectNumber.textContent = card.dataset.number;
                                        projectTitle.textContent = card.dataset.title;
                                        projectDescription.textContent = card.dataset.description;
                                    }
                                }).to([projectNumber, projectTitle, projectDescription], {
                                    opacity: 1, y: 0, duration: 0.4, ease: 'power2.out'
                                });
                            }
                        },
                    });
                });
            }
        }

        // Revert background color when scrolling out of the projects section
        ScrollTrigger.create({
            trigger: '#projects-container',
            start: 'top bottom',
            end: 'bottom top',
            onLeave: () => gsap.to('body', { backgroundColor: 'var(--bg-color)', duration: 0.8 }),
            onLeaveBack: () => gsap.to('body', { backgroundColor: 'var(--bg-color)', duration: 0.8 }),
        });

        // "About Me" text highlight
        gsap.utils.toArray('.highlight').forEach(el => {
            ScrollTrigger.create({
                trigger: el,
                start: 'top 80%',
                onEnter: () => el.classList.add('animated'),
            });
        });

        // General section fade-in
        gsap.utils.toArray('.scroll-animate').forEach(el => {
            gsap.fromTo(el, { opacity: 0, y: 50 }, {
                opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
                scrollTrigger: { trigger: el, start: 'top 85%' }
            });
        });

        // Scroll progress bar
        gsap.to("#progress-bar", {
            width: "100%", ease: "none",
            scrollTrigger: { trigger: "body", start: "top top", end: "bottom bottom", scrub: true }
        });

        return () => { // Cleanup
            gsap.globalTimeline.clear();
            ScrollTrigger.getAll().forEach(t => t.kill());
        }
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
        document.querySelectorAll('.scroll-animate').forEach(el => el.classList.add('visible'));
        document.querySelectorAll('.project-card-horizontal').forEach(el => el.style.opacity = 1);
    });
}

window.onload = main;