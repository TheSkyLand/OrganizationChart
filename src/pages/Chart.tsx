import { useRef, useState } from "react";



const Chart = () => {
    const countries = ["Netherlands nl", "USA us"]
    const jaggedArr = {
        users: ["john11", "alex24", "brandon65"],
        admins: ["peter25"],
        owners: ["george99"]
    }

    const containerRef = useRef(null);
    const parentBlockRef = useRef(null);
    const childRefs = useRef([]);

    const [lines, setLines] = useState([]);


        const calculateConnections = () => {
        if (!containerRef.current || !parentBlockRef.current || childRefs.current.length === 0) return;

        // Get bounding rectangles
        const containerRect = containerRef.current.getBoundingClientRect();
        const parentRect = parentBlockRef.current.getBoundingClientRect();

        // Find the bottom-center point of the parent block
        const startX = (parentRect.left + parentRect.width / 2) - containerRect.left;
        const startY = parentRect.bottom - containerRect.top;

        // Map through each child element to find its top-center point
        const newLines = childRefs.current.map((childEl) => {
            if (!childEl) return null;
            const childRect = childEl.getBoundingClientRect();
            
            return {
                x1: startX,
                y1: startY,
                x2: (childRect.left + childRect.width / 2) - containerRect.left,
                y2: childRect.top - containerRect.top
            };
        }).filter(Boolean); // Remove empty refs

        setLines(newLines);
    };

    // Recalculate positions after mounting and whenever layout changes
    useEffect(() => {
        calculateConnections();
        
        // Watch for window resize changes to keep lines locked to targets
        window.addEventListener('resize', calculateConnections);
        return () => window.removeEventListener('resize', calculateConnections);
    }, []);


    return (

        <div

        >
            hi i am a chart!


            <div
                className="chart-root"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                    width: 1000,
                    height: 1000
                }}
            >

                {/* Chart block */}
                <div
                    className="chart-block"
                    style={{
                        width: 100,
                        height: 100,
                        border: "1px solid black",
                    }}
                >
                    dfhhdfhfdh';fhd';
                </div>

                {/* Chart connection */}
                <svg width="250" height="250">
                    <line x1="100" y1="10050" x2="100" y2="100" stroke="black" stroke-width="2" />
                </svg>


                {/* Child blocks */}
                <div
                    className="chart-block-child"
                    style={{
                        display: "flex",
                        flexDirection: "row"
                    }}
                >
                    {jaggedArr.users.map((item, key) => (
                        <div
                            key={key}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center"
                            }}>
                            <div
                                className="chart-block-child-con"
                            >
                                .
                            </div>
                            <div
                                style={{
                                    border: "1px solid black",
                                    padding: 25
                                }}
                            >
                                {item}
                            </div>
                        </div>
                    ))}


                </div>
            </div>
        </div>

    )
}

export default Chart