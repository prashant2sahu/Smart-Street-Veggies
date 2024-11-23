import { useJsApiLoader } from "@react-google-maps/api";

const loaderOptions = {
  googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
  libraries: ["places", "maps"], // Include all required libraries here
};

export const GoogleMapsProvider = ({ children }) => {
  const { isLoaded, loadError } = useJsApiLoader(loaderOptions);

  if (loadError) return <div>Error loading Google Maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return <>{children}</>;
};
