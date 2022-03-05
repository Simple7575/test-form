import React, { useState, useEffect } from "react";
// import Tilt from "vanilla-tilt";
// import ReCAPTCHA from "react-google-recaptcha";

export default function Form() {
    const encode = (data) => {
        return Object.keys(data)
            .map(
                (key) =>
                    encodeURIComponent(key) +
                    "=" +
                    encodeURIComponent(data[key])
            )
            .join("&");
    };

    // const captchaRef = useRef();
    // const [buttonDisable, setButtonDisable] = useState(true);
    // const [captchaResponse, setCaptchaResponse] = useState(null);
    const [formState, setFormState] = useState({
        firstName: "",
        secondName: "",
        number: "",
        mail: "",
        radioValue: "Yes",
        "user-message": "",
    });

    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };

    // const captchaCallback = (response) => {
    //     setCaptchaResponse(response);
    //     setButtonDisable(false);
    // };

    const handleSubmit = (e) => {
        fetch("/", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: encode({
                "form-name": "Message",
                ...formState,
                // "g-recaptcha-response": captchaResponse,
            }),
        })
            .then(() => {
                // setSuccessMsgState("open");
                console.log("success");
            })
            .catch((error) => console.log(error));

        e.preventDefault();
        setFormState({
            firstName: "",
            secondName: "",
            number: "",
            mail: "",
            radioValue: "Yes",
            "user-message": "",
        });
        // alert("Success.");
        // captchaRef.current.reset();
    };

    useEffect(() => {
        // const element = document.querySelector(".form__container");
        // Tilt.init(element, {});
    }, []);

    return (
        <div className="form__container">
            <h1>Обратная связь.</h1>
            <form
                onSubmit={handleSubmit}
                name="Message"
                method="POST"
                data-netlify="true"
                data-netlify-recaptcha="true"
            >
                <input type="hidden" name="form-name" value="Message" />
                <div className="inputs__wrapper">
                    <label className={`lables`} htmlFor="firstName">
                        <input
                            className={`inputs ${
                                formState.firstName.length > 0 ? "full" : ""
                            }`}
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formState.firstName}
                            onChange={handleChange}
                            required
                        />
                        <span className="placeholder">Имя</span>
                    </label>
                    <label className="lables" htmlFor="secondName">
                        <input
                            className={`inputs ${
                                formState.secondName.length > 0 ? "full" : ""
                            }`}
                            type="text"
                            id="secondName"
                            name="secondName"
                            value={formState.secondName}
                            onChange={handleChange}
                        />
                        <span className="placeholder">Фамилия</span>
                    </label>
                    <label className="lables" htmlFor="number">
                        <input
                            className={`inputs ${
                                formState.number.length > 0 ? "full" : ""
                            }`}
                            type="tel"
                            id="number"
                            name="number"
                            value={formState.number}
                            onChange={handleChange}
                        />
                        <span className="placeholder">Телефон</span>
                    </label>
                    <label className="lables" htmlFor="mail">
                        <input
                            className={`inputs ${
                                formState.mail.length > 0 ? "full" : ""
                            }`}
                            type="email"
                            id="mail"
                            name="mail"
                            value={formState.mail}
                            onChange={handleChange}
                            required
                        />
                        <span className="placeholder">E-mail</span>
                    </label>
                </div>
                <div className="radio__btns__container">
                    <div className="radio__btns__wrapper">
                        <h4>Понравилась форма?</h4>
                        <div className="radio__inner">
                            <label htmlFor="Yes">
                                <input
                                    type="radio"
                                    id="Yes"
                                    name="radioValue"
                                    value="Yes"
                                    checked={formState.radioValue === "Yes"}
                                    onChange={handleChange}
                                />
                                <span className="radio__placeholder">Да</span>
                            </label>
                            <label htmlFor="No">
                                <input
                                    type="radio"
                                    id="No"
                                    name="radioValue"
                                    value="No"
                                    checked={formState.radioValue === "No"}
                                    onChange={handleChange}
                                />
                                <span className="radio__placeholder">Нет</span>
                            </label>
                        </div>
                    </div>
                    <div className="radio__svgs">
                        <svg
                            className={`smile ${
                                formState.radioValue === "Yes" ? "neon" : ""
                            }`}
                            viewBox="0 0 128 128"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M64 105C52.8609 105 42.178 100.575 34.3015 92.6985C26.425 84.822 22 74.1391 22 63C22 51.8609 26.425 41.178 34.3015 33.3015C42.178 25.425 52.8609 21 64 21C75.1391 21 85.822 25.425 93.6985 33.3015C101.575 41.178 106 51.8609 106 63C106 74.1391 101.575 84.822 93.6985 92.6985C85.822 100.575 75.1391 105 64 105ZM64 111C76.7304 111 88.9394 105.943 97.9411 96.9411C106.943 87.9394 112 75.7304 112 63C112 50.2696 106.943 38.0606 97.9411 29.0589C88.9394 20.0571 76.7304 15 64 15C51.2696 15 39.0606 20.0571 30.0589 29.0589C21.0571 38.0606 16 50.2696 16 63C16 75.7304 21.0571 87.9394 30.0589 96.9411C39.0606 105.943 51.2696 111 64 111V111Z"
                                fill="#11980E"
                                fillOpacity="0.73"
                            />
                            <path
                                d="M41.7099 73.402C42.3989 73.0042 43.2178 72.8964 43.9863 73.1023C44.7548 73.3082 45.41 73.811 45.8079 74.5C47.6505 77.694 50.3022 80.3462 53.4958 82.1895C56.6895 84.0328 60.3124 85.0022 63.9999 85C67.6873 85.0022 71.3102 84.0328 74.5039 82.1895C77.6976 80.3462 80.3492 77.694 82.1919 74.5C82.3874 74.1561 82.6491 73.8542 82.9618 73.6118C83.2744 73.3694 83.632 73.1912 84.0138 73.0876C84.3956 72.9839 84.7942 72.9568 85.1865 73.0078C85.5789 73.0588 85.9572 73.1869 86.2999 73.3847C86.6425 73.5825 86.9426 73.8462 87.1829 74.1605C87.4233 74.4747 87.599 74.8335 87.7002 75.216C87.8013 75.5985 87.8258 75.9972 87.7722 76.3892C87.7186 76.7812 87.588 77.1587 87.3879 77.5C85.0186 81.6061 81.6096 85.0157 77.5038 87.3856C73.3981 89.7555 68.7405 91.0021 63.9999 91C59.2592 91.0021 54.6017 89.7555 50.4959 87.3856C46.3902 85.0157 42.9811 81.6061 40.6119 77.5C40.2141 76.811 40.1063 75.9921 40.3122 75.2236C40.5181 74.4551 41.0209 73.7998 41.7099 73.402ZM57.9999 55C57.9999 59.968 55.3119 64 51.9999 64C48.6879 64 45.9999 59.968 45.9999 55C45.9999 50.032 48.6879 46 51.9999 46C55.3119 46 57.9999 50.032 57.9999 55ZM81.9999 55C81.9999 59.968 79.3119 64 75.9999 64C72.6879 64 69.9999 59.968 69.9999 55C69.9999 50.032 72.6879 46 75.9999 46C79.3119 46 81.9999 50.032 81.9999 55Z"
                                fill="#11980E"
                                fillOpacity="0.73"
                            />
                        </svg>

                        <svg
                            className={`sad ${
                                formState.radioValue === "No" ? "neon" : ""
                            }`}
                            viewBox="0 0 128 128"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M64 15.6393C54.5801 15.6393 45.3717 18.4756 37.5394 23.7896C29.707 29.1035 23.6024 36.6564 19.9976 45.4932C16.3927 54.3299 15.4495 64.0536 17.2872 73.4347C19.125 82.8157 23.6611 91.4328 30.322 98.1961C36.9829 104.959 45.4694 109.565 54.7083 111.431C63.9472 113.297 73.5236 112.34 82.2264 108.679C90.9293 105.019 98.3677 98.8206 103.601 90.8677C108.835 82.9149 111.628 73.5648 111.628 64C111.628 51.1739 106.61 38.8732 97.678 29.8038C88.7461 20.7345 76.6317 15.6393 64 15.6393ZM64 106.316C55.7576 106.316 47.7003 103.834 40.8469 99.1841C33.9936 94.5344 28.6521 87.9256 25.4979 80.1935C22.3436 72.4613 21.5183 63.953 23.1263 55.7446C24.7344 47.5362 28.7035 39.9963 34.5317 34.0784C40.36 28.1604 47.7857 24.1303 55.8697 22.4975C63.9538 20.8648 72.3331 21.7027 79.9481 24.9055C87.5631 28.1083 94.0718 33.532 98.651 40.4907C103.23 47.4495 105.674 55.6308 105.674 64C105.674 75.2228 101.284 85.9859 93.4683 93.9216C85.6528 101.857 75.0527 106.316 64 106.316Z"
                                fill="#A53131"
                            />
                            <path
                                d="M85.3137 58.1967C88.2729 58.1967 90.6718 55.7609 90.6718 52.7562C90.6718 49.7514 88.2729 47.3156 85.3137 47.3156C82.3545 47.3156 79.9556 49.7514 79.9556 52.7562C79.9556 55.7609 82.3545 58.1967 85.3137 58.1967Z"
                                fill="#A53131"
                            />
                            <path
                                d="M44.3835 58.1967C47.3427 58.1967 49.7417 55.7609 49.7417 52.7562C49.7417 49.7514 47.3427 47.3156 44.3835 47.3156C41.4243 47.3156 39.0254 49.7514 39.0254 52.7562C39.0254 55.7609 41.4243 58.1967 44.3835 58.1967Z"
                                fill="#A53131"
                            />
                            <path
                                d="M64.4762 70.0451C60.2057 70.0458 55.9972 71.0832 52.2017 73.0706C48.4061 75.058 45.1335 77.9379 42.6566 81.4703C42.1987 82.1236 42.0152 82.9349 42.1464 83.7256C42.2776 84.5163 42.7127 85.2218 43.3562 85.6867C43.9996 86.1517 44.7986 86.338 45.5773 86.2048C46.3561 86.0716 47.0508 85.6298 47.5087 84.9764C49.412 82.2619 51.9199 80.0423 54.828 78.4982C57.7362 76.9542 60.9623 76.1294 64.2438 76.0911C67.5253 76.0528 70.7693 76.8021 73.7117 78.2778C76.654 79.7536 79.2114 81.9141 81.1757 84.5835C81.6494 85.2248 82.3546 85.6488 83.1361 85.7621C83.9177 85.8755 84.7115 85.669 85.3431 85.188C85.9747 84.707 86.3923 83.991 86.5039 83.1974C86.6156 82.4039 86.4122 81.5977 85.9385 80.9564C83.4431 77.5683 80.2038 74.8179 76.4781 72.9237C72.7523 71.0296 68.6428 70.0439 64.4762 70.0451Z"
                                fill="#A53131"
                            />
                        </svg>
                    </div>
                </div>
                <div className="text">
                    <label htmlFor="user-message">
                        Ваш комментарий
                        <textarea
                            name="user-message"
                            id="textarea"
                            value={formState["user-message"]}
                            onChange={handleChange}
                        ></textarea>
                    </label>
                    <button
                        type="submit"
                        //  disabled={buttonDisable}
                    >
                        отправить
                    </button>
                    {/* <ReCAPTCHA
                        // asyncScriptOnLoad={setReady(true)}

                        ref={captchaRef}
                        className="captcha"
                        sitekey="6LfCJLceAAAAAJ_1NHWzOK2v5Uu60D5aQ6ACiq4R"
                        onChange={captchaCallback}
                        onExpired={() => {
                            setButtonDisable(true);
                            setCaptchaResponse(null);
                        }}
                        theme="dark"
                    /> */}
                </div>
                {/* <div
                    className="g-recaptcha"
                    data-sitekey="6LfCJLceAAAAAJ_1NHWzOK2v5Uu60D5aQ6ACiq4R"
                    data-theme="dark"
                    data-callback={captchaCallback}
                ></div> */}
            </form>
        </div>
    );
}
