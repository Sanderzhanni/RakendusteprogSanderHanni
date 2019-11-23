import React from "react";

class NotFound extends React.PureComponent {

    render() {
        return (
            <div>
                <h1 style={{
                    display: "inline-block", alignItems: "center", valign: "middle",
                    verticalAlign: "middle", textAlign: "center", width: "100%", height: "100%", fontSize: "50px"
                }}>Page not found</h1>
            </div>
        );
    }
}

export default NotFound;