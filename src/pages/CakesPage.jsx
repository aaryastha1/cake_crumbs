// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import SidebarFilters from "../components/SidebarFilter";

// export default function CakesPage() {
//   const [cakes, setCakes] = useState([]);
//   const [filters, setFilters] = useState({});

//   useEffect(() => {
//     const fetchCakes = async () => {
//       try {
//         let url = "http://localhost:5006/api/admin/products/filter";
//         const params = new URLSearchParams();

//         if (filters.occasion) params.append("occasion", filters.occasion);
//         if (filters.flavour) params.append("flavour", filters.flavour);
//         if (filters.size) params.append("size", filters.size);
//         if (filters.color) params.append("color", filters.color);

//         const res = await axios.get(url + "?" + params.toString());
//         setCakes(res.data.products);
//       } catch (err) {
//         console.error("Error fetching cakes:", err);
//       }
//     };

//     fetchCakes();
//   }, [filters]);

//   return (
//     <div className="flex">
//       <SidebarFilters onFilterChange={setFilters} />
//       <div className="p-4 flex-1 grid grid-cols-3 gap-4">
//         {cakes.length > 0 ? (
//           cakes.map((c) => (
//             <div key={c._id} className="border p-2 rounded">
//               <img
//                 src={`http://localhost:5006${c.image}`}
//                 alt={c.name}
//                 className="w-full h-48 object-cover"
//               />
//               <h4 className="mt-2">{c.name}</h4>
//             </div>
//           ))
//         ) : (
//           <p>Select filters to see cakes.</p>
//         )}
//       </div>
//     </div>
//   );
// }
