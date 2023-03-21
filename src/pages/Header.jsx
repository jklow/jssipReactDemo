function Header() {

    const headingStyle = {
        color: 'black'
    }

    const overallStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: '20px'
    }

    return (
        <div style={overallStyle}>
            <h1 style={headingStyle}>SIP Demo</h1>
        </div>
    )
}

export default Header;