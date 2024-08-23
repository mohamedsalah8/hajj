import LoaderNewImg from "assets/images/newLoader.gif";
import React from "react";

export default function Loader(props) {
  const title = "Loading";

  return (
    <div
      className={`inner-loader loader-with-background h-100 ${!props.background ? "" : "rgbaBackground"
        }${!props.adClass ? "" : "fullHeight"}`}
    >
      <div className="text-center">
        <img src={LoaderNewImg} alt="Loader" />
        <div className="d-block mt-2">
          <h1 className="text-16">{title}</h1>
        </div>
      </div>
    </div>
  );
}

export function InnerLoader(props) {
  return (
    <div
      className={`inner-loader loader-with-background h-100 ${!props.background ? "" : "rgbaBackground"
        }${!props.adClass ? "" : "fullHeight"}`}
    >
      <img src={LoaderNewImg} alt="Loader" />
    </div>
  );
}

export function LoaderWithBackground(props) {
  return (
    <div
      className={`inner-loader loader-with-background h-100 ${!props.background ? "" : "rgbaBackground"
        }${!props.adClass ? "" : "fullHeight"}`}
    >
      <img src={LoaderNewImg} alt="Loader" />
    </div>
  );
}
