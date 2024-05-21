import { Accordion } from "react-bootstrap";
import NavBar from "../../components/NavBar/NavBar";
import './style.css'

export function FaqInterno() {
    return (
        <div className="bg">
            <NavBar />
            <div className="d-flex flex-column align-items-center">
                <div class="mb-4 rectangleHeader text-center">
                    <span className="ball mr-2"></span>
                    <h1 className="">FAQ INTERNO</h1>
                </div>
                <div className="rectangleContent">
                    <div className="d-flex justify-content-around">
                        <div>
                            <button className="button">Voltar</button>
                        </div>
                        <div>
                            <button className="button">Fazer pergunta</button>
                        </div>
                    </div>
                    <div className="mt-4">
                        <Accordion defaultActiveKey="0" className="">
                            <Accordion.Item className="mb-3" eventKey="0">
                                <Accordion.Header className="">
                                    <h1 className="custom-header">Pergunta 1</h1>
                                </Accordion.Header>
                                <Accordion.Body className="custom-body">Resposta</Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>
                </div>
            </div>
        </div>
    )
}
