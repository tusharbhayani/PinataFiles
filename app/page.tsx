"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // New state for success message
  const [isSigningUp, setIsSigningUp] = useState<boolean>(false);
  const [isOrganization, setIsOrganization] = useState<boolean | null>(null);
  const [organizationName, setOrganizationName] = useState<string>("");
  const [orgDid, setOrgDid] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [employeeOrgName, setEmployeeOrgName] = useState<string>(""); // State for Employee's Organization Name
  // const router = useRouter();
  const navigationRouter = useRouter();

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setError(null);
    setSuccessMessage(null);

    // try {
    const res = await fetch("/api/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Something went wrong");
      return;
    }

    // Check dashboard type and store user data in localStorage
    if (data.dashboard) {
      localStorage.setItem("userData", JSON.stringify(data)); // Store the user data

      // Call external API with organization name and store the result
      const orgId = data?.Organization_Name;
      const apiResponse = await fetch(
        `https://dif-pinatrust.onrender.com/folders/${orgId}`
      );
      const folderData = await apiResponse.json();

      localStorage.setItem("folderData", JSON.stringify(folderData));

      // Redirect based on dashboard type
      if (data.dashboard === "organization") {
        navigationRouter.push("/organization-dashboard");
      } else if (data.dashboard === "employee") {
        navigationRouter.push("/employee-dashboard");
      }
    }
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null); // Clear success message

    try {
      const userData = isOrganization
        ? { organizationName, email, password, org_did: orgDid }
        : {
            firstName,
            lastName,
            email,
            password,
            organizationName: employeeOrgName,
          };

      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
      } else {
        // Set the success message based on the type of user registered
        if (isOrganization) {
          setSuccessMessage("Organization Registered Successfully!"); // Organization registration message
        } else {
          setSuccessMessage("Employee Registered Successfully!"); // Employee registration message
        }
        navigationRouter.push("/"); // Optionally, redirect after a delay
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Failed to sign up. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        {!isSigningUp ? (
          <>
            <h2 className="text-2xl font-bold mb-6 text-black">Sign In</h2>
            <form onSubmit={handleSignIn}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 text-black px-3 py-2 border border-gray-300 rounded-lg shadow-sm w-full"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 text-black px-3 py-2 border border-gray-300 rounded-lg shadow-sm w-full"
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              {successMessage && (
                <p className="text-green-500 text-sm">{successMessage}</p>
              )}{" "}
              {/* Display success message */}
              <button
                type="submit"
                className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700"
              >
                Sign In
              </button>
            </form>

            <button
              onClick={() => setIsSigningUp(true)}
              className="mt-4 w-full py-2 px-4 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700"
            >
              Sign Up
            </button>
          </>
        ) : (
          <>
            {isOrganization === null ? (
              <>
                <h2 className="text-2xl font-bold mb-6 text-black">
                  Are you an Organization?
                </h2>
                <button
                  onClick={() => setIsOrganization(true)}
                  className="w-full py-2 px-4 mb-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"
                >
                  Yes
                </button>
                <button
                  onClick={() => setIsOrganization(false)}
                  className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
                >
                  No
                </button>
              </>
            ) : (
              <form onSubmit={handleSignUp}>
                <h2 className="text-2xl font-bold mb-6 text-black">
                  {isOrganization ? "Organization Sign Up" : "Employee Sign Up"}
                </h2>
                {isOrganization ? (
                  <>
                    <div className="mb-4">
                      <label
                        htmlFor="organizationName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Organization Name
                      </label>
                      <input
                        type="text"
                        id="organizationName"
                        value={organizationName}
                        onChange={(e) => setOrganizationName(e.target.value)}
                        required
                        className="mt-1 text-black px-3 py-2 border border-gray-300 rounded-lg w-full"
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="orgDid"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Organization DID
                      </label>
                      <input
                        type="text"
                        id="orgDid"
                        value={orgDid}
                        onChange={(e) => setOrgDid(e.target.value)}
                        required
                        className="mt-1 text-black px-3 py-2 border border-gray-300 rounded-lg w-full"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mb-4">
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        className="mt-1 text-black px-3 py-2 border border-gray-300 rounded-lg w-full"
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        className="mt-1 text-black px-3 py-2 border border-gray-300 rounded-lg w-full"
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="employeeOrgName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Organization Name
                      </label>
                      <input
                        type="text"
                        id="employeeOrgName"
                        value={employeeOrgName}
                        onChange={(e) => setEmployeeOrgName(e.target.value)}
                        required
                        className="mt-1 text-black px-3 py-2 border border-gray-300 rounded-lg w-full"
                      />
                    </div>
                  </>
                )}
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1 text-black px-3 py-2 border border-gray-300 rounded-lg w-full"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mt-1 text-black px-3 py-2 border border-gray-300 rounded-lg w-full"
                  />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                {successMessage && (
                  <p className="text-green-500 text-sm">{successMessage}</p>
                )}{" "}
                {/* Display success message */}
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700"
                >
                  Sign Up
                </button>
                <button
                  onClick={() => {
                    setIsSigningUp(false);
                    setIsOrganization(null);
                  }}
                  className="mt-4 w-full py-2 px-4 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700"
                >
                  Back to Sign In
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}
