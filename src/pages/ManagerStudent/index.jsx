import { z } from 'zod'
import NavBar from '../../components/NavBar/NavBar'
import './style.css'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { activateStudents, deactivateStudents, editStudent, getCourses, getStudents, studentRegister } from '../../config/config'
import Swal from 'sweetalert2';
import { useAuth } from '../../context/AuthContextProvider'

import addUser from "../../assets/add-user.png";

const createRegisterStudentFormSchema = z.object({
    nameComplet: z
        .string()
        .nonempty('O nome é obrigatório')
        .transform((name) => {
            return name
                .trim()
                .split(' ')
                .map((word) => {
                    return word[0].toLocaleUpperCase().concat(word.substring(1))
                })
                .join(' ')
        }),
    email: z
        .string()
        .nonempty('O e-mail é obrigatório')
        .email('Formato de e-mail inválido')
        .toLowerCase(),
    password: z
        .string()
        .min(6, 'A senha precisa de minimo 6 caracteres')
        .optional(),
    confirmPassword: z
        .string()
        .optional(),
    registration: z
        .string()
        .nonempty('Número de matrícula é obrigatório'),
    course: z
        .string()
        .nonempty('Curso é obrigatório'),
    semester: z
        .string()
        .nonempty('Semestre atual é obrigatório'),
    unity: z
        .string()
        .nonempty('Selecione unidade é obrigatório'),
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas precisam ser iguais",
    path: ["confirmPassword"]
})

