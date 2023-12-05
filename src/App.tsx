import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MyButton from './components/Button'
import MyToast from './components/Toast'
import MyModal from './components/Modal'

function App() {
  const [count, setCount] = useState(0);
  const [showtoast, setShowtoast] = useState(false);
  const [toastmessage, setToastmessage] = useState('');
  const [showmodal, setShowmodal] = useState(false);
  const [modalmessage, setModalmessage] = useState('');
  const [id, setId] = useState(-1);  // element to delete
  const [employees, setEmployees] = useState([]);

  // Download employees
  useEffect(() => {
    fetch('http://localhost:8080/api/employees')
       .then((res) => res.json())
       .then((data) => {
          console.log(data);
          setEmployees(data);
       })
       .catch((err) => {
          console.log(err.message);
       });
 }, [employees]);  // run this function when component is loaded

  // Show toast
  useEffect(() => {
    if(toastmessage.length > 0)
      setShowtoast(true);
 }, [toastmessage]);  // run toast when toastmessage changes

 // Reset toast
 useEffect(() => {
  if(showtoast==false)
    setToastmessage('');  // reset toast message when toast disappear
}, [showtoast]);  



  return (
    <>
    <MyToast message={toastmessage} visible={showtoast} toggleClose={ () => { setShowtoast(false); setToastmessage(''); } } ></MyToast>
  
    {/* Create some comment:  */}
    {/*
    <button type="button" className="btn btn-primary">Primary</button>
    <button type="button" className="btn btn-secondary">Secondary</button>
    <button type="button" className="btn btn-success">Success</button>
    <button type="button" className="btn btn-danger">Danger</button>
    <button type="button" className="btn btn-warning">Warning</button>
    <button type="button" className="btn btn-info">Info</button>
    <button type="button" className="btn btn-light">Light</button>
    <button type="button" className="btn btn-dark">Dark</button>
  */}
  <table className="table table-striped table-hover">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Surname</th>
      <th scope="col">Date of birth</th>
      <th scope="col">Task</th>
      <th scope="col">Level</th>
      <th scope="col">Email</th>
      <th scope="col">Pay</th>
    </tr>
  </thead>
  <tbody>
    {employees.map(item => <tr>
      <td>{item.id}</td>
      <td>{item.firstName}</td>
      <td>{item.lastName}</td>
      <td>{item.dateOfBirth}</td>
      <td>{item.jobTitle}</td>
      <td>{item.level}</td>
      <td>{item.email}</td>
      <td>{item.pay}</td>
      <td><MyButton onClick={()=>{
        setId(item.id);
        //setId(100); // test error
        setModalmessage('Do you really want to delete item n. '+item.id+' ('+item.firstName+' '+item.lastName+')?');
        setShowmodal(true);
        }}>Delete</MyButton></td>
    </tr>)}
  </tbody>
  </table>

  <MyButton onClick={()=>setShowtoast(true)}>Show Toast</MyButton>
  <MyModal visible={showmodal} title={'Warning'} 
  message={modalmessage} 
  handleClose={() => setShowmodal(false)} 
  handleConfirm={() => {setShowmodal(false); 
    fetch('http://localhost:8080/api/employees/'+id, { method: 'DELETE' })
        .then((response) => {
          if(response.status == 200) {
            setToastmessage('Operation successful!');
            setEmployees([]);
          }
          else 
            setToastmessage('Error! Item not found!');
        
        })
        .catch(error => {
          setToastmessage('Error! Item not found!');
          console.error('There was an error!', error);
      });
    }}
  ></MyModal>

    </>
  )
}

export default App
