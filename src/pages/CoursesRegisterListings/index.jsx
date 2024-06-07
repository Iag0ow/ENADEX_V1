import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { format } from "date-fns"

import Swal from 'sweetalert2';
import './style.css';
import oppenBook from "../../assets/open-book.png";
import NavBar from "../../components/NavBar/NavBar";
import { getCourses, registerCourse } from "../../config/config";

const createRegisterCourseSchema = z.object({
    nameCourse: z.string().nonempty('O nome do curso é obrigatório'),
})

export function CoursesRegisterListings() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(createRegisterCourseSchema)
    })
    const [showModal, setShowModal] = useState(false)
    const [isRegister, setIsRegister] = useState(false)
    const [courses, setCourses] = useState([])
    const modalRef = useRef(null);

      useEffect(() => {
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setShowModal(false);
            }
        }
        reset();
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            reset();
        };
    }, [reset]);

    useEffect(() => {
        async function fetchCourses() {
            try {
                const data = await getCourses()
                setCourses(data.data)
            } catch (error) {
                console.error("Error ao buscar cursos: ", error)
            }
        }

        fetchCourses()
    }, [showModal])

    async function createRegisterCourse(data) {
        setIsRegister(true)
        const course = {
            name: data.nameCourse,
        }

        try {
            const result = await registerCourse(course);
            if (result.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Sucesso!',
                    text: 'Curso criado com sucesso!',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro',
                    text: `Erro ao criar o curso: ${result.status}`,
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Erro na criação do curso.',
            });
        }


        setIsRegister(false)
    }

    function handleAddButtonClick() {
        setShowModal(true);
    }

    function handleCloseModal() {
        setShowModal(false);
        reset();
    }

    return (
        <div className="bg">
            <NavBar search={undefined} />
            <div className="d-flex justify-content-start py-3 toMoveAway font">
                <div>
                    <img src={oppenBook} className="" width={80} height={80} alt="" />
                </div>
                <div className="mt-4 px-4">
                    <h1 className="font">Cursos</h1>
                </div>
            </div>
            <div className="d-flex justify-content-start py-1 toMoveAway">
                <div>
                    <button className="rounded border-0 buttonAdd" onClick={handleAddButtonClick}>Adicionar</button>
                </div>
            </div>

            <div className="divTableStyle">
                <table className="table tableStyle">
                    <thead>
                        <tr className="text-center">
                            <th scope="col">Nome</th>
                            <th scope="col">Data cadastro</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course) => (
                            <tr key={course._id} className="text-center tableFontBody">
                                <td>{course.name}</td>
                                <td>{format(new Date(course.createdAt), 'dd/MM/yyyy HH:mm:ss')}</td>
                            </tr>
                            
                        ))}

                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="modal" role="dialog" onClick={handleCloseModal}>
                    <div className="modal-dialog" role="document">
                        <div id="modal-content-users" className="modal-content mt-4 px-4" ref={modalRef} onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header d-flex justify-content-between">
                                <div className="mt-3">
                                    <img src={oppenBook} className="" width={50} height={50} alt="" />
                                </div>
                                <div>
                                    <h5 className="modal-title">Cadastro de Curso</h5>
                                </div>
                                <button type="button" className="buttonClose custom-close-button" onClick={handleCloseModal} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit(createRegisterCourse)}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="input1" className="labelText">Nome do curso</label>
                                                <input {...register('nameCourse')} placeholder="Insira o nome do curso" type="text" className="form-control" id="input1" />
                                                {errors.nameCourse && <span className="error-message">{errors.nameCourse.message}</span>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <div className="px-3">
                                            <button className="rounded border-0 buttonRegister">
                                                {isRegister ? 'Cadastrando...' : 'Cadastrar'}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}