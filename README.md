# OOTD Generator

I made this outfit generator webpage to help me pick out an outfit based on the current weather of the location the user set. I realized that I often forget many of the pieces I have in my closet and struggle to find an outfit that I like. 
Check out the live site demo here: https://ootd-generator.vercel.app/

## Features

### Live Weather block

- Use WeatherAPI to retrieve the current weather.
- Displays the city (set by the user), current temperature, and weather condition.

### Supabase Wardrobe Storage

- Admin upload clothing images through a backend admin page.
- Upload clothing image form will ask for:
  - Tops
  - Bottoms
  - min temperature
  - max temperature
- All clothing images are stored in a Supabase database (cloud storage)
- Database also visible on admin upload page, users can remove clothing items from the db using the delete button.

### Outfit Generator

- Finds clothing items from the db that are appropriate for the current temperature.
- Randomly selects one top and one bottom and display them

### Inspiration Carousel

- Displays outfit inspirational photos from Pinterest the user(me) uploaded.
- User can browse through the inspo photos using the arrow button.

### Wardrobe Notes

- Users can write notes about clothing they want or need.
- Notes are saved using browser Local Storage.


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

- Supabase (an online cloud storage)

### APIs

- WeatherAPI


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


### 4. Set up Supabase

If you also want to use Supabase for clothing item storage, go to https://supabase.com/ to create a new project.


### 5. Get API key from WeatherAPI

If you also want to use WeatherAPI to get the weather, go to https://www.weatherapi.com/ to create a new API key and paste it into your `.env` file


# Running the Project

The project has two separate parts:

1. The backend (server)
2. The frontend (client)

Both need to be running at the same time.

## 1. Start the Backend

Open a terminal.

```bash
cd server
npm run dev
```

Do not close the backend while using the application.

## 2. Start the Frontend (second terminal)

Keep the backend terminal running.

```bash
cd client
npm run dev
```


# Using the Application

## Add Clothing to Your Wardrobe

Open the Admin page from the application.

Upload an image of a clothing item.

You will need to enter information about the clothing item.

Note: this can only be done by the admin.

## Upload inspiration photos

Upload outfit photos from Pinterest to the `assets/` folder

## Get the weather

Change the city in the `weather.js` file to your own city.

## Generate Outfit
Click the "generate outfit" button to get an outfit!


