import content from '../../database/IndexContent.json'
import { Col, Row } from '../components/Bootstrap.jsx'

const IndexContent = () => {
  return <Col className="order-2 order-lg-1 col-md-12 col-lg-6">
    <h1>
      Корпорация Недвижимости 21 Век
    </h1>
    <p>
      Корпорация Недвижимости 21 Век занимается помощью в покупке, продаже, аренде и сдаче жилих и нежилых помещений в Москве, Московской области и других регионах России и мира. Наш богатый опыт и профессионализм экспертов по подбору жилья поможет Вам осуществить задуманную сделку в минимальные сроки и с гарантией качества, подтвержденной сотнями довольных клиентов.
    </p>
    <p>
      Выберите интересующий Вас раздел из перечисленных ниже:
    </p>
    <div className="IndexTable">
      {content.map(({ image, title, description }, i) => {
        const even = i % 2 == 0
        return <Item
          img={`/website/index/${image}`}
          title={title}
          key={title}
          description={description}
          style={even ? 'background:white;' : undefined}
        />
      }
      )}
    </div>
  </Col>
}

const Item = ({ img, title, description, style }) => {
  return <Row className="d-flex align-items-center IndexItem my-1" style={style}>
    <Col className="IndexItemImage col-12 col-md-4">
      {img && <img className="img-fluid p-1" src={img}/>}
    </Col>
    <Col>
      <h3>{title}</h3>
      {description && <p>{description}</p>}
    </Col>
  </Row>
}

export default IndexContent