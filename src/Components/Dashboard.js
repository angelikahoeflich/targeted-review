import {useState} from 'react';
import axios from 'axios';
import DashPun from './DashPun';

const Dashboard = (props) => {
  const [puns, setPuns] = useState([])

  useEffect(()=> {
     axios.get('/api/puns').then((res)=> {
        setPuns(res.data)
     })
  }, [])

  const editPun =  async (id, content) => {
    try{
      const res = await axios.put(`/api/pun/${id}`, {content})
      setPuns(res.data)
    }
    catch(err){
      console.log(err)
    }
  };

  const mappedPuns = puns.map((pun, index)=> {
      //each thing returned here goes onto the mapped puns array
      // this function will fire once per pun
    return <DashPun key={`${pun.pun_id} ${index}`} pun={pun} editPun={editPun}/>

  });

  console.log(mappedPuns)

  return (
    <div>
      <h1>dashboard</h1>
      <ul>{mappedPuns}</ul>
    </div>
  )
}

export default Dashboard
