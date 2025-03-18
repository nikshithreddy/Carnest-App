# Carnest – Carpooling App

**Carnest** is a carpooling application that allows individuals to share space in their cars with others traveling to the same destination. It connects riders with drivers, offering a more efficient, affordable, and eco-friendly commuting alternative. By reducing the number of vehicles on the road, **Carnest** helps lower traffic congestion and decreases transportation costs.

## Problem It Solves

**Carnest** addresses the issue of inefficient and costly commuting by providing a platform where individuals can:
- Share car rides with others heading to the same destination.
- Reduce transportation costs by splitting fares with other riders.
- Contribute to a more eco-friendly transportation system by lowering the number of vehicles on the road.

## Features

- **User Authentication**: Secure sign-up, login, and profile management using JWT authentication.
- **Ride Creation & Booking**: Users can create rides, search for available rides, and book seats based on their location and preferences.
- **Geographical Proximity Filter**: Find rides based on proximity to the user's pickup and drop-off locations.
- **Seat Map Picker**: Users can select available seats within a carpool ride.
- **Ride Search**: Search for available rides by filtering by destination, date, and distance.
- **Admin Panel**: Admins can manage users, rides, and bookings.
- **Responsive Design**: Fully responsive UI, ensuring a seamless experience on both desktop and mobile devices.
- **Real-Time Location Integration**: Integration with Google Maps API for real-time location updates and distance calculations using the Haversine formula.

## Tech Stack

- **Frontend**: Vite, React, Material UI, Redux (for state management), JavaScript
- **Backend**: Django (Python), PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **Deployment**: Docker, AWS (Elastic Beanstalk for backend, Amplify for frontend)

## Installation

To set up **Carnest** locally, follow these steps:

### Prerequisites
- Docker (for containerized development)
- Node.js and npm (for frontend development)
- Python 3 and pip (for backend development)
- PostgreSQL (for database)

### Steps to Run the Project

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/carnest.git
2. **Set Up the Frontend Navigate to the frontend directory and install dependencies:**
   ```bash
   cd frontend

   npm install
3. **Set Up the Backend Navigate to the backend directory and install dependencies:**
   ```bash
   cd backend
   python -m venv venv

  - **On Windows**:
     ```bash
     venv\Scripts\activate
  - **On macOS/Linux**:
     ```bash
     source venv/bin/activate
  - **Install the backend dependencies**:
     ```bash
     pip install -r requirements.txt
5. **Configure Environment Variables Set up your environment variables (e.g., database credentials, API keys) for both frontend and backend.**
6. **Run the Application Locally**
   - **Frontend**: Run the Vite development server:
     ```bash
     npm run dev
   - **Backend**: Run the Django development server:
     ```bash
     python manage.py runserver
7. **Access the App Open http://localhost:5173 for the frontend and http://localhost:8000 for the backend.**

### Contribution
Feel free to fork this repository, submit issues, or contribute to the project. Contributions are welcome!


