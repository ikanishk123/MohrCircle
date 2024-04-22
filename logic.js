function updateMohrsCircle() {
      // Get the input values
      const sigmaX = parseFloat(document.getElementById('sigmaX').value);
      const sigmaY = parseFloat(document.getElementById('sigmaY').value);
      const tauXY = parseFloat(document.getElementById('tauXY').value);
      const angle = parseFloat(document.getElementById('angle').value);

      // Convert angle to radians
      const angleRad = angle * Math.PI / 180;

      // Perform rotation of stresses
      const sigma1 = ((sigmaX + sigmaY) / 2) + ((sigmaX - sigmaY) / 2) * Math.cos(2 * angleRad) + tauXY * Math.sin(2 * angleRad);
      const sigma2 = ((sigmaX + sigmaY) / 2) - ((sigmaX - sigmaY) / 2) * Math.cos(2 * angleRad) - tauXY * Math.sin(2 * angleRad);
      const tau1 = -((sigmaX - sigmaY) / 2) * Math.sin(2 * angleRad) + tauXY * Math.cos(2 * angleRad);
      const tau2 = ((sigmaX - sigmaY) / 2) * Math.sin(2 * angleRad) - tauXY * Math.cos(2 * angleRad);

      // Calculate the center and radius of the Mohr's Circle for the rotated stresses
      const center = (sigma1 + sigma2) / 2;
      const radius = Math.sqrt(Math.pow((sigma1 - sigma2) / 2, 2) + Math.pow(tau1, 2));

      // Create an SVG element using D3.js
      const svg = d3.select("#mohrs-circle")
                    .html("") // Clear the previous content
                    .append("svg")
                    .attr("width", 400)
                    .attr("height", 400);

      // Draw the graph lines
      svg.append("line")
         .attr("x1", 50)
         .attr("y1", 200)
         .attr("x2", 350)
         .attr("y2", 200)
         .attr("stroke", "lightgray");

      svg.append("line")
         .attr("x1", 200)
         .attr("y1", 50)
         .attr("x2", 200)
         .attr("y2", 350)
         .attr("stroke", "lightgray");

      // Draw the Mohr's Circle
      svg.append("circle")
         .attr("cx", 200)
         .attr("cy", 200)
         .attr("r", radius)
         .attr("stroke", "black")
         .attr("fill", "none");

      // Draw the points on the circle
      const point1X = 200 + (sigma1 - center);
      const point1Y = 200 + tau1;
      const point2X = 200 - (sigma1 - center);
      const point2Y = 200 - tau1;

      svg.append("circle")
         .attr("cx", point1X)
         .attr("cy", point1Y)
         .attr("r", 3)
         .attr("fill", "black");

      svg.append("circle")
         .attr("cx", point2X)
         .attr("cy", point2Y)
         .attr("r", 3)
         .attr("fill", "black");

      // Draw the lines joining the points
      svg.append("line")
         .attr("x1", point1X)
         .attr("y1", point1Y)
         .attr("x2", point2X)
         .attr("y2", point2Y)
         .attr("stroke", "black");

      // Display the coordinates
      svg.append("text")
         .attr("x", point1X - 20)
         .attr("y", point1Y - 10)
         .text(`(${sigma1.toFixed(2)}, ${tau1.toFixed(2)})`)
         .attr("text-anchor", "end");

      svg.append("text")
         .attr("x", point2X + 20)
         .attr("y", point2Y + 20)
         .text(`(${sigma2.toFixed(2)}, ${tau2.toFixed(2)})`)
         .attr("text-anchor", "start");
    }

    // Initial call to update the Mohr's Circle with default values
    updateMohrsCircle();