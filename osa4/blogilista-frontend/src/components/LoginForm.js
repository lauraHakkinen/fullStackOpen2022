const LoginForm = ({ username, setUsername, password, setPassword, handleLogin }) => (
  <div className="login-form">
    <h2>Log in to the application</h2>
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button className="logout-button" type="submit">login</button>
    </form>
  </div>
)

export default LoginForm 