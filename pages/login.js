import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  const handleLogin = async (formData) => {
    // Implement your login logic here, e.g., make an API call
    console.log('Form data submitted:', formData);
  };

  return (
    <div>
      <h1>Login Page</h1>
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
};

export default LoginPage;