import {AnnouncementSlider} from "./AnnouncementSlider";
import {Col, Container, Row, Table} from "react-bootstrap";
import {BookSlider} from "./BookSlider";
import {BookTable} from "./BookTable";

export function Home() {
    return (
        <>
            <Container>
                <Row>
                    <Col className="p-0">
                        <AnnouncementSlider/>
                    </Col>
                </Row>

                <Row style={{marginTop:'50px', marginBottom:'50px', paddingLeft:'100px', paddingRight:'100px'}} className="justify-content-center align-items-center">
                    <Col className="p-0">
                        <div>
                            <Row>
                                <Col style={{textAlign:'left'}}>
                                    <p>Featured Books</p>
                                </Col>
                                <Col style={{textAlign:'right'}}>
                                    <p>More</p>
                                </Col>
                            </Row>
                        </div>
                        <div className="container align-self-center">
                            <BookTable/>
                        </div>
                    </Col>
                </Row>

                <Row style={{marginTop:'50px', marginBottom:'50px', paddingLeft:'100px', paddingRight:'100px'}} className="justify-content-center align-items-center">
                    <Col className="p-0">
                        <div>
                            <Row>
                                <Col style={{textAlign:'left'}}>
                                    <p>Featured Books</p>
                                </Col>
                                <Col style={{textAlign:'right'}}>
                                    <p>More</p>
                                </Col>
                            </Row>
                        </div>
                        <div className="container align-self-center">
                            <BookTable/>
                        </div>
                    </Col>
                </Row>

                <Row style={{marginTop:'50px', marginBottom:'50px', paddingLeft:'100px', paddingRight:'100px'}} className="justify-content-center align-items-center">
                    <Col className="p-0">
                        <div>
                            <Row>
                                <Col style={{textAlign:'left'}}>
                                    <p>Featured Books</p>
                                </Col>
                                <Col style={{textAlign:'right'}}>
                                    <p>More</p>
                                </Col>
                            </Row>
                        </div>
                        <div className="container align-self-center">
                            <BookTable/>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}