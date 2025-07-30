import streamlit as st
from google import genai
from google.genai import types
from dotenv import load_dotenv
import os
load_dotenv()

st.title("Image Display App")

# File uploader widget
first = st.file_uploader("Choose an image...", type=["jpg", "jpeg", "png"], key="first")

if first is not None:
    st.image(first, caption="Uploaded Image")


# sec = st.file_uploader("Choose an image...", type=["jpg", "jpeg", "png"], key="second")

# if sec is not None:
#     st.image(sec, caption="Uploaded Image")


# third = st.file_uploader("Choose an image...", type=["jpg", "jpeg", "png"], key="third")

# if third is not None:
#     st.image(third, caption="Uploaded Image")


if first is not None:
    st.success("All three images have been uploaded successfully!")

    # Show button and wait for click
    if st.button("Upload", key="upload_button"):
        # Initialize Gemini client
        client = genai.Client(api_key=st.secrets["GEMINI_API"])
        

        # Generate response for the first image
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=[
                types.Part.from_bytes(
                    data=first.getvalue(),
                    mime_type=first.type,
                ),
                # types.Part.from_bytes(
                #     data=sec.getvalue(),
                #     mime_type=sec.type,
                # ),
                # types.Part.from_bytes(
                #     data=third.getvalue(),
                #     mime_type=third.type,
                # ),

                'You are a dental health care assistant. Check the dental situation and give a score between 1- 10. Also analyze the teeths and give your feedback or any tips for the future. Keep your answer short and concise. \n If the images is not clear, say "Image not clear". or if image is not related to dental situation, say "Image not related to dental situation".'
            ]
        )

        # Display response
        st.write(response.text)
