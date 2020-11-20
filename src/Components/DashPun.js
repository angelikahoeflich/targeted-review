import {useState} from 'react';

const DashPun = (props) => {
  const [edit, setEdit] = useState(false);
  const [input, setInput] = useState(props.pun.content)

  console.log(props.pun)
  return (
  
    <l1> 
      {edit ? <input value={input} onChange={(e) => setInput(e.target.value)} style={{fontSize: "24px"}}/> : <h2>{props.pun.content}</h2> }
      <h3>{`rating: ${props.pun.rating}`/10}</h3>
      
      {edit ? (<div>
        <button
          onClick={() => {
            setInput(props.pun.content)
            setEdit(!edit)
          }}
          >Cancel</button>
        <button 
        onClick={() => {
          props.editPun(props.pin.pun_id, input),
          setEdit(!edit)
        }}>Save</button>
      </div> )
      :
      (
        <button onClick={() => {
          setEdit(!edit)
        }}>Edit</button>
      )
    }

    </l1>
    )
}

export default DashPun