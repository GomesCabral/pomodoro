import styles from './styles.module.css';

type DefaultInputProps = {
  //type: 'text' | 'number' | 'search'; //UNION TYPE
  id: string;
  labelText?: string; //OPCIONAL
} & React.ComponentProps<'input'>;

export function DefaultInput({
  type,
  id,
  labelText,
  ...rest
}: DefaultInputProps) {
  return (
    <>
      {labelText ? <label htmlFor={id}>{labelText}</label> : ''}
      {/* <label htmlFor={id}>{labelText}</label> */}
      <input className={styles.input} id={id} type={type} {...rest} />
    </>
  );
}