export function ManagerStudent() {
    const { authRole } = useAuth()
    console.log(authRole)
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(createRegisterStudentFormSchema)
    });
    const [showModal, setShowModal] = useState(false);
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [showModalEdit, setShowModalEdit] = useState(false)
    const [editStudentData, setEditStudentData] = useState(null)
    const [selectedStudentId, setSelectedStudentId] = useState(null);
    const [studentsActivationStatus, setStudentsActivationStatus] = useState({});
    const [isEditing, setIsEditing] = useState(false)
    const [isRegister, setIsRegister] = useState(false)
    const modalRef = useRef(null);


    useEffect(() => {
        async function fetchStudents() {
            try {
                const data = await getStudents();
                setStudents(data);
                console.log(data)
            } catch (error) {
                console.error("Erro ao buscar gerentes:", error);
            }
        }

        async function fetchCourses() {
            try {
                const data = await getCourses();
                setCourses(data.data);
            } catch (error) {
                console.error("Erro ao buscar cursos:", error);
            }
        }

        fetchStudents();
        fetchCourses();
    }, [showModal, showModalEdit]);

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

    async function createRegisterStudent(data) {
        setIsRegister(true)
        const student = {
            name: data.nameComplet,
            email: data.email,
            semester: data.semester,
            password: data.password,
            course_id: data.course,
            registration: data.registration,
            unity: data.unity
        };

        try {
            const result = await studentRegister(student);
            if (result.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Sucesso!',
                    text: 'Conta de usuário criada com sucesso!',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro',
                    text: `Erro ao criar conta: ${result.status}`,
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Erro na criação da conta.',
            });
        } finally {
            setIsRegister(false)
        }

        reset();
    }

    async function handleToggleActivationButtonClick(studentId, isActive) {
        try {
            setStudentsActivationStatus(prevStatus => ({
                ...prevStatus,
                [studentId]: true
            }))

            let response;
            if (isActive) {
                response = await deactivateStudents(studentId);
            } else {
                response = await activateStudents(studentId);
            }

            if (response.status === 204) {
                const updatedStudents = students.map(student => {
                    if (student._id === studentId) {
                        return { ...student, active: !isActive };
                    }
                    return student;
                });
                setStudents(updatedStudents);

                Swal.fire({
                    icon: 'success',
                    title: 'Sucesso!',
                    text: isActive ? 'Aluno desativado com sucesso!' : 'Aluno ativado com sucesso!',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro',
                    text: `Erro ao ${isActive ? 'desativar' : 'ativar'} aluno: ${response.status}`,
                });
            }
        } catch (error) {
            console.error(`Erro ao alternar ativação do aluno ${studentId}:`, error);
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: `Erro ao alternar ativação do aluno ${studentId}.`,
            });
        } finally {
            setStudentsActivationStatus(prevStatus => ({
                ...prevStatus,
                [studentId]: false
            }))
        }
    }

    async function handleEditStudent(data) {
        setIsEditing(true)
        const studentEdit = {
            name: data.nameComplet,
            email: data.email,
            semester: data.semester,
            //  password: data.password,
            course_id: data.course,
            registration: data.registration,
            unity: data.unity
        };

        try {
            const result = await editStudent(studentEdit, selectedStudentId);
            if (result.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Sucesso!',
                    text: 'Conta de usuário editada com sucesso!',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro',
                    text: `Erro ao criar conta: ${result.status}`,
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Erro na edição da conta.',
            });
        } finally {
            setIsEditing(false)
        }


    }


    function handleAddButtonClick() {
        setShowModal(true);
    }

    function handleCloseModal() {
        setShowModal(false);
        reset();
    }

    function handleAddButtonClickEdit(studentId) {
        console.log(studentId)
        setSelectedStudentId(studentId)
        const student = students.find(student => student._id === studentId);
        setEditStudentData(student)
        setShowModalEdit(true);
    }

    function handleCloseModalEdit() {
        setShowModalEdit(false);
        reset();
    }

    function renderActiveStatus(active) {
        return active ? "Ativo" : "Inativo";
    }


    return (
        <div className="bg">
            <NavBar search={undefined} />
            <div className="d-flex justify-content-start py-3 toMoveAway font">
                <div>
                    <img src={addUser} className="" width={80} height={80} alt="" />
                </div>
                <div className="mt-4 px-4">
                    <h1 className="font">Gerenciamento de Alunos</h1>
                </div>
            </div>
            <div className="d-flex justify-content-start py-1 toMoveAway">
                {authRole === "ADMINISTRATOR" || authRole === "COORDINATORS" && (
                    <div>
                        <button className="rounded border-0 buttonAdd" onClick={handleAddButtonClick}>Adicionar</button>
                    </div>
                )}
            </div>

            <div className="divTableStyle">
                <table className="table tableStyle">
                    <thead>
                        <tr className="text-center">
                            <th scope="col"></th>
                            <th scope="col">Nome</th>
                            <th scope="col">Email</th>
                            <th scope="col">Registro</th>
                            <th scope="col">Semestre</th>
                            <th scope="col">Curso</th>
                            <th scope="col">Unidade</th>
                            <th scope="col">Status</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr key={student._id} className="text-center tableFontBody">
                                <td></td>
                                <td>{student.name}</td>
                                <td>{student.email}</td>
                                <td>{student.registration}</td>
                                <td>{student.semester}º</td>
                                <td> {student.course_id ? (
                                    <span key={student.course_id}>{student.course_id.name}</span>
                                ) : (
                                    <span>Não tem cursos disponíveis</span>
                                )}</td>
                                <td>{student.unity}</td>
                                <td>{renderActiveStatus(student.active)}</td>
                                <td>
                                    <button className="border-0 button-edit" data-student-id={student._id} onClick={() => handleAddButtonClickEdit(student._id)}>Editar</button>
                                    <button className="border-0 button-ActiveDeactivate" onClick={() => handleToggleActivationButtonClick(student._id, student.active)} disabled={studentsActivationStatus[student._id]}>
                                        {studentsActivationStatus[student._id] ? (
                                            student.active ? 'Desativando...' : 'Ativando...'
                                        ) : (
                                            student.active ? 'Desativar' : 'Ativar'
                                        )}
                                    </button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>

            {showModalEdit && (
                <div className="modal" role="dialog" onClick={handleCloseModalEdit}>
                    <div className="modal-dialog" role="document">
                        <div id="modal-content-users" className="modal-content mt-4 px-4" ref={modalRef} onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header d-flex justify-content-between">
                                <div className="mt-3">
                                    <img src={addUser} className="" width={50} height={50} alt="" />
                                </div>
                                <div>
                                    <h5 className="modal-title">Editar Aluno</h5>
                                </div>
                                <button type="button" className="buttonClose custom-close-button" onClick={handleCloseModalEdit} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit(handleEditStudent)}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="input1" className="labelText">Nome Completo</label>
                                                <input {...register('nameComplet', { value: editStudentData ? editStudentData.name : '' })} placeholder="Insira o nome completo" type="text" className="form-control" id="input1" />
                                                {errors.nameComplet && <span className="error-message">{errors.nameComplet.message}</span>}
                                            </div>

                                            <div className="form-group mt-2">
                                                <label htmlFor="selectRole">Selecione um curso</label>
                                                <select className="form-select" id="selectRole" {...register('course')} defaultValue={editStudentData ? editStudentData.course_id._id : ''}>
                                                    <option value="">Selecione um Curso</option>
                                                    {courses.map((course) => (
                                                        <option key={course._id} value={course._id}>{course.name}</option>
                                                    ))}
                                                </select>
                                                {errors.course && <span className="error-message">{errors.course.message}</span>}
                                            </div>


                                            <div className="form-group mt-2">
                                                <label htmlFor="input1" className="labelText">Matrícula</label>
                                                <input {...register('registration', { value: editStudentData ? editStudentData.registration : '' })} placeholder="Insira o seu número de matrícula" type="text" className="form-control" id="input1" />
                                                {errors.registration && <span className="error-message">{errors.registration.message}</span>}
                                            </div>

                                            {/* <div className="form-group mt-2">
                                                <label htmlFor="input2">Senha</label>
                                                <input {...register('password', { value: editStudentData ? editStudentData.password : '' })} placeholder="Insira sua senha" type="password" className="form-control" id="input2" />
                                                {errors.password && <span className="error-message">{errors.password.message}</span>}
                                            </div> */}

                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group mt">
                                                <label htmlFor="input4">E-mail</label>
                                                <input {...register('email', { value: editStudentData ? editStudentData.email : '' })} placeholder="Insira seu e-mail" type="text" className="form-control" id="input4" />
                                                {errors.email && <span className="error-message">{errors.email.message}</span>}
                                            </div>
                                            <div className="form-group mt-2">
                                                <label htmlFor="selectRole">Selecione sua unidade</label>
                                                <select className="form-select" id="selectRole" {...register('unity')} defaultValue={editStudentData ? editStudentData.unity : ''}>
                                                    <option value="">Selecione a Unidade</option>
                                                    <option value="ITABUNA">Itabuna</option>
                                                    <option value="FEIRA_DE_SANTANA">Feira de Santana</option>
                                                    <option value="VITORIA_DA_CONQUISTA">
                                                        Vitória da Conquista
                                                    </option>
                                                    <option value="JEQUIÉ">Jequié</option>
                                                    <option value="SALVADOR">Salvador</option>
                                                </select>
                                                {errors.unity && <span className="error-message">{errors.unity.message}</span>}
                                            </div>

                                            <div className="form-group mt-2">
                                                <label htmlFor="selectRole">Selecione seu semestre</label>
                                                <select className="form-select" id="selectRole" {...register('semester')} defaultValue={editStudentData ? editStudentData.semester : ''}>
                                                    <option value="">Selecione o Semestre</option>
                                                    <option value="1">1º Semestre</option>
                                                    <option value="2">2º Semestre</option>
                                                    <option value="3">3º Semestre</option>
                                                    <option value="4">4º Semestre</option>
                                                    <option value="5">5º Semestre</option>
                                                    <option value="6">6º Semestre</option>
                                                    <option value="7">7º Semestre</option>
                                                    <option value="8">8º Semestre</option>
                                                    <option value="9">9º Semestre</option>
                                                    <option value="10">10º Semestre</option>
                                                </select>
                                                {errors.semester && <span className="error-message">{errors.semester.message}</span>}
                                            </div>
                                            {/* 
                                            <div className="form-group mt-2">
                                                <label htmlFor="input5">Repita sua senha</label>
                                                <input {...register('confirmPassword', { value: editStudentData ? editStudentData.password : '' })} placeholder="Insira sua senha novamente" type="password" className="form-control" id="input5" />
                                                {errors.confirmPassword && <span className="error-message">{errors.confirmPassword.message}</span>}
                                            </div> */}

                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <div className="px-3">
                                            <button className="rounded border-0 buttonRegister" disabled={isEditing}>
                                                {isEditing ? 'Editando...' : 'Salvar'}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showModal && (
                <div className="modal" role="dialog" onClick={handleCloseModal}>
                    <div className="modal-dialog" role="document">
                        <div id="modal-content-users" className="modal-content mt-4 px-4" ref={modalRef} onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header d-flex justify-content-between">
                                <div className="mt-3">
                                    <img src={addUser} className="" width={50} height={50} alt="" />
                                </div>
                                <div>
                                    <h5 className="modal-title">Cadastro de Aluno</h5>
                                </div>
                                <button type="button" className="buttonClose custom-close-button" onClick={handleCloseModal} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit(createRegisterStudent)}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="input1" className="labelText">Nome Completo</label>
                                                <input {...register('nameComplet')} placeholder="Insira o nome completo" type="text" className="form-control" id="input1" />
                                                {errors.nameComplet && <span className="error-message">{errors.nameComplet.message}</span>}
                                            </div>

                                            <div className="form-group mt-2">
                                                <label htmlFor="selectRole">Selecione um curso</label>
                                                <select className="form-select" id="selectRole" {...register('course')}>
                                                    <option value="">Selecione um Curso</option>
                                                    {courses.map((course) => (
                                                        <option key={course._id} value={course._id}>{course.name}</option>
                                                    ))}
                                                </select>
                                                {errors.course && <span className="error-message">{errors.course.message}</span>}
                                            </div>

                                            <div className="form-group mt-2">
                                                <label htmlFor="input1" className="labelText">Matrícula</label>
                                                <input {...register('registration')} placeholder="Insira o seu número de matrícula" type="text" className="form-control" id="input1" />
                                                {errors.registration && <span className="error-message">{errors.registration.message}</span>}
                                            </div>

                                            <div className="form-group mt-2">
                                                <label htmlFor="input2">Senha</label>
                                                <input {...register('password')} placeholder="Insira sua senha" type="password" className="form-control" id="input2" />
                                                {errors.password && <span className="error-message">{errors.password.message}</span>}
                                            </div>

                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group mt">
                                                <label htmlFor="input4">E-mail</label>
                                                <input {...register('email')} placeholder="Insira seu e-mail" type="text" className="form-control" id="input4" />
                                                {errors.email && <span className="error-message">{errors.email.message}</span>}
                                            </div>
                                            <div className="form-group mt-2">
                                                <label htmlFor="selectRole">Selecione sua unidade</label>
                                                <select className="form-select" id="selectRole" {...register('unity')}>
                                                    <option value="">Selecione a Unidade</option>
                                                    <option value="ITABUNA">Itabuna</option>
                                                    <option value="FEIRA_DE_SANTANA">Feira de Santana</option>
                                                    <option value="VITORIA_DA_CONQUISTA">
                                                        Vitória da Conquista
                                                    </option>
                                                    <option value="JEQUIÉ">Jequié</option>
                                                    <option value="SALVADOR">Salvador</option>
                                                </select>
                                                {errors.unity && <span className="error-message">{errors.unity.message}</span>}
                                            </div>

                                            <div className="form-group mt-2">
                                                <label htmlFor="selectRole">Selecione seu semestre</label>
                                                <select className="form-select" id="selectRole" {...register('semester')}>
                                                    <option value="">Selecione o Semestre</option>
                                                    <option value="1">1º Semestre</option>
                                                    <option value="2">2º Semestre</option>
                                                    <option value="3">3º Semestre</option>
                                                    <option value="4">4º Semestre</option>
                                                    <option value="5">5º Semestre</option>
                                                    <option value="6">6º Semestre</option>
                                                    <option value="7">7º Semestre</option>
                                                    <option value="8">8º Semestre</option>
                                                    <option value="9">9º Semestre</option>
                                                    <option value="10">10º Semestre</option>
                                                </select>
                                                {errors.semester && <span className="error-message">{errors.semester.message}</span>}
                                            </div>

                                            <div className="form-group mt-2">
                                                <label htmlFor="input5">Repita sua senha</label>
                                                <input {...register('confirmPassword')} placeholder="Insira sua senha novamente" type="password" className="form-control" id="input5" />
                                                {errors.confirmPassword && <span className="error-message">{errors.confirmPassword.message}</span>}
                                            </div>

                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <div className="px-3">
                                            <button className="rounded border-0 buttonRegister" disabled={isRegister}>
                                                {isRegister ? 'Cadastrando...' : 'Salvar'}
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
    );

}