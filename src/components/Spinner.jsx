import SpinnerGIF from "../assets/Spinner.gif";

const Spinner=()=>{
    return (
        <>
            <img
                src={SpinnerGIF}
                className="d-block m-auto"
                alt=""
                style={{width:"200px"}}
            />
        </>
    )
}

export default Spinner;