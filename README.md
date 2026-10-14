# PlanetPulse

PlanetPulse is a web application for exploring and monitoring environmental indicators across countries.

## Project Overview

### Objectives

- Record environmental indicators by country.
- Record environmental targets by country.
- Record environmental monitoring notes by country.
- Record environmental monitoring priorities by country.
- Generate AI report with the previous records
- Build a maintainable and scalable web application.
- Demonstrate the product through a functional prototype.

## Features

- Manage countries
- Manage Monitoring notes
- Manage environmental indicators
- Manage environmental targets
- Generate an AI-assisted environmental report
- Manage environmental monitoring priorities

## Technology

PlanetPulse is built with a Java backend, a native JavaScript frontend, and a PostgreSQL database.

| Component | Technology                 |
| --------- | -------------------------- |
| Backend   | Java 25, Spring Boot       |
| Frontend  | JavaScript, Web Components |
| Database  | PostgreSQL                 |

For more detailed technical information, see the [Developer Guide](https://github.com/rlossec/planet-pulse/wiki/Developer-Guide).

## Project Structure

```text
planet-pulse/
├── backend/       # Backend application and REST API
├── frontend/      # Web application
├── database/      # Database scripts and resources
├── docs/          # Project documentation and diagrams
└── README.md
```

## Getting Started

### Prerequisites

Make sure the following tools are installed:

- Java 25
- JDK : 25.0.4
- PostgreSQL 18

### Installation

Clone the repository:

```bash
git clone https://github.com/rlossec/planet-pulse
cd planet-pulse
```

To run the backend :

```bash
./mvnw spring-boot:run
```

## Documentation

### Developer Guide

The [Developer Guide](https://github.com/rlossec/planet-pulse/wiki/Developer-Guide) contains technical information for developers.

## Development

PlanetPulse is developed following a structured workflow, from requirements and modelling to implementation, testing and integration.

Contributions should follow the project's development conventions described in the [Developer Guide](https://github.com/rlossec/planet-pulse/wiki/Developer-Guide).

## Project Status

🚧 **In development**

PlanetPulse is currently being developed as a functional prototype.

## License

This project is currently developed as part of the PlanetPulse project.
