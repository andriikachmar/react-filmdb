const Button = ({ onClick, innerText }) => (
    <button className='button' onClick={onClick}>
        {innerText}
    </button>
);

export default Button;
