const Button = ({ color, text }) => {
    const submit = () =>{
        console.log("Clicked");
    }
  return (
    <button onClick={submit} style={{ backgroundColor: color }} className="btn">
      {text}
    </button>
  );
};

export default Button;
