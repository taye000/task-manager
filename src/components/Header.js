import Button from "./Button";

const Header = ({ title }) => {
  return (
    <header className="header">
      <h1>{title}</h1>
      <Button color="black" text="Add" />
    </header>
  );
};
Header.defaultProps = {
  title: "Task Manager",
};

export default Header;
