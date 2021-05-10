import {Carousel} from 'react-bootstrap';
import './Catousel.style.css';
 function  CarouselHome() {
    return (
        <Carousel fade>
            <Carousel.Item interval={3000}>
                <img
                    className="d-block w-100 caro-img"
                    src="https://image.shutterstock.com/image-photo/szczecin-polandjuly-8-2020-brown-600w-1923771017.jpg"
                    alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item interval={3000}>
                <img
                    className="d-block w-100 caro-img"
                    src="https://image.shutterstock.com/image-photo/carousel-on-red-square-during-600w-1608521038.jpg"
                    alt="Second slide"
                />
            </Carousel.Item>
            <Carousel.Item interval={3000}>
                <img
                    className="d-block w-100 caro-img"
                    src="https://image.shutterstock.com/image-photo/vienna-austria-may-28-2010-600w-1911753004.jpg"
                    alt="Third slide"
                />
            </Carousel.Item>
        </Carousel>
    )
}
export default CarouselHome;