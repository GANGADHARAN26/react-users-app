import { useEffect, useState } from "react";
import './App.css';
import { backendUrl } from "../config";

 
// eslint-disable-next-line react/prop-types
const UserDialog=({handleDialog,fetchUsers})=>{
   const [formData,setFormData] = useState({
    name:'',
    imageUrl:"",
    dob:'',
  });
  const handleInputChange=(event)=>{
    const {name,value}=event.target;
    setFormData({
      ...formData,
      [name]:value,
    });
  };
  const handleSubmit=async(event)=>{
    event.preventDefault();
    console.log(formData);
    await fetch(
      `${backendUrl}/users`,{
        method:"POST",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      }
    );
    await fetchUsers();
    handleDialog();
  }
  return(
   <div className="dialog">
    <div className="dialog-root">
        <div>
          <form onSubmit={handleSubmit}>
          <h2>Simple Form</h2>
            <div>
              <label
               htmlFor="name">
                Name : 
                </label>
              <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleInputChange} />
            </div>
            <div>
              <label
               htmlFor="imageUrl">
                Image url: 
                </label>
              <input 
              type="text" 
              name="imageUrl" 
              value={formData.imageUrl} 
              onChange={handleInputChange} />
            </div>
            <div>
              <label
               htmlFor="dob">
                Date of Birth: 
                </label>
              <input 
              type="date" 
              name="dob" 
              value={formData.dob} 
              onChange={handleInputChange} />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
      </div>
  )
}
function App() {
  const [showDialog,setShowDialog] = useState(false);
  const [users,setUsers]=useState([]);
  const handleDialog=()=>{
    if(showDialog){
      setShowDialog(false);
    }
    else{
      setShowDialog(true);
    }
  }
  const fetchUsers = async()=>{
    const response=await fetch(`${backendUrl}/users`)
    const data=await response.json();
    setUsers(data);
  }
  useEffect(()=>{
    fetchUsers();
  },[]);
  return (
    <>
     <div style={{display:'flex',fontSize:32}}>
      <div style={{flexGrow:1}}>
        List of users in the app
      </div>
      <button onClick={handleDialog}>add new user</button>
    
     </div>
     <div
     style={{
      display: "flex",
      flexWrap: "wrap",
     }}
     >
      {users.map((user)=>(
        <div
        key={user.id}
        style={{
          border: "1px solid black",
          margin:4,
          padding:4
        }}>
         <img src={user.imageUrl} alt={user.name}/ >
         <h3>{user.name}</h3>
         <h4>{user.dob}</h4>
        </div>
      ))}
     </div>
     {showDialog && <UserDialog handleDialog={handleDialog} fetchUsers={fetchUsers}/>}
    </>
  )
  }

export default App
