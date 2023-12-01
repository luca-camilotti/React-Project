import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0);
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
 }, []);  // run this function when component is loaded

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
    </tr>)}
  </tbody>
  </table>



    </>
  )
}

export default App
