# RealEstate Web App 🏡

An intuitive, responsive real estate web application that helps users discover rental and sale properties with ease. Featuring a clean design, property listings, detailed views, and a togglable dark mode for enhanced user experience.

---

## 🏁 Project Overview

* **Objective:** Provide prospective tenants and buyers with a seamless way to search, browse, and inquire about available properties.
* **Core Experience:**

  * Landing page showcasing rental and sale sections with hero banners.
  * Grid of property cards displaying price, key specs, and thumbnail images.
  * Detailed property page with image carousel, descriptions, amenities, and contact action.
  * Dark mode toggle for accessibility and user preference.

---

## ✨ Key Features

1. **Hero Banners**

   * Separate sections for Rent and Buy
   * Gradient backgrounds and call-to-action buttons
   * Responsive layout adapts to all screen sizes

2. **Property Listings**

   * Card-based grid showing thumbnail, price (AED), beds, baths, and area
   * Hover effects and "View more details" buttons
   * No-commission and furnished indicators on rental cards

3. **Detailed Property View**

   * Image carousel for multiple photos
   * Price, specifications (beds, baths, sqft), and title
   * Rich HTML description with key features and amenities
   * Click-outside detection for modals or popups
   * Contact Agent button with pre-filled inquiry form

4. **Dark Mode Support**

   * Toggle switch in the navbar
   * Persists user preference using local storage
   * Adjusts colors for backgrounds, text, and UI elements

5. **Responsive & Accessible**

   * Mobile-first CSS flex/grid layouts
   * Semantic HTML elements and ARIA attributes
   * Keyboard navigation for forms and carousels

---

## 🛠 Tech Stack & Dependencies

* **React** (Create React App)
* **React Router** for client-side routing
* **React Icons** for consistent iconography
* **react-slick** / **slick-carousel** for image sliders
* **styled-components** or **Tailwind CSS** for styling
* **localStorage** for persisting dark mode
* **Axios** or **fetch** for data retrieval (mock or API)

---


## 💡 Usage Notes

* **Customization:** Change currency, labels, or card layouts via props and global theme variables.
* **Data Integration:** Replace placeholder data with real API endpoints or a headless CMS.
* **Performance:** Lazy-load images and split code for faster initial loads.


