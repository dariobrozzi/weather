import { useRef } from "react";

interface CompassProps {
  direction: number | undefined;
  windDirection: number | undefined;
}

const Compass = ({ direction, windDirection }: CompassProps) => {
  const canvasEl = useRef<HTMLCanvasElement>(null);
  const ctx = canvasEl.current?.getContext("2d");

  if (ctx) {
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.arc(100, 100, 90, 0, Math.PI * 2, true); // Center x, Center y, Radius, Start Angle, End Angle, Clockwise
    ctx.stroke();

    ctx.strokeStyle = "blue";
    ctx.beginPath();
    ctx.moveTo(100, 100); // Start at the center
    ctx.lineTo(100, 20); // Draw a line for the needle
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.font = "16px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("N", 100, 15); // North
    ctx.fillText("S", 100, 195); // South
    ctx.fillText("E", 195, 105); // East
    ctx.fillText("W", 5, 105); // West
  }

  return <canvas ref={canvasEl} width="200" height="200"></canvas>;
};

export default Compass;
