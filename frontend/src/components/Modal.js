

"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, FolderUp, Check, X } from "lucide-react";

export default function Modal() {
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("/images/person1.png"); // Default image
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [error, setError] = useState("");

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const inputFileRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    if (!isCameraOpen) return;

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });

        if (!videoRef.current) {
          setError("Video element still not available after mount.");
          return;
        }

        videoRef.current.srcObject = stream;
        streamRef.current = stream;

        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play().catch((err) => {
            setError("Video play error: " + err.message);
          });
        };
      } catch (err) {
        console.error("Camera access error:", err);
        setError("Camera access failed. Please allow permission.");
      }
    };

    startCamera();
  }, [isCameraOpen]);

  const openCamera = () => {
    setError("");
    setIsCameraOpen(true);
  };

  const closeCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setIsCameraOpen(false);

    // Always revert to person1.png when camera is closed without taking a photo
    if (!photoUploaded) {
      setPreviewUrl("/images/person1.png");
    }
  };

  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const context = canvas.getContext("2d");
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageDataURL = canvas.toDataURL("image/png");

    // Update all states together to avoid race conditions
    setPreviewUrl(imageDataURL);
    setPhotoUploaded(true);
    setIsCameraOpen(false);
    
    // Clean up camera stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setPhotoUploaded(true);
    }
  };

  

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
      <div className="bg-gradient-to-b from-[#EFEFEF] to-[#0B869F] rounded-xl p-6 w-full max-w-md text-center relative shadow-xl">

        <h2 className="text-lg text-black font-medium mb-1">Upload a Frontal View</h2>
        <p className="text-sm text-gray-600 mb-4">
          Smile with teeth fully visible, looking straight at the camera.
        </p>

        {error && (
          <div className="bg-red-100 text-red-800 text-xs p-2 rounded mb-2">
            Error: {error}
          </div>
        )}

        {/* Circle Frame */}
        <div className="w-48 h-48 mx-auto overflow-hidden relative mb-4 rounded-full border border-white shadow-md">
          {isCameraOpen ? (
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            )
          )}
        </div>

        {/* Photo Approved */}
        {photoUploaded && !isCameraOpen && (
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center border border-[#0B869F]">
              <Check size={14} className="text-[#0B869F]" />
            </div>
            <p className="text-sm text-white font-medium">Photo Approved</p>
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-col items-center gap-3 mb-4">
          {!isCameraOpen ? (
            <>
              <button
                onClick={openCamera}
                className="flex items-center justify-center gap-2 bg-[#0B869F] text-white border border-[#0B869F] px-4 py-2 rounded-md hover:bg-[#097689] text-sm w-40"
              >
                <Camera size={18} />
                Take Photo
              </button>

              <button
                onClick={() => inputFileRef.current?.click()}
                className="flex items-center justify-center gap-2 bg-gray-200 text-gray-700 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-300 text-sm w-40"
              >
                <FolderUp size={18} />
                Upload Photo
              </button>

              
            </>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={takePhoto}
                className="flex items-center justify-center gap-2 bg-[#0B869F] text-white px-4 py-2 rounded-md hover:bg-[#097689] text-sm"
              >
                <Check size={18} />
                Capture Photo
              </button>

              <button
                onClick={closeCamera}
                className="flex items-center justify-center gap-2 bg-gray-300 text-gray-800 px-3 py-2 rounded-md hover:bg-gray-400 text-sm"
              >
                <X size={18} />
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Continue Button */}
        <button
          disabled={!photoUploaded}
          className={`w-full py-2 rounded-md text-white font-medium transition-colors duration-200 ${
            photoUploaded
              ? "bg-[#0B869F] hover:bg-[#097689]"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Continue
        </button>

        {/* Hidden Inputs */}
        <input
          ref={inputFileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
}