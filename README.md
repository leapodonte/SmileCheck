# 🦷 Dental Health AI Analyzer 🤖

This project is a Streamlit web application that leverages the Google Gemini API to analyze dental health based on uploaded images. Users can upload up to three images, and the application sends them to the Gemini API, which then provides a textual analysis acting as a dental health care assistant. This tool aims to provide preliminary insights into dental health conditions based on visual data.

## 🚀 Features

*   **Image Upload:** Allows users to upload up to three dental images (JPG, JPEG, or PNG formats).
*   **AI-Powered Analysis:** Utilizes the Google Gemini API for intelligent image analysis.
*   **Dental Health Assessment:** The Gemini API acts as a dental health care assistant, providing insights and observations based on the uploaded images.
*   **User-Friendly Interface:** Built with Streamlit for an intuitive and easy-to-use web application.
*   **Secure API Key Management:** Employs Streamlit's secrets management to securely store and access the Gemini API key.
*   **Clear Response Display:** Presents the API's textual response in a clear and readable format.
*   **Error Handling:** The prompt includes instructions for the model to handle cases where the image is unclear or unrelated to dental situations.

## 🛠️ Tech Stack

*   **Frontend:**
    *   Streamlit: Web application framework
*   **Backend:**
    *   Python: Programming language
    *   Google Gemini API: AI model for image analysis
*   **Dependencies:**
    *   `streamlit`
    *   `google.genai`
    *   `google.genai.types`
    *   `dotenv`
    *   `os`
*   **Other:**
    *   `.env`: Environment variable management

## 📦 Installation

### Prerequisites

*   Python 3.6+
*   A Google Cloud project with the Gemini API enabled
*   A Gemini API key

### Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/theabdulraffay/Smile-Check-Testing-App.git
    cd Smile-Check-Testing-App
    ```

2.  Create a virtual environment (recommended):

    ```bash
    python -m venv venv
    source venv/bin/activate  # On Linux/macOS
    venv\Scripts\activate  # On Windows
    ```

3.  Install the dependencies:

    ```bash
    pip install streamlit google-generativeai python-dotenv
    ```

4.  Create a `.env` file in the root directory and add your Gemini API key:

    ```
    GEMINI_API="YOUR_GEMINI_API_KEY"
    ```

    Alternatively, you can use Streamlit's secrets management to store the API key.

## 💻 Usage

1.  Run the Streamlit application:

    ```bash
    streamlit run app.py
    ```

2.  Open your web browser and navigate to the address displayed in the terminal (usually `http://localhost:8501`).

3.  Upload up to three dental images using the file uploaders.

4.  Click the "Upload" button to send the images to the Gemini API for analysis.

5.  The API's response will be displayed on the screen.

## 📂 Project Structure

```
├── app.py               # Main Streamlit application file
├── .env                # Environment variables (API key)
├── venv/               # Virtual environment directory
│   ├── ...
├── README.md           # Project documentation
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues to suggest improvements or report bugs.

## 📝 License

This project is licensed under the [MIT License](LICENSE).

## 📬 Contact

If you have any questions or suggestions, please feel free to contact me at [abdulraffay2494@gmail.com](mailto:abdulraffay2494@gmail.com).

## 💖 Thanks Message

Thank you for checking out this project! I hope it's helpful for your dental health analysis needs.
