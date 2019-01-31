import Router from './preact-router'

const Home = () => {
  return <div>Hello World</div>
}

const App = () =>
  <Router>
    <Home path="/admin" />
  </Router>

{/* <About path="/about" />
    // Advanced is an optional query
    <Search path="/search/:query/:advanced?" /> */}

export default App