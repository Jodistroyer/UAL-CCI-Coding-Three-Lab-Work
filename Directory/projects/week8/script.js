// === Constants === 
var wh = window.innerHeight,
    speed = 20,
    scrollDist = wh * speed,
    scrollEnd = wh * (speed - 1),
    route = document.getElementById('route'),
    routeWidth = route.getBoundingClientRect().width;


// === Scroll === 
gsap.set('#scrollDist', { width: '100%', height: scrollDist });
gsap.set('#container', { 
  position: 'fixed', 
  width: routeWidth, 
  left: 200, 
  top: 0, 
  autoAlpha: 1 
});

// === Balloon animation ===
gsap.timeline({
  defaults: { duration: 1, ease: 'none' },
  scrollTrigger: {
    trigger: '#scrollDist',
    start: 'top top',
    end: '+=' + scrollEnd * 0.9,
    scrub: 0.3,
    onUpdate: (self) => {
      gsap.set('#container', { x: -routeWidth * (self.progress) });

      gsap.to("#balloon", { 
        scaleX: () => self.direction === 1 ? 0.15 : -0.15, 
        overwrite: 'auto', 
        duration: 0.2 
      });
      
      if (self.progress >= 1) {
        gsap.to("#container", { autoAlpha: 0, duration: 0.5 });
      }

      if (self.progress < 1 && self.direction === -1) {
        gsap.to("#container", { autoAlpha: 1, duration: 0.5 });
      }
    },
  }
}) 
.to('#balloon', {
  motionPath: {
    path: "#balloonPath",
    align: "#balloonPath",
    alignOrigin: [0.5, 1],
    autoRotate: true,
    start: 0.13
  }
});

// === Boy animation === 
gsap.timeline({
  defaults: { duration: 1, ease: 'none' },
  scrollTrigger: {
    trigger: '#scrollDist',
    start: 'top top',
    end: '+=' + scrollEnd * 1.02,
    scrub: 0.3,
    onUpdate: (self) => {
      if (self.progress >= 0.6) {
        gsap.to("#boy", { autoAlpha: 0, duration: 0.5 });
      }
      if (self.progress < 1 && self.direction === -1) {
        gsap.to("#boy", { autoAlpha: 1, duration: 0.5 });
      }
    },
  }
}) 
.to('#boy', {
  motionPath: {
    path: "#boyPath",
    align: "#boyPath",
    alignOrigin: [0.5, 0.75],
    autoRotate: true,
    start: 0.126
  }
});

// === Tree swaying effect === 
gsap.utils.toArray(".wiggle-tree").forEach((tree, i) => {
  gsap.to(tree, { 
    rotation: 5,
    transformOrigin: "center bottom", 
    duration: 1,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay: i * 0.3,
  });
});

// === Duck movement === 
gsap.utils.toArray(".duck").forEach((duck, i) => {
  let prevX = gsap.getProperty(duck, "x");

  gsap.to(duck, { 
    x: "+=270",
    duration: 3, 
    repeat: -1,  
    yoyo: true,  
    ease: "power1.inOut", 
    delay: i * 0.5,
    onUpdate: function() {
      let currentX = gsap.getProperty(duck, "x");
      let direction = currentX > prevX ? 1 : -1;
      gsap.set(duck, { scaleX: direction * 0.15 });
      prevX = currentX;
    }
  });
});

// === Cloud movement === 
gsap.utils.toArray(".cloud").forEach((cloud, i) => {
  gsap.to(cloud, { 
    x: "+=270",
    duration: 5, 
    repeat: -1,  
    yoyo: true,  
    ease: "power1.inOut", 
    delay: i * 0.8,
  });
});

// === Adjust layout on window resize === 
window.onresize = () => { 
  gsap.set('#container', { left: 200 });
  routeWidth = route.getBoundingClientRect().width;
  ScrollTrigger.refresh();
};
