import { useEffect, useState } from "react";
import "./createDriver.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { createDriverRequest } from "../../redux/actions/actionCreators";
import {
  capitalizeFirstLetter,
  capitalizeFirstWord,
  formatDOB,
  isDriverExists,
  validateDateFormat,
  validateEmptyFields,
  validateImageFormat,
  validateNameFormat,
  validateTeams,
} from "./validations";

const CreateDriverForm = () => {
  const [forename, setForename] = useState("");
  const [surname, setSurname] = useState("");
  const [nationality, setNationality] = useState("");
  const [image, setImage] = useState("");
  const [dob, setDob] = useState("");
  const [description, setDescription] = useState("");
  const [teams, setTeams] = useState("");
  const [teamsApi, setTeamsApi] = useState("");
  const [forenameError, setForenameError] = useState("");
  const [surnameError, setSurnameError] = useState("");
  const [nationalityError, setNationalityError] = useState("");
  const [imageError, setImageError] = useState("");
  const [dobError, setDobError] = useState("");
  const [teamsError, setTeamsError] = useState("");
  const [emptyFieldsError, setEmptyFieldsError] = useState("");

  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);

  useEffect(() => {
    fetch("http://127.0.0.1:3001/drivers/teams")
      .then((response) => response.json())
      .then((data) => setTeamsApi(data))
      .catch((error) => console.error("Error fetching teams:", error));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    resetErrors();

    if (validateForm()) {
      const driverExists = await isDriverExists(forename, surname);
      if (driverExists) {
        setForenameError("Driver already exists");
        return;
      }

      dispatch(
        createDriverRequest({
          forename,
          surname,
          nationality,
          image,
          dob,
          description,
          teams,
        })
      );

      resetForm();
      alert("Driver created successfully");
    }
  };

  const resetErrors = () => {
    setForenameError("");
    setSurnameError("");
    setNationalityError("");
    setImageError("");
    setDobError("");
    setTeamsError("");
  };

  const resetForm = () => {
    setForename("");
    setSurname("");
    setNationality("");
    setImage("");
    setDob("");
    setDescription("");
    setTeams("");
  };

  const validateForm = () => {
    if (
      validateEmptyFields(
        forename,
        surname,
        nationality,
        image,
        dob,
        description,
        teams
      )
    ) {
      setEmptyFieldsError("Please fill in all fields.");
      return false;
    }

    if (!validateDateFormat(dob)) {
      setDobError("Date of birth must be in the format dd/mm/yyyy.");
      return false;
    }

    if (!validateNameFormat(forename, surname)) {
      setForenameError(
        "First name and last name should not contain numbers or special characters."
      );
      return false;
    }

    if (!validateImageFormat(image)) {
      setImageError("Image URL should have JPG or JPEG format.");
      return false;
    }

    if (!validateTeams(teams, teamsApi)) {
      setTeamsError("Please enter valid teams.");
      return false;
    }

    return true;
  };

  const handleForenameChange = (event) => {
    setForename(capitalizeFirstLetter(event.target.value));
  };

  const handleSurnameChange = (event) => {
    setSurname(capitalizeFirstLetter(event.target.value));
  };

  const handleNationalityChange = (event) => {
    setNationality(capitalizeFirstLetter(event.target.value));
  };

  const handleTeamsChange = (event) => {
    setTeams(capitalizeFirstLetter(event.target.value));
  };

  const handleDescriptionChange = (event) => {
    setDescription(capitalizeFirstWord(event.target.value));
  };

  const handleDOBChange = (event) => {
    setDob(formatDOB(event.target.value));
  };

  return (
    <main className="form">
      <form onSubmit={handleSubmit} className="formContainer">
        <h1 className="formTitle">Create new driver</h1>
        <div className="formContInutsTextarea">
          <div className="formContInputs">
            <label htmlFor="forename" className="formLabel">
              Forename:
            </label>
            <input
              type="text"
              id="forename"
              value={forename}
              onChange={handleForenameChange}
              placeholder="Forename (no numbers or special characters)"
              className="formInput"
            />
            {forenameError && <div className="errorForm">{forenameError}</div>}
            <label htmlFor="surname" className="formLabel">
              Surname:
            </label>
            <input
              type="text"
              id="surname"
              value={surname}
              onChange={handleSurnameChange}
              placeholder="Surname (no numbers or special characters)"
              className="formInput"
            />
            {surnameError && <div className="errorForm">{surnameError}</div>}
            <label htmlFor="teams" className="formLabel">
              Teams:
            </label>
            <input
              type="text"
              id="teams"
              value={teams}
              onChange={handleTeamsChange}
              placeholder="Enter teams (Ferrari, Mercedes)"
              className="formInput"
            />
            {teamsError && <div className="errorForm">{teamsError}</div>}
            <label htmlFor="nationality" className="formLabel">
              Nationality:
            </label>
            <input
              type="text"
              id="nationality"
              value={nationality}
              onChange={handleNationalityChange}
              placeholder="Enter nationality"
              className="formInput"
            />
            {nationalityError && (
              <div className="errorForm">{nationalityError}</div>
            )}
            <label htmlFor="dob" className="formLabel">
              Dob:
            </label>
            <input
              type="text"
              id="dob"
              value={dob}
              onChange={handleDOBChange}
              placeholder="Enter date of birth (dd/mm/yyyy)"
              className="formInput"
            />
            {dobError && <div className="errorForm">{dobError}</div>}
            <label htmlFor="image" className="formLabel">
              URL from image:
            </label>
            <input
              type="text"
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Enter image URL (.JPG or .JPEG)"
              className="formInput"
            />
            {imageError && <div className="errorForm">{imageError}</div>}
          </div>
          <div className="formContTextarea">
            <label htmlFor="description" className="formLabelText">
              Description:
            </label>
            <textarea
              id="description"
              value={description}
              onChange={handleDescriptionChange}
              className="formTextarea"
              maxLength={1400}
              placeholder="Enter description"
            />
          </div>
        </div>
        <button type="submit" className="formButtom">
          Create
        </button>
        <div className="conatinerError">
          {" "}
          {emptyFieldsError && (
            <div className="errorForm">{emptyFieldsError}</div>
          )}
          {error && <div className="errorForm">{error}</div>}
        </div>
      </form>
    </main>
  );
};

export default CreateDriverForm;