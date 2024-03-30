import bgEnadex from '../../assets/bg-enadex.png';
import CatImage from '../../assets/Cat.png'
import { FormRegister } from '../../components/FormRegister';
import { Link } from 'react-router-dom';
import './style.css'

export function Register(){
    return (
        <div
        style={{
          backgroundImage: `url(${bgEnadex})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100vw', // 100% da largura da tela
          height: '100vh', // 100% da altura da tela
        }}
      >
        <div className="d-flex flex-column align-items-center text-center">
            <img src={CatImage} className="img-fluid rounded-circle mt-3" style={{ height: '35vh' }} alt="Imagem de um gato" />
                <button type="button" className="btn btn-link btn-white mt-1">Take a photo</button>
                <FormRegister />
             <button type="button" className="btn btn-link btn-white "><Link className='btn-link' to="/login">Voltar</Link></button>
        </div>
      </div>

    )
}