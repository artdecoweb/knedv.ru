import { Component } from 'preact'
import { subscribers, getCurrentUrl, Link as StaticLink } from '.'

export class Match extends Component {
  constructor() {
    super()
    this.update = this.update.bind(this)
  }
  update(url) {
    this.nextUrl = url
    this.setState({})
  }
  componentDidMount() {
    subscribers.push(this.update)
  }
  componentWillUnmount() {
    subscribers.splice(subscribers.indexOf(this.update)>>>0, 1)
  }
  render(props) {
    let url = this.nextUrl || getCurrentUrl(),
      path = url.replace(/\?.+$/,'')
    this.nextUrl = null
    const ch = props.children.filter(c => typeof c == 'function')
    return ch[0] && ch[0]({
      url,
      path,
      matches: path===props.path,
    })
  }
}

export const Link = ({ activeClassName = 'active', path, ...props }) => (
  <Match path={path || props.href}>
    { ({ matches }) => (
      <StaticLink {...props} className={[props.class || props.className, matches && activeClassName].filter(Boolean).join(' ')} />
    ) }
  </Match>
)

export default Match