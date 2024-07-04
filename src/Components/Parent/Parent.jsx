import React, { useState } from 'react';
import styles from './Parent.module.css' ;
import Model from '../Model/Model';

const Parent = () => {
    const [showModel, setshowModel] = useState(false) ;



  return<>
  <Model show={showModel} closeModel={()=>setshowModel(false)}/>
  <div className={`${styles.content}`}>
    <button className={`btn btn-danger`} onClick={()=>setshowModel(true)} >show model</button>

  </div>
  </>
}

export default Parent