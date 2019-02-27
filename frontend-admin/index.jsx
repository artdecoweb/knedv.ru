import { render } from 'preact'
import 'preact/devtools/'
import App from './App'

render(<App />, document.querySelector('#AppContainer'), document.querySelector('#App'))