<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mohr's Circle</title>
  <script src="https://d3js.org/d3.v7.min.js"></script>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="design.css">
</head>
<body>
  <header>MOHR'S CIRCLE CALCULATOR</header>
  <label for="sigmaX">Normal Stress, X:</label>
  <input type="number" id="sigmaX" value="100">
  <br>
  <label for="sigmaY">Normal Stress, Y:</label>
  <input type="number" id="sigmaY" value="50">
  <br>
  <label for="tauXY">Shear Stress on Y:</label>
  <input type="number" id="tauXY" value="30">
  <br>
  <label for="angle">Angle (degrees):</label>
  <input type="number" id="angle" value="0">
  <br>
  <button onclick="updateMohrsCircle()">Update</button>
  <div id="mohrs-circle"></div>

  <script>
    function updateMohrsCircle() {
      const sigmaX = parseFloat(document.getElementById('sigmaX').value);
      const sigmaY = parseFloat(document.getElementById('sigmaY').value);
      const tauXY = parseFloat(document.getElementById('tauXY').value);
      const angle = parseFloat(document.getElementById('angle').value);

      const angleRad = angle * Math.PI / 180;

      const sigma1 = ((sigmaX + sigmaY) / 2) + ((sigmaX - sigmaY) / 2) * Math.cos(2 * angleRad) + tauXY * Math.sin(2 * angleRad);
      const sigma2 = ((sigmaX + sigmaY) / 2) - ((sigmaX - sigmaY) / 2) * Math.cos(2 * angleRad) - tauXY * Math.sin(2 * angleRad);
      const tau1 = -((sigmaX - sigmaY) / 2) * Math.sin(2 * angleRad) + tauXY * Math.cos(2 * angleRad);
      const tau2 = ((sigmaX - sigmaY) / 2) * Math.sin(2 * angleRad) - tauXY * Math.cos(2 * angleRad);

      const center = (sigma1 + sigma2) / 2;
      const radius = Math.sqrt(Math.pow((sigma1 - sigma2) / 2, 2) + Math.pow(tau1, 2));

      const svg = d3.select("#mohrs-circle")
                    .html("") 
                    .append("svg")
                    .attr("width", 400)
                    .attr("height", 400);

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

      svg.append("circle")
         .attr("cx", 200 + center) // Shift the center along the x-axis
         .attr("cy", 200)
         .attr("r", radius)
         .attr("stroke", "black")
         .attr("fill", "none");

      const point1X = 200 + center + (sigma1 - center);
      const point1Y = 200 + tau1;
      const point2X = 200 + center - (sigma1 - center);
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

      svg.append("line")
         .attr("x1", point1X)
         .attr("y1", point1Y)
         .attr("x2", point1X)
         .attr("y2", 200) // Join to the x-axis
         .attr("stroke", "black")
         .attr("stroke-dasharray", "5,5"); // Make the line dotted
         
      // svg.append("line")
      //    .attr("x1", point2X)
      //    .attr("y1", point2Y)
      //    .attr("x2", point2X)
      //    .attr("y2", 200) // Join to the x-axis
      //    .attr("stroke", "black");

      svg.append("line")
         .attr("x1", point1X)
         .attr("y1", point1Y)
         .attr("x2", point2X)
         .attr("y2", point2Y)
         .attr("stroke", "black");

         svg.append("line")
         .attr("x1", point2X)
         .attr("y1", point2Y)
         .attr("x2", point2X)
         .attr("y2", 200) 
         .attr("stroke", "black")
         .attr("stroke-dasharray", "5,5"); 

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

      // Mark the center
      svg.append("circle")
         .attr("cx", 200 + center)
         .attr("cy", 200)
         .attr("r", 3)
         .attr("fill", "red");
    }

    updateMohrsCircle();
  </script>
</body>
</html>
