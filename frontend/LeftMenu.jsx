import { Col } from './components/Bootstrap'

export const LeftMenu = ({ categories }) => {
  return <Col className="LeftMenu col-md-6 col-lg-3">
    <h2><img src="/website/bookmark.svg" style="height:2rem;"/>Каталог Недви\u00ADжи\u00ADмо\u00ADсти</h2>
    <ul>
      {categories.map(({ seo, title }) => {
        return <li><a href={`/каталог/${seo}/`}>{title}</a></li>
      })}
    </ul>
    <hr/>
    <h2>Пособие По Покупке Квартиры</h2>
    <em>Советы от профессионалов</em>
    <img className="img-fluid" src="/website/keys.jpg" title="Как купить новую квартиру"/>
    <p>Покупка квартиры - дело серьезное и ответственное. В этом гайде наш главный эксперт Надежда рассказывает, где лучше всего покупать новую квартиру с учетом текущих трендов на рынке жилья, как правильно выбрать хорошо риэлтора и каким образом Корпорация Недвижимости 21 Век может стать Вашим надежным сотрудником в этом деле.
    </p>

    <a className="my-2 btn btn-dark" href="/пособие-по-покупке-квартиры">Читать далее...</a>

  </Col>
}

{/* <a className="btn btn-light my-2" href="/articles">Все Статьи</a> */}

{/* <li><a href="/appartments">Апартаменты</a></li>
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
<li><a href="/appartments">Московская область</a></li> */}