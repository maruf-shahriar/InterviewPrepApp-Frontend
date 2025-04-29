import "./css/createProfile.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Url = "https://interviewapp.pythonanywhere.com/api/user/profile/";
const user = "https://interviewapp.pythonanywhere.com/auth/users/me/";
function CreateProfile() {
    const [name, setName] = useState("");
    const [work, setWork] = useState("");
    const [author, setAuthor] = useState("");
    const [gender, setGender] = useState("");
    const [lives, setLives] = useState("");
    const [isError, setIsError] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [coverPhoto, setCoverPhoto] = useState("");
    const Access = localStorage.accessToken;
    const navigate = useNavigate();
    useEffect(() => {
        //                                                         AUTHOR that is CURRENTLY LOGGED IN and about to POST (INTERCEPTOR AND .GET)
        axios.interceptors.request.use(
            (config) => {
                config.headers.authorization = `JWT ${Access}`;
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
        axios.get(user).then((res) => {
            setAuthor(res.data.id);
        });
    }, []);

    const handleProfileImage = (e) => {
        console.log(e.target.files);
        setProfileImage(e.target.files[0]);
    };
    const handleCoverPhoto = (e) => {
        console.log(e.target.files);
        setCoverPhoto(e.target.files[0]);
    };
    const create = (e) => {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append("parent", author);
        formdata.append("name", name);
        formdata.append("works_at", work);
        formdata.append("gender", gender);
        formdata.append("lives", lives);
        formdata.append("avatar", profileImage);
        formdata.append("coverPhoto", coverPhoto);
        axios({
            method: "post",
            url: Url,
            data: formdata,
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `JWT ${Access}`,
            },
        })
            .then((response) => {
                console.log(response.data);
                navigate("/profile");
            })
            .catch((error) => setIsError(error.message));
        //navigate('/profile')
    };
    return (
        <body className="createBody">
            <div className="CreateProfile">
                <h1 className="create">Create Profile</h1>
                <form className="createForm">
                    <input
                        type="text"
                        class="form-control"
                        id="exampleFormControlInput1"
                        placeholder="Enter Full Name"
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        class="form-control"
                        id="exampleFormControlInput1"
                        placeholder="Enter Workplace"
                        onChange={(e) => setWork(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        class="form-control"
                        id="exampleFormControlInput1"
                        placeholder="Lives in (city, country)"
                        onChange={(e) => setLives(e.target.value)}
                        required
                    />

                    <label className="lbl">Gender : </label>
                    <select
                        name="gender"
                        className="gndr"
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option className="opt" value="Male" selected>
                            Male
                        </option>
                        <option className="opt" value="Female">
                            Female
                        </option>
                        <option className="opt" value="Other">
                            Other
                        </option>
                    </select>
                </form>
                <form className="createFrm">
                    <div className="profil">
                        <label for="formFile" class="form-label">
                            Upload Profile Picture:{" "}
                        </label>
                        <input
                            class="form-control"
                            type="file"
                            id="formFile"
                            accept="image/*"
                            onChange={handleProfileImage}
                        />
                    </div>
                    <div className="covr">
                        <label for="formFile" class="form-label">
                            Upload Cover Photo:{" "}
                        </label>
                        <input
                            class="form-control"
                            type="file"
                            id="formFile"
                            accept="image/*"
                            onChange={handleCoverPhoto}
                        />
                    </div>
                </form>

                <button className="createbtn" onClick={create}>
                    Create Profile
                </button>
            </div>
        </body>
    );
}
export default CreateProfile;
