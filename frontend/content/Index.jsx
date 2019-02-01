// import content from '../../database/IndexContent.json'
import { Col, Row } from '../components/Bootstrap.jsx'

const IndexContent = ({ categories }) => {
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
      {categories.map(({ cdnImage, title, description, seo }, i) => {
        const even = i % 2 == 0
        return <Item
          link={`/каталог/${seo}`}
          img={cdnImage}
          title={title}
          key={title}
          description={description}
          style={`background:${!even ? '#edeee8' : 'white'};`}
        />
      }
      )}
    </div>
  </Col>
}

const Item = ({ img, title, description, style, link }) => {
  return <Row className="d-flex align-items-center IndexItem my-1" style={style}>
    <Col className="IndexItemImage col-12 col-md-4">
      <a href={link} title={title}>
        <img className="img-fluid p-1" src={img}/>
      </a>
    </Col>
    <Col>
      <a href={link} title={title}>
        <h3>{title}</h3>
        {description && <p>{description}</p>}
      </a>
    </Col>
  </Row>
}

export default IndexContent