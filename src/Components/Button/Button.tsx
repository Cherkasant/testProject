import React, { FC, ReactElement } from 'react'

import styles from './Button.module.css'
import classNames from 'classnames'


export enum ButtonTypes {
  SaveButton = 'save',
  NextButton = 'next',
  DeleteButton = 'delete',
  AddButton = 'add'
}

type ButtonProps = {
  btnTitle?: string | ReactElement;
  btnType?: ButtonTypes;
  onClick?: () => void;
  btnClassName?: string;
  disabled?: boolean;
  children: React.ReactNode;
  clicked?: boolean;
};


const Button: FC<ButtonProps> = ({
                                   btnTitle, btnType, onClick, btnClassName, disabled,
                                   children, clicked,
                                 }) => {
  const buttonClassName = btnType && styles[btnType]
  return <div
    className={classNames(styles.button, buttonClassName, btnClassName, {
      [styles.disabled]: !!disabled,
    }, { [styles.clicked]: clicked })}
    onClick={onClick}>
    {children}
    {btnTitle}
  </div>
}


export default Button