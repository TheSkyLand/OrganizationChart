


const Chart = () => {
    const countries = ["Netherlands nl", "USA us"]
    const jaggedArr = {
        users: ["john11", "alex24", "brandon65"],
        admins: ["peter25"],
        owners: ["george99"]
    }

    const block = document.querySelector('') 
    const rect = block.getBoundingClientRect();

    
    return (

        <div

        >
            hi i am a chart!


            <div
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
                    style={{
                        display: "flex",
                        flexDirection: "row"
                    }}
                >
                    {jaggedArr.users.map((item, key) => (
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center"

                            }}>
                            <div>
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