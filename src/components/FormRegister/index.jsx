import { set, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import './style.css'
import { studentRegister } from '../../config/config'
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const createRegisterUserFormSchema = z.object({
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
    registrationNumber: z
    .string()
    .nonempty('Número de matrícula é obrigatório'),
    course: z
    .string()
    .nonempty('Curso é obrigatório'),
    currentSemester: z
    .string()
    .nonempty('Semestre atual é obrigatório'),
    selectUnit: z
    .string()
    .nonempty('Selecione unidade é obrigatório'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas precisam ser iguais",
  path: ["confirmPassword"]
})


export function FormRegister() {
  const MySwal = withReactContent(Swal);

  const [error, setError] = useState([])

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(createRegisterUserFormSchema)
  })

  async function createRegisterUser(data){
    const student = {
      name: data.nameComplet,
      email: data.email,
      registration: data.registrationNumber,
      password: data.password,
     // course: data.course,
      semester: data.currentSemester,
      unity: data.selectUnit
    };
    console.log(student);
    const result = await studentRegister(student);
    if (result.status === 201) {
      MySwal.fire({
        title: 'Cadastrado com sucesso',
        text: 'Verifique sua confirmação via email',
        icon: 'success',
        timerProgressBar: true,
        willClose: () => {
          window.location.href = '/login';
        }
      })
    }else {
      setError(result.error.message)
      setTimeout(() => {
        setError([]);
      }, 3500);
    }
  }

  return (
    <form className="mt-2" onSubmit={handleSubmit(createRegisterUser)}>
      {error && error.map((err) => <h3 key={err} className="error-message mt-3 mb-3">{err}</h3>)}
      <div className="row">
        <div className="col-md-6 d-flex flex-column">
          <div className="form-group mb-3 mx-auto">
            <input type="text" 
            className="form-control form-control-lg custom-width largure-input text-center" 
            placeholder="Nome Completo" 
            {...register('nameComplet')}
            />
            { errors.nameComplet && <span className="error-message">{ errors.nameComplet.message }</span>}
          </div>

          <div className="form-group mb-3 mx-auto">
            <input type="text" 
            className="form-control form-control-lg custom-width largure-input text-center" 
            id="registrationNumber" 
            placeholder="Número de matrícula" 
            {...register('registrationNumber')}
            />
            { errors.registrationNumber && <span className="error-message">{ errors.registrationNumber.message }</span>}
          </div>

          <div className="form-group mb-3 mx-auto">
            <input type="password" 
            className="form-control form-control-lg custom-width largure-input text-center" 
            id="password" 
            {...register('password')}
            placeholder="Senha" />
            { errors.password && <span className="error-message">{ errors.password.message }</span>}
          </div>

          <div className="form-group mb-3 mx-auto">
            <input type="password" 
            className="form-contr
            ol form-control-lg custom-width largure-input text-center" 
            id="confirmPassword" 
            placeholder="Confirmar senha" 
            {...register('confirmPassword')}
            />
            <div>
              { errors.confirmPassword && <span className="error-message">{ errors.confirmPassword.message }</span>}
            </div>
          </div>
        </div>

        <div className="col-md-6 d-flex flex-column">
          <div className="form-group mb-3 mx-auto">
            <input 
            type="email" 
            className="form-control form-control-lg custom-width largure-input text-center" 
            id="email"  
            placeholder="E-mail" 
            {...register('email')}
            />
            { errors.email && <span className="error-message">{ errors.email.message }</span>}
          </div>

          <div className="form-group mb-3 mx-auto">
            <input type="text" 
            className="form-control form-control-lg custom-width largure-input text-center" 
            id="course" 
            placeholder="Curso" 
            {...register('course')}
            />
            { errors.course && <span className="error-message">{ errors.course.message }</span>}
          </div>

          <div className="form-group mb-3 mx-auto">
            <input type="text" 
            className="form-control form-control-lg custom-width largure-input text-center" 
            id="currentSemester" 
            placeholder="Semestre atual" 
            {...register('currentSemester')}
            />
            { errors.currentSemester && <span className="error-message">{ errors.currentSemester.message }</span>}
          </div>

          <div className="form-group mb-3 mx-auto">
            <select className="form-control form-control-lg largure-input text-center" 
             id="selectUnit"
              placeholder="Selecione sua unidade"
              {...register('selectUnit')}
              >
              <option value="">Selecione sua unidade</option>
              <option value="ITABUNA">Itabuna</option>
              <option value="FEIRA_DE_SANTANA">Feira de Santana</option>
              <option value="JEQUIE">Jequié</option>
              <option value="VITORIA_DA_CONQUISTA">Vitória da Conquista</option>
              <option value="SALVADOR">Salvador</option>
            </select>
            { errors.selectUnit && <span className="error-message">{ errors.selectUnit.message }</span>}
          </div>

        </div>
      </div>
      <button type="submit" className="btn btn-success">Cadastrar</button>
    </form>
  )
}