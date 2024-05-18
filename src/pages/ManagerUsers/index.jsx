import React, { useEffect, useState, useRef } from "react";
import addUser from "../../assets/add-user.png";
import NavBar from "../../components/NavBar/NavBar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getManagers, registerAdminTeacher } from "../../config/config";
import Swal from 'sweetalert2';
import { z } from 'zod'
import './style.css'

const createRegisterAdminTeacherFormSchema = z.object({
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
        .min(6, 'A senha precisa de minimo 6 caracteres'),
    confirmPassword: z
        .string(),
    selectRole: z
        .string()
        .nonempty('Selecione um tipo'),
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas precisam ser iguais",
    path: ["confirmPassword"]
})

export function ManagerUsers() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: zodResolver(createRegisterAdminTeacherFormSchema)
    });
    const [showModal, setShowModal] = useState(false);
    const [managers, setManagers] = useState([]);
    const modalRef = useRef(null);

    useEffect(() => {
        async function fetchManagers() {
            try {
                const data = await getManagers();
                console.log(data);
                setManagers(data);
            } catch (error) {
                console.error("Erro ao buscar gerentes:", error);
            }
        }

        fetchManagers()
    }, []);

    
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

    }, []);

    async function createRegisterAdminTeacher(data) {
        const adminTeacher = {
            name: data.nameComplet,
            email: data.email,
            password: data.password,
            role: data.selectRole,
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

    function handleAddButtonClick() {
        setShowModal(true);
    }

    function handleCloseModal() {
        setShowModal(false);
        reset();
    }

    function renderRole(role) {
        return role === "COORDINATORS" ? "Coordenador" : "Professor";
    }

    function renderActiveStatus(active) {
        return active ? "Ativo" : "Inativo";
    }
    useEffect(() => {
        function handleClickOutside(event) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setShowModal(false);
            }
        }
        reset()
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            reset()
        };

    }, []);

    return (
        <div className="bg">
            <NavBar search={undefined} />
            <div className="d-flex justify-content-start py-3 toMoveAway font">
                <div>
                    <img src={addUser} className="" width={80} height={80} alt="" />
                </div>
                <div className="mt-4 px-4 ">
                    <h1 className="font">Gerenciamento de Usuários</h1>
                </div>
            </div>
            <div className="d-flex justify-content-start py-1 toMoveAway">
                <div className="">
                    <button className="rounded border-0 buttonAdd" onClick={handleAddButtonClick}>Adicionar</button>
                </div>
                <div className="px-3">
                    <button className="rounded border-0 buttonRemove">Remover</button>
                </div>


            </div>

            <div className="divTableStyle">
                <table className="table tableStyle">
                    <thead>
                        <tr className="text-center">
                            <th scope="col"><input type="checkbox" /></th>
                            <th scope="col">Nome</th>
                            <th scope="col">Cargo</th>
                            <th scope="col">Email</th>
                            <th scope="col">Status</th>
                            <th scope="col">Cursos</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {managers.map((manager, index) => (
                            <tr key={manager.key} className="text-center tableFontBody">
                                <td><input type="checkbox" /></td>
                                <td>{manager.name}</td>
                                <td>{renderRole(manager.role)}</td>
                                <td>{manager.email}</td>
                                <td>{renderActiveStatus(manager.active)}</td>
                                <td><button disabled className="border-0 button-edit">Editar</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="modal" role="dialog" onClick={handleCloseModal}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content mt-4 px-4" ref={modalRef} onClick={(e) => e.stopPropagation()}>
                            <div className="modal-header d-flex justify-content-between">
                                <div className="mt-3">
                                    <img src={addUser} className="" width={50} height={50} alt="" />
                                </div>
                                <div className="">
                                    <h5 className="modal-title">Cadastro de Usuário</h5>
                                </div>
                                <button type="button" className="buttonClose custom-close-button" onClick={handleCloseModal} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form className="" onSubmit={handleSubmit(createRegisterAdminTeacher)}>
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
                                                <label htmlFor="input3">Selecione um tipo</label>
                                                <select className="form-select"
                                                    id="selectRole"
                                                    {...register('selectRole')}
                                                >
                                                    <option value="">Selecione um Tipo</option>
                                                    <option value="TEACHERS">Professor</option>
                                                    <option value="COORDINATORS">Administrador</option>
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