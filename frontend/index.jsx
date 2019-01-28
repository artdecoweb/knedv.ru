import { render } from 'preact'
import App from './App'

render(<App activeMenu="index"/>, document.querySelector('#App'), document.querySelector('#Content'))