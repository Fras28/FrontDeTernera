import React, { useState, useEffect } from "react";

import TopNav from "../Landing/logoTop";
import BottomNav from "../Landing/BottomNav";


function Layout({child}) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={styles.container}>
      <TopNav />
      <div style={styles.container2}>
      {child}
      </div>
      <BottomNav />
    </div>
  );
}

export default Layout;

const styles = {
  contaiiner: { paddingBottom: "60px" },
  container2: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "1rem",
    paddingBottom:"80px",
    overflow:"hidden"
  },
  hero: {
    display: "flex",
    alignItems: "center",
    overflow:"hidden"
  },
};
