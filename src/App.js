import logo from './logo.svg';
import './App.css';

const profile = {
  name: 'Ronaldo',
  age: 38,
  gender: 'Female',
  email: 'cr7@gmail.com',
  avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Cristiano_Ronaldo%2C_2010.jpg/170px-Cristiano_Ronaldo%2C_2010.jpg",
  mobile: '0944111222'
}

function App() {
  return (
    <div className="container text-black bg-success vh-100">
      <h2>Hello world!</h2>
      <div className="card mb-3" style={{ maxWidth: '540px' }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img src={profile.avatar} className="img-fluid rounded-start" alt="..." />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{profile.name}</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Age: <span className='fw-bolder'>{profile.age}</span></li>
                <li className="list-group-item">Gender: <span className='fw-bolder'>{profile.gender}</span></li>
                <li className="list-group-item">Email: <span className='fw-bolder'>{profile.email}</span></li>
                <li className="list-group-item">Mobile: <span className='fw-bolder'>{profile.mobile}</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
