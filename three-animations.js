// Three.js Animation Controllers
let heroScene, heroCamera, heroRenderer, heroGeometry, heroMaterial, heroMesh;
let servicesScene, servicesCamera, servicesRenderer, servicesParticles;
let aboutScene, aboutCamera, aboutRenderer, aboutGeometry;

// Check if Three.js is available
if (typeof THREE !== 'undefined') {
    
    // Hero Section Animation
    function initHeroAnimation() {
        const canvas = document.getElementById('hero-canvas');
        if (!canvas) return;
        
        try {
            // Scene setup
            heroScene = new THREE.Scene();
            heroCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            heroRenderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
            heroRenderer.setSize(window.innerWidth, window.innerHeight);
            heroRenderer.setPixelRatio(window.devicePixelRatio);
            
            // Create animated geometry
            heroGeometry = new THREE.IcosahedronGeometry(1, 1);
            heroMaterial = new THREE.MeshBasicMaterial({
                color: 0x6366f1,
                wireframe: true,
                transparent: true,
                opacity: 0.3
            });
            heroMesh = new THREE.Mesh(heroGeometry, heroMaterial);
            heroScene.add(heroMesh);
            
            // Create additional floating elements
            for (let i = 0; i < 50; i++) {
                const geometry = new THREE.SphereGeometry(0.02, 8, 8);
                const material = new THREE.MeshBasicMaterial({
                    color: Math.random() > 0.5 ? 0x6366f1 : 0x06b6d4,
                    transparent: true,
                    opacity: 0.6
                });
                const sphere = new THREE.Mesh(geometry, material);
                
                sphere.position.x = (Math.random() - 0.5) * 10;
                sphere.position.y = (Math.random() - 0.5) * 10;
                sphere.position.z = (Math.random() - 0.5) * 10;
                
                sphere.userData = {
                    originalY: sphere.position.y,
                    speed: Math.random() * 0.02 + 0.01
                };
                
                heroScene.add(sphere);
            }
            
            heroCamera.position.z = 5;
            
            // Animation loop
            function animateHero() {
                requestAnimationFrame(animateHero);
                
                // Rotate main mesh
                heroMesh.rotation.x += 0.005;
                heroMesh.rotation.y += 0.005;
                
                // Animate floating particles
                heroScene.children.forEach((child, index) => {
                    if (child !== heroMesh && child.userData.speed) {
                        child.position.y = child.userData.originalY + Math.sin(Date.now() * child.userData.speed + index) * 0.5;
                        child.rotation.x += 0.01;
                        child.rotation.y += 0.01;
                    }
                });
                
                heroRenderer.render(heroScene, heroCamera);
            }
            
            animateHero();
            
        } catch (error) {
            console.warn('Hero animation failed to initialize:', error);
            canvas.style.display = 'none';
        }
    }
    
    // Services Section Animation
    function initServicesAnimation() {
        const canvas = document.getElementById('services-canvas');
        if (!canvas) return;
        
        try {
            servicesScene = new THREE.Scene();
            servicesCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            servicesRenderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
            servicesRenderer.setSize(window.innerWidth, window.innerHeight);
            servicesRenderer.setPixelRatio(window.devicePixelRatio);
            
            // Create particle system
            const particleCount = 200;
            const positions = new Float32Array(particleCount * 3);
            const colors = new Float32Array(particleCount * 3);
            
            for (let i = 0; i < particleCount; i++) {
                positions[i * 3] = (Math.random() - 0.5) * 20;
                positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
                positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
                
                const color = new THREE.Color();
                color.setHSL(Math.random() * 0.3 + 0.6, 0.7, 0.6);
                colors[i * 3] = color.r;
                colors[i * 3 + 1] = color.g;
                colors[i * 3 + 2] = color.b;
            }
            
            const geometry = new THREE.BufferGeometry();
            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
            
            const material = new THREE.PointsMaterial({
                size: 0.05,
                vertexColors: true,
                transparent: true,
                opacity: 0.8
            });
            
            servicesParticles = new THREE.Points(geometry, material);
            servicesScene.add(servicesParticles);
            
            servicesCamera.position.z = 10;
            
            function animateServices() {
                requestAnimationFrame(animateServices);
                
                servicesParticles.rotation.x += 0.001;
                servicesParticles.rotation.y += 0.002;
                
                const positions = servicesParticles.geometry.attributes.position.array;
                for (let i = 0; i < positions.length; i += 3) {
                    positions[i + 1] += Math.sin(Date.now() * 0.001 + i) * 0.01;
                }
                servicesParticles.geometry.attributes.position.needsUpdate = true;
                
                servicesRenderer.render(servicesScene, servicesCamera);
            }
            
            animateServices();
            
        } catch (error) {
            console.warn('Services animation failed to initialize:', error);
            canvas.style.display = 'none';
        }
    }
    
    // About Section Animation
    function initAboutAnimation() {
        const canvas = document.getElementById('about-canvas');
        if (!canvas) return;
        
        try {
            aboutScene = new THREE.Scene();
            aboutCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            aboutRenderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
            aboutRenderer.setSize(window.innerWidth, window.innerHeight);
            aboutRenderer.setPixelRatio(window.devicePixelRatio);
            
            // Create interconnected nodes
            const nodes = [];
            const nodeCount = 20;
            
            for (let i = 0; i < nodeCount; i++) {
                const geometry = new THREE.SphereGeometry(0.1, 16, 16);
                const material = new THREE.MeshBasicMaterial({
                    color: 0x6366f1,
                    transparent: true,
                    opacity: 0.7
                });
                const node = new THREE.Mesh(geometry, material);
                
                node.position.x = (Math.random() - 0.5) * 15;
                node.position.y = (Math.random() - 0.5) * 10;
                node.position.z = (Math.random() - 0.5) * 10;
                
                nodes.push(node);
                aboutScene.add(node);
            }
            
            // Create connections between nodes
            const connections = [];
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const distance = nodes[i].position.distanceTo(nodes[j].position);
                    if (distance < 5) {
                        const geometry = new THREE.BufferGeometry().setFromPoints([
                            nodes[i].position,
                            nodes[j].position
                        ]);
                        const material = new THREE.LineBasicMaterial({
                            color: 0x06b6d4,
                            transparent: true,
                            opacity: 0.3
                        });
                        const line = new THREE.Line(geometry, material);
                        connections.push(line);
                        aboutScene.add(line);
                    }
                }
            }
            
            aboutCamera.position.z = 15;
            
            function animateAbout() {
                requestAnimationFrame(animateAbout);
                
                // Animate nodes
                nodes.forEach((node, index) => {
                    node.position.y += Math.sin(Date.now() * 0.001 + index) * 0.01;
                    node.rotation.x += 0.01;
                    node.rotation.y += 0.01;
                });
                
                // Update connections
                connections.forEach((connection, index) => {
                    if (index < nodes.length - 1) {
                        const startNode = nodes[Math.floor(index / 2)];
                        const endNode = nodes[Math.floor(index / 2) + 1];
                        if (startNode && endNode) {
                            const points = [startNode.position, endNode.position];
                            connection.geometry.setFromPoints(points);
                        }
                    }
                });
                
                aboutRenderer.render(aboutScene, aboutCamera);
            }
            
            animateAbout();
            
        } catch (error) {
            console.warn('About animation failed to initialize:', error);
            canvas.style.display = 'none';
        }
    }
    
    // Handle window resize
    function handleResize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        if (heroCamera && heroRenderer) {
            heroCamera.aspect = width / height;
            heroCamera.updateProjectionMatrix();
            heroRenderer.setSize(width, height);
        }
        
        if (servicesCamera && servicesRenderer) {
            servicesCamera.aspect = width / height;
            servicesCamera.updateProjectionMatrix();
            servicesRenderer.setSize(width, height);
        }
        
        if (aboutCamera && aboutRenderer) {
            aboutCamera.aspect = width / height;
            aboutCamera.updateProjectionMatrix();
            aboutRenderer.setSize(width, height);
        }
    }
    
    window.addEventListener('resize', handleResize);
    
    // Mouse interaction for hero section
    function handleMouseMove(event) {
        if (!heroMesh) return;
        
        const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        
        heroMesh.rotation.x = mouseY * 0.5;
        heroMesh.rotation.y = mouseX * 0.5;
    }
    
    document.addEventListener('mousemove', handleMouseMove);
    
    // Intersection Observer for performance optimization
    const canvasObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const canvas = entry.target;
            if (entry.isIntersecting) {
                canvas.style.visibility = 'visible';
            } else {
                canvas.style.visibility = 'hidden';
            }
        });
    });
    
    // Observe all animation canvases
    document.querySelectorAll('canvas[id$="-canvas"]').forEach(canvas => {
        canvasObserver.observe(canvas);
    });
    
} else {
    // Fallback if Three.js is not available
    console.warn('Three.js not loaded, animations will be disabled');
    
    // Hide all canvas elements
    document.querySelectorAll('canvas[id$="-canvas"]').forEach(canvas => {
        canvas.style.display = 'none';
    });
    
    // Provide placeholder functions
    window.initHeroAnimation = function() {};
    window.initServicesAnimation = function() {};
    window.initAboutAnimation = function() {};
}

// Scroll-based animation controls
let animationPaused = false;

function pauseAnimations() {
    animationPaused = true;
}

function resumeAnimations() {
    animationPaused = false;
}

// Pause animations when not visible for performance
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        pauseAnimations();
    } else {
        resumeAnimations();
    }
});

// Export functions for use in main script
if (typeof window !== 'undefined') {
    window.initHeroAnimation = initHeroAnimation;
    window.initServicesAnimation = initServicesAnimation;
    window.initAboutAnimation = initAboutAnimation;
}
