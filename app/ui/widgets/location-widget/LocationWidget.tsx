import Card from "@/app/ui/card/Card";
import Flag from "@/app/ui/flag";
import styles from "./LocationWidget.module.css";

const LocationWidget = ({ location }: { location: any }) => {
  if (!location) return <p>spinner</p>;

  return (
    <section
      role="contentinfo"
      aria-label="Your location"
      className={styles.container}
    >
      <Card>
        <dl>
          <dt>City</dt>
          <dd>{location.city}</dd>
          <dt>State</dt>
          <dd>{location.state.name}</dd>
          <dt>Country</dt>
          <dd>
            {location.country.name} <Flag code={location.country.code} />
          </dd>
        </dl>
      </Card>
    </section>
  );
};

export default LocationWidget;
