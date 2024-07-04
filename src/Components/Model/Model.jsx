import React, { Fragment } from 'react';
import styles from './Model.module.css' ;
import ReactDOM  from 'react-dom';
// import Controller from '../Layout/Form';
import Form from './../Layout/Form';

const Model = ( {show , closeModel}) => {

    const BackDrop = ( {show , close} )=>{
        return <>
            <div className={`${styles.BackDrop} ${show?styles.showBackDrop:null} `} onClick={close} ></div>
        </>
    }

    const Overlay = ( {show} )=>{
        return <>
          <div className={`${styles.Overlay} ${show?styles.showOverlay:null} `}>
            <Form>
                <Form.Controller>
                    <label htmlFor="name">name</label>
                    <input type="text" id='name' className={`form-control w-75`} />
                </Form.Controller>
            </Form>
          </div>
        </>
    }



  return <>

    <Fragment>

       {ReactDOM.createPortal( 
        <Fragment>
             <BackDrop show = {show} close={closeModel}/>
             <Overlay show = {show} />
        </Fragment>
        ,document.getElementById("model") )}
        
    </Fragment>


  </>
}

export default Model