"use client";

import { useEffect, useRef, useState } from "react";
import { useUser } from "../../context/UserContext"; // Assuming you have a UserContext
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Header() {
  const { user } = useUser();
  const [showPopup, setShowPopup] = useState<boolean>(false); // State to toggle the popup visibility
  const [isOpen, setIsOpen] = useState<boolean>(true); // State to manage popup open/close
  const cardRef = useRef<HTMLDivElement | null>(null); // Reference to the user profile card

  // Toggle the popup when the profile name is clicked
  const togglePopup = () => {
    setShowPopup((prev) => !prev);
  };

  // Close the popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        // setIsOpen(false); // Close the card if clicked outside
      }
    };

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isOpen) return null; // Don't render the card if closed

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold mx-auto"><b>Weather Forecast</b></h1>
      <div className="relative">
        {/* Display the user's name if logged in */}
        {user ? (
          <p
            className="cursor-pointer"
            onClick={togglePopup} // Toggle the popup on click
          >
            Welcome, {user.name}
          </p>
        ) : (
          <p>Please log in</p>
        )}

        {/* Popup displaying user details */}
        {showPopup && user && (
          <div className="user-profile-card" ref={cardRef}>
            <div className="user-icon">
              <i className="fas fa-user"></i>
            </div>
            <div className="user-details">
              <p><strong>{user.name}</strong></p>
              <p><strong>{user.email}</strong> </p>
              {/* You can add more user details here */}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
