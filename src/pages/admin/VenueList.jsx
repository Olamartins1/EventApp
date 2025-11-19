// import React from "react";
// import VenueCard from "./VenueCard";

// const VenueList = ({ venues, venuesData }) => {
//   console.log("omo", venuesData);
//   return (
//     <div>
//       {venues.length > 0 ? (
//         venues.map((venuesData) => (
//           <VenueCard key={venuesData.id} venue={venuesData} />
//         ))
//       ) : (
//         <p>No venues found</p>
//       )}
//     </div>
//   );
// };

// export default VenueList;

import React from "react";
import VenueCard from "./VenueCard";

const VenueList = ({ venues, fetchVenues }) => {
  // No need for venuesData here unless you specifically need the full list
  return (
    <div>
      {venues.length > 0 ? (
        venues.map((venue) => (
          <VenueCard
            key={venue.id}
            venue={venue}
            onStatusChange={fetchVenues}
            // fetchVenues={fetchVenues}
          />
        ))
      ) : (
        <p>No venues found</p>
      )}
    </div>
  );
};

export default VenueList;
