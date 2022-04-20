import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const register = () => {
        const [name, setName]=useState("shakil");
        const [email, setEmail]=useState("chumkysk@gmail.com");
        const [password, setPassword]=useState("123435667");
        const [condition, setCondition]=useState("ok");

 const handleSubmit = async(e)=>{
   e.preventDefault();
   try{
    const {data} =await axios.post(`/api/register`, {name, email, password, condition});
    toast.success("Registration success, please login");
    setName("");
    setEmail("");
    setPassword("");
    setCondition("");

   }catch(err){
       toast.error(err.response.data);
   }

 
 }
return (
      <>
      
     <h1 className="mt-4 p-5 bg-light text-dark rounded text-center">Sign Up and Start Learning! </h1>
            <div className="container ">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                            <div className="padTop">
                                <form  onSubmit={handleSubmit}>
                                    <div className="mb-3 mt-3">
                                        <input type="name" className="form-control" value={name}  onChange={(e) => setName(e.target.value)} placeholder="Enter Your Name" name="name"/ >
                                    </div>
                                    <div className="mb-3 mt-3">
                                        <input type="email" className="form-control" value={email}  onChange={(e) => setEmail(e.target.value)} placeholder="Enter Your email" name="email"/>
                                    </div>
                                    <div className="mb-3">
                                        <input type="password" className="form-control" value={password}  onChange={(e) => setPassword(e.target.value)} placeholder="Enter Your  password" name="password"/>
                                    </div>
                                    <div className="form-check mb-3">
                                        <label className="form-check-label">
                                            <input className="form-check-input" type="checkbox" value={condition} onChange={(e) => setCondition(e.target.value)} name="remember"/> Yes! I want to get the most out of Udemy by receiving emails with exclusive deals, personal recommendations and learning tips! 
                                        </label>
                                    </div>
                                    <button type="submit"
                                    className="btn btn-primary"
                                        disabled={!name ||!email||!password||!condition}
                                    >
                                        Submit</button>
                                </form>
                            </div>
                    </div>
                </div>
            </div>
    </>
  )
}

export default register;






































































































{/* import React, { useState } from 'react';

const register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] =useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit=async(e)=>{
        e.preventDefault();
        console.table({name, email, password, remember})
    }
  return (
      <>
      <h1 className="mt-4 p-5 bg-light text-dark rounded text-center">Sign Up and Start Learning! </h1>
            <div className="container ">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                            <div className="padTop">
                                <form  onSubmit={handleSubmit}>
                                    <div className="mb-3 mt-3">
                                        <input type="name" className="form-control" id="name"  onChange={(e) => setName(e.target.value)} placeholder="Enter Your Name" name="name"/ >
                                    </div>
                                    <div className="mb-3 mt-3">
                                        <input type="email" className="form-control" id="email"  onChange={(e) => setEmail(e.target.value)} placeholder="Enter Your email" name="email"/>
                                    </div>
                                    <div className="mb-3">
                                        <input type="password" className="form-control" id="pwd"  onChange={(e) => setPassword(e.target.value)} placeholder="Enter Your  password" name="password"/>
                                    </div>
                                    <div className="form-check mb-3">
                                        <label className="form-check-label">
                                            <input className="form-check-input" type="checkbox" onChange={(e) => setRemember(e.target.value)} name="remember"/> Yes! I want to get the most out of Udemy by receiving emails with exclusive deals, personal recommendations and learning tips! 
                                        </label>
                                    </div>
                                    <button type="submit"
                                    className="btn btn-primary"
                                    disabled={!name ||! email||!password||!remember}
                                    >
                                        Submit</button>
                                </form>
                            </div>
                    </div>
                </div>
            </div>
    </>
  )
}

export default register */}