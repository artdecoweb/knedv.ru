import content from '../../database/IndexContent.json'
import { Col } from '../components/Bootstrap.jsx'

const IndexContent = () => {
  return <Col className="order-2 order-lg-1 col-md-12 col-lg-6">
    <h1>
      Корпорация Недвижимости 21 Век
    </h1>
    <p>
      Корпорация Недвижимости 21 Век занимается помощью в покупке, продаже, аренде и сдаче жилих и нежилих помещений в Москве, Московской области и других регионах России и мира. Наш богатый опыт и профессионализм экспертов по подбору жилья поможет Вам осуществить задуманную сделку в минимальные сроки и с гарантией качества, подтвержденной сотнями довольных клиентов.
    </p>
    <p>
      Выберите интересующий Вас раздел из перечисленных ниже:
    </p>
    <table>
      {content.map(({ image, title }) =>
        <Item img={`/website/index/${image}`} title={title} key={title} />
      )}
    </table>
  </Col>
}

const Item = ({ img, title }) => {
  return <tr className="IndexItem my-1">
    <td>{img && <img src={img}/>}</td>
    <td><h3>{title}</h3></td>
  </tr>
}

export default IndexContent