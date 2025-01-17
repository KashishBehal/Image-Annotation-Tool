import React, { useRef, useState } from "react";
import "./App.css";
import {motion} from 'framer-motion'

const App = () => {
  const [imageSrc, setImageSrc] = useState("./image-placeholder.svg");

  const [tooltips, setTooltips] = useState([]);

  const [draggedTooltipId, setDraggedTooltipId] = useState(null);
  const [dragging, setDragging] = useState(false);
  const imageRef = useRef(null);
  const sliderVariants={
    initial:{
        x:0 ,
       
    } ,
    animate:{
        x:"-220%" ,
        opacity:1 ,
        transition:{
            repeat:onchange,
            repeatType:"mirror" ,
            duration:40 ,
        } ,
    } ,
   
   
};
  const handleDelete = (id) => {
    setTooltips(tooltips.filter((tt) => tt.id !== id));
  };

  const handleDragStart = (id) => {
    setDraggedTooltipId(id);
    setDragging(true); 
  };

  const handleDrag = (event) => {
    if (!draggedTooltipId || !imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    let x = event.clientX - rect.left;
  x = Math.max(0, Math.min(x, rect.width));
    let y = event.clientY - rect.top;
    y = Math.max(0, Math.min(y, rect.height));

    setTooltips((tooltips) =>
      tooltips.map((tt) =>(tt.id === draggedTooltipId?{ ...tt, x, y } : tt))
    );
  };

  const handleDragEnd = () => {
    setDraggedTooltipId(null);
    setDragging(false); 
  };
  const handleEdit = (id) => {
  const newText = prompt("Edit tooltip text:");
    if (newText) {
    setTooltips(tooltips.map((tt) => (tt.id === id ? { ...tt, text: newText } : tt)));
    }
  };
  const handleClick = (event) => {
    if (dragging) return; 

    if (!imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const clickedTooltip = tooltips.find(
      (tt) => 
        
        x >= tt.x && x <= tt.x + 50 && 
        y >= tt.y && y <= tt.y + 50
    );

  if (clickedTooltip) return;

    const tooltipText = prompt("Enter tooltip text:");
   
    if (tooltipText) {
      setTooltips([...tooltips, { id: Date.now(), x, y, text: tooltipText }]);
    }
  };
  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result);
      reader.readAsDataURL(file);
    }
  };


  return (
    <div className="app">
      <div className="header"><h1>Image Annotation Tool</h1>
     <div>
     <h1>Features</h1>
     <h1>Contact</h1></div></div>
     
      <h1 class="heading">
       Annotate 
    <span class="highlight">
      <svg aria-hidden="true" viewBox="0 0 418 42" class="highlight-svg" preserveAspectRatio="none">
        <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"></path>
      </svg>
      <span class="highlight-text">    any image</span>
    </span> securely anywhere.
  </h1>
      <input type="file" accept="image/*" onChange={handleUpload}  className="aa"/>
      {imageSrc && (
        <div
          className="image-container"
          ref={imageRef}
          onClick={handleClick}
          onMouseMove={handleDrag}
          onMouseUp={handleDragEnd}
        >
          <img 
  src={imageSrc || "image.png"} 
  alt="Uploaded or default" 
  className="uploaded-image" 
/>

          {tooltips.map((tt) => (
            <div
              key={tt.id}
              className="tooltip"
              style={{ top: tt.y, left: tt.x }}
              draggable
              onMouseDown={() => handleDragStart(tt.id)}
              onDragEnd={handleDragEnd}
              onDragStart={(e) => e.preventDefault()}
            >
              <div className="tooltip-dot"></div>
            
              <div className="tooltip-content">
  <span className="tooltip-text">{tt.text}</span>

  <img 
    src="aaa.jpg" 
    alt="Edit" 
    onClick={() => handleEdit(tt.id)} 
    className="icon edit-icon"
  />
  <img 
    src="bbb.jpg" 
    alt="Delete" 
    onClick={() => handleDelete(tt.id)} 
    className="icon delete-icon"
  />
</div> </div>
  ))}
  </div>
   )}
  <motion.div className="slidingTextContainer"
            variants={sliderVariants} initial="initial" animate="animate">
               Works on all modern browsers
            </motion.div>
            <div className="footer">Copyright @2025</div>
 
    </div>
  );
};

export default App;
