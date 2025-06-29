# 💵 Cash Register App

A simple and responsive cash register web app built with HTML, CSS, and JavaScript. The app simulates a real-world cash register that calculates and displays the correct change based on the amount entered by the customer and the cash available in the drawer.

---

## 🖥️ Live Demo

You can try the live version here: [cash-register-fcc-js.vercel.app](https://cash-register-fcc-js.vercel.app/) ✨

---

## 📦 Features

- Displays total purchase price
- Accepts customer cash input
- Calculates exact change using available denominations
- Supports different statuses:
  - `OPEN`: Change is available and returned
  - `CLOSED`: All cash in drawer is used
  - `INSUFFICIENT_FUNDS`: Not enough money to return change
- Responsive and mobile-friendly design
- Visual breakdown of cash-in-drawer
- Professional UI and user-friendly messages

---

## 🧮 Built-in Logic

- Denominations supported:
  - Penny, Nickel, Dime, Quarter, One, Five, Ten, Twenty, One Hundred
- Change is returned using the highest denominations first
- Floating point math handled precisely by rounding to cents
- Drawer state is updated after every transaction

---

## 🛠️ Tech Stack

- **HTML5**
- **CSS3 (with custom variables and responsive design)**
- **Vanilla JavaScript (ES6)**

---

## 📁 Project Structure

cash-register/
├── index.html # Main HTML structure
├── styles.css # Styling and layout
├── script.js # Cash register logic
└── README.md # You're here

## 📸 Screenshots

_Mobile view:_

![Image](https://github.com/user-attachments/assets/892cf4c8-381e-463b-a91e-5767018acd26)

---

## 🚀 How to Run Locally

1. Clone the repository:

```bash
git clone https://github.com/yourusername/cash-register.git
Open index.html in your browser.

No build tools or dependencies required — it's 100% frontend!

✅ TODOs / Improvements
Add unit tests
Enable drawer reset button
Store transactions in localStorage
Add support for international currencies

📄 License
This project is open source and available under the MIT License.

🙌 Acknowledgements
Inspired by freeCodeCamp front-end certification projects.

```
