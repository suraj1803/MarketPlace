import { Link } from "react-router";

const App = () => {
  return (
    <div className="underline text-teal-500 m-2">
      <p className="">
        <Link to="/">Home</Link>
      </p>
      <p className="">
        <Link to="/login">Login</Link>
      </p>
      <p className="">
        <Link to="/signup">Signup</Link>
      </p>
    </div>
  );
};

export default App;
