import './App.css';
import axios from 'axios';
import React, { useEffect , useState  } from 'react';



function App() {
  const url ='https://pbmfdg3t5i.execute-api.us-east-1.amazonaws.com/templates';
  const [templates, setTemplates] = useState();
  const  data = {
    "start": 1,
    "len": 3,
    "order":[
      [
         "template_type",
         "ASC"
      ]
   ],
   "groupId":1,
   "type":"EMAIL"     
    };

  const headers = { 
    headers: { 
      "Content-Type": "application/json" 
    } 
  }

  const fetchApi = async () => {

    // https://pbmfdg3t5i.execute-api.us-east-1.amazonaws.com/templates/1/EMAIL/1/3/template_type/ASC
    try {
      const pathParameters = `${data.start}/${data.len}/${data.order[0][0]}/${data.order[0][1]}` ;
      console.log(`*path parameters: ${pathParameters}`);
      const urlPath = `${url}/${data.groupId}/${data.type}/${pathParameters}`;
      console.log(`*URL + path parameters: ${urlPath}`);
      const resp = await axios.get(urlPath, headers);
      const responseJSON = resp.data;
      setTemplates(responseJSON);
      console.log(responseJSON.data);
      console.log(responseJSON.data.data);
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }


  }

  useEffect(() => {
    fetchApi();
  }, []);



  return (
    <div className="App">
      <header className="App-header">
        <ul>
          { !templates ? 'Cargando...' : `${console.log(templates)}`
          // templates.map((templates, index) => {
          //   return <li>{templates.template_id}</li>
          // })
          }
        </ul>
      </header>
    </div>
  );
}

export default App;
