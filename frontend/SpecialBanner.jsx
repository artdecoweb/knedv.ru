export const SpecialBanner = ({
  children, img, title, price, contact, href,
}) => {
  return <div className="p-2 SpecialBanner">
    <img className="img-fluid" src={img}/>
    <h4><a className="SpecialTitle" href={href}>{title}</a></h4>
    <em>{children}</em><br/>
    <strong>Цена: {price}</strong><br/>
    {contact}
    <br/>
    <a className="btn btn-light btn-block mb-2" href={href}>
      Подробности
    </a>
    <a className="btn btn-light btn-block mb-2" href="tel:7-495-749-29-15">
      <img className="PhoneImg" src="/website/phone_android.svg" style="height: 2rem; margin-top: -0.25rem;"/>
      Позвонить
    </a>
  </div>
}
