import { WeatherData } from "@/app/lib/types";
import Card from "@/app/ui/card";
import { formatWindDirection } from "@/app/lib/format";
import { Direction } from "@/app/ui/icons";
import styles from "./WeatherWidget.module.css";

const WeatherWidget = ({ data }: { data: WeatherData }) => {
  if (!data) return null;
  return (
    <div className={styles.container}>
      <Card>
        <dl>
          <dt className={styles.temperature}>Temperature</dt>
          <dd className={styles.temperature}>
            <span className={styles.value}>
              {data.temperature.toFixed(1)} °C
            </span>
          </dd>
          <dt className={styles.wind}>Wind</dt>
          <dd className={styles.wind}>
            <span className={styles.value}>
              {data.wind_speed.toFixed(1)} kn
            </span>
            <span className={styles.direction}>
              <Direction value={data.wind_direction} />
              {formatWindDirection(data.wind_direction)}
            </span>
          </dd>
        </dl>
      </Card>
    </div>
  );
};

export default WeatherWidget;
