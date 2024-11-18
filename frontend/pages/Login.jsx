import React from "react";

function Login() {

    function handleLogin() {
        

        event.preventDefault(); // förhindrar att sidan uppdateras

        // hämta värdena från formulärfälten
        const email = event.target.email.value;
        const password = event.target.password.value;

        // logga de inskickade värdena
        console.log("Inskickad e-post:", email);
        console.log("Inskickat lösenord:", password);

        
        fetch(`${process.env.REACT_APP_BACKEND_URL}/login`)
            .then((response) => response.text())
            .then((data) => {
                console.log("data:", data)
            });
    }

    return (
        <>
            <h1>Logga in</h1>
            {/* här kan jag lägga in en komponent för login-formulär */}

            <form onSubmit={handleLogin}>
                <h2>Logga in</h2>
                <label htmlFor="email">E-post:</label>
                <br />
                <input type="email" name="email" id="email" />

                <br />
                <br />

                <label htmlFor="password">Lösenord:</label>
                <br />
                <input type="password" name="password" id="password" />

                <br />
                <br />

                <button type="submit">Logga in</button>

                <button type="reset">Reset</button>
            </form>

        </>
    )
}

export default Login;