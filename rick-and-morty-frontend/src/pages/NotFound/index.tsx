import "@/pages/NotFound/not-found.scss";

const ErrorPage = () => {
    return (
        <>
            <main >
                <div className="main">
                    <div className="background-img">
                        <div className="space"></div>
                        <div className="wrapper">
                            <div className="img-wrapper">
                                <span>44</span>
                            </div>
                            <p>The page you are trying to search has been  moved to another universe.</p>
                            <a href="/">GET ME HOME </a>
                        </div>
                    </div>
                </div>
            </main>

        </>
    );
};

export default ErrorPage;