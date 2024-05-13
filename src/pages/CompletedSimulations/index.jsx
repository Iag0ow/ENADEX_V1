import NavBar from "../../components/NavBar/NavBar";
import { Check } from "phosphor-react";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import "./style.css"

export function CompletedSimulations() {
    const questions = Array.from({ length: 40 }, (_, index) => index + 1);

    const wrongsAnswers = [34, 3, 6, 7, 9]

    const rights = 35;
    const wrongs = 5;
    const total = rights + wrongs;
    const rightsPercetage = (rights / total) * 100;
    const wrongsPercetage = (wrongs / total) * 100;

    return (
        <div className="bg-white">
            <NavBar />

            <div className="simulatorInfo">
                <p className="mt-3 text-white">IBMEC- 2022 - ENADE - Simulado - Direito</p>
            </div>

            <div className="d-flex justify-content-around questionsRightWrong">
                <div className="mt-5" style={{ width: 200, height: 200 }}>
                    <CircularProgressbar
                        styles={{
                            width: 50,
                            height: 50,
                            root: {},
                            path: {
                                stroke: `rgba(15, 169, 88, ${rightsPercetage / 100})`,
                                strokeLinecap: 'butt',
                                transition: 'stroke-dashoffset 0.5s ease 0s',
                                transform: 'rotate(0.25turn)',
                                transformOrigin: 'center center',
                            },
                            trail: {
                                stroke: '#A90F0F80',
                                strokeLinecap: 'butt',

                                transform: 'rotate(0.25turn)',
                                transformOrigin: 'center center',
                            },

                            text: {
                                fill: '#0FA958',
                                fontSize: '10px',
                                fontWeight: 'bold',
                            },

                        }}
                        value={rightsPercetage} text={`${rights} acertadas`} />
                </div>


                <div className="mt-5" style={{ width: 200, height: 200 }}>
                    <CircularProgressbar
                        styles={{
                            width: 50,
                            height: 50,
                            root: {},
                            path: {
                                stroke: `rgba(169, 15, 15, ${rightsPercetage / 100})`,
                                strokeLinecap: 'butt',
                                transition: 'stroke-dashoffset 0.5s ease 0s',
                                transform: 'rotate(0.25turn)',
                                transformOrigin: 'center center',
                            },
                            trail: {
                                stroke: '#0FA958',
                                opacity: 0.5,
                                strokeLinecap: 'butt',
                                transform: 'rotate(0.25turn)',
                                transformOrigin: 'center center',
                            },

                            text: {
                                fill: '#A90F0F',
                                fontSize: '10px',
                                fontWeight: 'bold',
                            },

                        }}
                        value={wrongsPercetage} text={`${wrongs} erradas`} />

                </div>

                <div>
                    <div className="question-queue">
                        <h2>Fila de Questões</h2>
                        <div className="">
                            <div className="d-flex flex-wrap">
                                {questions.slice(0, 20).map((questionNumber) => (
                                    <div key={questionNumber} className="question-circle">
                                        <div className={`circle ${wrongsAnswers.includes(questionNumber) ? 'bg-danger' : ''}`}>{questionNumber}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="d-flex flex-wrap">
                                {questions.slice(20, 40).map((questionNumber) => (
                                    <div key={questionNumber} className="question-circle">
                                        <div className={`circle ${wrongsAnswers.includes(questionNumber) ? 'bg-danger' : ''}`}>{questionNumber}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-4">
                        <button className="buttonBack rounded border-0" onClick={() => window.history.go(-1)}>Voltar</button>
                    </div>

                </div>
            </div>

            <div className="mt-5">
                <div className="question text-white">
                    <h1 className="mt-2">Pergunta</h1>
                </div>
                <div className="response mt-2">
                    <p className="text-white mt-2"> A) Reposta</p>
                </div>
                <div className="response mt-2">
                    <p className="text-white mt-2"> B) Reposta</p>
                </div>
                <div className="response mt-2">
                    <p className="text-white mt-2"> C) Reposta</p>
                </div>

                <div class="d-flex align-items-center">
                    <div class="response mt-2 bg-success">
                        <div>
                            <p class="text-white mt-2">D) Resposta</p>
                        </div>
                    </div>
                    <div class="mt-3 iconMarginRight">
                        <span class="rounded-circle bg-success p-2 text-white">
                            <Check size={20} />
                        </span>
                    </div>
                </div>
            </div>

            <div className="trace mt-3" />

            <div className="mt-3">
                <div className="question text-white ">
                    <h1 className="mt-2">Pergunta</h1>
                </div>
                <div class="d-flex align-items-center">
                    <div class="response mt-2">
                        <div>
                            <p class="text-white mt-2">D) Resposta</p>
                        </div>
                    </div>
                    <div class="mt-3 iconMarginRight">
                        <span class="rounded-circle bg-success p-2 text-white">
                            <Check size={20} />
                        </span>
                    </div>
                </div>
                <div className="response mt-2 bg-danger">
                    <p className="text-white mt-2"> B) Reposta</p>
                </div>
                <div className="response mt-2">
                    <p className="text-white mt-2"> C) Reposta</p>
                </div>
                <div className="response mt-2">
                    <p className="text-white mt-2"> D) Reposta</p>
                </div>

            </div>
        </div>
    )
}
