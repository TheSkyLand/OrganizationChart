import { useEffect, useRef, useState, useLayoutEffect } from "react";

const Chart = () => {
    const jaggedArr = {
        users: ["john11", "alex24", "brandon65"],
        admins: ["peter25"],
        owners: {
            specialUser: ["george99"]
        }
    };

    // Combine all children into a single flat array for easier rendering
    const allChildren = [...jaggedArr.owners, ...jaggedArr.admins, ...jaggedArr.users];

    const containerRef = useRef(null);
    const parentBlockRef = useRef(null);
    const childRefs = useRef([]);

    const [lines, setLines] = useState([]);

    const calculateConnections = () => {
        if (!containerRef.current || !parentBlockRef.current || childRefs.current.length === 0) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        const parentRect = parentBlockRef.current.getBoundingClientRect();

        // Target center-bottom of the parent block
        const startX = (parentRect.left + parentRect.width / 2) - containerRect.left;
        const startY = parentRect.bottom - containerRect.top;

        const newLines = childRefs.current.map((childEl) => {
            if (!childEl) return null;
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

    // useLayoutEffect prevents visual flickering during the initial render
    useLayoutEffect(() => {
        calculateConnections();
        window.addEventListener('resize', calculateConnections);
        return () => window.removeEventListener('resize', calculateConnections);
    }, []);

    return (
        <div 
            ref={containerRef} 
            className="chart-root"
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
            {/* Absolute SVG overlay layer */}
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
                {lines.map((line, index) => (
                    <line
                        key={index}
                        x1={line.x1}
                        y1={line.y1}
                        x2={line.x2}
                        y2={line.y2}
                        stroke="#a1a1aa"
                        strokeWidth="2"
                    />
                ))}
            </svg>

            {/* Parent Block (Root Node) */}
            <div
                ref={parentBlockRef}
                className="chart-block"
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
                Root Node
            </div>

            {/* Child Blocks Container */}
            <div
                className="chart-block-child"
                style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "20px",
                    zIndex: 2
                }}
            >
                {allChildren.map((item, key) => (
                    <div
                        key={key}
                        ref={(el) => (childRefs.current[key] = el)}
                        style={{
                            border: "2px solid #4b5563",
                            borderRadius: "6px",
                            padding: "15px 25px",
                            backgroundColor: "#ffffff",
                            textAlign: "center",
                            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)"
                        }}
                    >
                        {item}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Chart;
