import styled from '@emotion/styled';

export const List = styled.ul`
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 420px;
    padding: 10px;
    background-color:  #dfeff5;
    border: 1px solid tomato;
    border-radius: 5px;
    list-style: none;
`;

export const Item = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 25px;
    background-color: #fff;
    border: 1px solid green;
    border-radius: 5px;
    padding: 8px;
    margin-bottom: 7px;

`;

export const Button = styled.button`
    padding: 3px 9px;
    background-color: #e8e8e8;
    color: #e88606;
    border-radius: 5px;
    border: 1px solid green;
    cursor: pointer;
`;

