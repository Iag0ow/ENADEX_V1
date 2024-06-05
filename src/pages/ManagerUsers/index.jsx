import React, { useEffect, useState, useRef } from "react";
import addUser from "../../assets/add-user.png";
import NavBar from "../../components/NavBar/NavBar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getManagers, getCourses, registerAdminTeacher, deactivateManagers, activateManagers, editManagerUser } from "../../config/config";
import Swal from 'sweetalert2';
import { z } from 'zod';
import './style.css';
import { useAuth } from "../../context/AuthContextProvider";

const createRegisterAdminTeacherFormSchema = z.object({
    nameComplet: z
        .string()
        .nonempty('O nome é obrigatório')
        .transform((name) => {
            return name
                .trim()
                .split(' ')
                .map((word) => {
                    return word[0].toLocaleUpperCase().concat(word.substring(1));
                })
                .join(' ');
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
    selectRole: z
        .string()
        .nonempty('Selecione um tipo'),
    courseId: z
        .array(z.string())
        .nonempty('Selecione pelo menos dois cursos')
        .min(1, 'Selecione pelo menos um curso')
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas precisam ser iguais",
    path: ["confirmPassword"]
});

export function ManagerUsers() {
    const { authRole } = useAuth()
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(createRegisterAdminTeacherFormSchema)
    });
    const [showModal, setShowModal] = useState(false);
    const [managers, setManagers] = useState([]);
    const [courses, setCourses] = useState([]);
    const [showModalEditManagersUsers, setShowModalEditManagersUsers] = useState(false)
    const [editManagerUserData, setEditManagerUserData] = useState(null)
    const [managerCourses, setManagerCourses] = useState({});
    const [selectedIdManagerUserId, setSelectedIdManagerUserId] = useState(null)
    const modalRef = useRef(null);


    useEffect(() => {
        async function fetchManagers() {
            try {
                const data = await getManagers();
                setManagers(data);
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

        fetchManagers();
        fetchCourses();
    }, [showModal, showModalEditManagersUsers]);


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

    async function createRegisterAdminTeacher(data) {
        const adminTeacher = {
            name: data.nameComplet,
            email: data.email,
            password: data.password,
            role: data.selectRole,
            courses_id: data.courseId
        };
        try {
            const result = await registerAdminTeacher(adminTeacher);
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
        }
        reset();
    }

    async function handleEditManagerUser(data){
        const editAdminTeacher = {
            name: data.nameComplet,
            email: data.email,
            role: data.selectRole,
            courses_id: data.courseId
        };
        try {
            const result = await editManagerUser(editAdminTeacher, selectedIdManagerUserId);
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
                    text: `Erro ao editar a conta: ${result.status}`,
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Erro na edição da conta.',
            });
        }
       
    }

    async function handleToggleActivationButtonClick(managerId, isActive, role) {
        const newRole = renderRole(role)
        try {
            let response;
            if (isActive) {
                response = await deactivateManagers(managerId);
            } else {
                response = await activateManagers(managerId);
            }

            if (response.status === 204) {
                const updatedManagers = managers.map(manager => {
                    if (manager._id === managerId) {
                        return { ...manager, active: !isActive };
                    }
                    return manager;
                });
                setManagers(updatedManagers);

                Swal.fire({
                    icon: 'success',
                    title: 'Sucesso!',
                    text: isActive ? `${newRole} desativado com sucesso!` : `${newRole} ativado com sucesso!`,
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro',
                    text: `Erro ao ${isActive ? 'desativar' : 'ativar'} aluno: ${response.status}`,
                });
            }
        } catch (error) {
            console.error(`Erro ao alternar ativação do aluno ${managerId}:`, error);
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: `Erro ao alternar ativação do aluno ${managerId}.`,
            });
        }
    }

    function handleAddButtonClick() {
        setShowModal(true);
    }

    function handleCloseModal() {
        setShowModal(false);
        reset();
    }

    function handleAddButtonClickEdit(managerId) {
        setSelectedIdManagerUserId(managerId)
       
        const manager = managers.find(manager => manager._id === managerId)
        setEditManagerUserData(manager);
        setManagerCourses(new Set(manager.courses_id.map(course => course._id)));
        setShowModalEditManagersUsers(true);
    }

    function handleCloseModalEdit() {
        setShowModalEditManagersUsers(false);
        reset();
    }

    function renderRole(role) {
        if (role === "COORDINATORS") {
            return "Coordenador";
        } else if (role === "ADMINISTRATOR") {
            return "Administrador";
        } else {
            return "Professor";
        }
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
                    <h1 className="font">Gerenciamento de Usuários</h1>
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
                            <th scope="col">Cargo</th>
                            <th scope="col">Email</th>
                            <th scope="col">Cursos</th>
                            <th scope="col">Status</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {managers.map((manager) => (
                            <tr key={manager._id} className="text-center tableFontBody">
                                <td>{manager.name}</td>
                                <td>{renderRole(manager.role)}</td>
                                <td>{manager.email}</td>
                                <td>
                                    {manager.courses_id.length > 0 ? (
                                        manager.courses_id.map((course, index) => (
                                            <span key={course._id}>
                                                {course.name}
                                                {index !== manager.courses_id.length - 1 ? ', ' : ''}
                                            </span>
                                        ))
                                    ) : (
                                        <span>Não tem cursos disponíveis</span>
                                    )}
                                </td>
                                <td>{renderActiveStatus(manager.active)}</td>
                                <td>
                                {(authRole === "COORDINATORS" && manager.role === "COORDINATORS") ? (
                                        <button
                                            className="rounded border-0 button-edit disabled-button mx-2"
                                            disabled
                                        >
                                            Editar
                                        </button>
                                    ) : (
                                        <button
                                            className="rounded border-0 button-edit mx-2"
                                            onClick={() => handleAddButtonClickEdit(manager._id)}
                                        >
                                            Editar
                                        </button>
                                    )}
                                    <button className="border-0 button-ActiveDeactivate" onClick={() => handleToggleActivationButtonClick(manager._id, manager.active, manager.role)}>
                                        {manager.active ? 'Desativar' : 'Ativar'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModalEditManagersUsers && (
                <div className="modal" role="dialog" onClick={handleCloseModalEdit}>
                    <div className="modal-dialog" role="document">
                        <div id="modal-content-users" className="modal-content mt-4 px-4" ref={modalRef} onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header d-flex justify-content-between">
                                <div className="mt-3">
                                    <img src={addUser} className="" width={50} height={50} alt="" />
                                </div>
                                <div>
                                    <h5 className="modal-title">Editar o {renderRole(editManagerUserData.role)}</h5>
                                </div>
                                <button type="button" className="buttonClose custom-close-button" onClick={handleCloseModalEdit} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit(handleEditManagerUser)}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="input1" className="labelText">Nome Completo</label>
                                                <input {...register('nameComplet', { value: editManagerUserData ? editManagerUserData.name : '' })} placeholder="Insira o nome completo" type="text" className="form-control" id="input1" />
                                                {errors.nameComplet && <span className="error-message">{errors.nameComplet.message}</span>}
                                            </div>
                                            {/* <div className="form-group mt-2">
                                                <label htmlFor="input2">Senha</label>
                                                <input {...register('password')} placeholder="Insira sua senha" type="password" className="form-control" id="input2" />
                                                {errors.password && <span className="error-message">{errors.password.message}</span>}
                                            </div> */}
                                            <div className="form-group mt-2">
                                                <label htmlFor="selectRole">Selecione um tipo</label>
                                                <select className="form-select" id="selectRole" {...register('selectRole')} defaultValue={editManagerUserData ? editManagerUserData.role : ''}>
                                                    <option value="">Selecione um Tipo</option>
                                                    <option value="ADMINISTRATOR">Administrador</option>
                                                    <option value="TEACHERS">Professor</option>
                                                    <option value="COORDINATORS">Coordenador</option>
                                                </select>
                                                {errors.selectRole && <span className="error-message">{errors.selectRole.message}</span>}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group mt">
                                                <label htmlFor="input4">E-mail</label>
                                                <input {...register('email', { value: editManagerUserData ? editManagerUserData.email : '' })} placeholder="Insira seu e-mail" type="text" className="form-control" id="input4" />
                                                {errors.email && <span className="error-message">{errors.email.message}</span>}
                                            </div>
                                            
                                            {/* <div className="form-group mt-2">
                                                <label htmlFor="input5">Repita sua senha</label>
                                                <input {...register('confirmPassword')} placeholder="Insira sua senha novamente" type="password" className="form-control" id="input5" />
                                                {errors.confirmPassword && <span className="error-message">{errors.confirmPassword.message}</span>}
                                            </div> */}
                                            <div className="form-group mt-2">
                                                <label htmlFor="input3">Selecione os cursos</label>
                                                {courses.map((course) => (
                                                    <div key={course._id} className="form-check">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id={`courseCheckbox${course._id}`}
                                                            value={course._id}
                                                            {...register('courseId')}
                                                            defaultChecked={managerCourses.has(course._id)}
                                                        />
                                                        <label className="form-check-label" htmlFor={`courseCheckbox${course._id}`}>
                                                            {course.name}
                                                        </label>
                                                    </div>
                                                ))}
                                                {errors.courseId && <span className="error-message">{errors.courseId.message}</span>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <div className="px-3">
                                            <button className="rounded border-0 buttonRegister">Salvar</button>
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
                                    <h5 className="modal-title">Cadastro de Usuário</h5>
                                </div>
                                <button type="button" className="buttonClose custom-close-button" onClick={handleCloseModal} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit(createRegisterAdminTeacher)}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="input1" className="labelText">Nome Completo</label>
                                                <input {...register('nameComplet')} placeholder="Insira o nome completo" type="text" className="form-control" id="input1" />
                                                {errors.nameComplet && <span className="error-message">{errors.nameComplet.message}</span>}
                                            </div>
                                            <div className="form-group mt-2">
                                                <label htmlFor="input2">Senha</label>
                                                <input {...register('password')} placeholder="Insira sua senha" type="password" className="form-control" id="input2" />
                                                {errors.password && <span className="error-message">{errors.password.message}</span>}
                                            </div>
                                            <div className="form-group mt-2">
                                                <label htmlFor="selectRole">Selecione um tipo</label>
                                                <select className="form-select" id="selectRole" {...register('selectRole')}>
                                                    <option value="">Selecione um Tipo</option>
                                                    <option value="ADMINISTRATOR">Administrador</option>
                                                    <option value="TEACHERS">Professor</option>
                                                    <option value="COORDINATORS">Coordenador</option>
                                                </select>
                                                {errors.selectRole && <span className="error-message">{errors.selectRole.message}</span>}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group mt">
                                                <label htmlFor="input4">E-mail</label>
                                                <input {...register('email')} placeholder="Insira seu e-mail" type="text" className="form-control" id="input4" />
                                                {errors.email && <span className="error-message">{errors.email.message}</span>}
                                            </div>
                                            <div className="form-group mt-2">
                                                <label htmlFor="input5">Repita sua senha</label>
                                                <input {...register('confirmPassword')} placeholder="Insira sua senha novamente" type="password" className="form-control" id="input5" />
                                                {errors.confirmPassword && <span className="error-message">{errors.confirmPassword.message}</span>}
                                            </div>
                                            <div className="form-group mt-2">
                                                <label htmlFor="input3">Selecione os cursos</label>
                                                {courses.map((course) => (
                                                    <div key={course._id} className="form-check">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id={`courseCheckbox${course._id}`}
                                                            value={course._id}
                                                            {...register('courseId')}
                                                        />
                                                        <label className="form-check-label" htmlFor={`courseCheckbox${course._id}`}>
                                                            {course.name}
                                                        </label>
                                                    </div>
                                                ))}
                                                {errors.courseId && <span className="error-message">{errors.courseId.message}</span>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <div className="px-3">
                                            <button className="rounded border-0 buttonRegister">Cadastrar</button>
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
