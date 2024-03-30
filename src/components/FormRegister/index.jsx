import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import './style.css'

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
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(createRegisterUserFormSchema)
  })

  function createRegisterUser(data){
    console.log(data)
  }

  return (
    <form className="mt-2" onSubmit={handleSubmit(createRegisterUser)}>
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
              <option value="Itabuna">Itabuna</option>
              <option value="Feira de Santana">Feira de Santana</option>
              <option value="Jequié">Jequié</option>
              <option value="Vitória da Conquista">Vitória da Conquista</option>
              <option value="Salvador">Salvador</option>
            </select>
            { errors.selectUnit && <span className="error-message">{ errors.selectUnit.message }</span>}
          </div>

        </div>
      </div>
      <button type="submit" className="btn btn-success">Cadastrar</button>
    </form>
  )
}