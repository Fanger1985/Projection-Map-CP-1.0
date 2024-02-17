# Projection-Map-CP-1.0
Work In Progress for a projection mapping control panel utilizing primarily HTML/CSS/JS and manipulation of iframes in odd shapes to map our environment and create some visual art.


Projection Mapping Control Panel
Project Overview
This project aims to create a web-based control panel for projection mapping using HTML, CSS, and JavaScript. The control panel allows users to define projection areas on a live webcam feed by drawing shapes directly onto the video output. These shapes then serve as boundaries for iframes that can display various HTML content, enabling dynamic projection mapping onto physical surfaces.

Features
Webcam Integration: Utilizes the user's webcam to provide a live feed, serving as the canvas for drawing projection shapes.
Shape Drawing: Allows users to draw and define custom polygonal shapes on the live feed, which represent the areas for content projection.
Projection Mapping: Uses the defined shapes to position and clip iframes, enabling the projection of web content within specified areas.
Local Storage: Saves the drawn shapes to the browser's local storage, allowing for persistent configuration across sessions.
Implementation Details
Technologies Used
HTML/CSS: For the UI layout and styling.
JavaScript: Core logic for webcam feed integration, shape drawing, local storage management, and iframe manipulation.
Control Panel
The control panel is the central hub where users interact with the webcam feed and draw shapes for projection mapping. It includes a canvas overlaid on the video feed for drawing, buttons for saving shapes, clearing the canvas, and opening the projection window.

Projection Window
A separate window that reads the saved shapes from local storage and creates iframes positioned and clipped according to these shapes. This window represents the final output for projection, displaying the selected HTML content within the defined areas.

Challenges & Issues
Shape Complexity
While basic polygonal shapes are supported, more complex or curved shapes pose a significant challenge due to the limitations of CSS clipping and iframe manipulation.

Iframe Clipping
Current implementation relies on CSS clip-path for shaping iframes, which is limited to simpler, polygonal shapes. Advanced shapes or curves require more complex solutions, possibly involving SVGs or canvas-based rendering.

Synchronization
Ensuring the projection window accurately reflects updates made in the control panel involves managing local storage and possibly adding event listeners for real-time updates, which can get complex.

Browser Compatibility
Features such as clip-path, foreignObject in SVGs, and certain JavaScript APIs may have varying levels of support across different browsers, potentially affecting functionality.

Webcam Feed Integration
Integrating the webcam feed smoothly with the canvas and ensuring compatibility across devices and browsers can be challenging.

Future Enhancements
Advanced Shape Support: Investigating more sophisticated methods for rendering content within complex shapes.
Real-Time Synchronization: Implementing WebSockets or similar technologies for seamless updates between the control panel and projection window.
User Interface Improvements: Enhancing the control panel with a more intuitive and feature-rich UI, including shape adjustment tools and content selection options.
Cross-Browser Testing: Ensuring consistent functionality and appearance across various browsers and devices.

Contributing
Contributions are welcome! If you're interested in improving the project or adding new features, feel free to fork the repository and submit a pull request.
