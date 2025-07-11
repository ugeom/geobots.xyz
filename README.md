# GeoBots - Unleashing GenAi on Web Map Applications

An interactive web map showing snippeds of the world at any location, with adjustable "boundaries" and the ability to toggle between a circle and actual walking distances using Mapbox isochrone Api.

This project is an open-source. All the code and interface is created from scratch with the few external libraries possible. and the objective is to be a base to ai applications


---

## 🌐 Live Demo

**Try it now:** [https://geobots.xyz/](https://geobots.xyz/)

---

## ✨ Key Features

* **Global Support**: Explore worldwide.
* **Interactive Map**: Simply click anywhere to instantly find the layers you want.
* **Adjustable Boundaries**: Easily choose to display between circle and walking distances.
* **Ultra-High Performance**: .
* **Optimized Frontend**: .

---

---

## 🚀 Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

* **Node**

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/ugeom/geobots.xyz.git](https://github.com/ugeom/geobots.xyz.git)
    cd geobots
    ```

2.  **Install Node dependencies:**
    ```bash
    yarn install
    or 
    npm install
    ```

3.  **Open the map in your browser:**
    Visit `http://localhost:3000`

---

## 📂 Project Structure
* `app` - The interactive web interface with frontend optimizations.
    * `panel` - General Selectors.
    * `canvas` - area displaying the map.
* `context` - The ultra-fast NetworKit backend service. ⭐

* `download_data.py` - Script to download and build city network data.
* `requirements.txt` - Lists all project dependencies.
* `CityData/` - Directory containing network graphs and station data for all cities.
    * `{city}_walking_graph.pkl` - NetworKit graph cache for each city.
    * `{city}_stations.geojson` - Metro station data for each city.

---

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improvements, new features, or bug fixes, please open an issue or submit a pull request.

---

## 👨‍💻 Created By

**Gustavo Gonzalez - Urban Geometry** - [ugeom.com](https://ugeom.com)  
Architect and Urbanist [Urban Geometry] (https://ugeom.com)