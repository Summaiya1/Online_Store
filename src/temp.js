

// const [toDoList, setToDoList] = useState([]);
//   const [item, setItem] = useState('');
//   const [isEdit, setIsEdit] = useState(false);
//   const [index, setIndex] =useState('');
//   const [editItem, setEditItem] =useState('');
  

//   const addItem = () =>{
//     const tempList =[...toDoList];
//     tempList.push(item);
//     setToDoList(tempList);
//   }

//   const deleteItem = (index) =>{
//     const tempList = [...toDoList];
//     tempList.splice(index, 1);
//     setToDoList(tempList);
//   }

//   const enableEditing = (item,index) =>{
//    setIsEdit(!isEdit);
//    setIndex(index);
//    setEditItem(item);
//   }

//   const editing =() =>{
//     const tempList =[...toDoList];
//     tempList[index] = editItem;
//     setToDoList(tempList);
//     setIsEdit(!isEdit);
//   }


// <img className="img" src={img}/>
//    <div className="main">
//       {isEdit?
//         <div className="input">
//           <input value={editItem} onChange={e => setEditItem(e.target.value)}/>
//           <button onClick={editing} className="blue">save</button>
//         </div>
//       : <div className="input">
//           <input placeholder="enter item" onChange={e => setItem(e.target.value)}/>
//           <button onClick={addItem} className="blue">Add Item</button>
//         </div>
//       }
  

//    <ul>
//    {
//      toDoList.map((item,index) => {
//       return <li className="listItem">
//        {item}
//        <button onClick={() => deleteItem(index)} className="pink">Delete</button>
//        <button onClick={() => enableEditing(item,index)} className="pink">Edit</button>
//        </li>
//      })
//    }
// </ul>
// </div>

