import { formatDDToDMS } from "@/app/lib/format";
import { useCallback, useEffect, useState } from "react";
import styles from "./CoordinatesWidget.module.css";
import Card from "@/app/ui/card";

const CoordinatesWidget = ({
  coordinates,
  loading = true,
}: {
  coordinates: [number, number] | undefined;
  loading: boolean;
}) => {
  const [latitude, setLatitude] = useState<string | undefined>(undefined);
  const [longitude, setLongitude] = useState<string | undefined>(undefined);

  const formatCoordinates = useCallback((coordinates: [number, number]) => {
    const [lat, lon] = coordinates;
    setLatitude(formatDDToDMS(lat));
    setLongitude(formatDDToDMS(lon));
  }, []);

  useEffect(() => {
    if (coordinates) {
      formatCoordinates(coordinates);
    }
  }, [coordinates, formatCoordinates]);

  if (!coordinates || loading) return <p>spiner</p>;

  return (
    <div className={styles.container}>
      <Card>
        <dl>
          <dt>Latitude</dt>
          <dd>{latitude}</dd>
          <dt>Longitude</dt>
          <dd>{longitude}</dd>
        </dl>
      </Card>
    </div>
  );
};

export default CoordinatesWidget;
