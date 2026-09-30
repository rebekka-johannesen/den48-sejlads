document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => {
      links.classList.toggle("open");
    });
  }

  const autoplayVideos = document.querySelectorAll(".autoplay-inview");
  if (autoplayVideos.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5 }
    );
    autoplayVideos.forEach((video) => {
      video.muted = true;
      video.preload = "auto";
      video.loop = true;
      video.playsInline = true;
      observer.observe(video);
    });
  }

  document.querySelectorAll(".video-feature video").forEach((video) => {
    const tryPlay = () => video.play().catch(() => {});
    tryPlay();
    video.addEventListener("loadedmetadata", tryPlay);
    video.addEventListener("canplay", tryPlay);
    video.addEventListener("pause", tryPlay);
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) tryPlay();
    });
  });

  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && "IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  }

  document.querySelectorAll(".mute-toggle").forEach((button) => {
    const video = button.parentElement.querySelector("video");
    if (!video) return;
    const sync = () => {
      button.innerHTML = video.muted ? "&#128263;" : "&#128264;";
      button.textContent = video.muted ? "\u{1F507}" : "\u{1F50A}";
    };
    sync();
    button.addEventListener("click", () => {
      video.muted = !video.muted;
      sync();
    });
  });
});
