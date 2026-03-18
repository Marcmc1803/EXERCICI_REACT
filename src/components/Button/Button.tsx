import styles from './Button.module.css';

interface Props {
    children: string;
    color?: "primary" | "secondary" | "danger";
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    className?: string;
}

const Button = ({ children, onClick, color = "primary", type = "button", className }: Props) => {
    return (
        <button className={[styles.btn, styles['btn-' + color], className].join(' ')} onClick={onClick} type={type}>
            {children}
        </button>
    );
};

export default Button;