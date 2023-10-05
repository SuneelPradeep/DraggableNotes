import React, { useRef } from 'react'
import './styles.css'

interface Props {
    notes : string;
    setNotes : React.Dispatch<React.SetStateAction<string>>,
    handleAdd : (e : React.FormEvent)=> void
}

// const Input : React.FC <Props> = ({notes, setNotes}) => {          // we can use like this too
const Input : React.FC <Props> = ({notes ,setNotes,handleAdd}) => {

  const inputref = useRef<HTMLInputElement> (null)

  return (
    <form className='input' onSubmit={(e)=> {handleAdd(e);inputref.current?.blur()}} >
        <input ref={inputref} type='text' value={notes} onChange={(e)=>setNotes(e.target.value)} placeholder='enter your note' className='input__box'  />
        <button type='button' className='input___button'onClick={(e)=> handleAdd(e)} >Go</button>
    </form>
  )
}

export default Input