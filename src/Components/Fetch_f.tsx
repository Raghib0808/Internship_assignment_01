import React, { useState, useEffect } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Checkbox } from 'primereact/checkbox';
import { classNames } from "primereact/utils";
import { InputSwitch, InputSwitchChangeEvent } from 'primereact/inputswitch';
import 'primereact/resources/themes/saga-blue/theme.css';   
import 'primereact/resources/primereact.min.css';          
import 'primeicons/primeicons.css';                     



        



const Fetch_f: React.FC = () => {
  interface Item {
    id: number;
    title: string;
    place_of_origin: string;
    artist_display: string;
    date_start: number;
    date_end: number;
  }

  interface SelectionEvent {
    value: Item[];
  }
  

  
 
  const [data, setData] = useState<Item[]>([]);
  const [index,setindex]=useState<number>(1);
  const [stored,setStored]=useState<Item[]|null>(null);
  const [rowclick,setRowClick]=useState<boolean>(true);
  console.log(rowclick);
  

  const inc=()=>{
      setindex(index+1);
  }
  const dec=()=>{
      setindex(index-1);
  }
  // Function to fetch data from the API
  const retrieve = async () => {
    try {
      const response = await fetch(`https://api.artic.edu/api/v1/artworks?page=${index}`);
      const result = await response.json();
      console.log(result);
      
      const items = result.data.map((item: any) => ({
        id:item.artist_id,
        title:item.title,        
        place_of_origin:item.place_of_origin,
        artist_display:item.artist_display,
        date_start:item.date_start,
        date_end:item.date_end,

      }));
      console.log(items);
      setData(items);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  console.log(stored);
  
  useEffect(() => {
    retrieve();
  }, [index]);

  return (
    <div>
   <div className="flex justify-content-center align-items-center mb-4 gap-2">
                <InputSwitch inputId="input-rowclick" checked={rowclick} onChange={(e: InputSwitchChangeEvent) => setRowClick(e.value!)} />
                <label htmlFor="input-rowclick">Row Click</label>
            </div>


    <DataTable value={data} showGridlines tableStyle={{ minWidth: '50rem' }}  selectionMode={rowclick ? undefined : 'multiple'} selection={stored!}
                        onSelectionChange={(e) => setStored(e.value)} dataKey="id">

    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
    <Column field="title" header="Title"></Column>
    <Column field="place_of_origin" header="Origin"></Column>
    <Column field="artist_display" header="Artist"></Column>
    <Column field="date_start" header="Start"></Column>
    <Column field="date_end" header="End"></Column>
    </DataTable>
    
            <button onClick={inc}>Increase</button>
            <button onClick={dec}>decrease</button>
    </div>
    
  );
};

export default Fetch_f;
