import React from 'react'
import './styles.css'
import { Todo } from './Model'
import Singlenote from './Singlenote'
import { Droppable } from 'react-beautiful-dnd'

interface Props {
    allnotes : Todo[]
    setAllnotes :  React.Dispatch<React.SetStateAction<Todo[]>>
    completednotes : Todo[]
    setcompletednotes :  React.Dispatch<React.SetStateAction<Todo[]>>

}

const TodoList : React.FC<Props> = ({allnotes,setAllnotes,setcompletednotes,completednotes}) => {
  return (
    <div className="container">
      <Droppable droppableId='ActiveNotes'>
        {
          (provided,snapshot)=> (
      <div className={`todos1 ${snapshot.isDraggingOver ? 'dragactive' : ''}`} ref={provided.innerRef} {...provided.droppableProps}>
        <span className='todos__heading'> Active Notes</span>
      {allnotes.map((item,index)=>(
          <>
          <Singlenote item={item} index={index} key={item.id} allnotes={allnotes} setAllnotes={setAllnotes} />
       </>
        ))}
     {provided.placeholder}
      </div>
          )
        }
      
      </Droppable>
      <Droppable droppableId='CompletedNotes'>
        {
          (provided,snapshot)=>(
            <div className={`todos2 ${snapshot.isDraggingOver ? 'dragremove' : ''}`} ref={provided.innerRef} {...provided.droppableProps}>
            <span className='todos__heading'> Completed Notes</span>
          {completednotes.map((item,index)=>(
              <>
              <Singlenote item={item} key={item.id} index={index} allnotes={completednotes} setAllnotes={setcompletednotes} />
                </> 
            ))}
               {provided.placeholder}
          </div>
          )
        }
     
      </Droppable>
    </div>

  )
}

export default TodoList



{/* <div className='todos'>
        {allnotes.map(item=>(
          <>
          <Singlenote item={item} key={item.id} allnotes={allnotes} setAllnotes={setAllnotes} />
          </>
        ))}
    </div> */}
