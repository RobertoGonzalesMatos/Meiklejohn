import { HorizontalScroll } from "../Helpers/ScrollComponents";
import "../../styles/cardView.css";
import Meiks from "../Routes/Meiks";

interface Meik {
  concentration: string;
  email: string;
  uid: string;
  imageURL: string;
  location: string;
  name: string;
  tags: string[];
  text: string;
  year: string;
}
function cardView(props: Meik) {
  const imageHtml = document.createElement("img") as HTMLImageElement;
  imageHtml.src = "/image-" + props.imageURL + ".webp";
  return (
    <div className="card">
      <div
        className="upper-half"
        dangerouslySetInnerHTML={{ __html: imageHtml.outerHTML }}
      />
      <div className="lower-half">
        <div className="text-group">
          <span className="Name">{props.name}</span>
          <span className="Location">{props.location}</span>
        </div>
        <div className="text-group">
          <span className="Concentration">{props.concentration}</span>
          <span className="Year">{props.year}</span>
        </div>
        <div className="text-group">
          <span className="Email">{props.email}</span>
        </div>
        <HorizontalScroll>
          <div className="scroll-content">
            {Array.isArray(props.tags) ? (
              props.tags.map((tag, index) => <span key={index}>{tag}</span>)
            ) : (
              <span>{props.tags}</span>
            )}
          </div>
        </HorizontalScroll>
      </div>
    </div>
  );
}

export default cardView;
