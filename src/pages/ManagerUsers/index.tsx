import React from "react";
import './style.css'
import addUser from '../../assets/add-user.png'
import NavBar  from "../../components/NavBar/NavBar";

export function ManagerUsers() {
    return (
        <div className="bg">
            <NavBar />
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
                    <button className="rounded border-0 button-add">Adicionar</button>
                </div>
                <div className="px-3">
                    <button className="rounded border-0 button-remove">Remover</button>
                </div>
            </div>
        </div>
    )
}