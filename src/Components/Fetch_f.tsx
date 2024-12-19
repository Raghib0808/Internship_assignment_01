import React, { useState, useEffect } from "react";
import { DataTable, DataTableStateEvent, DataTableValue } from 'primereact/datatable';
import type { DataTableSelectionMultipleChangeEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputSwitch, InputSwitchChangeEvent } from 'primereact/inputswitch';
import 'primereact/resources/themes/saga-blue/theme.css';   
import 'primereact/resources/primereact.min.css';          
import 'primeicons/primeicons.css';                  

interface Item extends DataTableValue {
  id: number;
  title: string;
  place_of_origin: string;
  artist_display: string;
  date_start: number;
  date_end: number;
}

const Fetch_f: React.FC = () => {

   const [data, setData] = useState<Item[]>([]);
   const [index, setindex] = useState<number>(1);
   const [stored, setStored] = useState<Item[]>([]);
   const [rowclick, setRowClick] = useState<boolean>(true);
  

  // getting the data from the api using fetch;
   const retrieve = async () => {
    try {
      const response = await fetch(`https://api.artic.edu/api/v1/artworks?page=${index}`);
      const result = await response.json();
      
      const seenIds = new Set<number>();
    const items = result.data
      .filter((item: any) => item.artist_id && typeof item.artist_id === 'number') 
      .map((item: any) => ({
        id: item.artist_id,
        title: item.title,
        place_of_origin: item.place_of_origin,
        artist_display: item.artist_display,
        date_start: item.date_start,
        date_end: item.date_end,
      }))
      .filter((item: Item) => {
        if (seenIds.has(item.id)) {
          return false;  
        }
        seenIds.add(item.id);
        return true;
      });
      setData(items);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  

  // refreshing the table when the user changes page;
  useEffect(() => {
    retrieve();
  }, [index]);

  return (
    <div>
   <div className="flex justify-content-center align-items-center mb-4 gap-2">
                <InputSwitch inputId="input-rowclick" checked={rowclick} onChange={(e: InputSwitchChangeEvent) => setRowClick(e.value!)} />
                <label htmlFor="input-rowclick">Row Click</label>
            </div>

            <DataTable
  value={data} // Keep `data` intact for rendering the table rows
  paginator
  rows={12}
  showGridlines
  tableStyle={{ minWidth: '50rem' }}
  selectionMode={rowclick ? null : 'multiple'}
  selection={stored} // Track only selected rows
  onSelectionChange={(e: DataTableSelectionMultipleChangeEvent<Item[]>) => {
    const newData=e.value;
    const older=[...stored];
     const currId=data.map(item => item.id);
    
    const remItem=stored.filter(
      item=> 
        currId.includes(item.id)&& 
        !newData.some(newItem=>newItem.id===item.id)
    );
    const addedItems=newData.filter(
      item=>!stored.some(storedItem=>storedItem.id===item.id)
    );
    older.push(...addedItems);
        const updatedOlder=older.filter(item=> 
      !remItem.some(removedItem=>removedItem.id===item.id)
    );
    
    setStored(updatedOlder);
}}
  dataKey="id"
  totalRecords={10528}
  lazy
  first={(index - 1) * 12}
  onPage={(e: DataTableStateEvent) => setindex((e.first ?? 0) / 12 + 1)}
>
  <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
  <Column field="title" header="Title"></Column>
  <Column field="place_of_origin" header="Origin"></Column>
  <Column field="artist_display" header="Artist"></Column>
  <Column field="date_start" header="Start"></Column>
  <Column field="date_end" header="End"></Column>
</DataTable>

    
            
    </div>
    
  );
};

export default Fetch_f;