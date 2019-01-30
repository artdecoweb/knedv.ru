import { Component } from 'preact'

class Offer extends Component {
  render() {
    return <div className="Offer">
      <span className="OfferTitle">АКЦИЯ</span>
      <div className="OfferHolder">
        <span style="opacity:0;" ref={offerText => this.offerText = offerText}>
          {this.props.children}
        </span>
      </div>
    </div>
  }
  componentDidMount() {
    this.initialOffset = this.offerText.offsetLeft
    let offset = -this.end + 1
    this.int = setInterval(() => {
      if (offset < this.offerText.offsetWidth) {
        offset += 1
      } else {
        offset = -this.end + 1
      }
      this.offerText.style.marginLeft = `${-offset}px`
    }, 10)
    this.offerText.style.marginLeft = `${-offset}px`
    this.offerText.style.opacity = 1
  }
  get end() {
    return this.offerText.parentElement.parentElement.offsetWidth - this.initialOffset
  }
  componentWillUnmount() {
    clearInterval(this.int)
  }
}

export default Offer