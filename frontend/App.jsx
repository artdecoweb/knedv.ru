import { Row, Col } from './components/Bootstrap'
import { LeftMenu } from './LeftMenu'
import { SpecialBanner } from './SpecialBanner'
import IndexContent from './content/Index'
import TopMenu from './TopMenu'

const Offer = ({ children }) => {
  return <div className="Offer">
    <span>АКЦИЯ</span>
    <div style="white-space: nowrap; display: inline-block;">
      {children}
    </div>
  </div>
}

const App = ({ activeMenu }) => {
  return <div id="Content">
    <TopMenu activeMenu={activeMenu} />
    <div className="container-fluid" style="background: #edeee8;">
      <Offer>
        : Срочный выкуп квартир                  Оперативное  решение Ваших вопросов                г.Домодедово, 1к. кв. хорошие цены от инвесторов                Поселок таун-хаусов "Юрьев-Сад", Новая Москва. Лучшие цены! Осталось всего пять таун-хаусов!                 Метро Ленинский проспект, метро Площадь Гагарина, 5 минут пешком, началось строительство флагманского проекта «Нескучный Home&Spa», отличительной чертой которого является: превосходство, роскошь, стиль, состоящий из пяти башен, высотой от 140 метров до 262 метров, широкий выбор планировочных решений квартир от 50 кв.м., апартаментов с прекраснейшими панорамными видами на Нескучный Сад, Площадь Гагарина и Москва-реку.
      </Offer>
      <Offer>
        : Старт продаж торговых помещение и аппартаментов в поселке Воскресенское.                         Внимание! Акция! Купи апартаменты в Москве за 220 тыс.руб.! Первоначальный взнос - 10% от стоимости апартамента, 90% - беспроцентная отсрочка до получения права собственности!!! При оплате 100% предоставляется скидка -10%.
      </Offer>
      <Row className="mt-3">
        <LeftMenu />
        <IndexContent />
        <Col className="col-md-6 col-lg-3 order-1 order-lg-2 mb-3">
          <h2>
            <img src="website/flash_on.svg" style="height:2rem;"/>Спе\u00ADциаль\u00ADные пред\u00ADло\u00ADже\u00ADния!
          </h2>
          <SpecialBanner
            img="http://www.realty.ru/images/objects/original/14824100977614882.jpg"
            title="Ленинский проспект, дом 114"
            price="55 000 000 руб."
            contact="Лариса Ивановна  8(903)743-09-44"
          >
            Элитный квартал на Ленинском! Большая охраняемая территория. Дом во дворе зеленого, тихого, малоэтажного строительства. Красивая, удобная рекреационная входная группа.
          </SpecialBanner>
        </Col>
      </Row>
      <Row className="Footer">
        © 2019, Корпорация Недвижимости 21 Век
      </Row>
    </div>
  </div>
}

export default App