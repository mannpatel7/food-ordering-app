const RestaurantMap = ({ mapEmbed }) => {
  return (
    <div className="mt-4 rounded-lg overflow-hidden shadow">
      <iframe
        src={mapEmbed}
        width="100%"
        height="300"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="restaurant-location"
      />
    </div>
  );
};

export default RestaurantMap;
