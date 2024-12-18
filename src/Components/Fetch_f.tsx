import React, { useState, useEffect } from "react";

const Fetch_f: React.FC = () => {
  // Define the Item type based on the API response structure
  interface Item {
    id: number;
    name: string;
  }
   
  interface ItemNum{
    id:number;
    index:number;
  }

  const [data, setData] = useState<Item[]>([]);
  const [index,setindex]=useState<number>(1);

  const inc=()=>{
      setindex(index+1);
  }
  // Function to fetch data from the API
  const retrieve = async () => {
    try {
      const response = await fetch(`https://api.artic.edu/api/v1/artworks?page=${index}`);
      const result = await response.json();
      console.log(result);
      
       const items = result.data.map((item: any) => ({
        id: item.id,
        name: item.artist_title
        || "Unnamed Artist", 
      }));
      setData(items);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    retrieve();
  }, [index]);

  return (
    <div>
      <h1>Artworks</h1>
      <div>
        {data.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>
    
            <button onClick={inc}>Increase</button>
    </div>
    
  );
};

export default Fetch_f;
