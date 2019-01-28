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
    <button type="button" className="btn btn-light mb-2">Позвонить</button>
  </div>
}
