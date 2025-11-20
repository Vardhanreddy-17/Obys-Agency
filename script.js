function locomotiveScroll(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
}

function loadAnimation(){
    var tl = gsap.timeline()
    tl.from(".line h1",{
        y:150,
        stagger:0.25,
        duration:0.6,
        delay:0.5
    })
    tl.from("#line1-part1",{
        opacity:0,
        onStart:function(){
            var h5timer = document.querySelector("#line1-part1 h5")
            var grow = 0;
            var time = setInterval(()=>{
                if(grow<100){
                    h5timer.innerHTML = grow++;
                }else{
                    h5timer.innerHTML = grow;
                    clearInterval(time);
                }
            },33)
        }
    })
    tl.to(".line h2",{
        animationName:"Loader-anime",
        opacity:1
    })
    tl.to("#loader",{
        opacity:0,
        duration:0.2,
        delay:4
    })
    tl.from("#page1",{
        opacity:0,
        delay:0.2,
        y:1600,
        ease:"power4",
        duration:0.6
    })
    tl.to("#loader",{
        display:"none"
    })
    tl.from("#nav",{
        opacity:0
    })
    tl.from("#hero1 h1,#hero2 h1,#hero3 h2,#hero4 h1",{
        y:120,
        stagger:0.2,
    })
    tl.from("#hero1, #page2",{
        opacity:0
    },"-=1.2")
}

function cursorAnimation(){
    document.addEventListener("mousemove",(dets)=>{
        gsap.to("#crsr",{
            left:dets.x,
            top:dets.y
        })
    })

    Shery.makeMagnet("#nav-part2 h4");
}

function sheryAnimation() {
  Shery.imageEffect(".image-div", {
    style: 5,
    gooey: true,
    // debug:true,
    config: {
      a: { value: 2, range: [0, 30] },
      b: { value: 0.75, range: [-1, 1] },
      zindex: { value: -9996999, range: [-9999999, 9999999] },
      aspect: { value: 0.7241195453907675 },
      gooey: { value: true },
      infiniteGooey: { value: false },
      growSize: { value: 4, range: [1, 15] },
      durationOut: { value: 1, range: [0.1, 5] },
      durationIn: { value: 1.5, range: [0.1, 5] },
      displaceAmount: { value: 0.5 },
      masker: { value: true },
      maskVal: { value: 1.23, range: [1, 5] },
      scrollType: { value: 0 },
      geoVertex: { range: [1, 64], value: 1 },
      noEffectGooey: { value: true },
      onMouse: { value: 0 },
      noise_speed: { value: 0.5, range: [0, 10] },
      metaball: { value: 0.33, range: [0, 2] },
      discard_threshold: { value: 0.5, range: [0, 1] },
      antialias_threshold: { value: 0.01, range: [0, 0.1] },
      noise_height: { value: 0.5, range: [0, 2] },
      noise_scale: { value: 10, range: [0, 100] },
    },
  });
}

function cursorAnimation() {
    const video = document.querySelector(".video-container");
    const cursor = document.querySelector("#crsr");
    const videoCursor = document.querySelector("#video-cursor");

    if (!video) {
        console.warn("⚠️ .video-container not found!");
        return;
    }

    // FOLLOW NORMAL CURSOR EVERYWHERE
    window.addEventListener("mousemove", (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.2,
            ease: "power3.out"
        });
    });

    //PLAY VIDEO
    var videoplay = document.querySelector(".video-container video");
    var flag = 0;
    video.addEventListener("click",()=>{
        if(flag === 0){
            videoplay.play();
            videoplay.style.opacity = 1
            document.querySelector("#video-cursor").innerHTML = `<i class="ri-pause-mini-fill"></i>`
            gsap.to("#video-cursor",{
                scale:0.5
            })
            flag = 1;
        }else{
            videoplay.pause();
            videoplay.style.opacity = 0;
            document.querySelector("#video-cursor").innerHTML = `<i class="ri-play-mini-fill"></i>`
            gsap.to("#video-cursor",{
                scale:1
            })
            flag = 0;
        }
        
    })


    // ENTER VIDEO
    video.addEventListener("mouseenter", () => {
        gsap.to(cursor, { opacity: 0, scale: 0.5, duration: 0.3 });
        gsap.to(videoCursor, { opacity: 1, scale: 1, duration: 0.3 });
    });

    // MOVE INSIDE VIDEO
    video.addEventListener("mousemove", (e) => {
        const rect = video.getBoundingClientRect();

        gsap.to(videoCursor, {
            x: e.clientX - 1200,
            y: e.clientY - 200,
            duration: 0.2,
            ease: "power3.out"
        });
    });

    // LEAVE VIDEO
    video.addEventListener("mouseleave", () => {
        gsap.to(cursor, { opacity: 1, scale: 1, duration: 0.3 });
        gsap.to(videoCursor, { opacity: 0, scale: 0.3, duration: 0.3 });
    });
}

document.addEventListener("mousemove",(dets)=>{
    gsap.to("#flag",{
        x:dets.x-100,
        y:dets.y - 10
    })
})

document.querySelector("#hero3").addEventListener("mouseenter",(dets)=>{
    gsap.to("#flag",{
        opacity:1
    })
})

document.querySelector("#hero3").addEventListener("mouseleave",(dets)=>{
    gsap.to("#flag",{
        opacity:0
    })
})

sheryAnimation();
loadAnimation();
cursorAnimation();
locomotiveScroll();

