import { MouseEventHandler } from "react";

interface WorldEllipseProps {
  index: number;
  background: string;
  onClickHandler: MouseEventHandler<SVGEllipseElement>;
}

const WorldEllipse: React.FC<WorldEllipseProps> = ({
  index,
  background,
  onClickHandler,
}) => (
  <svg
    className="worldLink"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
  >
    <defs>
      <pattern
        id={`worldBackground/${index}`}
        patternUnits="userSpaceOnUse"
        width="512"
        height="512"
      >
        <image href={background} x="0" y="0" width="512" height="512" />
      </pattern>
    </defs>
    <ellipse
      className="worldEllipse"
      fill={`url(#worldBackground/${index})`}
      opacity="1"
      fillOpacity="1"
      stroke="#0000ff"
      strokeWidth="0.8"
      strokeOpacity="1"
      strokeMiterlimit="4"
      cx="256"
      cy="256"
      rx="256"
      ry="200"
      onClick={onClickHandler}
    />
  </svg>
);

export default WorldEllipse;
