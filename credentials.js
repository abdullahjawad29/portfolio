const menuItems = document.querySelectorAll("#menu-items li");
let currentIndex = 0;

// Highlight the first item
menuItems[currentIndex].classList.add("active");

function updateMenu(index) {
  menuItems.forEach((item, i) => {
    item.classList.toggle("active", i === index);
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown") {
    currentIndex = (currentIndex + 1) % menuItems.length;
    updateMenu(currentIndex);
  } else if (e.key === "ArrowUp") {
    currentIndex = (currentIndex - 1 + menuItems.length) % menuItems.length;
    updateMenu(currentIndex);
  } else if (e.key === "Enter") {
    const link = menuItems[currentIndex].getAttribute("data-link");
    if (link) window.location.href = link;
  }
});

menuItems.forEach((item, i) => {
  item.addEventListener("click", () => {
    currentIndex = i;
    updateMenu(i);
    const link = item.getAttribute("data-link");
    if (link) window.location.href = link;
  });
});