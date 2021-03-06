import Layout from '../../src/Layout'
import App from '../../frontend/App'
import { Col, Row } from '../../frontend/components/Bootstrap'

/** @type {import('koa').Middleware} */
const route = async (ctx) => {
  const database = ctx.database
  // const Categories = database.getModel('Category')
  // const categories = await Categories.find()
  const content = <div className="container-fluid" style="background: #edeee8;">
    <Row>
      <Col>
        <h1>О Корпорации Недвижимости 21 Век</h1>
        <p>Успешное развитие бизнеса в сфере не только жилой недвижимости, но и коммерческой недвижимости, открытие направления зарубежной недвижимости, укрепление позиции на рынке жилья в Москве и Московской области, создание филиала в Сочи и завоевание позиции лидера на сочинском рынке, вызвало необходимость в ребренденге компании. Мы развиваемся и идем в ногу со временем!</p>

        <p>КОРПОРАЦИЯ - это корпоративный дух и лидерские качества, позволяющие нам реализовывать как крупномасштабные проекты по продаже жилых микрорайнов,  специализироваться на дорогостоящей и элитной недвижимости класса luxe и deluxe,  осуществлять операции с недвижимостью любого уровня сложности, так и находить наиболее бюджетный вариант для людей, находящихся только в начале пути своего финансового благополучия.</p>

        <p>НЕДВИЖИМОСТЬ - это все виды недвижимости в Москве, Московской области, Сочи и зарубежом: квартиры, дома, особняки, виллы, таунхаусы, гостиницы, дома отдыха, офисы, бизнес-центры,  магазины, торговые и развлекательные центры.</p>

        <p>КОРПОРАЦИЯ НЕДВИЖИМОСТИ 21 Век - это уникальное сочетание высокого уровня профессионализма, международного класса обслуживания, умения ценить доверие клиентов,  отлаженных механизмов комплексного решения задач различного уровня сложности в сфере недвижимости.</p>

        <p>Высочайший профессионализм наших специалистов гарантирует безупречное качество предоставляемых услуг, комфортность, оперативность и что немаловажно 100% надежность сделок, а также абсолютную прозрачность перед клиентом.</p>

        <p>В нашем офисе царит дружественная и теплая атмосфера, поэтому для наших клиентов решение квартирного вопроса начинается с положительных эмоций и ощущения простоты, комфортности и максимального удобства. Мы гордимся тем, что наши клиенты не только возвращаются вновь, но и становятся нашими друзьями.</p>

        <p>Главные принципы нашей работы:</p>
        <ul>
          <li>
            в сфере недвижимости для нас нет невыполнимых задач;
          </li>
          <li>
            качеством и уровнем работы подтверждать, что мы первые;
          </li>
          <li>
            мы экономим деньги, время и нервы наших клиентов;
          </li>
          <li>
            доставлять клиентам радость от работы с нами;
          </li>
          <li>
            мы несем полную ответственность за свою работу.
          </li>
        </ul>

        <p>Наша миссия - обеспечить процветание наших клиентов в недвижимости, приобретенной у нас.</p>
      </Col>
    </Row>
  </div>
  const app = <App activeMenu="about" Content={content} />
  ctx.body = Layout({
    title: 'О Компании',
    App: app,
  })
}
export default route

export const aliases = ['/']