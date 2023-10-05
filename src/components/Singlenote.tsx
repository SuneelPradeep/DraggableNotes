import React ,{useEffect, useRef, useState} from 'react'
import './styles.css'
import { Todo } from './Model'
import {AiFillEdit,AiFillDelete } from 'react-icons/ai'
import {MdDone } from  'react-icons/md'
import { Draggable } from 'react-beautiful-dnd'



type Items ={
    index : number,
    item : Todo,
    allnotes : Todo[],
    setAllnotes : React.Dispatch<React.SetStateAction<Todo[]>>
}


const Singlenote :React.FC<Items> = ({index,item,allnotes,setAllnotes}) => {
const handleDone = (id : number)=>{
    setAllnotes(allnotes.map((item)=> item.id===id ? {...item, isDone : !item.isDone} : item))
}
const [edit,setEdit] = useState<boolean>(false)
const [editnote,setEditnote] = useState<string>('')

const handleDelete = (id :number) =>{
    setAllnotes(allnotes.filter((item)=> item.id !==id))
}
const handleEditnotes = (e : React.FormEvent, id : number)=>{
    e.preventDefault();
  setAllnotes(allnotes.map((item)=> item.id ===id ? {...item, todo : editnote} : item))
    setEdit(false);
}

const inputRef = useRef<HTMLInputElement>(null)

useEffect(()=>{
   inputRef.current?.focus()
},[edit])

  return (
    <Draggable draggableId={item.id?.toString()} index={index}>
        {(provided,snapshot)=>(
                <form key={index} ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps} className={`single__note1 ${snapshot.isDragging ? 'drag' : ''}`} onSubmit={(e)=> handleEditnotes(e,item.id)}>
                {edit && !item.isDone ? (
                    <input ref={inputRef} className='edit__note' value={editnote} placeholder={'Edit Note'} onChange={(e)=>setEditnote(e.target.value)} />
                ) : (
                    item.isDone ?(
                        <s className="single__note--text">{item.todo}</s>
                             
                              ): (
                                  <span className="single__note--text">{item.todo}</span>
                             
                              )
                )} 
                
               <div>
                    <span className="icon"><AiFillEdit onClick={()=>setEdit(!edit)} /> </span>
                    <span className="icon"><AiFillDelete onClick={()=> handleDelete(item.id) } /> </span>
                    <span className="icon"><MdDone onClick={()=>handleDone(item.id)} /> </span>
                
                </div>
        
            </form>
            )}
   
    </Draggable>
  )
}

export default Singlenote