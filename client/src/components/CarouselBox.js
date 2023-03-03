import React from 'react';
import { Carousel, Container } from 'react-bootstrap';
import ck from "../assets/ck.jpg";
import orient  from "../assets/orient.jpg";
import diesel from "../assets/diesel.jpg";
import victorinox from "../assets/victorinox.jpg";

export default function CarouselBox() {
  return (
    <Container>
      <Carousel className='mt-3 b-1'>
        <Carousel.Item>
          <img
            className="b-block w-100"
            src={ ck }
            alt="Calvin Klein"
          />
          <Carousel.Caption>
              <h3 style={{color: "black"}}>Calvin Klein</h3>
              <p style={{color: "black"}}>Чистота, элегантность и сексуальность — вот основа и фирменный стиль.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="b-block w-100"
            src={ orient }
            alt="Orient"
          />
          <Carousel.Caption>
              <h3>Orient</h3>
              <p>Высокое качество, стильный дизайн, популярный во всем мире.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="b-block w-100"
            src={ diesel }
            alt="Diesel"
          />
          <Carousel.Caption>
              <h3>Diesel</h3>
              <p>Бренд ломающий все стереотипы в головах. Буть смелым.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="b-block w-100"
            src={ victorinox }
            alt="Victorinox"
          />
          <Carousel.Caption>
              <h3>Victorinox</h3>
              <p>Классически универсальное швейцарское армейское наследие</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Container>
  )
}