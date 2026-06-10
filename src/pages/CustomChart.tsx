import { useLayoutEffect, useRef, useState } from "react";



const CustomChart = () => {
    const containerRef: any = useRef(null);
    const parentBlockRef: any = useRef(null);
    const childRefs: any = useRef([]);

    const [lines, setLines] = useState([]);

    const calculateConnections = () => {
        const containerRect = containerRef.current.getBoundingClientRect();
        const parentRect = parentBlockRef.current.getBoundingClientRect();

        // Target center-bottom of the parent block
        const startX = (parentRect.left + parentRect.width / 2) - containerRect.left;
        const startY = parentRect.bottom - containerRect.top;

        const newLines = childRefs.current.map((childEl: any) => {
            const childRect = childEl.getBoundingClientRect();

            // Target center-top of each child block
            return {
                x1: startX,
                y1: startY,
                x2: (childRect.left + childRect.width / 2) - containerRect.left,
                y2: childRect.top - containerRect.top
            };
        }).filter(Boolean);

        setLines(newLines);
    };


    let myArr = {

        // organization chart init, parent
        card: [
            {
                // parent's text
                content: ["i am a parent"],

                // it's children...
                card: [
                    {
                        content: ["child"],
                        card: [
                            {
                                content: ["child of child"],
                                card: [{
                                    content: ["child of child of child"],
                                    card: [
                                        {
                                            content: ["child..."],
                                            card: []
                                        }
                                    ]
                                }]
                            }
                        ]
                    },
                    {
                        content: ["child"],
                        card: [
                            {
                                content: ["child of child"],
                                card: [{
                                    content: ["child of child of child"],
                                    card: [
                                        {
                                            content: ["child..."],
                                            card: []
                                        }
                                    ]
                                }]
                            }
                        ]
                    },
                    {
                        content: ["child"],
                        card: [
                            {
                                content: ["child of child"],
                                card: [{
                                    content: ["child of child of child"],
                                    card: [
                                        {
                                            content: ["child..."],
                                            card: []
                                        }
                                    ]
                                }]
                            }
                        ]
                    }
                ]
            }
        ]
    }

    useLayoutEffect(() => {
        calculateConnections();
        window.addEventListener('resize', calculateConnections);
        return () => window.removeEventListener('resize', calculateConnections);
    }, []);

    return (
        <div
            ref={containerRef}
            style={{
                position: "relative", // Crucial for absolute SVG positioning
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "60px", // Generates consistent vertical spacing for the lines
                width: "100%",
                maxWidth: "1000px",
                margin: "0 auto",
                padding: "20px"
            }}
        >

            <svg
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    pointerEvents: "none" // Allows clicking elements through the SVG layer
                }}
            >
                {lines.map((line, key) => (
                    <line
                        key={key}
                        x1={line.x1}
                        y1={line.y1}
                        x2={line.x2}
                        y2={line.y2}
                        stroke="#a1a1aa"
                        strokeWidth="2"
                    />
                ))}
            </svg>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "20px",
                    zIndex: 2
                }}
            >
                {myArr.card.map((item, key) => (
                    <div
                    key={key}
                        ref={parentBlockRef}
                        style={{
                            width: "120px",
                            height: "60px",
                            border: "2px solid #2563eb",
                            borderRadius: "6px",
                            backgroundColor: "#eff6ff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: "bold",
                            zIndex: 2
                        }}
                    >
                        {item.content}
                    </div>
                ))}
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "20px",
                    zIndex: 2
                }}
            >
                {myArr.card.map((row, key) => (
                    row.card.map((col, index) => (
                        <div
                            ref={(el) => (childRefs.current[index] = el)}
                            key={index}
                            style={{
                                border: "2px solid #4b5563",
                                borderRadius: "6px",
                                padding: "15px 25px",
                                backgroundColor: "#ffffff",
                                textAlign: "center",
                                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)"
                            }}
                        >
                            {col.content}
                        </div>
                    ))
                ))}


            </div>
        </div>
    )
}

export default CustomChart