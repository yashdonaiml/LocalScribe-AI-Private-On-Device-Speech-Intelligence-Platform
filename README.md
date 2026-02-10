# AI Transcript App

An AI-powered application for voice transcription with advanced cleaning capabilities. It features a browser-based recording interface, a robust FastAPI backend for processing, and is designed to be highly compatible with various Large Language Model (LLM) providers.

---

## Features

- 🎤 **Browser-based Voice Recording:** Easily capture audio directly from your web browser.
- 🔊 **English Whisper Speech-to-Text:** Utilizes the Whisper model for accurate, locally-run English speech-to-text transcription.
- 🤖 **LLM-Powered Transcription Cleaning:** Leverages a Large Language Model to refine transcripts by removing filler words and correcting grammatical errors.
- 🔌 **OpenAI API-Compatible:** Designed to work seamlessly with Ollama, LM Studio, OpenAI's API, or any other OpenAI-compatible API endpoints.
- 📋 **One-Click Copy:** Quickly copy the processed transcription to your clipboard.

---

## Getting Started

This project prioritizes developer convenience through containerized environments.

### 🚀 Dev Container (Recommended)

The project is configured for seamless development using VS Code Dev Containers.

#### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [VS Code](https://code.visualstudio.com/)
- [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

#### Setup

1.  Open the project in VS Code.
2.  Follow the prompt to "Reopen in Container" or use `Cmd/Ctrl+Shift+P` and select "Dev Containers: Reopen in Container".
3.  The initial build and model download may take 5-10 minutes.

The Dev Container environment automatically:
*   Builds and starts both the application and Ollama containers.
*   Installs all necessary Python and Node.js dependencies.
*   Downloads the default Ollama model.
*   Creates a `backend/.env` file with functional default settings.

### ☁️ Cloud Development Environments (e.g., GitHub Codespaces)

This project's Dev Container configuration is compatible with cloud-based development environments.

#### Setup

1.  Create a new Codespace for this repository.
2.  Ensure your Codespace instance has adequate resources (4+ CPU cores recommended).
3.  Allow 5-10 minutes for the initial setup.

Upon readiness, ports 3000 (frontend), 8000 (backend), and 11434 (Ollama) will be automatically forwarded. Access the frontend via the provided URL for port 3000.

For local `localhost` access to forwarded ports (e.g., for `localhost:8000`), connect to your Codespace from a VS Code Desktop instance with the GitHub Codespaces extension installed.

### 🛠️ Manual Installation

For users preferring a local setup without containers:

#### Prerequisites

-   Python 3.12+
-   Node.js 24+
-   [uv package manager](https://docs.astral.sh/uv/)
-   An LLM server such as [Ollama](https://ollama.com/) or [LM Studio](https://lmstudio.ai/)

#### Setup

1.  Copy `backend/.env.example` to `backend/.env` and configure your LLM settings.
2.  Install backend dependencies:
    ```bash
    cd backend
    uv sync
    ```
3.  Install frontend dependencies:
    ```bash
    cd frontend
    npm install
    ```
4.  Start your chosen LLM server and pull the desired model (e.g., `ollama pull llama3.1:8b`).

---

## Running the Application

To run the application, open two separate terminal instances:

**Terminal 1 - Backend:**
```bash
cd backend
uv sync && uv run uvicorn app:app --reload --host 0.0.0.0 --port 8000 --timeout-keep-alive 600
```
> **Note:** The `--timeout-keep-alive 600` flag sets a 10-minute timeout, accommodating longer audio processing times.

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install && npm run dev
```

Once both servers are running, access the application in your web browser at `http://localhost:3000`.

---

## Configuration

The application is designed for compatibility with any OpenAI API-format LLM provider.

The Dev Container environment automatically configures `backend/.env` with Ollama defaults. To use an alternative provider, modify the `backend/.env` file with your specific API details:

-   `LLM_BASE_URL`: The API endpoint of your LLM provider.
-   `LLM_API_KEY`: Your API key (if required by the provider).
-   `LLM_MODEL`: The name of the LLM model to be used.

---

## Troubleshooting

### Container Startup and Performance Issues

**Symptom:** The container is slow to start or perform, especially when running the LLM.
**Cause:** LLMs running on CPU require substantial system resources.
**Solution:** Configure Docker Desktop to allocate sufficient CPU and memory:
1.  Open **Docker Desktop** → **Settings** → **Resources**.
2.  Set **CPUs** to the maximum available (8+ cores recommended).
3.  Set **Memory** to at least 16GB.
4.  Click **Apply & Restart**.
**Note:** Faster CPUs and more RAM directly improve LLM response times.

### Microphone Not Working

**Symptom:** The browser-based recording function does not detect audio input.
**Solution:**
*   Use a compatible browser (e.g., Chrome or Firefox; Safari may have known issues).
*   Verify that your browser has microphone permissions enabled in its settings.

### Backend Startup Failures

**Symptom:** The FastAPI backend server fails to start.
**Solution:**
*   Check for Whisper model download issues in `~/.cache/huggingface/`.
*   Ensure your system has sufficient disk space for model downloads (models are approximately 150MB).

### LLM Errors

**Symptom:** The LLM cleaning process encounters errors.
**Solution:**
*   Confirm that your chosen LLM service (e.g., Ollama) is actively running.
*   Verify that the required LLM model has been successfully downloaded. (Models are automatically downloaded during Dev Container setup).
*   Note that the transcription functionality (raw Whisper output) will still work even if the LLM cleaning fails.

### Slow LLM Responses

**Symptom:** The LLM cleaning process takes an extended amount of time.
**Solution:**
*   Review Docker resource allocation (refer to "Container Startup and Performance Issues" above).
*   **Alternative Models:** Consider switching to a smaller, faster LLM model by editing `LLM_MODEL` in `backend/.env`. Be aware this may involve a trade-off in transcription cleaning quality.
*   **Cloud APIs:** For optimal speed and quality, consider utilizing a cloud-based LLM API (e.g., OpenAI) by configuring `backend/.env` accordingly.

### Cannot Access Localhost Ports (3000 or 8000)

**Symptom:** The application is unreachable via `localhost` from your host machine.
**Solution:**
*   **Docker Desktop Configuration:** In Docker Desktop, navigate to **Settings** → **Resources** → **Network**.
*   Enable **"Use host networking"** (a Docker Desktop restart may be required).
*   Restart both the frontend and backend servers after making this change.

### Port Already in Use

**Symptom:** Either the backend or frontend server fails to start due to a port conflict.
**Solution:**
*   **Backend:** Change the backend port by adding `--port <new_port_number>` (e.g., `--port 8001`) to the `uvicorn` command.
*   **Frontend:** Modify the `port` setting within the `vite.config.js` file to an available port.