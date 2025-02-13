import React, { useState, useRef } from "react";

const Register = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  // Function to handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  // Function to trigger file input when div is clicked
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    // Self Registration Form
    
    <div className="min-h-screen bg-[#0B1E48] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl p-8">
        <h2 className="text-2xl font-semibold">Self Registration Form</h2>
        <p className="text-gray-600 text-sm mb-6">
          Complete this form to self-register and receive a Unique Identification Number (UIN)
        </p>
        
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div> 
            <div className="mb-4">
              <label className="block text-sm font-medium">Full Name <span className="text-red-500">*</span></label>
              <input type="text" className="w-full border rounded p-2 mt-1" placeholder="Enter Full Name Here" />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">Date of Birth <span className="text-red-500">*</span></label>
              <input type="date" className="w-full border rounded p-2 mt-1" />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">Gender <span className="text-red-500">*</span></label>
              <select className="w-full border rounded p-2 mt-1">
                <option>Select an Option</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">Email ID <span className="text-red-500">*</span></label>
              <input type="email" className="w-full border rounded p-2 mt-1" placeholder="Enter Email Here" />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">Address</label>
              <input  type="text" className="w-full border rounded p-2 mt-1 " placeholder="Enter Address Here"></input>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">State</label>
              <select className="w-full border rounded p-2 mt-1">
                <option>Select an Option</option>
              </select>
            </div>
          </div>

          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Photo <span className="text-red-500">*</span></label>

              {/* Image Upload Box */}
              <div
                className="border rounded-xl p-4 text-center flex flex-col items-center justify-center h-32 cursor-pointer  tw-mb-4 "
                style={{ width: "230px" }}
                onClick={handleUploadClick}
              >
                <img src="https://img.icons8.com/ios/50/000000/upload-to-cloud.png" alt="Upload" className=" block border rounded-lg h-8 w-8 mb-2 p-1" />
                {selectedImage ? (
                  <img src={selectedImage} alt="Uploaded" className="h-full w-full object-cover rounded-xl" />
                ) : (
                  <p className="text-gray-500 text-sm">
                    <span className="text-blue-600 font-semibold">Click to upload</span> or Capture using front camera PNG, JPG or JPEG (max size: 1MB)
                  </p>
                )}
              </div>

              {/* Hidden File Input */}
              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
              />

              <button className="bg-blue-600 text-white px-4 py-2 rounded mt-4 w-full "  style={{ width: "230px", margin_top: "60px" }}>
                Take Photo
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">Mobile Number</label>
              <input type="text" className="w-full border rounded p-2 mt-1" placeholder="Enter Mobile Number Here" />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">City</label>
              <select className="w-full border rounded p-2 mt-1">
                <option>Select an Option</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium">Postal Code</label>
              <input type="text" className="w-full border rounded p-2 mt-1" placeholder="Enter Postal Code" />
            </div>
          </div>
        </form>
        
        <div className="mt-4 text-sm">
          <p>The data collected above will be used only to create credential(s) for you, that will further facilitate your use of MOSIP. By ticking the box below, you consent to submitting your data to be stored and processed for the above purpose.</p>
          <input type="checkbox" className="mr-2" /> I consent *
        </div>

        <div className="flex justify-between mt-6">
          <button className="border px-4 py-2 rounded">Clear Form</button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Preview</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
