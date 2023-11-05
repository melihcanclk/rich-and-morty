import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useEffect, useRef, useState } from "react";
import "@/components/Accordion/Accordion.css";

function Accordion(props: { title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; content: any; }) {
    const [active, setActive] = useState(false);

    function toggleAccordion() {
        setActive(!active);
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
            {
                active &&
                <div
                    className="accordion__content"
                >
                    <div
                        className="accordion__text"
                    >
                        {props.content}
                    </div>
                </div>
            }
        </div>
    );
}

export default Accordion;
