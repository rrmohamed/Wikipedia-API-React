import axios from 'axios';
import React, { useEffect, useState } from 'react'
import usePrevState from './hooks/usePrevState';

const App = () => {


  const [term , setTerm] = useState("react") ;
  const [result , setResult] = useState([]) ;
  let prevSTerm = usePrevState(term) ;

  


  // const [debounceSearch , setDebounceSearch] = useState(term) ;

//   useEffect(()=>{
//     let tiomeOut = setTimeout(()=>{
//       setDebounceSearch(term) ;
//     } , 1200) ;
//     return ()=>{
//       clearTimeout(tiomeOut) ;
//     }
//   },[term])
//   console.log("re-render") ;

// useEffect(()=>{
//       const search = async ()=>{
//         let {data} = await axios.get('https://en.wikipedia.org/w/api.php', {
//           params: {
//             action: 'query',
//             list:'search',
//             origin : '*',
//             format: 'json',
//             srsearch: debounceSearch,
//           }
//         }) ;
//         setResult(data.query.search) ;
//       }
//     search() ;
// },[debounceSearch])

  

 useEffect(()=>{


  //  start function to get the data from api
    const search = async ()=>{
      let {data} = await axios.get('https://en.wikipedia.org/w/api.php', {
        params: {
          action: 'query',
          list:'search',
          origin : '*',
          format: 'json',
          srsearch: term,
        }
      }) ;
      // put the data of api into the result state
      setResult(data.query.search) ;
    }
    // end function to get the data from api


    // apiطرق و احتمالات استدعاء دالة ال   
    if(!result.length){

      if(term){
        search();
      }

    }else if(prevSTerm !== term){

      let debounceSearch =  setTimeout(() => {
        if(term){
          search();
        }
      }, 1500);
  
      return ()=>{
        clearTimeout(debounceSearch);
      }

    }

  } , [term , result.length , prevSTerm]) ;





  let fetchResult = result.map((el)=>{
    return <>
      <tr key={el.pageid} >
          <th scope='row' >1</th>
          <td>{el.title}</td>
          <td> <span dangerouslySetInnerHTML={{"__html" : el.snippet}} /></td>
      </tr>
    </>
  })


  return <>
        <div className='container'>
      <div className='row'>
        <div className='col'>
          <div className='my-3'>
            <label htmlFor='exampleFormControlInput1' className='form-label'>
              Search Input
            </label>
            <input
              type='text'
              className='form-control'
              id='exampleFormControlInput1'
              onChange={(e)=>setTerm(e.target.value)}
              value={term}
            />

          </div>
        </div>
      </div>

      <div className='row'>
        <div className='col'>
          <table className='table'>
            <thead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Title</th>
                <th scope='col'>Desc</th>
              </tr>
            </thead>
            <tbody>    
             {fetchResult}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </>
}

export default App
