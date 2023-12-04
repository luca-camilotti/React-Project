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
  const [showmodal, setShowmodal] = useState(false);
  const [modalmessage, setModalmessage] = useState('');
  const [id, setId] = useState(-1);  // element to delete
  const [employees, setEmployees] = useState([]);

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
 }, [count]);  // run this function when component is loaded


  return (
    <>
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
        setModalmessage('Do you really want to delete item n. '+item.id+' ('+item.firstName+' '+item.lastName+')?');
        setId(item.id);
        setShowmodal(true);}}>Delete</MyButton></td>
    </tr>)}
  </tbody>
  </table>

  <MyButton onClick={()=>setShowtoast(true)}>Show Toast</MyButton>
  <MyToast visible={showtoast} toggleClose={ () => setShowtoast(false) } ></MyToast>
  <MyModal visible={showmodal} title={'Warning'} 
  message={modalmessage} 
  handleClose={() => setShowmodal(false)} 
  handleConfirm={() => {setShowmodal(false); 
    fetch('http://localhost:8080/api/employees/'+id, { method: 'DELETE' })
        .then(() => {setCount(count+1); setShowtoast(true);});
    }}
  ></MyModal>

    </>
  )
}

export default App
