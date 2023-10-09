import { Btn } from "./Button.styled";

export const Button = ({ onClick, isLoading }) => {
    return (
        <Btn type="button" onClick={onClick}>
          {isLoading ? 'Loading...' : 'Load more'}
        </Btn>
    );
}