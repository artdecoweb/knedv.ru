export const SpecialBanner = ({
  children, img, title, price, contact,
}) => {
  return <div className="p-2 SpecialBanner">
    <img className="img-fluid" src={img}/>
    <h4>{title}</h4>
    <em>{children}</em><br/>
    <strong>Цена: {price}</strong><br/>
    {contact}
    <br/><br/>
    <button type="button" className="btn btn-light mb-2">Подробности</button>
    <a className="btn btn-light mb-2" href="tel:7-495-749-29-15">Позвонить</a>
  </div>
}
