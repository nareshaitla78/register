import React, { useState, useRef } from "react";
import axios from "axios";

const Register = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [base64Image, setBase64Image] = useState(""); // State for Base64 image
  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState({});
  const [previewData, setPreviewData] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [uin, setUin] = useState("");

  const fileInputRef = useRef(null);

  // Function to generate a unique UIN
  const generateUIN = () => {
    const randomNumber = Math.floor(Math.random() * 1000000000);
    return `UIN-${randomNumber}`;
  };

  // Function to handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // For preview
      setSelectedImage(imageUrl);

      // Convert the file to Base64
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result; // Base64 string
        setBase64Image(base64String); // Store Base64 string in state
      };
      reader.onerror = (error) => {
        console.error("Error reading file:", error);
      };
      reader.readAsDataURL(file); // Read the file as Base64
    }
  };

  // Function to trigger file input when div is clicked
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  // Function to validate the form
  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!fullName.trim()) {
      newErrors.fullName = "Full Name is required";
    } else if (/\d/.test(fullName)) {
      newErrors.fullName = "Full Name should not contain numbers";
    }

    // Date of Birth validation
    if (!dateOfBirth) {
      newErrors.dateOfBirth = "Date of Birth is required";
    } else if (new Date(dateOfBirth) > new Date()) {
      newErrors.dateOfBirth = "Date of Birth cannot be greater than today";
    }

    // Email validation
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    // Photo validation
    if (!selectedImage) {
      newErrors.photo = "Photo is required";
    }

    // Consent validation
    if (!consent) {
      newErrors.consent = "Please consent to proceed";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Function to handle form submission for preview
  const handlePreview = () => {
    if (validateForm()) {
      setPreviewData({
        fullName,
        dateOfBirth,
        mobileNumber,
        email,
        gender,
        address,
        selectedImage,
      });
    }
  };

  // Function to clear the form
  const handleClear = () => {
    setFullName("");
    setDateOfBirth("");
    setMobileNumber("");
    setEmail("");
    setGender("");
    setAddress("");
    setSelectedImage(null);
    setConsent(false);
    setErrors({});
  };

  // Function to handle submit button click
  const handleSubmit = async () => {
    if (!validateForm()) return; // Validate the form before submission

    const newUIN = generateUIN(); // Generate a unique UIN
    setUin(newUIN); // Set the UIN in state
    setShowSuccessPopup(true); // Show success popup
    setPreviewData(null); // Close the preview popup
    handleClear(); // Clear the form

    // Prepare the userData object
    const userData = {
      fullName: [
        {
          language: "eng",
          value: fullName,
        },
      ],
      phone: `${mobileNumber}`,
      email: email,
      dateOfBirth: dateOfBirth,
      gender: [
        {
          language: "eng",
          value: gender,
        },
      ],
      address: [
        {
          language: "eng",
          value: address,
        },
      ],
      photo: base64Image, // Use the Base64 string here
    };

    // Send data to the backend API
    try {
      const response = await axios.post(
        "https://api-internal.mosipcon.mosip.net/v1/selfregistration/create",
        userData
      );
      console.log("API Response:", response.data);
    } catch (error) {
      console.error("Error sending data to the API:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1E48] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl p-8">
        <h2 className="text-2xl font-semibold">Self Registration Form</h2>
        <p className="text-gray-600 text-sm mb-6">
          Complete this form to self-register and receive a Unique Identification Number (UIN)
        </p>

        <form className="">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Full Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  className="w-full border rounded p-2 mt-1"
                  placeholder="Enter Full Name Here"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium">Date of Birth <span className="text-red-500">*</span></label>
                <input
                  type="date"
                  className="w-full border rounded p-2 mt-1"
                  value={dateOfBirth}
                  max={new Date().toISOString().split("T")[0]} // Restrict future dates
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />
                {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium">Mobile Number</label>
                <input
                  type="text"
                  className="w-full border rounded p-2 mt-1"
                  placeholder="Enter Mobile Number Here"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium">Email ID <span className="text-red-500">*</span></label>
                <input
                  type="email"
                  className="w-full border rounded p-2 mt-1"
                  placeholder="Enter Email Here"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
            </div>

            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Photo <span className="text-red-500">*</span></label>
                <div
                  className="border rounded-xl p-4 text-center flex flex-col items-center justify-center h-32 cursor-pointer"
                  style={{ width: "230px", height: "155px" }}
                  onClick={handleUploadClick}
                >
                  {selectedImage ? (
                    <div className="relative w-full h-full">
                      <img
                        src={selectedImage}
                        alt="Uploaded"
                        className="w-full h-full object-cover rounded-xl"
                      />
                      <button
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent triggering the file input
                          setSelectedImage(null);
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <>
                      <img
                        src="https://img.icons8.com/ios/50/000000/upload-to-cloud.png"
                        alt="Upload"
                        className="block border rounded-lg h-8 w-8 mb-2 p-1"
                      />
                      <p className="text-gray-500 text-sm">
                        <span className="text-blue-600 font-semibold">Click to upload</span> or Capture using front camera PNG, JPG or JPEG (max size: 1MB)
                      </p>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileChange}
                />
                {errors.photo && <p className="text-red-500 text-sm">{errors.photo}</p>}
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded mt-4 w-full sm:w-auto md:tw-w-[100%]" style={{ width: "230px" }}
                >
                  Take Photo
                </button>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium">Gender</label> {/* Removed * */}
                <select
                  className="w-full border rounded p-2 mt-1"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option>Select an Option</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mb-4" style={{ width: "100%" }}>
            <label className="block text-sm font-medium">Address</label>
            <input
              type="text"
              className="w-full border rounded p-2 mt-1"
              placeholder="Enter Address Here"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </form>

        <div className="mt-4 text-sm">
          <p>
            The data collected above will be used only to create credential(s) for you, that will further facilitate your use of MOSIP. By ticking the box below, you consent to submitting your data to be stored and processed for the above purpose.
          </p>
          <input
            type="checkbox"
            className="mr-2"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
          />
          I consent *
          {errors.consent && <p className="text-red-500 text-sm">{errors.consent}</p>}
        </div>

        <div className="flex sm:flex-col md:justify-end md:flex-row mt-6 ">
          <button className="border-2 px-4 py-2 rounded border-blue-300 text-blue-400 xl:mr-6 sm:mb-4 md:mb-0 " onClick={handleClear}>
            Clear Form
          </button>
          <button
            className={`bg-blue-600 text-white px-4 py-2 rounded ${
              !(fullName && dateOfBirth && email && selectedImage && consent) ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!(fullName && dateOfBirth && email && selectedImage && consent)}
            onClick={handlePreview}
          >
            Preview
          </button>
        </div>

        {/* Preview Popup */}
        {previewData && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-xl p-8 w-full max-w-2xl">
              <h2 className="text-2xl font-semibold mb-6 text-center">Confirm Details</h2>
              <div className="flex flex-row md:flex-row gap-6">
                {/* Left Column for Details */}
                <div className="flex-1 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <p className="mt-1 text-lg font-semibold">{previewData.fullName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                    <p className="mt-1 text-lg font-semibold">{previewData.dateOfBirth}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Gender</label>
                    <p className="mt-1 text-lg font-semibold">{previewData.gender}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email ID</label>
                    <p className="mt-1 text-lg font-semibold">{previewData.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <p className="mt-1 text-lg font-semibold">{previewData.address}</p>
                  </div>
                </div>

                {/* Right Column for Photo and Mobile Number */}
                <div className="flex flex-col items-center md:items-end space-y-4">
                  <div className="w-32 h-32 rounded-lg overflow-hidden">
                    {previewData.selectedImage && (
                      <img
                        src={previewData.selectedImage}
                        alt="Uploaded"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                    <p className="mt-1 text-lg font-semibold">{previewData.mobileNumber}</p>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end mt-8 space-x-4">
                <button
                  className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50"
                  onClick={() => setPreviewData(null)}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Success Popup */}
        {showSuccessPopup && (
          <div className="fixed inset-0 bg-[#0B1E48] bg-opacity-90 flex items-center justify-center">
            <div className="bg-white rounded-xl p-8 w-full max-w-md text-center border-green-600 border-t-4">
              {/* Right Symbol (✓) */}
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-2xl">✓</span>
                </div>
              </div>

              <h2 className="text-2xl font-semibold mb-4">Congratulations!</h2>
              <p className="text-gray-600 mb-6">
                Your Unique Identification Number (UIN) has been <br /> successfully issued:
                <span className="text-black-600 font-semibold"> {uin}</span> <br />
                Please check your email for further details.
              </p>
              <button
                className="bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-800 w-full"
                onClick={() => setShowSuccessPopup(false)}
              >
                Okay
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;