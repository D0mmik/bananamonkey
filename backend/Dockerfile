# Use the official Python 3.12 image from Docker Hub
FROM python:3.12.8-slim

# Set the working directory inside the container
WORKDIR /backend

# Copy the requirements.txt file into the container
COPY requirements.txt .

# Install the Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of your application code into the container
COPY . .

# Expose the port FastAPI will run on
EXPOSE 8000

# Define the command to run FastAPI with uvicorn
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]