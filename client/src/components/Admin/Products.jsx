import React from 'react'
import s from '../../assets/styles/Products.module.css'
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'

const Products = () => {
    const columns = [
        {
            name: 'No',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'NOMBRE',
            selector: row => row.namecat,
            sortable: true,
        },
        {
            name: 'ACCIONES',
            selector: row => row.buttons,
            sortable: false,
        },
    ]
    return (
        <div className={s.Container}>
            <form className={s.Form}>
                <h2 className={s.Title}>Registro de Productos</h2>
                <div className={s.formGroup}>
                    <input id="name" name="name" type="text" placeholder="Ingrese el nombre"></input>
                </div>
                <div className={s.formGroup}>
                    <input id="price" name="price" type="text" placeholder="Ingrese el precio"></input>
                </div>
                <div className={s.formGroup}>
                    <input id="stock" name="stock" type="text" placeholder="Ingrese el Stock"></input>
                </div>
                <div className={s.formGroup}>

                </div>
                <div className={s.formGroup}>

                </div>
                <div className={s.formGroup}>
                    <button className={s.button}>Enviar</button>
                </div>
            </form>
            <DataTable
            columns={columns}
            /* data={tcategorys} */
        />
        </div>
    )
}

export default Products
