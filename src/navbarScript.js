
window.addEventListener(scroll,function () {
    var header = document.queryselector("header");
    header.classList.toggle("sticky",window.scrollY > 0);
  })