# Fox and Hounds: A Board Game
[![CircleCI](https://circleci.com/gh/pmarella2/Fox-and-Hounds.svg?style=svg)](https://circleci.com/gh/pmarella2/Fox-and-Hounds)        [![DeepSource](https://static.deepsource.io/deepsource-badge-dark-mini.svg)](https://deepsource.io/gh/pmarella2/Fox-and-Hounds/?ref=repository-badge)

## **Description:**
Fox and Hounds is played on an 8×8 chess/checkerboard and only the dark squares are used (in our case the grass aka green squares). The four hounds are initially placed on the dark squares at one end of the board; the fox is placed on any dark square on the opposite end. The objective of the fox is to cross from one side of the board to the other, arriving at any one of the hounds' original squares. The hounds' objective is to prevent the fox from doing so by trapping it.

<p align="center">
  <img src="https://github.com/pmarella2/Fox-and-Hounds/blob/master/media/GameBoard.png?raw=true" alt="Game Board"/>
</p>

## **Game Rules:**
The hounds can only move diagonally forward one square. The fox can move diagonally forward or backward one square. There is no jumping/eliminating/promoting of pieces in this game. The game starts with the fox moving first. The player controlling the hounds may move only one of them each turn. The fox is trapped when it can no longer move to a vacant square. It is possible for two hounds to trap the fox against an edge of the board (other than their original home-row) or even one corner where a single hound may do the trapping. Should a hound reach the fox's original home row it will be unable to move further.

## **Requirements for setting up and running a local copy of the game:**

### **Operating System**:
Ubuntu 16.xx or higher<br>
MacOS

### **Packages**:
1. Open a terminal (make sure you have permissions to download and install packages)
2. Run these commands to install brew, and git, node@12, python3
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
brew install git
brew install python3
brew install node@12
```

### **The game web application source code**:
Go to the directory you want to download the app into:
```bash
git clone https://github.com/pmarella2/Fox-and-Hounds.git Fox-and-Hounds
```
*Alternatively you can click [here](https://github.com/pmarella2/Fox-and-Hounds/archive/master.zip)*

### **Steps to setup and run the game web application**:
1. Change into Fox-and-Hounds directory
```bash
cd Fox-and-Hounds
```
2. Install virtualenv and create a new virtual environment for python3
```bash
pip3 install virtualenv
virtualenv -p python3 venv
```
3. Activate the new virtual environment
```bash
source venv/bin/activate
```
4. Install the required packages for python and modules for react
```bash
pip install -r requirements.txt
npm install
```
5. Open your bash profile and then paste a secret key (You can create a secret key here: https://miniwebtool.com/django-secret-key-generator/)
```bash
nano ~/.bash_profile
export SECRET_KEY=”your generated secret key”
```
6. Migrate Django models into database schema
```bash
python manage.py makemigrations
python manage.py migrate
```
Open five new terminals in the project directory and activate the virtual environments in them
7. Run one of each of these commands in a separate terminal
```bash
redis-server
npm run webpack
python manage.py runsslserver –-certificate (path to your localhost.crt) --key (path to your localhost.key) localhost:8080
daphne -b 127.0.0.1 -p 8888 fox_and_hounds.asgi:channel_layer
python manage.py runworker
```
You can create your own self-signed certificates for localhost following this guide: https://deliciousbrains.com/ssl-certificate-authority-for-local-https-development/

### **Interacting with the game web appliccation**:
1. You can now play the game by navigating to *localhost:8080* in your browser of choice
2. Players need to first select the game piece they want to move and then select a valid free square they want to move that piece to. If the player chooses an invalid move, nothing happens and the game waits until he makes a valid move.

## **Troubleshooting:**
Open an issue if there are any problems with running the game
