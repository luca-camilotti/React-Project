import React from "react";
import Button from 'react-bootstrap/Button';

interface Props {
    children: string;
    onClick: () => void
}
const MyButton = ({children, onClick}: Props) => {
    return (
        <Button onClick={onClick} variant="primary">
            {children}
        </Button>
    );
}

export default MyButton;