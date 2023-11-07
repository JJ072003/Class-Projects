let quotes = [
  `I live my life a quarter mile at a time`,
  `I said a ten-second car, not a ten-minute car`,
  `You can have any brew you want... as long as it's a Corona.`,
  `You almost had me? You never had me - you never had your car!`,
  `I don't have friends. I have family.`,
  `It don't matter if you win by an inch or a mile. Winning's winning.`
];

document.addEventListener("DOMContentLoaded", function(event) {
  // Random quote of the day generator
  const randomQuote = function() {
    document.querySelector('#quote-of-the-day').textContent = `"${quotes[Math.floor(Math.random() * quotes.length)]}"`;
  };
  randomQuote();
  
  // Do all of your work inside the document.addEventListener  

  // Part 1
  const mainTitleEl = document.querySelector('#main-title')
  mainTitleEl.textContent = "Welcome, I'm DOM Toretto"

  // Part 2
  const bodyEl = document.querySelector('body')
  bodyEl.style.backgroundColor = 'tan'

  // Part 3
  const favThingsEl = document.querySelector('#favorite-things li:last-of-type')
  favThingsEl.remove()

  // Part 4
  const specialTitleEls = document.querySelectorAll('.special-title')
  for (const title of specialTitleEls) 
  {
    title.style.fontSize = '2rem'
  }

  // Part 5
  const pastRacesEl = document.querySelector('#past-races')
  for (const race of pastRacesEl.children) 
  {
    if (race.textContent == 'Chicago')
    {
      race.remove()
    }
  }

  // Part 6
  const mainEl = document.querySelector('.main')
  newRaceEl = document.createElement('li')
  newRaceEl.textContent = 'City Of Gold'
  pastRacesEl.appendChild(newRaceEl)

  // Part 7
  const newBlogPostEl = document.createElement('div')
  const newBlogPostTitleEl = document.createElement('h1')
  const newBlogPostpEl = document.createElement('p')

  newBlogPostTitleEl.textContent = 'City Of Gold'
  newBlogPostpEl.textContent = "WOAH, IT'S MADE OF ACTUAL CHOCOLATE GOLD"

  newBlogPostEl.appendChild(newBlogPostTitleEl)
  newBlogPostEl.appendChild(newBlogPostpEl)
  newBlogPostEl.className = 'blog-post purple'

  mainEl.appendChild(newBlogPostEl)

  // Part 8
  const quoteTitleEl = document.querySelector('#quote-title')
  quoteTitleEl.addEventListener('click', randomQuote)


  // Part 9
  const blogPosts = document.querySelectorAll('.blog-post')

  for (const post of blogPosts) {
    post.addEventListener('mouseout', (event) =>
    {
      if (event.target.tagName != "DIV")
      {
        return
      }
      event.target.className = 'blog-post purple'
    })


    post.addEventListener('mouseenter', (event) =>
    {
      if (event.target.tagName != "DIV")
      {
        return
      }
      event.target.className = 'blog-post red'
    })
  }
});
