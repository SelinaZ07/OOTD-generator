# 👗 OOTD Generator

A full-stack outfit generator that recommends a random outfit from your wardrobe based on the weather of the day.

The application allows users to upload clothing items, stores them in a SQLite database, retrieves live weather information using WeatherAPI, and automatically selects a top and bottom that fit the current temperature.

## Features

### Live Weather

- Retrieves current weather information using the WeatherAPI.
- Displays the city (set by the user), current temperature, and weather condition.
- Uses the current temperature when generating an outfit.

### Digital Wardrobe Storage

- Upload images of clothing items.
- Categorize clothing as:
  - Tops
  - Bottoms
- Set a minimum and maximum temperature for each item.
- View all uploaded clothing items.
- Delete button to remove clothing items from the wardrobe.

### Outfit Generator

- Finds clothing items that are appropriate for the current temperature.
- Randomly selects one top and one bottom.
- Displays the selected outfit on the home page.

### Inspiration Carousel

- Displays inspiration photos from Pinterest the user uploaded.
- Allows users to browse through different inspiration images.

### Wardrobe Notes

- Users can write notes about clothing they want or need.
- Notes are saved using browser Local Storage.

---

## Technologies Used

### Frontend

- React
- JavaScript
- HTML
- CSS
- Vite
- React Router

### Backend

- Node.js
- Express.js
- Axios
- Multer
- CORS
- dotenv

### Database

- SQLite

### APIs

- WeatherAPI

---


## How to use

### 1. Install Node.js

Make sure you have Node.js  and Git installed, then run:

```
npm install
```

### 2. Install front-end dependencies

The frontend is built using React and Vite.

```bash
cd client
```

Then install all required frontend packages:

```bash
npm install
```

`npm install` reads the `package.json` file and automatically installs all dependencies required by the frontend.

---
### 3. Install back-end dependencies

The backend is built using Node.js and Express.


```bash
cd server
```

Then run:

```bash
npm install
```

This installs all backend dependencies listed in the backend's `package.json`.

You only need to run this command the first time you set up the project.

---

### 4. Install SQLite

This project uses SQLite to store information about clothing items.

Download SQLite from:

https://www.sqlite.org/download.html

Download the SQLite command-line tools for Windows.

The downloaded file will usually look similar to:

```text
sqlite-tools-win-x64-xxxxxxx.zip
```

Extract the ZIP file.

You can place the SQLite files somewhere such as:

```text
C:\sqlite
```
---

### 5. Get API key from WeatherAPI

Go to https://www.weatherapi.com/ to create a new API key and paste it into your `.env` file

---

# Running the Project

The project has two separate parts:

1. The backend
2. The frontend

Both need to be running at the same time.

---

## 1. Start the Backend

Open a terminal.

```bash
cd server
npm run dev
```

Do not close the backend while using the application.

---

## 2. Start the Frontend (second terminal)

Keep the backend terminal running.


```bash
cd client
npm run dev
```
---


# Using the Application

## Add Clothing to Your Wardrobe

Open the Admin page from the application.

Upload an image of a clothing item.

You will need to enter information about the clothing item.


---

## Upload inspiration photos

Upload outfit photos from Pinterest to the `assets/` folder

## Get the weather

Change the city in the `weather.js` file to your own city.

## Generate Outfit
Click the "generate outfit" button to get an outfit!


