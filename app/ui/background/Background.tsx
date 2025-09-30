interface BackgroundProps extends React.PropsWithChildren {
  filename: string;
}

const Background = ({ children, filename }: BackgroundProps) => {
  const style = {
    height: "100vh",
    width: "100vw",
    backgroundImage: `url(/backgrounds/${filename}.jpg)`,
    backgroundSize: "cover",
  };

  return <div style={style}>{children}</div>;
};

export default Background;
