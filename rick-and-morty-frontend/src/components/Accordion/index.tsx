import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useRef, useState } from "react";
import "./Accordion.css";

function Accordion(props: { title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; content: any; }) {
    const [active, setActive] = useState(false);
    const content = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState("0px");

    function toggleAccordion() {
        setActive(!active);
        setHeight(active ? "0px" : `${content.current !== null &&
            content.current !== undefined &&
            content.current.scrollHeight !== undefined ? content.current.scrollHeight : 0}px`);
    }

    return (
        <div className="accordion__section">
            <div
                className={`accordion ${active ? "active" : ""}`}
                onClick={toggleAccordion}
            >
                <p className="accordion__title">{props.title}</p>
                <span style={{ marginLeft: "20px" }}>{active ? "-" : "+"}</span>
            </div>
            <div
                ref={content}
                style={{ maxHeight: `${height}` }}
                className="accordion__content"
            >
                <div
                    className="accordion__text"
                >
                    {props.content}
                </div>
            </div>
        </div>
    );
}

export default Accordion;
