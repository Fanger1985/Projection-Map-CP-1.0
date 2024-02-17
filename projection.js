document.addEventListener('DOMContentLoaded', () => {
    const shapes = JSON.parse(localStorage.getItem('projectionShapes')) || [];

    shapes.forEach((shape, index) => {
        const iframe = document.createElement('iframe');
        iframe.src = "about:blank"; // Set this to your desired content URL
        iframe.style.position = "absolute";
        iframe.style.width = "100%"; // You might want to adjust this based on your shapes
        iframe.style.height = "100%"; // Same as above
        iframe.style.border = "none";
        
        // Constructing the clip-path value from the shape points
        const clipPathValue = shape.map(point => `${point.x}px ${point.y}px`).join(', ');
        iframe.style.clipPath = `polygon(${clipPathValue})`;

        document.body.appendChild(iframe);

        // Example: Load HTML content into the iframe - you might load different content for each iframe
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        iframeDoc.open();
        iframeDoc.write('<p>Your HTML content here</p>'); // Replace with your actual HTML content
        iframeDoc.close();
    });
});
