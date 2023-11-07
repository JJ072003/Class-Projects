// Menu data structure
const menuLinks = [
    {text: 'about', href: '/about'},
    {text: 'catalog', href: '#', subLinks: [
      {text: 'all', href: '/catalog/all'},
      {text: 'top selling', href: '/catalog/top'},
      {text: 'search', href: '/catalog/search'},
    ]},
    {text: 'orders', href: '#' , subLinks: [
      {text: 'new', href: '/orders/new'},
      {text: 'pending', href: '/orders/pending'},
      {text: 'history', href: '/orders/history'},
    ]},
    {text: 'account', href: '#', subLinks: [
      {text: 'profile', href: '/account/profile'},
      {text: 'sign out', href: '/account/signout'},
    ]},
  ];
// global variable
let showingSubMenu = false
//1.0
const  mainEl = document.querySelector("main")
//1.1
mainEl.style.backgroundColor = "var(--main-bg)"
//1.2
let seiElement = document.createElement("h1")
mainEl.appendChild(seiElement)
let hOne = document.querySelector("h1")
//1.2
hOne.textContent = "Sei Rocks"
//1.3
mainEl.className = "flex-ctr"
// let topMenuEl = document.createElement("nav")
// topMenuEl.id = "top-menu"
// 2.0
let topMenuEl = document.querySelector("nav")
//2.1
topMenuEl.style.height = "100%"
//2.2
topMenuEl.style.backgroundColor = "var(--top-menu-bg)"
//2.3
topMenuEl.className = "flex-around"
//3.1
for (let link of menuLinks) {
    let aEl = document.createElement("a")
    aEl.href = link.href
    aEl.textContent = link.text
    topMenuEl.appendChild(aEl)
    console.log(link)
}
//4.0
let subMenuEl = document.querySelector("#sub-menu")
console.log(subMenuEl)
//4.1
subMenuEl.style.height = "100%"
//4.2
subMenuEl.style.backgroundColor = "var(--sub-menu-bg)"
//4.3
subMenuEl.className = "flex-around"
//4.4
subMenuEl.style.position ="absolute"
//4.5
subMenuEl.style.top = "0"
//5.1
let topMenuLinks = topMenuEl.getElementsByTagName("a")
console.log(topMenuLinks)
//5.2
topMenuEl.addEventListener("click", (emt) => (event.preventDefault(); return emt)  )