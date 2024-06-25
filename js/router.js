export class Router {
  constructor() {
    this.routes = {}
  }

  add(routeName, page) {
    this.routes[routeName] = page
  }
  
  route(event, route) {
    event = event || window.event
    event.preventDefault()
    
    if (route) {
      window.history.pushState({}, "", route)
    } else {
      window.history.pushState({}, "", event.target.href || event.target.getAttribute('data-route'))
    }

    this.handle()
  }
  
  handle() {
    const { pathname } = window.location
    const route = this.routes[pathname] || this.routes[404]
    fetch(route)
      .then(response => response.text())
      .then(html => {
        document.querySelector('#app').innerHTML = html
      })
      .catch(error => console.error('Error loading page:', error))
  }
}