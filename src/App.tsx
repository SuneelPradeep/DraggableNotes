import React,{useState } from 'react'
import './App.css'
import Input from './components/Input'
import { Todo } from './components/Model'
import TodoList from './components/TodoList'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'

const  App : React.FC =() => {
 // App is functional component we have React.ReactNode too but we define App type as React.FC means functional component
   // other types we have are string, number, undefined, null,boolean, object, tuple[23,'abc'] ,array, 
// let name : string = 'Raju';     // if we use string the type should be string we have 
// let age :number = 23;  
// let ooh : any = ['orei',5,true, {vadhu : 'ela'}]  // if we use any it will allow to define the variable any
     
// let isFine : boolean = true;
// let numarr : number[] = [0,20,3]
// let tupless : [number,string] = [5,'elaunaru']     
// let objjj : object = {entadi : 'super'}        //but shouldnt recomment using like this  
// //so we use Type keyword or interface

//  type Person = {
//   name : string,
//   age : number
//  }
// let person : Person= { name :'Ravi', age : 20}   //uses the above type or interface 
// let lotsofPeople : Person[] ;
// let twovalue : string | number ;    // this | is called union and helps in giving two types to the variable
// twovalue = 'Hey there';
// twovalue = 45  
// function add(a : number,b : number){                     // it says a b has any type so we need to change
//   return a+b
// }
// let mult : Function ;         // but not recommended
// let printName : (name : string) => void;          //it means it returns void(undefined), we change it to number or string or boolean 
// let printNames : (name : string) => never;           //it wont return anything
// let oolala : unknown ;             // unknown is like any but we dont use any anymore as any is like JS

//  // ALIAS has 2 types type or interface so 

//  type X ={
//    a : string,
//    b : number
//  }
//  type Y = X & {             //this & means Y contains X too so if we dont give a b values while defining y it gives errors
//   c : string,
//   d : number
//  }
//  interface Super {          //so these doesnt have = sign and we have to use 
//    a : string,
//    b: number
//  }
 
//  interface Duper extends Super {   // and we have to use extends for joining any interface or type to this
//    c : string,
//    d : number
//  }

//  type Z = Duper & {           // type can use interface using & and interface can use type as interface SCD extends Z {}
//     e : boolean,
//     f : number[]
//  }
const [notes,setNotes] = useState <string> ("")  
const [allnotes, setAllnotes] = useState <Todo[]>([])      // we used interface Todo from where we defined and using [] as the result will be in this type
     // this is how we set the type to useState we can use string | number or string[]
const [completednotes,setcompletednotes] = useState<Todo[]>([])
     console.log('notes is ',notes,allnotes);  

const handleAdd = (e : React.FormEvent) => {
  e.preventDefault();
  if(notes){
    setAllnotes([...allnotes, {id : Date.now(), todo : notes,isDone : false}])
    setNotes('')
  }
}
     // const handleNotes : (v : string) => string ={
//     setNotes(v : string)
// }
const onDragEnd = (result : DropResult)=>{
  const {source, destination} = result;
// console.log('result is',result);
if(!destination) return;
if(source.droppableId === destination.droppableId && destination.index === source.index) return ;
let add :Todo;
let active = allnotes;
let complete = completednotes
// let active = allnotes.filter((item)=> !item.isDone) ;
// let complete = allnotes.filter((item)=> item.isDone); 
// console.log('add start of func', active,complete);
if(source.droppableId==='ActiveNotes'){
  console.log('entered1');
  add = active[source.index]
  active.splice(source.index,1);
  //active.filter((item)=> item.id !==add.id)
  //active.map((item)=> item.id === add.id ? {...item, isDone :!item.isDone} : item )
  
}
else{
  console.log('entered2');
  add = complete[source.index];
  complete.splice(source.index,1)
 // complete.filter((item)=> item.id !==add.id)
  //complete.map((item)=> item.id === add.id ? {...item, isDone :!item.isDone} : item )
  
  
}
 if(destination.droppableId==='ActiveNotes'){
    active.splice(destination.index,0,add)
  }
  else{
    complete.splice(destination.index,0,add)
  }
  setAllnotes(active)
  setcompletednotes(complete)
    // console.log('entered3');
    // if(complete && complete?.length > 0){
    //   complete.map((item)=> item.id === add.id ? {...item, isDone :!item.isDone} : item )
    //   active.filter((item)=> item.id !== add.id)
    // }
    // else {
    //   complete = [{...add, isDone : !add.isDone}]
    // } 
    // active.splice(destination.index,0,add)
  // }
  // else{
  //   console.log('entered4');
  //   if(active && active?.length >0){
  //     active.map((item)=> item.id === add.id ? {...item, isDone :!item.isDone} : item )
  //     complete.filter((item)=> item.id !== add.id)
  //   }
  //   else{
  //     active =  [{...add, isDone : !add.isDone}]
  //   }
    
    //complete.splice(destination.index,0,add)
  // }
  // setAllnotes([...active,...complete]);
 
  // console.log('active complete are',add,active,complete);
}

return (     
  <DragDropContext onDragEnd={onDragEnd}>
    <div className='App'>
    <span className="heading"> Notes
    </span> 
    <Input notes={notes} setNotes={setNotes} handleAdd={handleAdd} />
    <TodoList allnotes={allnotes} setAllnotes={setAllnotes} completednotes={completednotes} setcompletednotes={setcompletednotes} />
     {/* {name} {age} {isFine} {tupless}{numarr}  */}
     
      {/* {person.name} {person.age} {twovalue} {add(2,3)} */}
    </div>
    </DragDropContext> 
  )
}

export default App
