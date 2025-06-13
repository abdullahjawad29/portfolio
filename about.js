window.addEventListener("DOMContentLoaded", () => {
  // Flicker background
  const flicker = () => {
    document.body.style.filter = `brightness(${100 + Math.random() * 3}%)`;
    setTimeout(flicker, 120);
  };
  flicker();

  // Footer text typewriter
  const footer = document.querySelector('.meta-footer');
  const footerText = "STATUS: ACTIVE  ID CODE: AJ-00929  ENCRYPTION: AES-256";
  let fi = 0;
  const footerType = setInterval(() => {
    footer.textContent += footerText[fi++];
    if (fi >= footerText.length) clearInterval(footerType);
  }, 35);

  // Typewriter for each line in ID card
  const typeElements = document.querySelectorAll('.type');
  typeElements.forEach((el, i) => {
    const fullText = el.getAttribute('data-content');
    el.textContent = '';
    let j = 0;
    setTimeout(() => {
      const typeInterval = setInterval(() => {
        el.textContent += fullText[j++];
        if (j >= fullText.length) clearInterval(typeInterval);
      }, 35);
    }, i * 800 + 800); // Delay each line
  });
});