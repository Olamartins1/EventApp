import React from "react";
import VenueCard from "./VenueCard";

const VenueList = ({ venues }) => {
  return (
    <div>
      {venues.length > 0 ? (
        venues.map((venue) => <VenueCard key={venue.id} venue={venue} />)
      ) : (
        <p>No venues found</p>
      )}
    </div>
  );
};

export default VenueList;
