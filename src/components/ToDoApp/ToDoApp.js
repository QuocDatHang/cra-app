import React, { useEffect, useState } from 'react'

export default function ToDoApp() {
  const [task, setTask] = useState({
    id: 0,
    taskName: '',
    type: 'Important'
  });
  const [isEdit, setIsEdit] = useState(false)

  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    const response = await fetch("https://65829b9202f747c83679b1ac.mockapi.io/todoapp");
    const result = await response.json();
    setTaskList([...result])
  }

  const handleAddTask = (evt) => {
    evt.preventDefault();
    const addTask = async () => {
      const response = await fetch('https://65829b9202f747c83679b1ac.mockapi.io/todoapp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
      if (response.ok) {
        alert('Add successful!')
        setTask({ taskName: '', type: 'Important' })
      }
      else {
        alert('Add fail!')
      }
      fetchData();
    }
    addTask();
  }

  const handleInput = (e) => {
    if (e.target.name === 'taskName') {
      setTask({ ...task, taskName: e.target.value })
    }
    if (e.target.name === 'type') {
      setTask({ ...task, type: e.target.value })
    }
  }

  const handleEdit = (id) => {
    setIsEdit(true);
    getTaskById(id).then((data) => {
      setTask(data);
    })
  }

  const confirmEdit = () => {
    fetch(`https://65829b9202f747c83679b1ac.mockapi.io/todoapp/${task.id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task)
    })
      .then(res => {
        if (res.ok) {
          alert('Edit successful')
          setIsEdit(false);
          setTask({ taskName: '', type: 'Important' })

          fetchData();
        }
        else {
          alert('Edit fail!')
        }
      })
  }

  const getTaskById = async (id) => {
    const res = await fetch(`https://65829b9202f747c83679b1ac.mockapi.io/todoapp/${id}`)
    const task = await res.json();
    return task;
  }

  const handleDelete = (id) => {
    const confirm = window.confirm('Are you sure?')
    if (confirm) {
      fetch(`https://65829b9202f747c83679b1ac.mockapi.io/todoapp/${id}`, {
        method: 'DELETE'
      })
        .then((res) => {
          if (res.ok) {
            alert('Delete successful!')
            fetchData();
          }
          else {
            alert('Delete fail!')
          }
        })
    }
  }

  const handleCancel = () => {
    setIsEdit(false);
    setTask({ taskName: '', type: 'Important' })
  }

  return (
    <>
      <div className='container w-50 bg-success vh-100'>
        <form>
          <h3>To Do App</h3>
          <label>Task Name</label>
          <input type='text' name='taskName' value={task.taskName} className='form-control' onChange={handleInput} />
          <label>Type</label>
          <select className='form-select' value={task.type} name='type' onChange={handleInput}>
            <option>Important</option>
            <option>Normal</option>
          </select>
          {isEdit ? (<>
            <button type='button' className='btn btn-primary mt-3 me-2' onClick={confirmEdit}>Edit</button>
            <button type='button' className='btn btn-secondary mt-3' onClick={handleCancel}>Cancel</button>
          </>)
            : (<button className='btn btn-warning mt-3' onClick={handleAddTask}>Add</button>)}
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
                    <button className='btn bg-primary me-2' onClick={() => handleEdit(task.id)}>Edit</button>
                    <button className='btn bg-danger' onClick={() => handleDelete(task.id)}>Delete</button>
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
