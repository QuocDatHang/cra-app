import React, { useEffect, useState } from 'react'

export default function ToDoApp() {
  // const [task, setTask] = useState({});

  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    const response = await fetch("https://65829b9202f747c83679b1ac.mockapi.io/todoapp");
    const result = await response.json();
    setTaskList([...result])
  }

  const handleAddTask = (a) => {
    a.preventDefault();
    const addTask = async () => {
      let taskName = document.getElementById('taskName').value;
      let typeElement = document.getElementById('type');
      let type = typeElement.options[typeElement.selectedIndex].text;
      let task = { taskName, type }
      const response = await fetch('https://65829b9202f747c83679b1ac.mockapi.io/todoapp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
      if (response.ok) {
        alert('Add successful!')
      }
      else {
        alert('Add fail!')
      }
      fetchData();
    }
    addTask();
  }

  

  return (
    <>
      <div className='container w-50 bg-success vh-100'>
        <form>
          <h3>To Do App</h3>
          <label>Task Name</label>
          <input type='text' id='taskName' className='form-control' />
          <label>Type</label>
          <select className='form-select' id='type'>
            <option>Important</option>
            <option>Normal</option>
          </select>
          <button className='btn btn-warning mt-3' onClick={handleAddTask}>Add</button>
        </form>
        <table className='table bg-info mt-3'>
          <thead>
            <tr style={{ heigth: '40px' }}>
              <th>#</th>
              <th>Task Name</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              taskList.length > 0 && taskList.map(task => (
                <tr key={task.id}>
                  <td>{task.id}</td>
                  <td>{task.taskName}</td>
                  <td>{task.type}</td>
                  <td>
                    <button className='btn bg-primary me-2'>Edit</button>
                    <button className='btn bg-danger'>Delete</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  )
}
