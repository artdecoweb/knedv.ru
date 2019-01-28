import { Col } from './components/Bootstrap'

export const LeftMenu = () => {
  return <Col className="LeftMenu col-md-6 col-lg-3">
    <h2><img src="website/bookmark.svg" style="height:2rem;"/>Каталог Недви\u00ADжи\u00ADмо\u00ADсти</h2>
    <ul>
      <li><a href="/appartments">Апартаменты</a></li>
      <li><a href="/appartments">Москва Новостройки</a></li>
      <li><a href="/appartments">Москва Элитная</a></li>
      <li><a href="/appartments">Москва вторичное жильё</a></li>
      <li><a href="/appartments">Москва и Новая Москва Загородная</a></li>
      <li><a href="/appartments">Москва нежилая</a></li>
      <li><a href="/appartments">Москва комнаты</a></li>
      <li><a href="/appartments">Москва машино-места</a></li>
      <li><a href="/appartments">МО Аренда</a></li>
      <li><a href="/appartments">Московская область элитная</a></li>
      <li><a href="/appartments">Московская область новостройки</a></li>
      <li><a href="/appartments">Московская область Вторичное жилье</a></li>
      <li><a href="/appartments">Московская область Нежилая</a></li>
      <li><a href="/appartments">Московская область Коттеджи</a></li>
      <li><a href="/appartments">Московская область Участки</a></li>
      <li><a href="/appartments">Москва Аренда</a></li>
      <li><a href="/appartments">Заграница</a></li>
      <li><a href="/appartments">Черноморское побережье</a></li>
      <li><a href="/appartments">Москва и Новая Москва</a></li>
      <li><a href="/appartments">Московская область</a></li>
    </ul>
    <hr/>
    <h2>Блог: Где Купить Новую Квартиру?</h2>
    <em>28 Января 2019</em>
    <img className="img-fluid" src="website/keys.jpg" title="Где купить новую квартиру"/>
    <p>В этом блог-посте наш эксперт Надежда рассказывает, где лучше всего покупать новую квартиру с учетом текущих трендов на рынке жилья, и как Корпорация Недвижимости 21 век будет Вашим надежным сотрудником в этом деле.
      <a className="mt-2 btn btn-dark" href="blog/latest">Читать...</a> <a className="btn btn-light mt-2" href="blog">Весь Блог</a>
    </p>
  </Col>
}