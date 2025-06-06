import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowLeft } from 'lucide-react';
import  {apiUrl} from '../utils/constants'

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    lastname: '',
    firstname: ''
  });
  const [errorSuccessMsg, setErrorSuccessMsg] = useState('')
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form validation
    if (!formData.email || !formData.password || (!isLogin && !formData.lastname) || (!isLogin && !formData.firstname)) {
      alert('Please fill in all fields');
      return; 
    }
    // TODO: Implement authentication logic
    console.log('Form submitted:', formData);
    if (!isLogin) {
      signupAuth()
    }else {
      loginAuth()
    }
  };
  //Signup auth
  const signupAuth = async ()=>{
    console.log(apiUrl)
    try {
      const response = await fetch(`${apiUrl}auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
        console.log('registration succussfull:', data)
      
        //only proceed if registration is successfull
        setTimeout(() => {
          setIsLogin(true)
        }, 2000);
    } catch (error) {
      console.log('server error',error)
    }
  }
  //login auth
  const loginAuth = async ()=>{
    try {
      const response = await fetch(`${apiUrl}auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email:formData.email,
          password:formData.password
        }),
      })
      // if (!response.ok){
      //   throw new Error(`HttP error! status: ${response.status}`)
      // }

      const data = await response.json()
      console.log('Login succussfull:', data)
      localStorage.setItem('userData', JSON.stringify(data))
      
        //only proceed if registration is successfull
        setTimeout(() => {
          navigate('/search')
        }, 300);
    } catch (error) {
      console.error('Login error:', error)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-center justify-center px-4 page-transition">
      <button 
        onClick={() => navigate('/home')}
        className="absolute top-6 left-6 text-green-700 hover:text-green-800 flex items-center gap-2 transition-colors"
      >
        <ArrowLeft size={20} />
        Back to Home
      </button>

      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-green-800 mb-2">
            {isLogin ? 'Welcome Back!' : 'Join GoodBites'}
          </h2>
          <p className="text-gray-600">
            {isLogin 
              ? 'Make healthier choices with GoodBites' 
              : 'Start your journey to healthier eating'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                name="lastname"
                placeholder="Lastname"
                value={formData.lastname}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                name="firstname"
                placeholder="firstname"
                value={formData.firstname}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>
            </>
          )}

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            />
          </div>

          {isLogin && (
            <div className="text-right">
              <button type="button" className="text-green-600 hover:text-green-700 text-sm">
                Forgot Password?
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 font-semibold"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-green-600 hover:text-green-700 font-semibold"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
        <span>{errorSuccessMsg}</span>
      </div>
    </div>
  );
}

export default AuthPage;