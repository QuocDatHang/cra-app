import logo from './logo.svg';
import './App.css';
import Card from './components/Card/Card';

const profiles = [
  {
    name: 'Ronaldo',
    age: 38,
    gender: 'Female',
    email: 'cr7@gmail.com',
    avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Cristiano_Ronaldo%2C_2010.jpg/170px-Cristiano_Ronaldo%2C_2010.jpg",
    mobile: '0944111222'
  },
  {
    name: 'Messi',
    age: 35,
    gender: 'Male',
    email: 'm10@gmail.com',
    avatar: "https://images2.thanhnien.vn/528068263637045248/2023/10/30/messi-1-16986835956171266032258.jpeg",
    mobile: '01233321231'
  },
  {
    name: 'Kaka',
    age: 44,
    gender: 'Male',
    email: 'kk@gmail.com',
    avatar: "https://baothainguyen.vn/file/oldimage/baothainguyen/UserFiles/images/news/5.5.2008_4h20_Kaka%205-5-08.jpg",
    mobile: '12222233333'
  }
]

function App() {
  return (
    <div className="container text-black bg-success vh-100">
      <h2>Hello world!</h2>
      {
        profiles.map(profile => (
          <Card item={profile}/>
        ))
      }
    </div>
  );
}

export default App;
